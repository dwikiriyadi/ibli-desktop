<template>
  <div>
    <md-table-card>
      <md-toolbar>
        <span class="md-title">Peminjaman</span>
        <!-- <md-button class="md-icon-button" id="tambah" @click.native="openDialog('tambah')">
          <md-icon>add</md-icon>
        </md-button> -->
        <md-menu md-size="6" md-direction="bottom left" md-align-trigger>
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>search</md-icon>
          </md-button>
          <md-menu-content>
            <center>
              <md-theme md-name="field">
                <md-input-container md-inline style="width: 300px;">
                  <label>Pencarian</label>
                  <md-input></md-input>
                </md-input-container>
              </md-theme>
            </center>
          </md-menu-content>
        </md-menu>
      </md-toolbar>

      <md-table-alternate-header md-selected-label="selected">
        <!-- <md-button class="md-icon-button">
          <md-icon>print</md-icon>
        </md-button> -->
        <md-button class="md-icon-button" @click.native="hapusSelected('hapusSelected', selectedData)">
          <md-icon>delete</md-icon>
        </md-button>        
      </md-table-alternate-header>

      <md-table md-sort="peminjaman" md-sort-type="desc" @select="onSelect" @sort="onSort">
        <md-table-header>
          <md-table-row>
            <md-table-head md-sort-by="peminjaman">Peminjam</md-table-head>
            <md-table-head md-sort-by="nama_barang">Nama Barang</md-table-head>
            <md-table-head md-sort-by="waktu_pinjam">Waktu Pinjam</md-table-head>
            <md-table-head md-sort-by="waktu_kembali">Waktu Kembali</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(row, rowIndex) in result" :md-item="row" md-auto-select md-selection>
            <md-table-cell>
              {{ row.nama_lengkap}}
            </md-table-cell>
            <md-table-cell>
              {{ row.kode_barang}}
            </md-table-cell>
            <md-table-cell>
              {{ row.tgl_pinjam }} {{row.jam_pinjam}}
            </md-table-cell>
            <md-table-cell>
              {{ row.tgl_kembali}} {{row.jam_kembali}}
            </md-table-cell>
            <md-table-cell>
              <md-menu md-size="2" md-align-trigger md-direction="bottom left" style="width: 40px">
                <md-button md-menu-trigger class="md-icon-button md-list-action">
                  <md-icon>more_vert</md-icon>
                </md-button>

                <md-menu-content style="">
                  <!-- <md-menu-item @click.native="editDialog('edit', row.kode_peminjaman)">Edit</md-menu-item> -->
                  <md-menu-item @click.native="hapusDialog('hapus', row.kode_peminjaman)">Hapus</md-menu-item>
                </md-menu-content>
              </md-menu>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-table-card>

    <md-dialog md-open-from="#tambah" md-close-to="#tambah" ref="tambah">
      <md-dialog-title>Tambah Data Pengguna</md-dialog-title>

      <md-dialog-content>

      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('tambah')">Batal</md-button>
        <md-button class="md-primary" @click="tambahPengguna('tambah')">Tambah</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog md-open-from="#edit" md-close-to="#edit" ref="edit">
      <md-dialog-title>Edit Data Pengguna</md-dialog-title>

      <md-dialog-content>

      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('edit')">Batal</md-button>
        <md-button class="md-primary" @click="edit('edit')">Simpan</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog md-open-from="#hapus" md-close-to="#hapus" ref="hapus">
      <md-dialog-title>Hapus Pengguna</md-dialog-title>

      <md-dialog-content>Anda yakin ingi menghapus data pengguna bernama "{{ nama }}" ?</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('hapus')">Batal</md-button>
        <md-button class="md-primary" @click="hapus('hapus', nama)">Hapus</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog md-open-from="#hapusSelected" md-close-to="#hapusSelected" ref="hapusSelected">
      <md-dialog-title>Hapus Pengguna</md-dialog-title>

      <md-dialog-content>Anda yakin ingi menghapus data pengguna bernama "<span v-for="(row, rowIndex) in selectedData"><i>{{ row.kode_peminjaman }}</i>, </span>" ?</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('hapusSelected')">Batal</md-button>
        <md-button class="md-primary" @click="hapusItem('hapusSelected', selectedData)">Hapus</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-snackbar ref="snackbar" :md-duration="3000">
      <span>{{ message }}</span>
    </md-snackbar>
  </div>
</template>

