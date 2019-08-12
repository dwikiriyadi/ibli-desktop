<template>
    <div>
        <overlay></overlay>
        <md-whiteframe class="whiteframe" md-elevation="2">
            <center>
                <div style="padding: 24px">
                    <img :src="img" width="100px">
                </div>
                <div>
                    <span class="md-title">IBLI</span><br/>
                    <span class="md-subheading">(Inventaris Barang Laboratorium Informatika)</span><br/>
                    <span class="md-body-1">Version 1.0.0 <br/><b>Repository:</b> https://github.com/Alucrad/ibli/tree/master/desktop-apps</span>
                </div>
                <md-button class="md-raised md-accent" @click.native = "close()">Tutup</md-button>
            </center>
        </md-whiteframe>
    </div>
</template>

<script>
    import Overlay from './core/Overlay.vue'
    export default {
        data() {
            return {
                img: require('../assets/img/icon.png',)
            }
        },
        methods: {
            close() {
                this.$router.push('/')
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
        width: 500px;
        transform: translate(-50%,-50%);
        z-index: 20;
        padding: 0 16px 24px 16px;
        background-color: #FFF
    }
</style>