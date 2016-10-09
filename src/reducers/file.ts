import { Types } from '../actions';
import { Availability, IAvailability, FetchStatus, IFetchStatus } from '../models';

const { FileActions } = Types;

export interface FileState {
    fetchStatus: IFetchStatus;
    errorReason: string;
    name: string;
    availability: IAvailability;
}

const DEFAULT_STATE: FileState = {
    fetchStatus: FetchStatus.NOT_FETCHED,
    errorReason: '',
    name: '',
    availability: Availability.UNKNOWN
};

export default function fileReducer(state: FileState = DEFAULT_STATE, action: Types.FileAction): FileState {
    switch (action.type) {
        case FileActions.ActionType.POST_FILE:
            return Object.assign({}, state, {
                fetchStatus: FetchStatus.FETCHING,
                errorReason: '',
                name: action.payload.name
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