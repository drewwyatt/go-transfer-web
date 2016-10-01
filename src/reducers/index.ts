import { Types } from '../actions';
import { ITodo } from '../models';

const { TodoActions } = Types;

export type TodosState = ITodo[];
export default function todos(state: TodosState = [], action: Types.TodoAction): TodosState {
    switch (action.type) {
        case TodoActions.ActionType.ADD_TODO:
            const { text } = action.payload;
            return [
                ...state,
                {
                    id: state.length + 1,
                    text,
                    completed: false
                }
            ];
        case TodoActions.ActionType.TOGGLE_TODO:
            const { id } = action.payload;
            const idx = state.findIndex(x => x.id === id);
            const todo = state[idx];
            return [
                ...state.slice(0, idx),
                Object.assign({}, todo, {
                    completed: !todo.completed
                }),
                ...state.slice(idx + 1)
            ];
        default:
            return state;
    }
}