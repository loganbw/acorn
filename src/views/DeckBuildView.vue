<template>
  <BaseHeader />
  <loading
    class="load"
    v-model:active="this.$store.getters.getIsLoading"
    :can-cancel="false"
  ></loading>
  <div class="contain">
    <div class="searchContain">
      <form @submit.prevent="searchPokemon">
        <input v-model="searchedPokemon.name" placeholder="search pokemon" />
        <img src="../assets/filter.svg" />
      </form>
    </div>
    <div class="cardContain">
      <ul class="cardList">
        <li class="cardLi" v-for="(card, index) in cardsLoaded" :key="index">
          <div class="listDiv">
            <img class="cardImg" :src="card.images.large" name="pokemon card img" />
            <span class="cardName">{{ card.name }}</span>
          </div>
        </li>
      </ul>
      <div>
        <span @click="loadMore" class="loadMore">Load More</span>
      </div>
    </div>
    <div class="deckContain">
      <div>
        <div class="deckImg">
          <div class="deckName">
            <form>
              <label></label>
              <input placeholder="name deck" />
            </form>
          </div>
          <img src="" />
          <div class="deckButtons">
            <button></button>
            <button></button>
          </div>
        </div>
        <div class="deckCards">
          <ul class="pokemon">
            <li></li>
          </ul>
          <ul class="trainer">
            <li></li>
          </ul>
          <ul class="energy">
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BaseHeader from "../components/UI/baseHeader.vue";
  import store from "../store/index";
  import VueLoading from "vue-loading-overlay";
  export default {
    components: { BaseHeader, Loading: VueLoading },
    data() {
      return {
        cardsLength: 16,
        cardFormats: ["standard","Expanded","Unlimted"],
        searchedPokemon:{name: '', format: '', type: ''},
      };
    },
    beforeCreate() {
      store.dispatch("fetchIsLoading", true);
    },
    mounted() {
      //store.dispatch("fetchSearchPokemon");
      this.$store.getters.Get_All_Pokemon;
    },
    methods: {
      loadMore() {
        console.log("Loadmore Func " + this.$store.getters.getCarddbLength);
        if (this.cardsLength > this.$store.getters.getCarddbLength) return;
        console.log("Loaded");
        this.cardsLength = this.cardsLength + 8;
        console.log("cardsLength " + this.cardsLength);
      },
      searchPokemon()
      {
         console.log(this.searchedPokemon)
          return store.dispatch("fetchSearchPokemon", this.searchedPokemon);
      }
    },
    computed: {
      cardsLoaded() {
        if (this.$store.getters.getIsLoading) return;
        console.log("IsLoading"); 
        return this.$store.getters.getAllCards.slice(0, this.cardsLength);
      },
    },
  };
</script>
<style scoped>
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
  .cardContain {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cardList {
    display: flex;
    list-style: none;
    padding: 1%;
    flex-wrap: wrap;
  }
  .cardLi {
    margin: 1%;
    width: 10%;
  }
  .cardImg {
    width: 100%;
  }
  .listDiv {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .cardName {
  }
  .loadMore:hover {
    cursor: pointer;
  }
  .loadMore:active {
    color: rgb(158, 156, 156);
  }
</style>
