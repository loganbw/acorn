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
        <select v-model="searchedPokemon.format" name="format" id="formats">
          <option value="" disabled selected>filter by format</option>
            <option v-for="format in cardFormats" :value="format">{{format}}</option>
        </select>
         <select v-model="searchedPokemon.color" name="color" id="colors">
           <option value="" disabled selected>filter by color</option>
            <option v-for="color  in cardColor" :value="color">{{color}}</option>
        </select>
        <select v-model="searchedPokemon.typ" name="typ" id="typs">
          <option value="" disabled selected>filter by type</option>
            <option v-for="typ  in cardType " :value="typ">{{typ}}</option>
        </select>
        <button type="submit">search</button>
      </form>
    </div>
    <div class="cardContain">
      <ul class="cardList">
        <li class="cardLi" v-for="(card, index) in cardsLoaded" :key="index">
          <div class="listDiv">
            <img
              class="cardImg"
              @click="addCard(card)"
              :src="card.images.large"
              name="pokemon card img"
            />
            <span class="cardName">{{ card.name }}</span>
          </div>
        </li>
      </ul>
      <div v-if="cardslength > 16">
        <span @click="loadMore" class="loadMore">Load More</span>
      </div>
    </div>
    <div class="deckContain">
      <div class="deckAndCards">
        <div class="deckImg">
          <div class="deckName">
            
              <label></label>
              <input v-model="deck.deckName" placeholder="name deck" />
          
          </div>
          <img :src="returnDeckImage" />
          <div class="deckButtons">
            <button @click="saveDeck">save</button>
            <button @click="clearDecks">clear</button>
          </div>
        </div>
        <div class="deckCards">
          <div>
            <span>Pokemon | {{ deckPokemon.length }}</span>
            <ul class="pokemon">
              <li
                v-for="(card, index) in deckPokemon"
                @mouseover="deckImageChange(card)"
                @click="removeCardFromDeck(card)"
                :key="index"
              >
                {{ card.name }}
              </li>
            </ul>
          </div>
          <div>
            <span>Trainer | {{ deckTrainer.length }}</span>
            <ul class="trainer">
              <li
                v-for="(card, index) in deckTrainer"
                @mouseover="deckImageChange(card)"
                @click="removeCardFromDeck(card)"
                :key="index"
              >
                {{ card.name }}
              </li>
            </ul>
          </div>
          <div>
            <span>Energy | {{ deckEnergy.length }}</span>
            <ul class="energy">
              <li
                v-for="(card, index) in deckEnergy"
                @mouseover="deckImageChange(card)"
                @click="removeCardFromDeck(card)"
                :key="index"
              >
                {{ card.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BaseHeader from "../components/UI/baseHeader.vue";
  import store from "../store/index";
  import VueLoading from "vue-loading-overlay";
  import { updateUserDoc } from "../index.js";
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
          "Colorless",
          "Psychic",
          "Dark",
          "Electric",
          "Fairy",
          "Water",
          "Metal",
          "Grass",
        ],
        searchedPokemon: { name: "", format: "", typ: "", color:"" },
        deck: { deckName: "",deckCreated: new Date(), cards: [] },
        deckEnergy: [],
        deckPokemon: [],
        deckTrainer: [],
        deckImage: "",
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
        if (this.cardsLength > this.$store.getters.getCarddbLength) return;
        this.cardsLength = this.cardsLength + 8;
      },
      searchPokemon() {
        console.log(this.searchedPokemon)
        const name = this.searchedPokemon.name
        const format =this.searchedPokemon.format 
        const color =this.searchedPokemon.color 
        const typ =this.searchedPokemon.typ
        return store.dispatch("fetchSearchPokemon", {name, format , color , typ});
      },
      removeCardFromDeck(card) {
        const index = this.deck.cards.indexOf(card);
        console.log(this.deck.cards);
        if (index > -1) {
          this.deck.cards.splice(index, 1);
        }
        if (card.supertype == "Pokémon") {
          const pokeI = this.deckPokemon.indexOf(card);
          if (index > -1) {
            this.deckPokemon.splice(pokeI, 1);
          }
        }
        if (card.supertype == "Trainer") {
          const pokeT = this.deckTrainer.indexOf(card);
          if (index > -1) {
            this.deckTrainer.splice(pokeT, 1);
          }
        }
        if (card.supertype == "Energy") {
          const pokeE = this.deckEnergy.indexOf(card);
          if (index > -1) {
            this.deckEnergy.splice(pokeE, 1);
          }
        }
        this.deckImage = "";
      },
      addCard(card) {
        //add checks for building deck here
        console.log(card);
        if (this.deck.cards.length == 60) {
          alert("Max Card limit for deck");
          return;
        }
        for (let index = 0; index < this.cardEnergy.length; index++) {
          if (card.name == this.cardEnergy[index]) {
            this.deck.cards.push(card);
            this.deckEnergy.push(card);
            return;
          }
        }
        this.checkForCardDup(card);
      },
      deckImageChange(card) {
        this.deckImage = card.images.small;
      },
      checkForCardDup(card) {
        let cardName = [];
        for (let index = 0; index < this.deck.cards.length; index++) {
          if (this.deck.cards[index].name == card.name) {
            if (cardName.length < 3) {
              cardName.push(this.deck.cards[index].name);
            } else {
              alert("Max of 4");
              return;
            }
          }
        }
        this.deck.cards.push(card);
        if (card.supertype == "Trainer") {
          this.deckTrainer.push(card);
        }
        if (card.supertype == "Pokémon") {
          this.deckPokemon.push(card);
        }
        if (card.supertype == "Energy") {
          this.deckEnergy.push(card);
        }
      },
    },
    computed: {
      cardsLoaded() {
        if (this.$store.getters.getIsLoading) return;
        return this.$store.getters.getAllCards.slice(0, this.cardsLength);
      },
      returnDeckImage() {
        return this.deckImage;
      },
      saveDeck() {
        //pass in this.deck and the uid that is stored in the store as the document
        if ( this.deckname == "") {
          alert("need to name deck");
        }
        if (this.deck.cards.length === 60 && this.deckname != "") {
          updateUserDoc(this.$store.getters.getUserData.data.uid, this.deck);
          alert("saved deck");
        } else {
          console.log(this.deck.cards.length);
          alert("deck not completed");
        }
      },
      clearDecks() {
        this.deck.cards = [];
        this.deck.deckName = '';
        this.deckEnergy = [];
        this.deckTrainer = [];
        this.deckPokemon = [];
        alert("cleared deck");
      },
    },
    watch: {
      deckImage() {
        return this.deckImage;
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
  .deckContain {
    display: flex;
    justify-content: center;
    margin-top: 2%;
    width: 80%;
    padding: 2%;
  }
  .deckImg {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .deckCards {
    display: flex;
    text-align: right;
  }
  .deckAndCards {
    display: flex;
  }
  li {
    list-style: none;
  }
  li:hover {
    cursor: pointer;
  }
  .contain {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  select{
    color:black !important;
  }
</style>
