<template>
    <div v-if="visible">
        <md-whiteframe class="whiteframe" md-elevation="2">
            <div class="title">
                <span class="md-title">Masukkan Nim</span>
            </div>
            <div style="padding:0 24px">
                <md-theme md-name="field">
                    <md-input-container class="md-accent">
                        <label>Nim</label>
                        <md-input v-model="nim"></md-input>
                    </md-input-container>
                </md-theme>
            </div>
            <div style="float:right">
                <md-button class="md-raised" @click.native="close()">Batal</md-button>
                <md-button class="md-raised md-accent" @click.native="next()">Lanjut</md-button>
            </div>
        </md-whiteframe>
    </div>
</template>
<script>
    import Scanner from './Scanner.vue'
    export default {
        data() {
            return {
                nim: '',
            }
        },
        props: {
            visible: {
                required: true,
                type: Boolean,
                default: true
            }
        },
        methods: {
            close() {
                this.$router.push('/')
            },
            next() {
                // this.$router.push('/dashboard')
                this.$emit('finish', this.nim)
                this.nim = ''
            },
            hasil(value) {
                this.nim = value
                this.$emit('finish', this.nim)
                this.nim = ''
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
        padding: 0;
        background-color: #FFF
    }

    .title {
        margin: 16px;
    }
</style>