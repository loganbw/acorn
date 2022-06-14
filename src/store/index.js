import { createStore } from "vuex";
import pokemon from "pokemontcgsdk"
import apiKiey from "../../api-keys.json"
// Create a new store instance.
const pokemonAPiKey = apiKiey.pokemon;
pokemon.configure({apiKey: pokemonAPiKey})
const store = createStore({
  state() {
    return {
      user: { loggedIn: false, data: null },
      isLoading: false,
      isEmailTrue: false,
      searchedPokemon:[],
      deckedPokemon: [],
      carddbLength: 0,
      decks:[],
      cards: []
    };
  },
  modules: {},
  mutations: {
    Set_Login_Value(state, value) {
      state.user.loggedIn = value;
      console.log(state)
    },
    Set_User_Data(state, data) {
      state.user.data = data;
    },
    Set_isLoading(state, flag){
      state.isLoading = flag
    },
    Set_isEmailTrue(state, flag)
    {
      state.isEmailTrue = flag
    },
 
    Set_Searched_Pokemon(state,value){
      state.cards = []
      state.isLoading = true
      pokemon.card.where({q: 'name:' + value.name + ' legalities.unlimited:legal' }).then(card =>{
        console.log(card.data)
        state.cards.push(card.data)
        state.isLoading = false
      })
    },
    Set_CarddbLength(state){
      pokemon.card.all().then(cards =>{
        state.carddbLength = cards.length;
        
     }).catch(err=>{
       alert(err)
     })
    }
    
  },

  actions: {
    fetchUser({ commit }, user) {
      console.log("fetchUser " + user)
      commit("Set_Login_Value", user !== null);
      if (user) {
        commit("Set_User_Data", {email: user.email, uid: user.uid });
      } else {
        commit("Set_User_Data", null);
      }
    },
    fetchIsLoading(context, payload)
    {
      context.commit("Set_isLoading",payload);
    },
    fetchIsEmailTrue(context,payload)
    {
      context.commit("Set_isEmailTrue",payload)
    },
    fetchSearchPokemon(context, payload){
      context.commit("Set_Searched_Pokemon",payload)
    }
    
  },
  getters: {
    getUserData(state) {
      return state.user;
    },
    Get_All_Pokemon(state){
      state.cards = []
      pokemon.card.where({page:1}).then(cards =>{
        state.cards.push(cards.data)
        state.isLoading = false;
      })
      
      
    },
    getAllCards(state){
      return state.cards[0];
    },
    getIsLoading(state){
      return state.isLoading;
    },
    getIsEmailTrue(state){
      return state.isEmailTrue
    },
    getSearchedPokemon(state){
      return state.searchedPokemon;
    },
    getCarddbLength(state){
      return state.cards[0].length;
    }
  },
});
export default store;
