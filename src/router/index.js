import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignView from "../views/SignView.vue";
import PlayView from "../views/PlayView.vue";
import DeckBuildView from "../views/DeckBuildView.vue";
import store from "../store/index";
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
      name: "Signup",
      component: SignView,
    },
    {
      path: "/play",
      name: "Play",
      component: PlayView,
    },
    {
      path: "/deck",
      name: "Deck",
      component: DeckBuildView,
    },
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
router.beforeEach(async (to, from) => {
  store.dispatch("fetchIsLoading", true);
  if (
    // make sure the user is authenticated
    store.getters.getUserData.isLoggedIn &&
    //  Avoid an infinite redirect
    to.name !== "home" &&
    to.name !== "Signup"
  ) {
    // redirect the user to the login page
    alert("Add small error for invaild user");
    return { name: "home" };
  }
});
router.afterEach(() => {
  store.dispatch("fetchIsLoading", false);
});

export default router;
