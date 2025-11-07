import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentManage from '../views/StudentManage.vue'
import Visualization from '../views/Visualization.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/student' },
  { path: '/student', name: 'StudentManage', component: StudentManage },
  { path: '/visualization', name: 'Visualization', component: Visualization }
]

const router = new VueRouter({
  routes
})

export default router