import { getLocalStorage } from "@/service/localStorageService";
import Vue from "vue";
import Vuex from "vuex";
import { getTokenByUsernameAndPassword } from "../API/API";
Vue.use(Vuex);

const store = new Vuex.Store({
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  state: {
    currentUser: getLocalStorage("currentUser"),
    token: getLocalStorage("token"),
  },

  mutations: {
    SET_CURRENT_USER(state, newValue) {
      state.currentUser = newValue;
      saveState("currentUser", newValue);
    },
    SET_CURRENT_TOKEN(state, newValue) {
      state.token = newValue;
      saveState("token", newValue);
    },
  },
  getters: {
    AccountInfo(state) {
      return state.currentUser;
    },
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    async initUser({ commit }, payload: { login: string; password: string }) {
      const response = await getTokenByUsernameAndPassword(
        payload.login,
        payload.password
      );
      commit("SET_CURRENT_USER", response.currentUser);
      commit("SET_CURRENT_TOKEN", response.accessToken);
      return response.currentUser;
    },
    async logOut({ commit }) {
      commit("SET_CURRENT_USER", null);
      commit("SET_CURRENT_TOKEN", null);
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("currentUser");
      return true;
    },
  },
});

export default store;

function saveState(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
