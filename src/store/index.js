import { createStore } from "vuex";
import pokemon from "pokemontcgsdk";
import apiKiey from "../../api-keys.json";
import { getAllUsersDecks } from "..";
// Create a new store instance.
const pokemonAPiKey = apiKiey.pokemon;
pokemon.configure({ apiKey: pokemonAPiKey });
const store = createStore({
  state() {
    return {
      user: { loggedIn: false, data: null },
      isLoading: false,
      isEmailTrue: false,
      searchedPokemon: [],
      //array for firebae to populate the current deck being used
      deckPokemon: [],
      carddbLength: 0,
      //array for firebae to populate all  decks
      decks: {},
      //cards in currently active deck
      cards: [],
    };
  },
  modules: {},
  mutations: {
    //setting value from firebase to check if user is logged in
    Set_Login_Value(state, value) {
      state.user.loggedIn = value;
    },
    //ets the rest of the user data form firebase
    Set_User_Data(state, data) {
      state.user.data = data;
    },
    //loading screen flag /if true loading screen should be active if false it should not show screen
    Set_isLoading(state, flag) {
      state.isLoading = flag;
    },
    // This Check is to make sure the email being used is true 
    Set_isEmailTrue(state, flag) {
      state.isEmailTrue = flag;
    },
    //calls pokemon api and sets the cards array to the searched pokemon
    Set_Searched_Pokemon(state, value) {
      state.cards = [];
      state.isLoading = true;
      let vName = "";
      let vFormat = "";
      let vTyp = "";
      let vColor = "";
      //if check for format and name search
      if (value.name != "") vName = " name:" + '"' + value.name + '"' ;
      //if check for setting which format
      if (value.format == "standard")
        vFormat = " legalities.standard:legal ";
      if (value.format == "expandand")
        vFormat = " legalities.expanded:legal ";
      if (value.format == "unlimited")
        vFormat = " legalities.unlimited:legal ";
      if (value.typ != "") vTyp = " supertypes:" + value.typ;
      if (value.color != "") vColor = " types:" + value.color;
      //api call
      pokemon.card.where({ q: vName + vFormat + vColor + vTyp,  orderBy: 'name'}).then((card) => {
        state.cards.push(card.data);
        state.isLoading = false;
      }).catch((err =>{
        console.log(err)
      }));
    },
    Set_User_Decks(state,value){
      state.decks = value
      console.log(value + "state decks")
    }
  },

  actions: {
    fetchUser({ commit }, user) {
      commit("Set_Login_Value", user !== null);
      if (user) {
        commit("Set_User_Data", { email: user.email, uid: user.uid });
      } else {
        commit("Set_User_Data", null);
      }
    },
    fetchIsLoading(context, payload) {
      context.commit("Set_isLoading", payload);
    },
    fetchIsEmailTrue(context, payload) {
      context.commit("Set_isEmailTrue", payload);
    },
    fetchSearchPokemon(context, payload) {
      context.commit("Set_Searched_Pokemon", {
        name: payload.name,
        format: payload.format,
        color: payload.color,
        typ: payload.typ,
      });
    },
    fetchUserDecks(context,payload){
      console.log(payload)
      context.commit("Set_User_Decks",payload)
    }
  },
  getters: {
    getUserData(state) {
      return state.user;
    },
    //second api call to populate first page of cards. 
    //set to one page instead of all due to loading issues
    Get_All_Pokemon(state) {
      state.cards = [];
      pokemon.card.where({ page: 1 , OrderBy: 'name'}).then((cards) => {
        state.cards.push(cards.data);
        state.isLoading = false;
      });
    },
    getAllCards(state) {
      return state.cards[0];
    },
    getIsLoading(state) {
      return state.isLoading;
    },
    getIsEmailTrue(state) {
      return state.isEmailTrue;
    },
    getSearchedPokemon(state) {
      return state.searchedPokemon;
    },
    getCarddbLength(state) {
      return state.cards[0].length;
    },
    getAllUsersDecks(state){
      return state.decks;
    }
  },
});
export default store;
