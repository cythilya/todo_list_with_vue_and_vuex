<template>
  <div class="todos">
    <h1 class="todo-heading">Todo List with Vue.js and Vuex</h1>
    <b-form-input type="text" class="mb" placeholder="加入一個新工作" @keyup.enter="addTodo(newTodoText)" v-model="newTodoText"></b-form-input>
    <b-list-group class="todo-list" v-if="!(incompleteCount === 0 && filter === 'show_all')">
      <b-list-group-item class="todo-item" v-for="(todo, index) in list" :key="todo.uuid">
        <b-form-checkbox type="checkbox" @change="updateStatus(todo.uuid, todo.isCompleted)" :checked="todo.isCompleted"></b-form-checkbox>
        <span v-if="!todo.isEdit" v-bind:class="[todo.isCompleted ? 'completed' : '']">{{ todo.text }}</span>
        <b-form-input type="text" v-if="todo.isEdit" @keyup.enter="updateTodo(todo.uuid, $event.target.value)" class="mr input-inline" :value="todo.text"></b-form-input>
        <b-button @click="editTodo(todo)" v-if="!todo.isEdit" size="md" class="ml">編輯</b-button>
        <b-button @click="deleteTodo(index)" size="md" class="ml">刪除</b-button>
      </b-list-group-item>
    </b-list-group>
    <b-alert :show="incompleteCount === 0 && filter === 'show_all'"}>恭喜完成所有的項目！</b-alert>
    <br>
    <div class="col align-center">
      <b-button-group>
        <b-button @click="setFilter('show_all')" :class="{'inactive': filter === 'show_all'}" size="md">全部
          <b-badge>{{ allCount }}</b-badge>
        </b-button>
        <b-button class="btn-secondary" @click="setFilter('show_completed')" :class="{'inactive': filter === 'show_completed'}" size="md">已完成
          <b-badge>{{ completedCount }}</b-badge>
        </b-button>
        <b-button class="btn-secondary" @click="setFilter('show_incomplete')" :class="{'inactive': filter === 'show_incomplete'}" size="md">未完成
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
  methods: Object.assign({},
    Vuex.mapActions({
      addTodo: 'addTodo',
      deleteTodo: 'deleteTodo',
      // updateTodo: 'updateTodo',
      editTodo: 'editTodo',
      //updateStatus: 'updateStatus',
      setFilter: 'setFilter',
      changeTodoText: 'changeTodoText'
    }),
    {
      updateTodo: function(index, content) {
        this.$store.dispatch('updateTodo', {
          index: index,
          content: content
        })
      },
      updateStatus: function(index, isDone) {
         this.$store.dispatch('updateStatus', {
          index: index,
          isDone: isDone
        })
      }
    }
  )
})
</script>

<style scoped lang="scss">
@import "../assets/css/todo-list.scss";
</style>