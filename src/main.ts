import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// @ts-ignore
import VueNotification from "@kugatsu/vuenotification";
import { UserRole } from "./models/User";

Vue.config.productionTip = false;
Vue.use(VueNotification, {
  timer: 20,
});
Vue.prototype.UserRole = UserRole;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
