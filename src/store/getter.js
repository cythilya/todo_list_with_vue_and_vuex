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