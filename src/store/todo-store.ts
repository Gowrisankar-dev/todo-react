import { makeObservable, observable, action, computed } from 'mobx';
import { ITodo } from '../todo-types';

export class TodoStore {

    constructor() {
        makeObservable(this, {
            todos: observable,
            addTodo: action,
            removeTodo: action,
            toggleTodo: action,
            todosCompletedCount: computed,
        })
    }


    todos: ITodo[] = [{
        id: Date.now(),
        title: 'First Todo',
        completed: false
    }];

    addTodo = (todo: string) => {
        if (todo.trim().length === 0) {
            return;
        }
        this.todos.push({
            id: Date.now(),
            title: todo,
            completed: false,
        });
    }

    removeTodo = (id: number) => {
        const index = this.todos.findIndex(item => item.id === id);
        this.todos.splice(index, 1);
    }

    toggleTodo = (todo: ITodo) => {
        todo.completed = !todo.completed;
        const index = this.todos.findIndex(item => item.id === todo.id);
        this.todos.splice(index, 1, todo);
    }

    get todosCompletedCount() {
        return this.todos.filter(todo => todo.completed).length;
    }

}