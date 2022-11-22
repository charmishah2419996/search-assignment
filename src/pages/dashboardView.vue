<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <genericComponent></genericComponent>
  </div>
</template>

<script>
import genericComponent from '../components/genericComponent.vue'
export default {
  name: 'dashboardView',
  props: {
    msg: String
  },
   components: {
    genericComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
