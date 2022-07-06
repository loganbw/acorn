<template>
  <div class="header">
    <div class="title">
      <h2>PokéVue</h2>
    </div>
    <div class="rightContain">
      <router-link :to="{ name: 'Play' }">Play</router-link>
      <router-link :to="{ name: 'Deck' }">Deck Builder</router-link>
      <router-link :to="{ name: 'Account' }">Account</router-link>
      <router-link @click="logout" :to="{ name: 'home' }">Logout</router-link>
    </div>
  </div>
</template>
<script>
  import { signOutUser } from "../../index.js";
  export default {
    methods: {
      logout() {
        signOutUser();
      },
    },
  };
</script>
<style scoped>
  .divRoute {
    width: 85%;
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0% 0% 1% 0%;
    background-image: linear-gradient(-60deg, rgb(39 39 39) 62%, #ededed 62%);
    z-index: 2;
  }
  .bgStripe {
    position: absolute;
    background-image: linear-gradient(49deg, rgb(240 231 231) 62%, #fec10b 62%);
    z-index: 2;
    height: 101%;
    width: 40%;
    left: 12%;
  }
  .bgStripe2 {
    position: absolute;
    background-image: linear-gradient(49deg, rgb(240 231 231) 62%, #fec10b 62%);
    z-index: 2;
    height: 101%;
    width: 40%;
    left: 12%;
  }
  .rightContain {
    display: flex;
    align-items: center;
    margin-right: 2%;
    width: 25%;
    text-align: center;
  }
  img {
    transform: rotate(90deg);
    height: 80px;
    width: 80px;
  }
  img:hover {
    content: url("../../assets/Pokedex_Icon_Open.svg");
    height: 100px;
    width: 100px;
  }
  a {
    margin: 2%;
    text-decoration: none;
    font-weight: bold;
  }
  .title {
    margin-left: 1%;
    text-align: center;
    padding-bottom: 1%;
    color: #fec10b;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
  .routeNav {
    width: 85% !important;
  }
</style>
