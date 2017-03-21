<template>
  <div class="todos">
    <h1 class="todo-heading">Todo List with Vue.js and Vuex</h1>
    <div class="add-new-item">
      <input type="text" class="new-item" placeholder="加入一個新工作" @keyup.enter="addTodo(newTodoText)" v-model="newTodoText" />
    </div>
    <ul class="todo-list" v-if="!(incompleteCount === 0 && filter === 'show_all')">
      <li class="todo-item" v-for="(todo, index) in list">
        <input type="checkbox" @change="updateStatus(todo)" :checked="todo.isCompleted">
        <label v-if="!todo.isEdit" v-bind:class="[todo.isCompleted ? 'completed' : '']">{{ todo.text }}</label>
        <input type="text" v-if="todo.isEdit" @keyup.enter="updateTodo(todo)" v-model="todo.text" />
        <a @click="editTodo(todo)" v-if="!todo.isEdit" class="btn">編輯</a>
        <a @click="deleteTodo(index)" class="btn">刪除</a>
      </li>
    </ul>
    <div class="msg" v-if="incompleteCount === 0 && filter === 'show_all'">恭喜完成所有的項目！</div>
    <div class="control">
      <a class="btn" @click="setFilter('show_all')" :class="{ active: filter === 'show_all'}">全部 ({{ allCount }})</a>
      <a class="btn" @click="setFilter('show_completed')" :class="{ active: filter === 'show_completed'}">已完成 ({{ completedCount }})</a>
      <a class="btn" @click="setFilter('show_incomplete')" :class="{ active: filter === 'show_incomplete'}">未完成 ({{ incompleteCount }})</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';

export default Vue.extend({
  data: function() {
    return {
      newTodoText: ''
    }
  },
  computed: Vuex.mapGetters({
    list: 'getTodos',
    filter: 'getFilter',
    allCount: 'getAllCount',
    completedCount: 'getCompletedCount',
    incompleteCount: 'getIncompleteCount'
  }),
  methods: Vuex.mapActions({
    addTodo: 'addTodo',
    deleteTodo: 'deleteTodo',
    updateTodo: 'updateTodo',
    editTodo: 'editTodo',
    updateStatus: 'updateStatus',
    setFilter: 'setFilter'
  })
})
</script>

<style scoped lang="scss">
  @import "../assets/css/todo_list.scss";
</style>