<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand>
      <router-link class="routerLink" to="/"> VineLife </router-link>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav-collapse">
      <b-navbar-nav>
        <b-nav-item>
          <router-link class="routerLink" to="/allFields"> Tous les champs </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="routerLink" to="/myField"> Mes champs </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="routerLink" to="/myAccount"> Mon compte </router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
localStorage.setItem('isLogged', false);

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.routerLink{
  text-decoration: none;
  color: white;
}
.routerLink:hover{
  text-decoration: none;
  color: purple;
}
</style>
