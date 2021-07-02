import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import DashBDD from "@/components/DashBDD.vue";

const routes = [
  { 
    name: 'home',
    path: '/', 
    component: Home
  },
  { 
    name: 'login',
    path: '/login', 
    component: Login
  },
  { 
    name: 'profile',
    path: '/profile', 
    component: Profile, 
    props: true 
  },
  { 
    name: 'dashBDD',
    path: '/dashBDD', 
    component: DashBDD, 
    props: true 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;