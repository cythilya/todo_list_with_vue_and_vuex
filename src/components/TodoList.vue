<template>
  <div class="todos">
    <h1 class="todo-heading">Todo List with Vue.js and Vuex</h1>
    <div class="add-new-item">
      <b-form-input type="text" class="new-item" placeholder="加入一個新工作" @keyup.enter="addTodo(newTodoText)" v-model="newTodoText"></b-form-input>
    </div>
    <b-list-group class="todo-list" v-if="!(incompleteCount === 0 && filter === 'show_all')">
      <b-list-group-item class="todo-item" v-for="(todo, index) in list">
        <b-form-checkbox type="checkbox" @change="updateStatus(todo)" :checked="todo.isCompleted"></b-form-checkbox>
        <span v-if="!todo.isEdit" v-bind:class="[todo.isCompleted ? 'completed' : '']">{{ todo.text }}</span>
        <input type="text" v-if="todo.isEdit" @keyup.enter="updateTodo(todo)" v-model="todo.text" />
        <b-button @click="editTodo(todo)" v-if="!todo.isEdit" size="sm">編輯</b-button>
        <b-button @click="deleteTodo(index)" size="sm">刪除</b-button>
      </b-list-group-item>
    </b-list-group>
    <b-alert :show="incompleteCount === 0 && filter === 'show_all'"}>恭喜完成所有的項目！</b-alert>
    <br>
    <div class="control col">
      <b-button-group>
        <b-button @click="setFilter('show_all')" :class="{'inactive': filter === 'show_all'}">全部
          <b-badge>{{ allCount }}</b-badge>
        </b-button>
        <b-button class="btn-secondary" @click="setFilter('show_completed')" :class="{'inactive': filter === 'show_completed'}">已完成
          <b-badge>{{ completedCount }}</b-badge>
        </b-button>
        <b-button class="btn-secondary" @click="setFilter('show_incomplete')" :class="{'inactive': filter === 'show_incomplete'}">未完成
          <b-badge>{{ incompleteCount }}</b-badge>
        </b-button>
      </b-button-group>
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