import { createRouter, createWebHistory } from 'vue-router'
import { useBanks } from '@/storesPinia/banks'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../pages/HomePage.vue'),
    meta: { title: 'Calculator' }
  },
  {
    path: '/features',
    name: 'FeaturesPage',
    component: () => import('../pages/FeaturesPage.vue'),
    meta: { title: 'Features' }
  },
  {
    path: '/products/credit/:id',
    name: 'SingleCredit',
    component: () => import('../pages/SingleCredit.vue'),
    meta: { title: 'Кредит' },
    beforeEnter: async (to) => {
      const banks = useBanks()
      await banks.fetchCredit(to.params.id)
      document.title = `Кредит ${banks.singleCredit.creditName}`
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  document.title = to.meta.title
})

export default router
