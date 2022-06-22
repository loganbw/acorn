<template>
  <BaseHeader />
  <loading
    class="load"
    v-model:active="this.$store.getters.getIsLoading"
    :can-cancel="false"
  ></loading>
  <div class="contain">
    <div class="containAccount">
      <div class="account">
        <div class="imgContainer">
          <img class="avatar" src="../assets/defaultAvatar.svg" />
          <div class="avatarEdit">
            <img class="editPen" src="../assets/pencil.svg" />
          </div>
        </div>
        <form>
          <input v-if="edit" type="text" name="uName" />
          <div class="formEdits" v-else>
            <label for="uName"> User Name</label>
            <img class="editSvg" src="../assets/pencil.svg" />
          </div>
        </form>
      </div>
      <div class="deckcontain">
        <h3>Decks</h3>
        <ul class="decks">
          <li class="deck" v-for="deck in getDecks">
            <span>{{deck.deckName}}</span>
            <img src="" />
            <img src="" />
          </li>
        </ul>
        
      </div>
    </div>
  </div>
</template>
<script>
  import BaseHeader from "../components/UI/baseHeader.vue";
  import { getAllUsersDecks } from "../index.js";
  import VueLoading from "vue-loading-overlay";
  export default {
    components: { BaseHeader, Loading: VueLoading },
    beforeCreate() {
      //this.$store.dispatch("fetchIsLoading", true);
    },
    mounted() {
     
      this.$store.dispatch("fetchIsLoading", true);
       //getAllUsersDecks(this.$store.getters.getUserData.data.uid);
    },
    data() {
      return {
        edit: false,
        
      };
    },
  
    computed: {
       getDecks(){
        return  this.$store.getters.getAllUsersDecks
        //getAllUsersDecks(this.$store.getters.getUserData.data.uid);
       }
    },
  };
</script>
<style scoped>
  .avatar {
    border-radius: 50%;
    width: 40%;
    margin: 2%;
  }
  .imgContainer {
    display: contents;
    justify-content: center;

    width: 50%;
  }
  .imgContainer:hover .avatar {
    opacity: 0.3;
  }

  .imgContainer:hover .avatarEdit {
    opacity: 1;
  }
  .editPen {
    width: 80%;
  }
  .account {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    margin-top: 5%;
  }
  .avatarEdit {
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }
  .formEdits {
    display: flex;
    justify-content: center;
  }
  .containAccount {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    background-color: rgb(39 39 39);
    width: 30%;
    height: 500px;
    border-radius: 2%;
    margin-top: 3%;
  }
  .contain {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .deckContain {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
  }
  li {
    list-style: none;
  }
  ul {
    padding: 0%;
  }
  .editSvg {
    width: 10%;
    margin-left: 2%;
  }
</style>
