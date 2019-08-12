<template>
  <div>
    <md-table-card>
      <md-toolbar>
        <span class="md-title">Pengguna</span>
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
        <div style="display:flex">
          <div style="margin-left: 6px; margin-right: 6px">
            <md-input-container>
              <label for="pengguna">Pengguna</label>
              <md-select name="pengguna" id="pengguna" v-model="pengguna" @selected="selectPengguna()">
                <md-option value="semua">Semua</md-option>
                <md-option value="mahasiswa">Mahasiswa</md-option>
                <md-option value="dosen">Dosen</md-option>
                <md-option value="teknisi">Teknisi</md-option>
              </md-select>
            </md-input-container>
          </div>
          <div style="margin-left: 6px; margin-right: 6px" v-if="isMahasiswa">
            <md-input-container>
              <label for="prodi">Program Studi</label>
              <md-select name="prodi" id="prodi" v-model="prodi" @selected="selectProdi()">
                <md-option value="none">None</md-option>
                <md-option value="Teknik Listrik">Teknik Listrik</md-option>
                <md-option value="Teknik Elektronika">Teknik Elektronika</md-option>
                <md-option value="Teknik Informatika">Teknik Informatika</md-option>
              </md-select>
            </md-input-container>
          </div>
        </div>
      </md-toolbar>

      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head>Username</md-table-head>
            <md-table-head>Nama</md-table-head>
            <md-table-head>Email</md-table-head>
            <md-table-head v-if="isMahasiswa">Program Studi</md-table-head>
            <md-table-head v-if="isAll">Sebagai</md-table-head>
            <md-table-head v-if="isOther || isAll">Admin</md-table-head>

          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(row, rowIndex) in result">
            <md-table-cell>
              {{ row.no_induk}}
            </md-table-cell>
            <md-table-cell>
              {{ row.nama_lengkap}}
            </md-table-cell>
            <md-table-cell>
              {{ row.email}}
            </md-table-cell>
            <md-table-cell v-if="isAll">
              {{ row.role}}
            </md-table-cell>
            <md-table-cell v-if="isMahasiswa">
              {{ row.nama_prodi }}
            </md-table-cell>
            <md-table-cell v-if="(isOther || isAll) && row.admin == 1">
              Ya
            </md-table-cell>
            <md-table-cell v-if="(isOther || isAll) && row.admin == 0">
              Tidak
            </md-table-cell>
            <md-table-cell>
              <md-menu md-size="2" md-align-trigger md-direction="bottom left" style="width: 40px">
                <md-button md-menu-trigger class="md-icon-button md-list-action">
                  <md-icon>more_vert</md-icon>
                </md-button>

                <md-menu-content style="">
                  <md-menu-item @click.native="editDialog('edit', row.no_induk)">Edit</md-menu-item>
                  <md-menu-item @click.native="hapusDialog('hapus', row.nama_lengkap, row.no_induk)">Hapus</md-menu-item>
                </md-menu-content>
              </md-menu>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>

      <!-- <md-table-pagination 
      md-size="10" 
      md-page="1" 
      md-separator="dari" 
      md-label="Baris per halaman" 
      :md-page-options="[5, 10, 25, 50]"></md-table-pagination> -->
    </md-table-card>

    <md-dialog md-open-from="#tambah" md-close-to="#tambah" ref="tambah">
      <md-dialog-title>Tambah Data Pengguna</md-dialog-title>

      <md-dialog-content>
        <md-input-container>
          <label for="role">Saya adalah ...</label>
          <md-select name="role" id="role" v-model="tambah.role" required @selected="tambahSelect()">
            <md-option value="Mahasiswa">Mahasiswa</md-option>
            <md-option value="Dosen">Dosen</md-option>
            <md-option value="Teknisi">Teknisi</md-option>
          </md-select>
        </md-input-container>
        <md-input-container>
          <label>Masukkan nomor induk</label>
          <md-input v-model="tambah.no_induk" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Masukkan nama pengguna</label>
          <md-input v-model="tambah.nama_lengkap" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Masukkan email</label>
          <md-input v-model="tambah.email" type="email"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <label>Masukkan Password</label>
          <md-input type="password" v-model="tambah.password"></md-input>
        </md-input-container>
        <md-switch v-model="isTrue" id="admin" name="admin" @change="switchChange()">{{ switchMessage }}</md-switch>
        <md-input-container v-if="tambahMahasiswa == true">
          <label>Masukkan kelas pengguna</label>
          <md-input v-model="tambah.kode_kelas" required></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('tambah')">Batal</md-button>
        <md-button class="md-primary" @click="tambahPengguna('tambah')">Tambah</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog md-open-from="#edit" md-close-to="#edit" ref="edit">
      <md-dialog-title>Edit Data Pengguna</md-dialog-title>

      <md-dialog-content>
        <md-input-container>
          <label>Masukkan nomor induk</label>
          <md-input v-model="editable.no_induk" required readonly></md-input>
        </md-input-container>
        <md-input-container>
          <label>Masukkan nama pengguna</label>
          <md-input v-model="editable.nama_lengkap" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Masukkan email</label>
          <md-input v-model="editable.email" type="email"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <label>Masukkan Password</label>
          <md-input type="password" v-model="editable.password"></md-input>
        </md-input-container>
        <md-switch v-model="isTrue" id="admin" name="admin" @change="switchChange()">{{ switchMessage }}</md-switch>
        <md-input-container v-if="editMahasiswa == true">
          <label>Masukkan kelas pengguna</label>
          <md-input v-model="editable.kode_kelas" required></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('edit')">Batal</md-button>
        <md-button class="md-primary" @click="edit('edit')">Simpan</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog md-open-from="#hapus" md-close-to="#hapus" ref="hapus">
      <md-dialog-title>Hapus Pengguna</md-dialog-title>

      <md-dialog-content>Anda yakin ingin menghapus data pengguna bernama "{{ nama }}" ?</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('hapus')">Batal</md-button>
        <md-button class="md-primary" @click="hapus('hapus')">Hapus</md-button>
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
        pengguna: 'semua',
        prodi: 'none',
        isMahasiswa: false,
        isOther: false,
        isAll: true,
        message: '',
        nama: '',
        no_induk: '',
        result: [],
        switchMessage: 'Bukan Admin',
        isTrue: false,
        tambahMahasiswa: false,
        editMahasiswa: false,
        tambah: {
          no_induk: '',
          nama_lengkap: '',
          email: '',
          password: '1234',
          role: '',
          admin: null,
          foto: '',
          kode_kelas: '',
        },
        editable: []
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
      switchChange() {
        if (this.isTrue) {
          this.tambah.admin = 0
          this.editable.admin = 0
          this.switchMessage = 'Bukan Admin'
        } else {
          this.tambah.admin = 1
          this.editable.admin = 1
          this.switchMessage = 'Admin'
        }
      },
      selectPengguna() {
        if (this.pengguna == 'mahasiswa') {
          this.selectMahasiswa()
        } else if (this.pengguna == 'dosen') {
          this.selectOther(this.pengguna)
        } else if (this.pengguna == 'teknisi') {
          this.selectOther(this.pengguna)
        } else if (this.pengguna == 'semua') {
          this.all()
        }
      },

      selectProdi() {
        if (this.prodi == 'none' ||
          this.prodi == 'Teknik Listrik' ||
          this.prodi == 'Teknik Elektronika' ||
          this.prodi == 'Teknik Informatika') {
          this.selectMahasiswa()
        }
      },

      selectMahasiswa() {
        axios.get(this.url + 'mahasiswa', {
          params: {
            prodi: this.prodi
          },
          headers: {
            'Authorization': localStorage.getItem("api_key")
          }
        }).then((response) => {
          this.result = response.data.result

          this.isMahasiswa = true
          this.isOther = false
          this.isAll = false
          console.log(this.result)
        }).catch((error) => {
          console.log(error)
        })
      },

      selectOther(pengguna) {
        axios.get(this.url + pengguna, {
          headers: {
            'Authorization': localStorage.getItem("api_key")
          }
        }).then((response) => {
          this.result = response.data.result

          this.isMahasiswa = false
          this.isOther = true
          this.isAll = false
          this.prodi = 'none'
          console.log(this.result)
        }).catch((error) => {
          console.log(error)
        })
      },

      tambahSelect() {
        if (this.tambah.role == "Mahasiswa") {
          this.tambahMahasiswa = true
        } else if (this.tambah.role == "Dosen" || this.tambah.role == "Teknisi") {
          this.tambahMahasiswa = false
        }
      },

      all() {
        axios.get(this.url + 'pengguna', {
          headers: {
            'Authorization': localStorage.getItem("api_key")
          }
        }).then((response) => {
          this.result = response.data.result

          this.isMahasiswa = false
          this.isOther = false
          this.isAll = true
          this.prodi = 'none'
          console.log(this.result)
        }).catch((error) => {
          console.log(error)
        })
      },

      openDialog(ref) {
        this.$refs[ref].open()
      },

      editDialog(ref, val) {
        axios.get(this.url + 'pengguna/edit', {
          params: {
            'no_induk': val
          },
          headers: {
            'Authorization': localStorage.getItem('api_key')
          }
        }).then((response) => {
          this.editable = response.data.result[0]
          if (this.editable.role == "Mahasiswa") {
            this.editMahasiswa = true
          } else {
            this.editMahasiswa = false
          }
          this.editable.password = ''
          this.$refs[ref].open()
        }).catch((error) => {
          console.log(error)
        })
      },

      hapusDialog(ref, nama, no_induk) {
        this.no_induk = no_induk
        this.nama = nama
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
            this.tambah = []
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

      hapus(ref) {
        axios.post(this.url + 'pengguna/hapus', querystring.stringify({
          no_induk: this.no_induk
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