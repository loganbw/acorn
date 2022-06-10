<template>
  <BaseHeader />
  <loading
    class="load"
    v-model:active="this.$store.getters.getIsLoading"
    :can-cancel="false"
  ></loading>
  <div class="contain">
    <div class="searchContain"></div>
    <div class="cardContain">
      <ul class="cardList">
        <li class="cardLi" v-for="(card, index) in cardsLoaded" :key="index">
          <div class="listDiv">
            <img class="cardImg" :src="card.images.small" name="pokemon card img" />
            <span class="cardName">{{ card.name }}</span>
          </div>
        </li>
      </ul>
      <div>
        <button @click="loadMore" class="loadMore">Load More</button>
      </div>
    </div>
    <div class="deckContain"></div>
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
        console.log("Loadmore Func "  + this.$store.getters.getCarddbLength)
        if (this.cardsLength > this.$store.getters.getCarddbLength) return;
        console.log("Loaded")
        this.cardsLength = this.cardsLength + 8;
        console.log("cardsLength " + this.cardsLength)
      },
    },
    computed: {
      cardsLoaded() {
        if (this.$store.getters.getIsLoading) return;
        console.log("IsLoading")
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
  .loadMore:hover{
    cursor: pointer;
  }
  .loadMore:active{
    color:rgb(158, 156, 156)
  }
</style>
