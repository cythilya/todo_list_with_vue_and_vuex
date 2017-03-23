import Vue from 'vue';
import * as types from './mutations_type.js';

// state
export const state = {
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
      "isCompleted": false,
      "isEdit": false
    },
    "452ef417-033d-48ff-9fec-9d686c105dce": {
      "uuid": "452ef417-033d-48ff-9fec-9d686c105dce",
      "text": "寫一篇文章",
      "isCompleted": false,
      "isEdit": false
    }
  },
  filter: 'show_all'
}

// mutations
export const mutations = {
  [types.ADDTODO](state, newTodoText) {
    var id = _uuid();

    function _uuid () {
      var d = Date.now();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }

    Vue.set(state.todos, id, {
      uuid: id,
      text: newTodoText,
      isCompleted: false,
      isEdit: false
    });
  },
  [types.DELETETODO](state, index) {
    Vue.delete(state.todos, index);
  },
  [types.UPDATETODO](state, payload) {
    state.todos[payload.index].text = payload.content;
    state.todos[payload.index].isEdit = false;
  },
  [types.EDITTODO](state, todo) {
    state.todos[todo.uuid].isEdit = true;
  },
  [types.UPDATESTATUS](state, payload) {
    state.todos[payload.index].isCompleted = !payload.isDone;
  },
  [types.SETFILTER](state, filter) {
    state.filter = filter;
  }
}