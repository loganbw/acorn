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
          <img class="avatar" :src="getAvatarImg" />
          <div class="avatarEdit">
            <label class="editPen" for="photo">Change</label>
            <input type="file" class="uploadFile" id="photo" @change="getFile" />
          </div>
        </div>
        <form @submit.prevent="changeUserName">
          <input
            v-if="edit"
            type="text"
            autofocus
            @focusout="edit = false"
            ref="input"
            placeholder="User Name"
            v-model="userName"
            name="uName"
          />
          <div  class="formEdits" v-else>
            <button @click="changeToEdit" id="uName" class="editButton"></button>
            <label for="uName"> {{ displayUser }}</label>
            <img class="editSvg" src="../assets/pencil.svg" />
          </div>
        </form>
      </div>
      <div class="deckcontain">
        <h3>Decks</h3>
        <ul class="decks">
          <li class="deck" v-for="deck in getDecks">
            <span @click="deleteDeck">{{ deck.deckName }}</span>
            <img src="" />
            <img class="exitSvg" src="../assets/exit.svg" @click="deleteDeck(deck)" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  /*
  BUGS : 
    - the v-if to display needs to be fixed
  */
  import BaseHeader from "../components/UI/baseHeader.vue";
  import { getAllUsersDecks, deleteUserDeck, uploadImgFirebase, getAvatar } from "../index.js";
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
        userName: "",
        imgFile: null,
      };
    },
    methods: {
      deleteDeck(deck) {
        deleteUserDeck(this.$store.getters.getUserData.data.uid, deck);
      },
      uploadImg() {
        this.$store.dispatch("fetchIsLoading", true);
        uploadImgFirebase(this.imgFile);
      },
       changeToEdit() {
        
         console.log(this.$refs)
        return (this.edit = !this.edit);
      },
    },

    computed: {
      getAvatarImg() {
        return this.$store.getters.getAvatar;
      },
      getUserName() {
        //dispatch store value to set it to username
      },
      getDecks() {
        return this.$store.getters.getAllUsersDecks;
        //getAllUsersDecks(this.$store.getters.getUserData.data.uid);
      },
     
      displayUser() {
        if (this.userName == "") return "User Name";
        else return this.userName;
      },

      changeUserName() {
        //call to change u-name
        console.log(this.userName);
        this.edit = !this.edit;
      },
      getFile() {
        this.imgFile = event.target.files[0];
        console.log(this.imgFile);
        if (
          this.imgFile.name.includes(".png") ||
          this.imgFile.name.includes(".jpg") ||
          this.imgFile.name.includes(".jpeg")
        ) {
          this.uploadImg();
        }
      },
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
    margin-top: 25%;
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
  .editButton{
    visibility: hidden;
    position: absolute;
    width: 80%;
    height: 20px;
    z-index: 2;
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
    text-align: center;
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
  .exitSvg {
    width: 20%;
    color: #c90e0e;
  }
  .uploadFile {
    visibility: hidden;
    width: 20%;
  }
  .uploadButton {
    visibility: hidden;
  }
</style>
