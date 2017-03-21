export const getTodos = state => {
  function _getTodos(isCompleted) {
    var list = {};

    for(var index in state.todos) {
      if(state.todos[index].isCompleted === isCompleted) {
        list[index] = state.todos[index];
      }
    }
    return list;
  }

  if(state.filter === 'show_all') {
    return state.todos;
  } else if (state.filter === 'show_completed') {
    return _getTodos(true);
  } else { //show_incomplete
    return _getTodos(false);
  }
}

export const getFilter = state => { return state.filter }

export const getAllCount = state => {
  return Object.keys(state.todos).length;
}

export const getCompletedCount = state => {
  return Object.keys(state.todos).filter(function(value) {
    return state.todos[value].isCompleted
  }).length;
}

export const getIncompleteCount = state => {
  return Object.keys(state.todos).filter(function(value) {
    return !state.todos[value].isCompleted
  }).length;
}