import Vue from 'vue'
import Router from 'vue-router'
import AllFields from '../views/AllFields.vue'
import Home from '../views/Home.vue'
import MyAccount from '../views/MyAccount.vue'
import MyField from '../views/MyField.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/allFields',
      name: 'AllFields',
      component: AllFields
    },
    {
      path: '/myAccount',
      name: 'MyAccount',
      component: MyAccount
    },
    {
      path: '/myField',
      name: 'MyField',
      component: MyField
    },
    
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
})
