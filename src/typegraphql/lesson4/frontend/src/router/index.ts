import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Upload from '@/views/Upload.vue'
import LaptopDetails from '@/views/LaptopDetails.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Laptop Details',
    component: LaptopDetails,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
