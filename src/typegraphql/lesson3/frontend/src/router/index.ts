import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Upload from '@/views/Upload.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Hello World',
    component: Upload,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
