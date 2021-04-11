import React from 'react';
import './App.css';
import { useObserver, observer } from 'mobx-react-lite'
import { TodoContext } from './app-store-context';
import { TodoInput } from './components/todo-input';
import { TodoItem } from './components/todo-item';

function App() {
  const { todoStore } = React.useContext(TodoContext);
  return useObserver(() =>
      <div className='todos-container'>
        <TodoInput addTodo={todoStore.addTodo} />
        {
          todoStore.todos.map((todo) => {
            <TodoItem
              todo={todo}
              removeTodo={todoStore.removeTodo}
              toggleTodo={todoStore.toggleTodo}
              key={todo.id}
            />
          })
        }
        <div>{todoStore.todosCompletedCount} Task(s) Completed</div>
      </div>
  );
}

export default App;
