import { Types } from '../actions';
import { FetchStatus, IFetchStatus } from '../models';

const { FileActions } = Types;

export interface FileState {
    fetchStatus: IFetchStatus,
    errorReason: ''
}

const DEFAULT_STATE: FileState = {
    fetchStatus: FetchStatus.NOT_FETCHED,
    errorReason: ''
};

export default function fileReducer(state: FileState = DEFAULT_STATE, action: Types.FileAction): FileState {
    switch (action.type) {
        case FileActions.ActionType.POST_FILE:
            return Object.assign({}, state, {
                fetchStatus: FetchStatus.FETCHING,
                errorReason: ''
            });
        case FileActions.ActionType.POST_FILE_SUCCESS:
            return Object.assign({}, state, {
                fetchStatus: FetchStatus.SUCCESS
            });
        case FileActions.ActionType.POST_FILE_ERROR:
            return Object.assign({}, state, {
                fetchStatus: FetchStatus.ERROR,
                errorReason: action.payload.reason
            });
        default:
            return state;
    }
}