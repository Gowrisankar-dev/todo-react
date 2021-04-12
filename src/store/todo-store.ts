import { makeObservable, observable, action, computed } from 'mobx';
import { ITodo, IActionProps } from '../todo-types';

const getTodoIndex = (todos: ITodo[], id: number) => {
    return todos.findIndex(item => item.id === id);
};

const getUpdatedActioProps = (actionProps: IActionProps) => {
    const { type, todo } = actionProps;
    const updatedActionProps = { type, todo };

    if(type === 'add'){
        updatedActionProps.type = 'remove';
    } else if(type === 'remove') {
        updatedActionProps.type = 'add';
    } else {
        updatedActionProps.todo = { ...todo, completed: !todo.completed}
    }

    return updatedActionProps;
};

const isTodoAvailable = (todos: ITodo[], id: number) => {
    return todos.some(item => item.id === id);
};

export class TodoStore {

    undoActionSubscriber: IActionProps[] = [];
    redoActionSubscriber: IActionProps[] = [];

    constructor() {
        makeObservable(this, {
            todos: observable,
            addTodo: action,
            removeTodo: action,
            toggleTodo: action,
            onUndoAction: action,
            onRedoAction: action,
            todosCompletedCount: computed,
            availableTodosCount: computed
        })
    }


    todos: ITodo[] = [];

    addTodo = (todo: string) => {
        if (todo.trim().length === 0) {
            return;
        }
        const structuredTodo = {
            id: Date.now(),
            title: todo,
            completed: false,
        };

        this.todos.push(structuredTodo);
        this.undoActionSubscriber.push({ type: 'add', todo: structuredTodo });
    }

    removeTodo = (id: number) => {
        const index = getTodoIndex(this.todos, id);
        this.undoActionSubscriber.push({ type: 'remove', todo: this.todos[index] });
        this.todos.splice(index, 1);
    }

    toggleTodo = (todo: ITodo) => {
        todo.completed = !todo.completed;
        const index = getTodoIndex(this.todos, todo.id);
        this.todos.splice(index, 1, todo);
        this.undoActionSubscriber.push({ type: 'toggle', todo: this.todos[index] });
    }

    get todosCompletedCount() {
        return this.todos.filter(todo => todo.completed).length;
    }

    get availableTodosCount() {
        return this.todos.filter(todo => !todo.completed).length
    }

    onUndoAction = () => {
        const [actionProps] = this.undoActionSubscriber.splice(-1,1);
        if(actionProps){
            const { type, todo } = getUpdatedActioProps(actionProps);
            this.redoActionSubscriber.push({ type, todo });
            const index = getTodoIndex(this.todos, todo.id);
            (type === 'remove') 
                ? this.todos.splice(index, 1) 
                : isTodoAvailable(this.todos, todo.id) 
                    ? this.todos.splice(index, 1, todo) 
                    : this.todos.push(todo);
        }
    }

    onRedoAction = () => {
        const [actionProps] = this.redoActionSubscriber.splice(-1,1);
        if(actionProps){
            const { type, todo } = getUpdatedActioProps(actionProps);
            this.undoActionSubscriber.push({ type, todo });
            const index = getTodoIndex(this.todos, todo.id);
            (type === 'remove') 
                ? this.todos.splice(index, 1) 
                : isTodoAvailable(this.todos, todo.id) 
                    ? this.todos.splice(index, 1, todo) 
                    : this.todos.push(todo);
        } 
    }

}