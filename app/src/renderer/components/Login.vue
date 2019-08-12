<template>
    <div>
        <overlay to="/"></overlay>
         <md-whiteframe class="whiteframe" md-elevation="2">
            <div style="margin: 24px 0;">
                <span class="md-title">Masuk</span><br>
                <span class="md-body-1">untuk mengelola data</span>
            </div>
            <md-theme md-name="field">
            <md-input-container>
                <label>Username</label>
                <md-input v-model="username"></md-input>
            </md-input-container>
            <md-input-container md-has-password>
                <label>Password</label>
                <md-input type="password" v-model="password"></md-input>
            </md-input-container>
            </md-theme>
            <center>
                <md-button class="md-accent" @click.native = "close()">Batal</md-button>
                <md-button class="md-raised md-accent" @click.native = "signIn()">Masuk</md-button>
            </center>
        </md-whiteframe>
        <md-snackbar ref="snackbar" :md-duration="3000">
            <span>{{ message }}</span>
        </md-snackbar>
    </div>
</template>

<script>
    import axios from 'axios'
    import querystring from 'querystring'
    import Overlay from './core/Overlay.vue'
    export default {
        data() {
            return {
                url: 'http://localhost:8080/api/',
                username: '',
                password: '',
                message: '',
                result: []
            }
        },
        methods: {
            close() {
                this.$router.push('/')
            },
            signIn() {
                axios.post(this.url+'login', querystring.stringify({
                        username: this.username,
                        password: this.password
                })).then((response) => {
                    this.result = response.data

                    if (this.result.error != true){ 
                        if (this.result.admin == 1){
                            this.$router.push('/dashboard')
                            localStorage.setItem("api_key", this.result.api_key)
                            console.log(localStorage.getItem("api_key"))
                        } else if (this.result.admin == 0) {
                            this.message = "Hak akses tidak diberikan"
                            this.$refs.snackbar.open()
                        }                        
                    } else {
                        this.message = this.result.status
                        this.$refs.snackbar.open()
                    }
                }).catch((error) => {
                    this.message = error
                    this.$refs.snackbar.open()
                })                
            }
        },
        components: {
            'overlay': Overlay
        }
    }    
</script>

<style scoped>
   .whiteframe {
        top: 50%;
        left:50%;
        position:absolute;
        width: 400px;
        transform: translate(-50%,-50%);
        z-index: 20;
        padding: 24px 48px 48px 48px;
        background-color: #FFF
    }
</style>