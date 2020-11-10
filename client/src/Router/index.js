import Vue from "vue";
import VueRouter from "vue-router";
//import homes from '../Views/Home.vue'
//import addCitizen from '../components/Citizen/AddCitizen.vue'
//import home from "../components/DashBoard.vue";
import addumuganda from "../components/Citizen/Umuganda.vue";
import citizen from "../components/Citizen/Citizen.vue";
import view from "../components/Citizen/ViewCitizen.vue";
import user from "../components/Citizen/Register.vue";
import logins from "../components/Citizen/Logs.vue";
import { guards } from "../router-guards";
import NProgress from "nprogress";
import siderbar from "../components/Citizen/ui.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  linkExactActiveClass: "active",
  mode: "history",

  routes: [
    // {
    //   path: "/",
    //   redirect: "Dashboard",
    //   beforeEnter: guards.isAuthenticated,
    //   component: home,
    // },
    // {
    //     path:'/citizen/addcitizen',
    //     name:'addcitizens',
    //     component:addCitizen
    // },
    {
      path: "/Umuganda/addumuganda",
      name: "umugandas",
      component: addumuganda,
    },
    {
      path: "/",
      name: "logs",
      component: logins,
    },
    {
      path: "/dashboard/ui",
      name: "sider",
      component: siderbar,
    },
    {
      path: "/citizen/addcitizen",
      beforeEnter: guards.isVillage,
      name: "citizen",
      component: citizen,
    },
    {
      path: "/citizen/Viewcitizen",
      beforeEnter: guards.isVillage,
      // name:'viewCitizen',
      component: view,
    },
    {
      path: "/User/Register",
      name: "register",
      component: user,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

// const router = new VueRouter({
//     routes
//   })
export default router;
