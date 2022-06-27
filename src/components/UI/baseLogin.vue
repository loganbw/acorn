<template>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <loading
    class="load"
    v-model:active="this.$store.getters.getIsLoading"
    :can-cancel="false"
  ></loading>
  <div class="contain">
    <div>
      <img class="loginImg" src="../../assets/Pokeball_Frame.svg" name="pokeball" />
      <div>
        <form class="formContain" @submit.prevent="loginUser">
          <div class="formInputs">
            <input
              type="text"
              placeholder="username"
              id="email"
              name="email"
              class="inputForm"
              v-model="email"
            />
            <input
              type="password"
              v-model="password"
              placeholder="password"
              id="pwd"
              name="pwd"
              class="inputForm"
            />
          </div>
          <div class="formLogin">
            <input type="submit" value="Submit" class="inputButton" />
          </div>
        </form>
      </div>
      <div class="signupBlock">
        <span>Don't have an account?</span>
        <span> <a @click="routeSign">Sign Up</a> </span>
      </div>
    </div>
  </div>
</template>
<script>
  import { signInUser } from "../../index.js";
  import VueLoading from "vue-loading-overlay";
  import store from "../../store/index.js";
  export default {
    data() {
      return {
        isSignup: false,
        email: "",
        password: "",
      };
    },
    methods: {},
    components: {
      Loading: VueLoading,
    },
    computed: {
      isSignupFlip(flag) {
        return (flag = true);
      },
      routeSign() {
        this.$router.push({ name: "Signup" });
      },
      loginUser() {
        store.dispatch("fetchIsLoading", true);
        signInUser(this.email, this.password);
      },
    },
    emits: ["isSignupFlip"],
  };
</script>
<style scoped>
  .inputForm {
    background-color: #fec10b;
    margin: 1%;
    width: 80%;
    border-radius: 2%;
  }
  .inputForm:hover {
    background-color: #e5ad07;
  }
  .inputButton {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1%;
    border-radius: 50%;
    background-color: #faffff;
    color: #000;
    font-size: 12px;
  }
  .inputButton:hover {
    background-color: #eff4f4;
  }
  .inputButton:active {
    background-color: #fec10b;
  }
  .loginImg {
    height: 400px;
    margin-top: 20%;
  }
  .contain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
  }
  .formContain {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: center;
    align-items: center;
    margin-top: -80%;
  }
  .formInputs {
    margin-top: -10% !important ;
  }
  .formLogin {
    margin-top: 10%;
  }

  .energyImg {
    height: 30px;
    width: 30px;
  }

  .bg {
    animation: slide 6s ease-in-out infinite alternate;
    background-image: linear-gradient(-60deg, rgb(24 24 24) 50%, #343435 50%);
    bottom: 0;
    left: -50%;
    opacity: 0.5;
    position: fixed;
    right: -50%;
    top: 0;
    z-index: -1;
  }

  .bg2 {
    animation-direction: alternate-reverse;
    animation-duration: 5s;
  }

  .bg3 {
    animation-duration: 6s;
  }
  @keyframes slide {
    0% {
      transform: translateX(-25%);
    }
    100% {
      transform: translateX(25%);
    }
  }

  .signupBlock {
    display: flex;
    color: #000;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 15%;
  }
  .load {
    position: relative;
    /* margin-top: -10%; */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100%;
    bottom: 0;
    opacity: 0.16;
    position: fixed;
    top: 0;

    z-index: 1;
  }

  /* */
</style>
