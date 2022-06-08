<template>
  <BaseHeader />
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
  export default {
    components: { BaseHeader },
    data(){
        return{
            
            cardsLength: 8
        }
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
        return this.$store.getters.Get_All_Pokemon.slice(0, this.cardsLength);
      },
    },
  };
</script>
<style scoped></style>
