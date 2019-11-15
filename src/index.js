import "~/assets/styles.css";

import Vue from "vue";
import VueRouter from "vue-router";
import VueCompositionApi from "@vue/composition-api";

import VueTypedJs from "vue-typed-js";
import VueAnime from "~/utils/vueAnime.js";
import PortalVue from "portal-vue";
import VueP5 from "vue-p5";
import VueMap from "@eliaspourquoi/vue-map/dist/VueMap.esm.js";

Vue.use(VueTypedJs);
Vue.use(VueRouter);
Vue.use(VueCompositionApi);
Vue.use(PortalVue);
Vue.use(VueMap);
Vue.use(VueAnime);

Vue.component("vue-p5", VueP5);

import Fade from "~/components/Fade.vue";
Vue.component("fade", Fade);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/chapter/1"
    },
    {
      path: "/chapter/1",
      name: "chapter/1",
      component: () => import("./pages/Chapter1.vue")
    },
    {
      path: "/chapter/2",
      name: "chapter/2",
      component: () => import("./pages/Chapter2.vue")
    },
    {
      path: "/test",
      name: "test",
      component: () => import("./pages/Test.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

new Vue({
  router,
  template: `
    <transition name="page" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  `
}).$mount("#app");
