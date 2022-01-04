import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recherche from '../views/Recherche.vue'
import Categories from '../views/Categories.vue'
import Messages from '../views/Messages.vue'
import CategorieMessages from '../views/CategoriesMessages'
import NouvelleCategorie from '../views/NouvelleCategorie'
import NouveauMessage from "../views/NouveauMessage";
import Login from "../views/Login";
import Logout from "../views/Logout";
import UserMessages from "../views/UserMessages";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
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
    path: '/nouvelle-categorie',
    name: 'nouvelle-categorie',
    component: NouvelleCategorie
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    children: [
      {
        path: ':id',
        name: 'categorie_messages',
        component: CategorieMessages
      }
    ]
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/nouveau-message',
    name: 'NouveauMessage',
    component: NouveauMessage
  },
  {
    path: '/recherche',
    name: 'Recherche',
    component: Recherche
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
  const publicPages = ['/logout','/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('userData');
  const tokenExpired = loggedIn?(parseInt(Date.now()/1000) >= JSON.parse(loggedIn).exp):null

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn || authRequired && tokenExpired) {
    next('/logout');
  } else {
    next();
  }
});

export default router
