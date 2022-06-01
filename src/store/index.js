import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      user: { loggedIn: false, data: null },
      isLoading: false,
      isEmailTrue: false
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
    }
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
    fetchIsLoading(context, payload)
    {
      context.commit("Set_isLoading",payload);
    },
    fetchIsEmailTrue(context,payload)
    {
      context.commit("Set_isEmailTrue",payload)
    }
  },
  getters: {
    getUserData(state) {
      return state.user;
    },
    getIsLoading(state){
      return state.isLoading;
    },
    getIsEmailTrue(state){
      return state.isEmailTrue
    }
  },
});
export default store;
