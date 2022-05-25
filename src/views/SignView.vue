<template>
  <div>
    <BaseSignup />
  </div>
</template>
<script>
  import BaseSignup from "../components/UI/baseSignup.vue";

  export default {
    components: { BaseSignup },
    data() {
      return {
        isSignup: false,
      };
    },
    methods: {},
  };
</script>
<style scoped></style>
