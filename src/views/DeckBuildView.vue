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
            <img
              class="cardImg"
              @click="testCard(card)"
              :src="card.images.large"
              name="pokemon card img"
            />
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
          <img :src="returnDeckImage" />
          <div class="deckButtons">
            <button></button>
            <button></button>
          </div>
        </div>
        <div class="deckCards">
          <span>Pokemon</span>
          <ul class="pokemon">
            <li  v-for="(card, index) in deckPokemon" @mouseover="deckImageChange(card)" :key="index">
                {{card.name}}
            </li>
          </ul>
          <span>Trainer</span>
          <ul class="trainer">
            <li  v-for="(card, index) in deckTrainer" :key="index">
              {{card.name}}
            </li>
          </ul>
          <span>Energy</span>
          <ul class="energy">
            <li  v-for="(card, index) in deckEnergy" :key="index">
              {{card.name}}
            </li>
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
        cardFormats: ["standard", "Expanded", "Unlimted"],
        cardType: ["Pokemon", "Trainer", "Energy"],
        cardColor: [
          "Fire",
          "Figthing",
          "Normal",
          "Psychic",
          "Dark",
          "Electric",
          "Fairy",
          "Water",
          "Metal",
          "Grass",
        ],
        searchedPokemon: { name: "", format: "", cardType: "" },
        deck: { deckName: "deckName", cards: [] },
        deckEnergy:[],
        deckPokemon:[],
        deckTrainer:[],
        deckImage: '',
        cardEnergy: [
          "Fire Energy",
          "Figthing Energy",
          "Normal Energy",
          "Psychic Energy",
          "Dark Energy",
          "Electric Energy",
          "Fairy Energy",
          "Water Energy",
          "Metal Energy",
          "Grass Energy",
        ],
      };
    },
    beforeCreate() {
      store.dispatch("fetchIsLoading", true);
    },
    mounted() {
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
      searchPokemon() {
        console.log(this.searchedPokemon);
        return store.dispatch("fetchSearchPokemon", this.searchedPokemon);
      },
      testCard(card) {
        //add checks for building deck here
        for (let index = 0; index < this.cardEnergy.length; index++) {
          if (card.name == this.cardEnergy[index]) {
            this.deck.cards.push(card);
            this.deckEnergy.push(card);
            return;
          }
          
        }
       
        
        this.checkForCardDup(card);
        console.log(this.deck);
        //check for 4 limit card
        //need to have a if for energy
      },
      deckImageChange(card){
        console.log(card.images.large);
        this.deckImage = card.images.small;
        
      },
      checkForCardDup(card) {
        let cardName = [];
        for (let index = 0; index < this.deck.cards.length; index++) {
          if (this.deck.cards[index].name == card.name) {
            console.log("If check " + this.deck.cards[index].name);
            if (cardName.length < 3) {
              cardName.push(this.deck.cards[index].name);
              console.log(cardName.length);
            } else {
              alert("Max of 4");
              return;
            }
          }
        }
        this.deck.cards.push(card);
        if(card.supertype == "Trainer")
        {
          this.deckTrainer.push(card)
        }
        if(card.supertype == "Pokémon")
        {
          this.deckPokemon.push(card)
        }
      },
    },
    computed: {
      cardsLoaded() {
        if (this.$store.getters.getIsLoading) return;
        console.log("IsLoading");
        return this.$store.getters.getAllCards.slice(0, this.cardsLength);
      },
      returnDeckImage(){
        console.log(this)
        return this.deckImage;
      }
    
    },
  watch:{
    deckImage(){
      return this.deckImage
    }
  }
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
    align-items: center;
    justify-content: center;
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
  .searchContain {
    display: flex;
    justify-content: center;
  }
</style>
