import Vue from 'vue';
import mutations from './mutations';
import * as types from './mutations_type.js';

export const addTodo = ({ commit }) => {
  console.log('addTodo');
  commit(types.ADDTODO);
}

export const deleteTodo = ({ commit }, index) => {
  console.log('deleteTodo');
  commit(types.DELETETODO, index);
}

export const setFilter = ({ commit }, filter) => {
  console.log('setFilter');
  commit(types.SETFILTER, filter);
}