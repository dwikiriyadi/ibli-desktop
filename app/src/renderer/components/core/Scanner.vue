<template>
    <div>
        <video id="scanner" :width="this.width" height="this.height" autoplay></video>
    </div>
</template>
<script>
    import qrcode from 'jsqrcode-modules'
    export default {
        props: {
            width:{
                type: Number,
                default: 320
            },
            height:{
                type: Number,
                default: 240
            },
            mirror: {
                type: Boolean,
                default: true
            }
        },
        created(){
            qrcode.callback = (result) => {
                this.hasil = result
                this.$emit('scan', this.hasil)
                this.hasil = ''
            }
        },
        data(){
            return {
                hasil: '', 
            }
        },
        methods: {
            
        },
        mounted(){            
            qrcode.setWebcam("scanner")
        },
        beforeDestroy() {
            qrcode.destroyWebcam()
        }
    }
</script>
<style>
    canvas {
        display: none;
    }
    video {
        transform: scale(-1,1)
    }
</style>