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
      dismissCountDown: null,
      showDismissibleAlert: false,
      msg: 'Todo List with Vue.js and Vuex'
    }
  },
 methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = 5;
    }
  }
}
</script>

<style>
@import "./assets/css/reset-font-min.css";
@import "./assets/css/clearfix.css";

html {
  background: #41D2F2;
  font-family: '微軟正黑體', sans-serif;
}
</style>