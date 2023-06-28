import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: '/',
    component: () => import('@/views/MainView.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/posts',
    component: () => import('@/views/PostListView.vue')
  },
  {
    path: '/posts/:id',
    component: () => import('@/views/PostListItemView.vue')
  },
  {
    path: '/store',
    component: () => import('@/views/PostListItemWithStoreView.vue')
  },
  {
    path: '/composition',
    component: () => import('@/views/PostListItemWithCompositionView.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router