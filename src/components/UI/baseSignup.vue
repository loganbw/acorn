<template>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <div class="contain">
    <div>
      <img class="loginImg" src="../../assets/Greatball_Frame.svg" name="greatball" />
      <div>
        <form class="formContain" @submit.prevent="signupWithPassword(this)">
          <div class="formInputs">
            <input
              type="text"
              placeholder="username"
              id="username"
              name="username"
              class="inputForm"
              v-model="email"
            />
            <div class="passwords">
              <input
                type="password"
                placeholder="password"
                id="pwd"
                name="pwd"
                class="inputForm"
                v-model="password"
              />
              <input
                type="password"
                placeholder="confirm password"
                id="pwdConfirm"
                name="pwdConfirm"
                class="inputForm"
                v-model="passwordConfirm"
              />
            </div>
          </div>
          <div class="formLogin">
            <input type="submit" value="Submit" class="inputButton" />
          </div>
        </form>
      </div>
      <div class="signupBlock">
        <span> <a @click="forgotPassword()">Forgot your password?</a></span>
        <span> <a @click="$emit('isSignupFlip', false)">Have an Account?</a></span>
      </div>
    </div>
  </div>
</template>
<script>
import createUser from "../../index.js";
  export default {
    emits: ["isSignupFlip"],
    data() {
      return {
        isSignup: false,
        email: "",
        password: "",
        passwordConfirm: "",
      };
    },
    methods: {
      forgotPassword() {
        alert("need module for password recovery")
        return;
      },
      //these alerts need to be a modal instead or a tiny error message under the pokeball
      signupWithPassword(form) {
        if (this.email == "") {
          alert("Error: email cannot be blank!");
          form.email.focus();
          return false;
        }
        if (this.password !== this.passwordConfirm) {
          alert("Passwords do not match");
          return;
        }
        if (this.password.match(/[a-z]/g) && this.password.match(/[A-Z]/g) && this.password.match(/[0-9]/g) && 
                this.password.match(/[^a-zA-Z\d]/g) && this.password.length >= 8)
            {
                createUser(this.email,this.password)
                return alert("created")
            }
            else{
              alert("Invaild Password, Password must contain at least 8 characters, including at least one uppercase letter and one lowercase letter, one special character, and one number.")
            }
        //maybe adding a email checker? like verify-email.org api
      },
    },
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
  .passwords {
    display: flex;
    width: 81%;
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .formLogin {
    margin-top: 40px;
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

  /* */
</style>
