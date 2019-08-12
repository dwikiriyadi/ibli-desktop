<template>
    <div>
        <div class="overlay" @click="close()"></div>
    </div>
</template>

<script>
    export default {
        props: ['to'],
        methods: {
            close() {
                this.$router.push(this.to)
            }
        }
    }    
</script>

<style scoped>
    .overlay {
        background-color: rgba(0,0,0,0.5); 
        width: 100%; 
        height:100%; 
        position:absolute;
        z-index:10
    }
</style>