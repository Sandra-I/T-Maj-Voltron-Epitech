import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Santedesvignes from "@/views/Ia.vue";

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
    name: 'santedesvignes',
    path: '/santedesvignes', 
    component: Santedesvignes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;