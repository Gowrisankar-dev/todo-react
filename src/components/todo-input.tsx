import React from 'react';
import { TodoStore } from '../store/todo-store';

interface ITodoInputProps {
    addTodo: TodoStore['addTodo']
}

export const TodoInput: React.FC<ITodoInputProps> = ({ addTodo }) => {
    const [todo, setTodo] = React.useState('');

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(event.target.value);
    }

    const onAddTodoClick = () => {
        if ((todo.trim().length !== 0)) {
            addTodo(todo);
            setTodo('');
        }
    }
    
    const onInputKeyPress = (event: ({ key: string })) => {
        if(event.key === 'Enter'){
            onAddTodoClick();
        }
    }
    
    return (
        <div>
            <input type='text' value={todo} onChange={onInputChange} onKeyPress={onInputKeyPress} placeholder='Type Here!...' />
            <button onClick={onAddTodoClick}>Add Task</button>
        </div>
    );
}