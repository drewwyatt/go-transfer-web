import { TodoActions } from '../types';

export namespace Todo {
    export function addTodo(text: string): TodoActions.AddTodo {
        return {
            type: TodoActions.ActionType.ADD_TODO,
            payload: { text }
        };
    }

    export function toggleTodo(id: number): TodoActions.ToggleTodo {
        return {
            type: TodoActions.ActionType.TOGGLE_TODO,
            payload: { id }
        };
    }
}