<template>
    <div>
        <div class="index">
            <header>
                <div class="circle-top-right-mini"></div>
                <div class="circle-top-right"></div>
                <router-link to="/login" >
                <md-button class="md-fab md-raised md-accent fab-top-right">                    
                    <md-icon>person</md-icon>
                    <md-tooltip md-direction="left">Masuk</md-tooltip>
                </md-button>
                </router-link>
            </header>

            <main>
                <div style="margin: 24px">
                    <img :src="img" >
                </div>
                <center>
                    <router-link to="/pinjam">
                        <md-button class="md-raised md-accent" style="width:125px">Pinjam</md-button>
                    </router-link>
                    <router-link to="/kembalikan">
                        <md-button class="md-raised md-accent" style="width:125px">Kembalikan</md-button>
                    </router-link>
                </center>
            </main>

            <footer>
                <div class="circle-bottom-left-mini"></div>
                <div class="circle-bottom-left"></div>
                <md-button class="md-fab md-raised md-accent fab-left-bottom">
                    <md-icon>help</md-icon>
                    <md-tooltip md-direction="right">Bantuan</md-tooltip>
                </md-button>
                <router-link to="/about">
                <md-button class="md-fab md-raised md-accent fab-bottom-left">
                    <md-icon>info</md-icon>
                    <md-tooltip md-direction="right">Tentang Aplikasi</md-tooltip>
                </md-button>
                </router-link>
            </footer>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                img: require('../assets/img/logo1.png'),
            }
        },
        components: {

        }
    }
</script>

<style scoped>
    .index {
        background-color: #1565C0;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .circle-top-right-mini {
        background-color: #FFF;
        top:0;
        right:0;
        position: absolute;
        width: 25px;
        height: 25px;
        border-bottom-left-radius: 25px;
    }
    .circle-top-right {
        border-bottom: 5px solid #FFF;
        border-left: 5px solid #FFF;
        top:0;
        right:0;
        width: 65px;
        height: 65px;
        position: absolute;
        border-bottom-left-radius:65px;
    }
    .circle-bottom-left-mini {
        background-color: #FFF;
        bottom:0;
        left:0;
        position: absolute;
        width: 100px;
        height: 100px;
        border-top-right-radius: 100px;
    }
    .circle-bottom-left {
        border-top: 5px solid #FFF;
        border-right: 5px solid #FFF;
        bottom:0;
        left:0;
        width: 150px; 
        height: 150px;
        position: absolute;
        border-top-right-radius:150px;
    }
    .fab-top-right {
        position:absolute; 
        top:10px; 
        right: 10px
    }
    .fab-left-bottom {
        position:absolute; 
        bottom:100px; 
        left: 10px
    }
    .fab-bottom-left {
        position:absolute; 
        bottom:10px; 
        left: 100px
    }
    img{
        width: 350px
    }
    main {
        top:50%; 
        left:50%; 
        transform: translate(-50%,-50%);
        position:absolute;
    }
</style>