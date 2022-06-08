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
      <ul>
        <li v-for="(card, index) in cardsLoaded" :key="index">
            {{card}}
        </li>
      </ul>
    </div>
    <div class="deckContain"></div>
  </div>
</template>
<script>
  import BaseHeader from "../components/UI/baseHeader.vue";
  import store from "../store/index";
  import VueLoading from "vue-loading-overlay";
  export default {
    components: { BaseHeader, Loading: VueLoading, },
    data(){
        return{
            
            cardsLength: 8
        }
    },
    beforeCreate() {
        store.dispatch("fetchIsLoading", true);
    },
    mounted() {
      store.dispatch("fetchSearchPokemon");
      this.$store.getters.Get_All_Pokemon;
    
    },
    methods: {
      loadMore() {
        if (this.length > this.$store.getters.getCarddbLength) return;
        this.length = this.length + 8;
      },
    },
    computed: {
      cardsLoaded() {
        if(this.$store.getters.getIsLoading) return;
        return this.$store.getters.Get_All_Pokemon.slice(0, this.cardsLength);
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
</style>
