import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      user: { loggedIn: false, data: null },
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
  },

  actions: {
    fetchUser({ commit }, user) {
      console.log("fetchUser " + user)
      commit("Set_Login_Value", user !== null);
      if (user) {
        commit("Set_User_Data", {email: user.email });
      } else {
        commit("Set_User_Data", null);
      }
    },
  },
  getters: {
    getUserData(state) {
      return state.user;
    },
  },
});
export default store;
