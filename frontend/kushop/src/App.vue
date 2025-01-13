<template>
  <MainMenu />
  <div class="container">
    <!-- <h1>KUSHOP</h1>
    <router-link to="/">Home</router-link> &nbsp;
    <router-link to="/login">Login</router-link> -->
    <router-view />
  </div>
  


</template>

<script>
import MainMenu from './components/MainMenu.vue';
export default {
  name: 'App',
  components: {
    MainMenu
  }
}
</script>

<style>

</style>
