import React from 'react';
import './App.css';
import { observer } from 'mobx-react'
import { AppStoreContext } from './app-store-context';
import { TodoInput } from './components/todo-input';
import { TodoItem } from './components/todo-item';

const App = observer(() => {
  const { todoStore } = React.useContext(AppStoreContext);
  return (
    <div className='todos-container'>
      <TodoInput addTodo={todoStore.addTodo} />
      {
        todoStore.todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              removeTodo={todoStore.removeTodo}
              toggleTodo={todoStore.toggleTodo}
              key={todo.id}
            />
          )
        })
      }
      <div>{todoStore.availableTodosCount} item(s) available</div>
      <div>{todoStore.todosCompletedCount} item(s) completed</div>
      <div>
        <button onClick = {todoStore.onUndoAction}>Undo</button>
        <button onClick = {todoStore.onRedoAction}>Redo</button>
      </div>
    </div>
  );
})

export default App;
