import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      isLoggedIn: false,
    };
  },
  modules: {},
  mutations: {
    isLoggedInFlag(state, payload) {
      state.isLoggedIn = payload;
    },
  },

  actions: {
    setIsLoggedInFlag(context, payload) {
      context.commit("isLoggedInFlag", payload);
    },
  },
  getters: {
    getIsLoggedInFlag(state){
      return state.isLoggedIn;
    }
  },
});
export default store;
