import "~/assets/styles.css";

import Vue from "vue";
import VueRouter from "vue-router";
import VueCompositionApi from "@vue/composition-api";

import VueTypedJs from 'vue-typed-js'
import VueAnime from '~/utils/vueAnime.js';
import PortalVue from 'portal-vue'
import VueP5 from "vue-p5";
import VueMap from "@eliaspourquoi/vue-map/dist/VueMap.esm.js";

Vue.use(VueTypedJs)
Vue.use(VueRouter);
Vue.use(VueCompositionApi);
Vue.use(PortalVue)
Vue.use(VueMap);
Vue.use(VueAnime);

Vue.component('vue-p5', VueP5);

import Fade from '~/components/Fade.vue';
Vue.component('fade', Fade);

function addRef(el, binding, vnode) {
  const ref = binding.arg
  const vm = vnode.context
  const thing = vnode.componentInstance || vnode.elm
  if (!vm.$refs.hasOwnProperty(ref)) {
    vm.$refs[ref] = []
  }
  const index = vm.$refs[ref].indexOf(thing)
  if (index == -1) {
    vnode.context.$refs[ref].push(thing)
  }
}

function removeRef(el, { arg: ref }, { context: vm }, vnode) {
  if (vm.$refs.hasOwnProperty(ref)) {
    const arr = vm.$refs[ref]
    const thing = vnode.componentInstance || vnode.elm
    const index = arr.indexOf(thing)
    if (index) {
      arr.splice(index, 1)
    }
  }
}

Vue.directive('refs', {
  bind: addRef,
  update: addRef,
  unbind: removeRef
})

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: '/chapter/1',
    },
    {
      path: '/chapter/1',
      name: 'chapter/1',
      component: () => import("./pages/Chapter1.vue")
    },
    {
      path: "/chapter/2",
      name: 'chapter/2',
      component: () => import("./pages/Chapter2.vue")
    },
    {
      path: "*",
      redirect: '/',
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