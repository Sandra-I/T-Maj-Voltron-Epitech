import Vue from 'vue'
import Router from 'vue-router'
import AllFields from '../views/AllFields.vue'
import MyAccount from '../views/MyAccount.vue'
import MyField from '../views/MyField.vue'
import Authentification from '../views/Authentification.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Authentification
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
    }
  ]
})
