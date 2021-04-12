import React from 'react';
import { TodoStore } from './store/todo-store';

interface IAppStoreContextValue {
    todoStore: TodoStore
}

const todoStore = new TodoStore();

export const AppStoreContext = React.createContext<IAppStoreContextValue>({} as IAppStoreContextValue);

export const AppStoreContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <AppStoreContext.Provider value={{ todoStore }}>
            {children}
        </AppStoreContext.Provider>
    )
}