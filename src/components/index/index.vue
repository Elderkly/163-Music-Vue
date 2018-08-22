<template>
    <div>
        首页
    </div>
</template>

<script>
export default {
    created(){
      
    },
    methods:{
      jump(){
        this.$router.push({path:'/login'})
      }
    }

}
</script>

<style lang="stylus">

</style>
