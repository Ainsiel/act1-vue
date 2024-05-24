import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelloWorld from '../components/HelloWorld.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/pinia', component: () =>
        import('../components/Pinia.vue')
    },
    {
      path: '/public', component: () =>
        import('../components/Public.vue')
    },
    {
      path: '/admin', component: () =>
        import('../components/Admin.vue'), meta: { requiresAuth: true }
    }


  ]
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (appStore.auth !== 'admin') {
      next({ path: '/public' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
