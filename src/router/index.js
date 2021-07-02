import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Ia from "@/views/Ia.vue";

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
    name: 'ia',
    path: '/ia', 
    component: Ia
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;