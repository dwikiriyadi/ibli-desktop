<template>
    <img :src="img" style="width: 200px">
</template>
<script>
    import qrcode from 'qrcode-js'
    export default {
        props: {
            val: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                img: ''
            }
        },
        created () {
            this.img = qrcode.toDataURL(this.val, 4)
        }
    }
</script>
<style>

</style>