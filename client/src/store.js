import Vue from "vue";
import Vuex from "vuex";
import createdPersistatedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import axios from "axios";
import { router } from "./Router/index.js";
var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createdPersistatedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  state: {
    backend_url: "http://localhost:8088",
    auth: null,
  },
  getters: {
    getBackendUrl: (state) => {
      return state.backend_url;
    },
    getUsername: (state) => {
      let username = "Unknown";

      if (state.auth === null) {
        username = "not logged in ";
      } else if (state.auth.userr.role === "Admin") {
        username = state.auth.userr.username;
      } else {
        username = state.auth.userr.registrant.names;
      }
      return username;
    },
  },
  mutations: {
    mutateAuth: (state, data) => {
      state.auth = data;
    },
    mutateCredentials: (state, data) => {
      state.auth.credentials = data;
    },
  },

  actions: {
    login: (context, creds) => {
      //console.log(creds);
      axios({
        method: "POST",
        url: context.state.backend_url + "/user/login",
        data: creds,
      })
        .then((response) => {
          if (response.data.code === 200) {
            response.data.OBJECT.credentials = creds;
            context.commit("mutateAuth", response.data.OBJECT);
            console.log(response.data.OBJECT);
            if (
              response.data.OBJECT.userr.registrant.reg_Category ==
              "VILLAGE_LEADER"
            ) {
              router.push("/dashboard/ui");
            } else if (
              response.data.OBJECT.userr.registrant.reg_Category == "SUPERADMIN"
            ) {
              router.push("/dashboard/ui");
            } else if (response.data.OBJECT.userr.role == "Admin") {
              router.push("/");
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    logout: (context) => {
      context.commit("mutateAuth", null);
      localStorage.clear();
      router.push("/user/login");
    },
    signUp: (context, credentials) => {
      axios
        .post(context.state.backend_url + "/Registrant/save", credentials)
        .then((res) => {
          if (res.data.code === 200) {
            context.commit("mutateAuth", res.data.OBJECT);
            router.push("/");
          } else {
            alert.error(res.data.description);
          }
        })
        .catch((err) => {
          alert.error(err);
        });
    },
  },
});
store.subscribe((mutation, state) => {
  if (mutation.type === "idleVue/IDLE-CHANGED" && mutation.payload === true) {
    store.dispatch("logout");
  } else if (mutation.type === "mutateAuth" && mutation.payload !== null) {
    var expiry = state.auth.credentials.expires_in * 1000;

    console.log("expires in" + expiry);
    //  setInterval(() => {
    //     store.dispatch('login')
    // }, (state.auth.credentials.expires_in*1000));
  }
});
