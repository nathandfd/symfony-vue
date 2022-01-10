import Vue from 'vue'
import VueRouter from 'vue-router'
import Messages from '../views/Messages.vue'
import Login from "../views/Login";
import Logout from "../views/Logout";
import UserMessages from "../views/UserMessages";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/user-messages',
    name: 'UserMessages',
    component: UserMessages

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/logout','/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('userData');
  const tokenExpired = loggedIn?(parseInt(Date.now()/1000) >= JSON.parse(loggedIn).exp):null

  if (authRequired && !loggedIn || authRequired && tokenExpired) {
    next('/logout');
  } else {
    next();
  }
});

export default router
