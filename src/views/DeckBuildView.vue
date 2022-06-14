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
        searchedPokemon: { name: "", format: "", typ: "", color:"" },
        /// ^
        ///////////////

        // object for deck
        deck: { deckName: "",deckCreated: new Date(), cards: [] },
        // array to display energies seperatly 
        deckEnergy: [],
        // array to display pokemon seperatly
        deckPokemon: [],
        // array to display traienrs spereatly
        deckTrainer: [],
        //  active img src  
        deckImage: "",
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
      loadMore() {
        //Function to increase the number of cards shown
        if (this.cardsLength > this.$store.getters.getCarddbLength) return;
        this.cardsLength = this.cardsLength + 8;
      },
      searchPokemon() {
        // setting data to constants because issues with passing multiple var to the payload
        const name = this.searchedPokemon.name
        const format =this.searchedPokemon.format 
        const color =this.searchedPokemon.color 
        const typ =this.searchedPokemon.typ
        //calling search function on main store and passing in search and filter varibles
        return store.dispatch("fetchSearchPokemon", {name, format , color , typ});
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
        this.deckImage = "";
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
        if ( this.deckname == "") {
          alert("need to name deck");
        }
        //check if deck has 60 cards and its named
        if (this.deck.cards.length === 60 && this.deckname != "") {
          updateUserDoc(this.$store.getters.getUserData.data.uid, this.deck);
          alert("saved deck");
        } else {
          console.log(this.deck.cards.length);
          alert("deck not completed");
        }
      },
      //clears all arrays and deck name
      clearDecks() {
        this.deck.cards = [];
        this.deck.deckName = '';
        this.deckEnergy = [];
        this.deckTrainer = [];
        this.deckPokemon = [];
        alert("cleared deck");
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
