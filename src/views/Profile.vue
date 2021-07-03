<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <p>{{user.firstname}} {{user.lastname}} {{user.email}} {{user.id}}</p>
    <img :src="user.photo"/>
    <div class="form-row">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  mounted () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    logout () {
      this.$store.commit('logout');
      this.$router.push('/profile');
    }
  }
}
</script>

<style scoped>

</style>>
