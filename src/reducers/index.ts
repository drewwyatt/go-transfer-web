export interface Todo {
    title: string;
    completed: boolean;
}

export type TodosState = Todo[];

export interface Action {
    type: string;
    payload: any;
}

export default function todos(state: TodosState = [], action: Action): TodosState {
    switch (action.type) {
        default:
            return state;
    }
}