<template>
  <BaseHeader />
  <loading
    class="load"
    v-model:active="this.$store.getters.getIsLoading"
    :can-cancel="false"
  ></loading>
  
  <div class="contain">
    <div class="bg"></div>
    <div class="grass1Div">
      <img class="grass1" src="../assets/safari.svg" />
    </div>
    <div class="searchContain">
      <form class="searchForm" @submit.prevent="searchPokemon">
        <div class="searchSubmits">
          <input class="searchInput" v-model="searchedPokemon.name" placeholder="search pokemon" />
          <button type="submit">search</button>
        </div>
        <div>
          <select class="selectSearch" v-model="searchedPokemon.format" name="format" id="formats">
            <option value=""  selected>filter by format</option>
            <option v-for="format in cardFormats" :value="format">{{ format }}</option>
          </select>
          <select class="selectSearch" v-model="searchedPokemon.color" name="color" id="colors">
            <option value=""  selected>filter by color</option>
            <option v-for="color in cardColor" :value="color">{{ color }}</option>
          </select>
          <select class="selectSearch" v-model="searchedPokemon.typ" name="typ" id="typs">
            <option value=""  selected>filter by type</option>
            <option v-for="typ in cardType" :value="typ">{{ typ }}</option>
          </select>
        </div>
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
      <div class="loadMoreDiv" v-if="cardsLength > 15">
        <span @click="loadMore" class="loadMore">Load More</span>
      </div>
    </div>
    <div v-if="!this.$store.getters.getIsLoading"  class="dexDiv">
      <img class="dexImg" src="../assets/Frame.svg" />
    </div>
    <div v-if="!this.$store.getters.getIsLoading"  class="deckContain">
      <div class="deckImg">
        <div class="deckName">
          <label></label>
          <input v-model="deck.deckName" placeholder="name deck" />
        </div>
        <img class="searchImg" :src="returnDeckImage" />
        <div class="deckButtons">
          <button @click="saveDeck && saveDeckMethod">save</button>
          <button @click="clearDecks">clear</button>
        </div>
      </div>
      <div class="deckCards">
        <div class="deckCardDiv">
          <span class="cardSupertype">Pokemon: {{ deckPokemon.length }}</span>
          <ul class="pokemon ulCards">
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
        <div class="deckCardDiv">
          <span class="cardSupertype">Trainer: {{ deckTrainer.length }}</span>
          <ul class="trainer ulCards">
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
        <div class="deckCardDiv">
          <span class="cardSupertype">Energy: {{ deckEnergy.length }}</span>
          <ul class="energy ulCards">
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
        //total amount of cards being shown at the start
        cardsLength: 16,
        ////
        //  This vars are for filtering and searching for cards
        /// v
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
        searchedPokemon: { name: "", format: "", typ: "", color: "" },
        /// ^
        ///////////////

        // object for deck
        deck: { deckName: "", deckCreated: new Date(), cards: [] },
        // array to display energies seperatly
        deckEnergy: [],
        // array to display pokemon seperatly
        deckPokemon: [],
        // array to display traienrs spereatly
        deckTrainer: [],
        //  active img src
        deckImage: "/src/assets/backPCard.svg",
        // loop for basic energy check
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
    //called to start loading until the async is finished
    beforeCreate() {
      store.dispatch("fetchIsLoading", true);
    },
    // calls async funciton
    mounted() {
      this.$store.getters.Get_All_Pokemon;
    },
    methods: {
      saveDeckMethod(){
        store.dispatch("fetchIsLoading", true)
      },
      loadMore() {
        //Function to increase the number of cards shown
        if (this.cardsLength > this.$store.getters.getCarddbLength) return;
        this.cardsLength = this.cardsLength + 8;
      },
      searchPokemon() {
        // setting data to constants because issues with passing multiple var to the payload
        const name = this.searchedPokemon.name;
        const format = this.searchedPokemon.format;
        const color = this.searchedPokemon.color;
        const typ = this.searchedPokemon.typ;
        //calling search function on main store and passing in search and filter varibles
        return store.dispatch("fetchSearchPokemon", { name, format, color, typ });
      },
      //this function removes card from all arrays when clicked on in the deck container section
      removeCardFromDeck(card) {
        const index = this.deck.cards.indexOf(card);
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
        //set the deck image back to nothing. use case if you have no more cards in the deck
        this.deckImage = "/src/assets/backPCard.svg";
      },
      //adds cards to arrays
      addCard(card) {
        //setting deck limit
        if (this.deck.cards.length == 60) {
          alert("Max Card limit for deck");
          return;
        }
        //this for loop is for basic energies. Since you can have infinite amount
        for (let index = 0; index < this.cardEnergy.length; index++) {
          if (card.name == this.cardEnergy[index]) {
            this.deck.cards.push(card);
            this.deckEnergy.push(card);
            return;
          }
        }
        //function call to check if the card has only 4 copies in the deck
        this.checkForCardDup(card);
      },
      //function for the img src in deck contain to change card image on hover
      deckImageChange(card) {
        this.deckImage = card.images.small;
      },
      //function to loop through deck and check for total amount of cards by name
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
      //function to load the currently filled array of cards from the store
      cardsLoaded() {
        if (this.$store.getters.getIsLoading) return;
        return this.$store.getters.getAllCards.slice(0, this.cardsLength);
      },
      // computed function for the img src to change img on hover. loacted in the deckContain
      returnDeckImage() {
        return this.deckImage;
      },
      //saves deck to firebase
      saveDeck() {
        //checks if deck is named.
        // maybe needs another check for blank spaces
        if (this.deck.deckname == "") {
          alert("need to name deck");
        }
        //check if deck has 60 cards and its named
        if (this.deck.cards.length === 60 && this.deck.deckname != "") {
          updateUserDoc(this.$store.getters.getUserData.data.uid, this.deck);
          alert("saved deck");
        } else {
          alert("deck not completed");
        }
      },
      //clears all arrays and deck name
      clearDecks() {
        this.deck.cards = [];
        this.deck.deckName = "";
        this.deckEnergy = [];
        this.deckTrainer = [];
        this.deckPokemon = [];
        alert("cleared deck");
     
     },
    },
  };
