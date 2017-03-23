import Vue from 'vue';
import store from './store';
import App from './App.vue';
import TodoList from './components/TodoList.vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'; //bootstrap

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/TodoList',
      name: 'TodoList',
      component: TodoList
    },
    {
    	path: '/*',
      redirect: '/TodoList'
    }
  ]
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});