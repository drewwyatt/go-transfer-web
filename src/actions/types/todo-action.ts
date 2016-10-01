import { BaseAction } from './base-action';
import { ITodo } from '../../models';

export type TodoAction = TodoActions.AddTodo | TodoActions.ToggleTodo;



export namespace TodoActions {
    export const ActionType = {
        ADD_TODO: 'ADD_TODO' as 'ADD_TODO',
        TOGGLE_TODO: 'TOGGLE_TODO' as 'TOGGLE_TODO'
    };

    export interface AddTodo extends BaseAction {
        type: 'ADD_TODO';
        payload: { text: string };
    };

    export interface ToggleTodo extends BaseAction {
        type: 'TOGGLE_TODO';
        payload: { id: number };
    };
}