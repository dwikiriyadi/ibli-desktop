<template>
    <div>
        <md-toolbar class="md-transparent">
            <md-button class="md-icon-button" @click.native="back()">
                <md-icon>arrow_back</md-icon>
            </md-button>

            <md-button class="md-icon-button" @click.native="print()">
                <md-icon>print</md-icon>
            </md-button>
        </md-toolbar>
        <div class="container">
            <div class="wrapper">
                <div class="list-item" v-for="row in data">
                    <div class="item" style="text-align:center">
                        <generator :val="row.kode_barang"></generator>
                        <span class="md-title" style="color: black">{{ row.kode_barang }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import qrcode from './core/Generate.vue'
    export default {
        created() {
            this.data = JSON.parse(localStorage.getItem("barang"))
            console.log(this.data)
        },
        data() {
            return {
                img: '',
                data: []
            }
        },
        components: {
            'generator': qrcode
        },
        methods: {
            back() {
                this.$router.push('/dashboard/barang')
            },
            print() {
                this.$electron.ipcRenderer.send('print')
            }
        }
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        position: relative;
    }

    .wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(200px, auto);
    }

    .list-item {
        margin-left: auto;
        margin-right: auto;
        width: 200px;
    }
    
    .item {
        width: 200px;
        text-align: center;
        display: block;
    }


</style>