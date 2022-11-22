<template>
  <div id="app">
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <dashboardView msg="Click On Share Button"/>
  </div>
</template>

<script>
import dashboardView from './pages/dashboardView.vue'

export default {
  name: 'App',
  components: {
    dashboardView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