</script>
<style scoped>
  .grass1 {
    width: 40%;
    right: -29%;
    z-index: -1;
    top: -6%;
  }
  .grass2 {
    width: 13%;
    right: -42%;
    z-index: -1;
    top: -6%;
    transform: scale(-1, 1);
  }
  .grass1Div {
    margin-bottom: -59px;
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
    color: #ffffff;
  }
  .loadMore:active {
    color: #c6c5c5;
  }
  .loadMore{
    color: #ededed;
    font-weight: bold;
  }
  .searchContain {
    display: flex;
    justify-content: center;
  }
  .searchForm {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .searchSubmits {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .searchInput {
    width: 82%;
  }
  .searchImg {
    width: 80%;
    margin: 2%;
  }
  .deckContain {
    display: flex;
    justify-content: space-between;
    margin: -7% 0% 2% 0%;
    width: 67%;
    padding: 2%;
    border-radius: 1%;
  }
  .deckImg {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 17px;
  }
  .deckCards {
    margin-right: 1%;
    display: flex;
    text-align: right;
    margin-left: 0%;
    width:46%
  }
  .deckAndCards {
    display: flex;
  }
  .ulCards{
    padding:0;
    height: 20%;
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
  select {
    color: black !important;
  }
  button {
    color: black;
  }
  .bg {
    background-image: url("../assets/deckBackgroundview.svg");
    background-size: cover;
    bottom: 0;
    /* left: -50%; */
    width: 100%;
    opacity: 0.5;
    position: fixed;
    /* right: -50%; */
    /* top: -57%; */
    /* z-index: -1; */
    height: 100%;
    /* background-repeat: repeat-x; */
    background-position: top;
  
  }
  .dexDiv {
    margin-bottom: -33%;
    /* height: 104px; */
    right: 311px;
  }
  .dexImg {
    width: 565%;
  }
  .deckCardDiv{
    width:40%;
    margin:1%;
    text-align: center;
    height: 299px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .cardSupertype{
    font-weight: bold;
  }
  .loadMoreDiv{
    margin-bottom:2%
  }
</style>
