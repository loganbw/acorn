<template>
  <div v-if="isSignup" >
    <BaseSignup/>
  </div>
  <div v-else>
    <BaseLogin/>
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
        isSignup: true
      }
    }
   
  };
</script>
<style scoped></style>
