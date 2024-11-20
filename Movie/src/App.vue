<template>
  <div class="shadow">
      <v-toolbar>
        <RouterLink to="/" custom v-slot="{navigate}">
              <v-btn @click="navigate" role="link">
                  MOVIE REVIEW
              </v-btn>
          </RouterLink>
        <RouterLink to="/profile" custom v-slot="{navigate}">
              <v-btn @click="navigate" role="link" v-if="loggedin" class="margin5">
                  Profile
              </v-btn>
          </RouterLink>
          <v-btn @click.prevent="logout()" v-if="loggedin" class="margin6">
              Logout
          </v-btn>
          <RouterLink to="/signup" custom v-slot="{navigate}">
              <v-btn @click="navigate" role="link" v-if="!loggedin" class="margin7">
                  Login / SignUp
              </v-btn>
          </RouterLink>
      </v-toolbar>
      
  </div>
  <RouterView @update-navbar="updateNavbar"></RouterView>
  </template>



<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      name: '',
      loggedin: false,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({
        name: 'home'
      });
      this.updateNavbar();
    },
    updateNavbar() {
      this.loggedin = !this.loggedin;
    },
  },
});
</script>


<style>
.shadow{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.margin5{
  margin-left: 900px;
}
.margin7{
  margin-left: 950px;
}
</style>

