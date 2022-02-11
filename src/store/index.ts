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
  },
});

export default store;

function saveState(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
function getLocalStorage(key: string) {
  const result = window.localStorage.getItem(key);

  return result ? JSON.parse(result) : null;
}