<script>
  import axios from 'axios';
  import querystring from 'querystring'
  export default {
    data() {
      return {
        url: 'http://localhost:8080/api/',
        message: '',
        nama: '',
        result: [],
        tambah: {

        },
        editable: [],
        selectedData: [],
        sort: {}
      }
    },
    created() {
      this.all()
    },

    // updated() {
    //   if (this.pengguna == 'mahasiswa') {
    //       this.selectMahasiswa()
    //     } else if (this.pengguna == 'dosen') {
    //       this.selectOther(this.pengguna)
    //     } else if (this.pengguna == 'teknisi') {
    //       this.selectOther(this.pengguna)
    //     } else if (this.pengguna == 'semua') {
    //       this.all()
    //     }
    // },
    methods: {
      onSelect(data) {
        this.selectedData = data
        console.log(this.selectedData)
      },
      onSort(sort) {
        this.sort = sort
      },
      all() {
        axios.get(this.url + 'peminjaman', {
          headers: {
            'Authorization': localStorage.getItem("api_key")
          }
        }).then((response) => {
          this.result = response.data.result
          console.log(this.result)
        }).catch((error) => {
          console.log(error)
        })
      },

      openDialog(ref) {
        this.$refs[ref].open()
      },

      editDialog(ref, val) {
        axios.get(this.url + 'peminjaman/edit', {
          params: {
            'kode_peminjaman': val
          },
          headers: {
            'Authorization': localStorage.getItem('api_key')
          }
        }).then((response) => {
          this.editable = response.data.result[0]
          this.$refs[ref].open()
        }).catch((error) => {
          console.log(error)
        })
      },

      hapusDialog(ref, nama) {
        this.nama = nama
        this.$refs[ref].open()
      },

      hapusSelected(ref, object) {
        this.nama = object
        this.$refs[ref].open()
      },

      closeDialog(ref) {
        this.$refs[ref].close()
      },

      tambahPengguna(ref) {
        axios.post(this.url + 'pengguna', querystring.stringify({
          no_induk: this.tambah.no_induk,
          nama_lengkap: this.tambah.nama_lengkap,
          email: this.tambah.email,
          password: this.tambah.password,
          role: this.tambah.role,
          admin: this.tambah.admin,
          foto: this.tambah.foto,
          kode_kelas: this.tambah.kode_kelas
        }), {
          headers: {
            'Authorization': localStorage.getItem('api_key')
          }
        }).then((response) => {
          if (response.data.error == false) {
            this.message = response.data.status
            this.$refs.snackbar.open()
            this.$refs[ref].close()
          } else {
            this.message = response.data.status
            this.$refs.snackbar.open()
            this.$refs[ref].close()
          }
        }).catch((error) => {
          this.message = error
          this.$refs.snackbar.open()
          this.$refs[ref].close()
        })
      },

      edit(ref) {
        axios.post(this.url + 'pengguna/edit', querystring.stringify({
          no_induk: this.editable.no_induk,
          nama_lengkap: this.editable.nama_lengkap,
          email: this.editable.email,
          password: this.editable.password,
          role: this.editable.role,
          admin: this.editable.admin,
          foto: this.editable.foto,
          kode_kelas: this.editable.kode_kelas
        }), {
          headers: {
            'Authorization': localStorage.getItem('api_key')
          }
        }).then((response) => {
          if (response.data.error == false) {
            this.message = response.data.status
            this.$refs.snackbar.open()
            this.$refs[ref].close()
          } else {
            this.message = response.data.status
            this.$refs.snackbar.open()
            this.$refs[ref].close()
          }
        }).catch((error) => {
          this.message = error
          this.$refs.snackbar.open()
          this.$refs[ref].close()
        })
      },

      hapus(ref, object) {
        axios.post(this.url + 'peminjaman/hapus', querystring.stringify({
          kode_peminjaman: object
        }), {
          headers: {
            'Authorization': localStorage.getItem("api_key")
          }
        }).then((response) => {
          if (response.data.error == false) {
            this.message = response.data.status
            this.$refs.snackbar.open()
            this.$refs[ref].close()
          } else {
            this.message = response.data.status
            this.$refs.snackbar.open()
            this.$refs[ref].close()
          }
        }).catch((error) => {
          this.message = error
          this.$refs.snackbar.open()
          this.$refs[ref].close()
        })
      },
      hapusItem(ref, object) {
        for (var i = 0; i<object.length; i++) {
          this.hapus(ref, object[i].kode_peminjaman)
        }
      }
    }
  }
</script>

<style scoped>
  .action-menu {
    display: flex;
    margin: 8px;
  }

  .select {
    margin: 0 8px
  }

  .table {
    overflow-y: auto;
  }
</style>