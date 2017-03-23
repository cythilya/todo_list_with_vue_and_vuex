<template>
  <div id="app">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <router-link :to="{path: '/TodoList'}">Todo List with Vue.js and Vuex</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      msg: 'Todo List with Vue.js and Vuex',
    }
  }
}
</script>

<style>
@import "./assets/css/reset-font-min.css";
@import "./assets/css/clearfix.css";
@import "./assets/css/style-base.scss";
@import "./assets/css/style-helper.scss";
</style>