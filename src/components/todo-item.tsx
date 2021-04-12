import React from 'react';
import { ITodo } from '../todo-types';
import { TodoStore } from '../store/todo-store';

interface ITodoItem {
    todo: ITodo,
    removeTodo: TodoStore['removeTodo'],
    toggleTodo: TodoStore['toggleTodo']
}

export const TodoItem: React.FC<ITodoItem> = ({ todo, removeTodo, toggleTodo }) => {

    return (
        <div>
            <input type='checkbox' onChange={() => { toggleTodo(todo) }} checked={todo.completed} />
            <span>{todo.title}</span>
            <button onClick={() => { removeTodo(todo.id) }}>X</button>
        </div>
    );

}