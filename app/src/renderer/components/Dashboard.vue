<template>
    <div>
        <div :class="{overlay: isOverlayActive}" @click="closeNav()"></div>
        <md-whiteframe class="nav md-fixed" :class="{navShow: isActive}" md-elevation="2">
            <md-toolbar class="md-accent md-large">
                <md-list class="md-double-line profile">
                    <md-list-item>
                        <md-avatar>
                            <img src="https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/18622582_440832172944602_4117587934646525141_n.jpg?oh=cf552b0e9101dea63c1d391d456af1ae&oe=59D60496"
                                alt="People">
                        </md-avatar>

                        <div class="md-list-text-container">
                            <span>{{result.nama_lengkap}}</span>
                            <span>{{role}}</span>
                        </div>

                        <md-menu md-size="3" md-align-trigger md-direction="bottom left" style="width: 40px">
                            <md-button md-menu-trigger class="md-icon-button md-list-action">
                                <md-icon style="color: #FFF">more_vert</md-icon>
                            </md-button>

                            <md-menu-content style="">
                                <md-menu-item @click.native="openDialog('gantiPassword')">Ganti Password</md-menu-item>
                                <md-menu-item @click.native="openDialog('keluar')">Keluar</md-menu-item>
                            </md-menu-content>
                        </md-menu>
                    </md-list-item>
                </md-list>
            </md-toolbar>
            <md-list class="">
                <!-- <md-list-item>
                    <router-link to="/dashboard/laporan" @click.native="closeNav()">
                        <md-icon>assignment</md-icon><span>Laporan</span>
                    </router-link>
                </md-list-item> -->
                <md-list-item>
                    <router-link to="/dashboard/user" @click.native="closeNav()">
                        <md-icon>person</md-icon><span>Pengguna</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to="/dashboard/barang" @click.native="closeNav()">
                        <md-icon>devices_other</md-icon><span>Barang</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to="/dashboard/peminjaman" @click.native="closeNav()">
                        <md-icon>cached</md-icon><span>Peminjaman</span>
                    </router-link>
                </md-list-item>
                <!-- <md-list-item>
                    <router-link to="/dashboard/perawatan" @click.native="closeNav()">
                        <md-icon>build</md-icon><span>Perawatan</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to="/dashboard/jadwal" @click.native="closeNav()">
                        <md-icon>schedule</md-icon><span>Jadwal</span>
                    </router-link>
                </md-list-item> -->
            </md-list>
        </md-whiteframe>
        <main>
            <md-whiteframe md-tag="md-toolbar">
                <md-button class="menu md-icon-button" @click.native="openNav()">
                    <md-icon>menu</md-icon>
                </md-button>
                <h2 class="md-title" style="flex: 1">Dashboard</h2>
            </md-whiteframe>
            <div class="content">
                <router-view></router-view>
            </div>
        </main>
        <md-dialog md-open-from="#gantiPassword" md-close-to="#gantiPassword" ref="gantiPassword">
            <md-dialog-title>Ganti Password</md-dialog-title>

            <md-dialog-content>
                <md-theme md-name="field">
                    <md-input-container md-has-password>
                        <label>Password lama</label>
                        <md-input type="password" v-model="password_lama"></md-input>
                    </md-input-container>
                    <md-input-container md-has-password>
                        <label>Password baru</label>
                        <md-input type="password" v-model="password_baru"></md-input>
                    </md-input-container>
                </md-theme>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="closeDialog('gantiPassword')">Batal</md-button>
                <md-button class="md-primary" @click="gantiPassword('gantiPassword')">Ganti</md-button>
            </md-dialog-actions>
        </md-dialog>
        <md-dialog md-open-from="#keluar" md-close-to="#keluar" ref="keluar">
            <md-dialog-title>Keluar</md-dialog-title>

            <md-dialog-content>
                Anda yakin ingin keluar dari aplikasi ini ?
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="closeDialog('keluar')">Tidak</md-button>
                <md-button class="md-primary" @click="signOut()">Ya</md-button>
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
                isOverlayActive: false,
                isActive: true,
                result: [],
                role: '',
                password_lama: '',
                password_baru: '',
                message: ''
            }
        },
        created() {
            window.addEventListener("resize", () => {
                if (window.outerWidth > 1024) {
                    this.isOverlayActive = false
                    this.isActive = true
                }
            })
            axios.get(this.url+'profil', {
                params: {
                    api_key: localStorage.getItem("api_key")
                },
                headers: {
                    'Authorization': localStorage.getItem("api_key")
                }
            }).then((response) => {
                this.result = response.data.result[0]
                if (this.result.admin == 1) {
                    this.role = 'Administrator'
                } else {
                    if (this.result.role == 'Teknisi') {
                        this.role = this.result.role
                        console.log(this.role)
                    }
                }
                console.log(this.result)
            }).catch((error) => {
                console.log(error)
            })

        },
        methods: {
            closeNav() {
                this.isOverlayActive = false
                this.isActive = true

            },
            openNav() {
                this.isOverlayActive = true
                this.isActive = false
            },
            signOut() {
                this.$router.push('/')
            },
            openDialog(ref) {
                this.$refs[ref].open()
            },

            closeDialog(ref) {
                this.password_baru = ''
                this.password_lama = ''
                this.$refs[ref].close()
            },
            gantiPassword(ref) {                
                axios.post(this.url+'ganti-password', querystring.stringify(
                    {
                        api_key: localStorage.getItem("api_key") ,
                        password_lama: this.password_lama ,
                        password_baru: this.password_baru,
                    }),
                    {
                        headers: {
                            'Authorization': localStorage.getItem("api_key")
                        }
                    }).then((response) => {
                    if (response.data.error == false) {
                        this.message = response.data.status
                        this.password_baru = ''
                        this.password_lama = ''
                        this.$refs.snackbar.open()
                        this.$refs[ref].close()
                    } else {
                        this.message = response.data.status
                        this.password_baru = ''
                        this.password_lama = ''
                        this.$refs.snackbar.open()
                        this.$refs[ref].close()
                    }
                }).catch((error) => {
                    console.log(error)
                    this.message = error
                    this.password_baru = ''
                    this.password_lama = ''
                    this.$refs.snackbar.open()
                    this.$refs[ref].close()
                })
            }
        }
    }
</script>

<style scoped>
    .content {
        height: 100%;
        padding: 16px 16px 100px 16px;
        overflow-y: auto;
        position: relative;
    }

    .profile {
        background-color: rgba(0, 0, 0, 0.2)!important;
        margin-top: 80px;
        color: #FFF!important;
    }

    .overlay {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }

    main {
        background-color: #eeeeee;
        height: 100%;
        width: 100%;
        position: absolute;
        padding-left: 0px;
        transition: all 0.15s ease-in-out;
    }

    .nav {
        position: absolute;
        z-index: 20;
        width: 280px;
        height: 100%;
        background-color: #FFF;
        transition: all 0.15s ease-in-out;
    }

    .navShow {
        transform: translateX(-100%);
    }

    @media all and (min-width: 1024px) {
        .nav {
            transform: translateX(0);
        }
        main {
            padding-left: 280px;
        }
        .menu {
            display: none;
        }
    }
</style>