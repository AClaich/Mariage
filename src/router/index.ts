import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue';
import AccueilView from '@/views/AccueilView.vue';
import ProgView from '@/views/ProgView.vue';
import HebergementView from '@/views/HebergementView.vue';
import FormResponseView from '@/views/FormResponseView.vue';
import { useStore } from "vuex";

const store = useStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/accueil',
      name: 'accueil',
      component: AccueilView
    },
    {
      path: '/prog',
      name: 'prog',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ProgView
    },
    {
      path: '/hebergement',
      name: 'hebergement',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HebergementView
    },
    {
      path: '/reponse',
      name: 'reponse',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("currentUser") === null) {
          next('/login');
        } else {
          next();
        }
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FormResponseView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/accueil'
    }
  ]
})

export default router
