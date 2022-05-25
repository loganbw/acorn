import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignView from "../views/SignView.vue";
import PlayView from "../views/PlayView.vue";
import store from "../store/index"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name:"Signup",
      component: SignView
    },
    {
      path: "/play",
      name:"Play",
      component: PlayView
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});
router.beforeEach(async (to ,   from) => {
  if (
    // make sure the user is authenticated
    store.getters.getUserData.isLoggedIn &&
    //  Avoid an infinite redirect
    to.name !== 'home'
     &&
     to.name !== 'Signup'
  ) {
    // redirect the user to the login page
    return { name: 'home' }
  }
})

export default router;
