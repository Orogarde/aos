import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
//definitions des routes
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/armees',
    name: 'Armees',
    component: () => import(/* webpackChunkName: "about" */ '../views/Armees.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      connect: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/connexion',
    name: 'connexion',
    meta: {
      connect: false
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/connexion.vue')
  },
  {
    path: '/battletomes',
    name: 'battletomes',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/battletomes.vue')
  },
  {
    path: '/createBattletome',
    name: 'createBattletome',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/createBattletome.vue')
  },
  {
    path: '/createUnite',
    name: 'createUnite',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/createUnite.vue')
  },
  {
    path: '/unites',
    name: 'unites',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/unites.vue')
  },
  {
    path: '/createModele',
    name: 'createModele',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/createModele.vue')
  },
  {
    path: '/modeles',
    name: 'modeles',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/modeles.vue')
  },
  {
    path: '/createProfil',
    name: 'createProfil',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/createProfil.vue')
  },
  {
    path: '/profils',
    name: 'profils',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/profils.vue')
  },
  {
    path: '/createAptitude',
    name: 'createAptitude',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/createAptitude.vue')
  },
  {
    path: '/aptitudes',
    name: 'aptitudes',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/aptitudes.vue')
  },
  {
    path: '/createAptitudeCommandement',
    name: 'createAptitudeCommandement',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/createAptitudeCommandement.vue')
  },
  {
    path: '/aptitudesCommandements',
    name: 'aptitudesCommandements',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/aptitudesCommandements.vue')
  },
  {
    path: '/createArme',
    name: 'createArme',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/createArme.vue')
  },
  {
    path: '/armes',
    name: 'armes',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/armes.vue')
  },
  {
    path: '/createEffet',
    name: 'createEffet',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/createEffet.vue')
  },
  {
    path: '/effets',
    name: 'effets',
    meta: {
      connect: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/effets.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const isConnected = localStorage.getItem('userId') || false;

  if (to.fullPath === '/connexion' && isConnected) {
    return next('/');
  }

  if (to.matched.some(record => record.meta.connect)) {
    if (!isConnected) {
      return next('/');
    };

  };

  next();
  return;
});



export default router
