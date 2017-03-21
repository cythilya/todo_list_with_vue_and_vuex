import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import TodoList from './components/TodoList.vue';
import store from './store';
Vue.use(VueRouter);

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