<template>
    <div v-if="visible">
        <md-whiteframe class="whiteframe" md-elevation="2">
            <div class="title">
                <span class="md-title">Masukkan Barang</span>
            </div>
            <center>
                <div style="display: block;margin-bottom: 10px">
                    <scanner @scan="hasil"></scanner>
                </div>
                <md-button class="md-raised" @click.native="close()">Batal</md-button>
            </center>
        </md-whiteframe>
    </div>
</template>
<script>
    import Scanner from './Scanner.vue'
    export default {
        data() {
            return {
                kodeBarang: '',
            }
        },
        props: {
            nim: {
                type: String,
                required: true
            },
            visible: {
                required: true,
                type: Boolean,
                default: false
            },
        },
        methods: {
            close() {
                this.$router.push('/')
            },
            // finish() {
            //     // this.$router.push('/dashboard')
            //     this.$emit('finish', this.kodeBarang)
            //     this.kodeBarang = ''
            // },
            hasil(value) {
                this.kodeBarang = value
                console.log(value)
                this.$emit('finish', this.kodeBarang)
                this.kodeBarang = ''
            }
        },
        components: {
            'scanner': Scanner,
        }
    }
</script>
<style scoped>
    .whiteframe {
        top: 50%;
        left: 50%;
        position: absolute;
        width: 500px;
        transform: translate(-50%, -50%);
        z-index: 20;
        padding: 16px;
        background-color: #FFF
    }

    .title {
        margin-bottom: 16px;
    }
</style>