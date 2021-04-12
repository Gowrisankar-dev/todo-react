export interface ITodo {
    id: number,
    title: string,
    completed: boolean
}

export interface IActionProps {
    type: string,
    todo: ITodo
}