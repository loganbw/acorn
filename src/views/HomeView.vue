<template>
  <div v-if="isSignup" >
    <BaseSignup @is-signup-flip="isSignupFlip"/>
  </div>
  <div v-else>
    <BaseLogin @is-signup-flip="isSignupFlip"/>
  </div>

</template>
<script>
 import BaseLogin from "../components/UI/baseLogin.vue"
 import BaseSignup from "../components/UI/baseSignup.vue"

  export default {
    components: {BaseLogin, BaseSignup},
    data()
    {
      return{
        isSignup: false
      }
    },
    methods:{
      isSignupFlip(bool){
        if(bool == true)
        {
          return this.isSignup = true
        }
        else{
          return this.isSignup = false
        }
      }
    }
   
  };
</script>
<style scoped></style>
