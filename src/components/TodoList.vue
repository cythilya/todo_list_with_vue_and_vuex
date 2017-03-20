<template>
  <div>
    <h1>Todo List with Vue.js and Vuex</h1>
    <div class="add-new-item">
      <input type="text" v-model="newTodoText" v-on:keyup.enter="add" placeholder="加入一個新工作" class="new-item" />
    </div>
    <ul class="todo-list" v-if="!(incompleteCount === 0 && filter === 'show_all')">
      <todo-item v-for="(todo, key, index) in list" :key="todo.uuid" :todo="todo" :index="key" :filter="filter" class="todo-item" v-on:remove="del(key)"></todo-item>
    </ul>
    <div class="msg" v-if="incompleteCount === 0 && filter === 'show_all'">恭喜完成所有的項目！</div>
    <div class="control">
      <a v-on:click="setFilter('show_all')" class="btn" :class="{ active: filter === 'show_all'}">全部 ({{ allCount }})</a>
      <a v-on:click="setFilter('show_completed')" class="btn" :class="{ active: filter === 'show_completed'}">已完成 ({{ completedCount }})</a>
      <a v-on:click="setFilter('show_incomplete')" class="btn" :class="{ active: filter === 'show_incomplete'}">未完成 ({{ incompleteCount }})</a>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';

Vue.component( 'todo-item' , {
  props: ['todo', 'index', 'filter'],
  template:`<li>
    <input type="checkbox" :id="todo.uuid" v-on:change="updateStatus(todo)" :checked="todo.isCompleted">
    <label :for="todo.uuid" v-if="!todo.isEdit" v-bind:class="[todo.isCompleted ? 'completed' : '']">{{ todo.text }}</label>
    <input type="text" v-if="todo.isEdit" v-on:keyup.enter="updateTodo($event, todo)" v-model="todo.text" />
    <a v-on:click="editTodo(todo)" v-if="!todo.isEdit" class="btn">編輯</a>
    <a v-on:click="remove(index)" class="btn">刪除</a>
  </li>`,
  methods: {
    remove(index) {
      this.$emit('remove');
    },
    updateTodo($event, todo) {
      if($event.target.value) {
        todo.text = $event.target.value;
      }
      todo.isEdit = !todo.isEdit;
    },
    updateStatus(todo) {
      todo.isCompleted = !todo.isCompleted;
    },
    editTodo(todo) {
      todo.isEdit = !todo.isEdit;
    },
    showCompletedTodo(isCompleted, filter) {
      return !(!isCompleted && filter === 'show_completed');
    }
  }
});

export default {
  name: 'TodoList',
  data () {
    return {
      todos: {
        "a5436691-350c-4ed0-862e-c8abc8509a4a": {
          "uuid": "a5436691-350c-4ed0-862e-c8abc8509a4a",
          "text": "買一本好書",
          "isCompleted": false,
          "isEdit": false
        },
        "a98bf666-a710-43b2-81b2-60c68ec4688d": {
          "uuid": "a98bf666-a710-43b2-81b2-60c68ec4688d",
          "text": "打電話給小明",
          "isCompleted": true,
          "isEdit": false
        },
        "452ef417-033d-48ff-9fec-9d686c105dce": {
          "uuid": "452ef417-033d-48ff-9fec-9d686c105dce",
          "text": "寫一篇文章",
          "isCompleted": false,
          "isEdit": false
        }
      },
      newTodoText: '',
      filter: 'show_all'
    }
  },
  computed: {
    list () {
      if(this.filter === 'show_all') {
        return this.todos;
      } else if (this.filter === 'show_completed') {
        return this._getTodos(true);
      } else { //show_incomplete
        return this._getTodos(false);
      }
    },
    allCount () {
      return Object.keys(this.todos).length;
    },
    completedCount () {
      var _this = this;

      return Object.keys(this.todos).filter(function(value) {
        return _this.todos[value].isCompleted
      }).length;
    },
    incompleteCount () {
      var _this = this;

      return Object.keys(this.todos).filter(function(value) {
        return !_this.todos[value].isCompleted
      }).length;
    }
  },
  methods: {
    add () {
      var id = this._uuid();

      Vue.set(this.todos, id, {
        uuid: id,
        text: this.newTodoText,
        isCompleted: false,
        isEdit: false
      });

      this.newTodoText = '';
    },
    del (index) {
      Vue.delete(this.todos, index);
    },
    setFilter (filter) {
      this.filter = filter;
    },
    _uuid () {
      var d = Date.now();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
          d += performance.now(); //use high-precision timer if available
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    },
    _getTodos(isCompleted) {
      var list = {};

      for(var index in this.todos) {
        if(this.todos[index].isCompleted === isCompleted) {
          list[index] = this.todos[index];
        }
      }
      return list;
    },
    _getObjContent(data) {
      return  Object.keys(data).map(function(index){
        return data[index];
      });
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html{color:#000;background:#FFF}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,select,p,blockquote,th,td{margin:0;padding:0}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}address,button,caption,cite,code,dfn,em,input,optgroup,option,select,strong,textarea,th,var{font:inherit}del,ins{text-decoration:none}li{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}q:before,q:after{content:''}abbr,acronym{border:0;font-variant:normal}sup{vertical-align:baseline}sub{vertical-align:baseline}legend{color:#000}

.clearfix{zoom:1;}
.clearfix:after{content:'.';display:block;clear:both;visibility:hidden;height:0;font-size:0;}

html{background:#41d2f2;font-family:'微軟正黑體',sans-serif}.todos{background:#fff;border-radius:10px;width:600px;margin:15px auto;padding:15px}.todo-heading{font-size:30px;margin:0 0 15px 0}.add-new-item{margin:0 0 15px 0;font-size:15px}.todo-list{font-size:15px;color:#525252}.todo-item{margin:0 0 15px 0}.msg{margin:0 0 15px 0;font-size:15px;color:#525252}.btn{border:1px solid #ccc;border-radius:10px;cursor:pointer;display:inline-block;margin:0 5px;padding:5px 10px;min-width:30px;text-align:center}.btn.active,.btn:hover{background:#ccc;color:#fff}.control{border-top:1px solid #ddd;color:#525252;font-size:15px;padding:15px 0 0 0}.mb{margin:0 0 15px 0}.completed{text-decoration:line-through}input[type=text]{border:1px solid #ddd;border-radius:10px;color:#525252;line-height:1.2;height:22px;padding:5px}
</style>