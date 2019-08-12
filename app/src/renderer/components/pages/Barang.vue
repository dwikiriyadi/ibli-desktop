<template>
  <div>
    <md-table-card>
      <md-toolbar>
        <span class="md-title">Barang</span>
        <md-button class="md-icon-button" id="tambah" @click.native="openDialog('tambah')">
          <md-icon>add</md-icon>
        </md-button>
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
        <md-button class="md-icon-button" @click.native="printQrCode(selectedData)">
          <md-icon>print</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click.native="hapusSelected('hapusSelected', selectedData)">
          <md-icon>delete</md-icon>
        </md-button>
      </md-table-alternate-header>

      <md-table md-sort="peminjaman" md-sort-type="desc" @select="onSelect" @sort="onSort">
        <md-table-header>
          <md-table-row>
            <md-table-head md-sort-by="kode_barang">Kode Barang</md-table-head>
            <md-table-head md-sort-by="nama_barang">Nama Barang</md-table-head>
            <md-table-head md-sort-by="jenis_barang">Jenis Barang</md-table-head>
            <md-table-head md-sort-by="kondisi">Kondisi</md-table-head>
            <md-table-head md-sort-by="status_peminjaman">Status Peminjaman</md-table-head>

          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(row, rowIndex) in result" :md-item="row" md-auto-select md-selection>
            <md-table-cell>
              {{ row.kode_barang}}
            </md-table-cell>
            <md-table-cell>
              {{ row.nama_barang}}
            </md-table-cell>
            <md-table-cell>
              {{ row.jenis_barang}}
            </md-table-cell>
            <md-table-cell>
              {{ row.kondisi}}
            </md-table-cell>
            <md-table-cell>
              {{ row.status_peminjaman }}
            </md-table-cell>
            <md-table-cell>
              <md-menu md-size="2" md-align-trigger md-direction="bottom left" style="width: 40px">
                <md-button md-menu-trigger class="md-icon-button md-list-action">
                  <md-icon>more_vert</md-icon>
                </md-button>

                <md-menu-content style="">
                  <md-menu-item @click.native="editDialog('edit', row.kode_barang)">Edit</md-menu-item>
                  <md-menu-item @click.native="hapusDialog('hapus', row.kode_barang)">Hapus</md-menu-item>
                </md-menu-content>
              </md-menu>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-table-card>

    <md-dialog md-open-from="#tambah" md-close-to="#tambah" ref="tambah">
      <md-dialog-title>Tambah Data Barang</md-dialog-title>

      <md-dialog-content>
        <md-input-container>
          <label>Masukkan kode barang</label>
          <md-input v-model="tambah.kode_barang" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Masukkan nama barang</label>
          <md-input v-model="tambah.nama_barang" required></md-input>
        </md-input-container>
        <md-input-container>
          <label for="jenis_barang">Jenis Barang</label>
          <md-select name="jenis_barang" id="jenis_barang" v-model="tambah.jenis_barang" required>
            <md-option value="Laptop">Laptop</md-option>
            <md-option value="Printer">Printer</md-option>
            <md-option value="Scanner">Scanner</md-option>
            <md-option value="Proyektor">Proyektor</md-option>
          </md-select>
        </md-input-container>
        <md-input-container>
          <label for="kondisi">Kondisi Barang</label>
          <md-select name="kondisi" id="kondisi" v-model="tambah.kondisi" required>
            <md-option value="Baik">Baik</md-option>
            <md-option value="Rusak Ringan">Rusak Ringan</md-option>
            <md-option value="Rusak Berat">Rusak Berat</md-option>
          </md-select>
        </md-input-container>

      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('tambah')">Batal</md-button>
        <md-button class="md-primary" @click="tambahPengguna('tambah')">Tambah</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog md-open-from="#edit" md-close-to="#edit" ref="edit">
      <md-dialog-title>Edit Data Barang</md-dialog-title>

      <md-dialog-content>
        <md-input-container>
          <label>Masukkan kode barang</label>
          <md-input v-model="editable.kode_barang" required readonly></md-input>
        </md-input-container>
        <md-input-container>
          <label>Masukkan nama barang</label>
          <md-input v-model="editable.nama_barang" required></md-input>
        </md-input-container>
        <md-input-container>
          <label for="jenis_barang">Jenis Barang</label>
          <md-select name="jenis_barang" id="jenis_barang" v-model="editable.jenis_barang" required>
            <md-option value="Laptop">Laptop</md-option>
            <md-option value="Printer">Printer</md-option>
            <md-option value="Scanner">Scanner</md-option>
            <md-option value="Proyektor">Proyektor</md-option>
          </md-select>
        </md-input-container>
        <md-input-container>
          <label for="kondisi">Kondisi Barang</label>
          <md-select name="kondisi" id="kondisi" v-model="editable.kondisi" required>
            <md-option value="Baik">Baik</md-option>
            <md-option value="Rusak Ringan">Rusak Ringan</md-option>
            <md-option value="Rusak Berat">Rusak Berat</md-option>
          </md-select>
        </md-input-container>
        <md-input-container>
          <label for="status_peminjaman">Status Peminjaman</label>
          <md-select name="status_peminjaman" id="status_peminjaman" v-model="editable.status_peminjaman" required>
            <md-option value="Dipinjam">Dipinjam</md-option>
            <md-option value="Tidak Dipinjam">Tidak Dipinjam</md-option>
          </md-select>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('edit')">Batal</md-button>
        <md-button class="md-primary" @click="edit('edit')">Simpan</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog md-open-from="#hapus" md-close-to="#hapus" ref="hapus">
      <md-dialog-title>Hapus Barang</md-dialog-title>

      <md-dialog-content>Anda yakin ingin menghapus data barang dengan kode "{{ nama }}" ?</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('hapus')">Batal</md-button>
        <md-button class="md-primary" @click="hapus('hapus', nama)">Hapus</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog md-open-from="#hapusSelected" md-close-to="#hapusSelected" ref="hapusSelected">
      <md-dialog-title>Hapus Pengguna</md-dialog-title>

      <md-dialog-content>Anda yakin ingi menghapus data barang dengan kode "<span v-for="(row, rowIndex) in selectedData"><i>{{ row.kode_barang }}</i>, </span>"
        ?</md-dialog-content>

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
  import axios from 'axios'
  import querystring from 'querystring'
  export default {
    data() {
      return {
        url: 'http://localhost:8080/api/',
        message: '',
        nama: '',
        result: [],
        tambah: {
          kode_barang: '',
          nama_barang: '',
          jenis_barang: '',
          kondisi: ''
        },
        editable: [],
        selectedData: [],
        sort: {}
      }
    },
    created() {
      this.all()
    },

    methods: {
      printQrCode(object) {
        localStorage.setItem("barang", JSON.stringify(object))
        this.$router.push('/print')
      },
      onSelect(data) {
        this.selectedData = data
        console.log(this.selectedData)
      },
      onSort(sort) {
        this.sort = sort
      },
      all() {
        axios.get(this.url + 'barang', {
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
        axios.get(this.url + 'barang/edit', {
          params: {
            'kode_barang': val
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
        axios.post(this.url + 'barang', querystring.stringify({
          kode_barang: this.tambah.kode_barang,
          nama_barang: this.tambah.nama_barang,
          jenis_barang: this.tambah.jenis_barang,
          kondisi: this.tambah.kondisi
        }), {
          headers: {
            'Authorization': localStorage.getItem('api_key')
          }
        }).then((response) => {
          if (response.data.error == false) {
            this.tambah = []
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
        axios.post(this.url + 'barang/edit', querystring.stringify({
          kode_barang: this.editable.kode_barang,
          nama_barang: this.editable.nama_barang,
          jenis_barang: this.editable.jenis_barang,
          kondisi: this.editable.kondisi,
          status_peminjaman: this.editable.status_peminjaman
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
        axios.post(this.url + 'barang/hapus', querystring.stringify({
          kode_barang: object
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
        for (var i = 0; i < object.length; i++) {
          this.hapus(ref, object[i].kode_barang)
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