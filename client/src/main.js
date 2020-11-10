import Vue from "vue";
import App from "./App.vue";
import router from "./Router";
import VueRouter from "vue-router";
//import 'bootstrap-css-only/css/bootstrap.min.css'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "mdbvue/lib/css/mdb.min.css";
import VueSweetalert2 from "vue-sweetalert2";
import { store } from "./store";

Vue.config.productionTip = false;

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
};

Vue.use(VueRouter);
Vue.use(VueSweetalert2, options);
Vue.use(BootstrapVue);

new Vue({
  el: "#app",
  router,
  store: store,
  render: (h) => h(App),
});
