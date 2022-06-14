<template>
   <BaseLogin />
</template>
<script>
 import BaseLogin from "../components/UI/baseLogin.vue"

  export default {
    components: {BaseLogin},
    data()
    {
      return{
        isSignup: false
      }
    },
    methods:{
       
    },
    mounted(){
      console.log(this.$router)
    }
   
  };
</script>
<style scoped></style>
