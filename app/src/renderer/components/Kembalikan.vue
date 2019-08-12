<template>
    <div>
        <overlay></overlay>
        <inputNim :visible="vNim" @finish="getNim"></inputNim>
        <inputBarang :visible="vBarang" :nim="nim" @finish="getBarang"></inputBarang>
        <md-snackbar ref="snackbar" :md-duration="3000">
            <span>{{ message }}</span>
        </md-snackbar>
    </div>
</template>

<script>
    import Overlay from './core/Overlay.vue'
    import InputNim from './core/InputNim.vue'
    import InputBarang from './core/InputBarang.vue'
    import axios from 'axios'
    import querystring from 'querystring'
    export default {
        data() {
            return{
                url: 'http://localhost:8080/api/',
                nim: '',
                kodeBarang: '',
                message: '',                
                vNim: true,
                vBarang: false
            }
        },
        methods: {
            getNim(value){
                this.nim = value
                console.log(this.nim)
                this.vNim = !this.vNim
                this.vBarang = !this.vBarang
            },
            getBarang(value){
                this.kodeBarang = value
                axios.post(this.url+'peminjaman/edit', querystring.stringify({
                    'no_induk': this.nim,
                    'kode_barang' : this.kodeBarang
                })).then((response) => {   
                    if(response.data.error == false) {
                        this.vNim = !this.vNim
                        this.vBarang = !this.vBarang
                        this.$router.push('/')
                    } else { 
                        this.message = response.data.status
                        this.$refs.snackbar.open()
                    }
                }).catch((error) => {
                    this.message = error
                    this.$refs.snackbar.open()
                }) 
            }
        },
        components: {
            'overlay': Overlay,
            'inputNim': InputNim,
            'inputBarang': InputBarang
        }
    }    
</script>

<style scoped>
   
</style>