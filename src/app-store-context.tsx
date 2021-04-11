import React from 'react';
import { TodoStore } from './store/todo-store';

interface IAppStoreContextValue {
    todoStore: TodoStore
}

export const TodoContext = React.createContext<IAppStoreContextValue>({} as IAppStoreContextValue);

const todoStore = new TodoStore();

export const TodoContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <TodoContext.Provider value={{ todoStore }}>
            {children}
        </TodoContext.Provider>
    )
}