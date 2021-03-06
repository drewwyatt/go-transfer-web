import { Types } from '../actions';
import { Availability, IAvailability, FetchStatus, IFetchStatus } from '../models';

const { FileActions } = Types;

export interface FileState {
    fetchStatus: IFetchStatus;
    errorReason: string;
    name: string;
    availability: IAvailability;
    uploadProgress: number;
}

const DEFAULT_STATE: FileState = {
    fetchStatus: FetchStatus.NOT_FETCHED,
    errorReason: '',
    name: '',
    availability: Availability.UNKNOWN,
    uploadProgress: 0
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
        case FileActions.ActionType.CHECK_FILE_AVAILABILITY:
            return Object.assign({}, state, {
                availability: Availability.UNKNOWN
            });
        case FileActions.ActionType.SET_FILE_AVAILABILITY:
            const { availability } = action.payload;
            return Object.assign({}, state, { availability });
        case FileActions.ActionType.REPORT_UPLOAD_PROGRESS:
            const { progress } = action.payload;
            return Object.assign({}, state, { uploadProgress: progress });
        default:
            return state;
    }
}