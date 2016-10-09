import { FileActions } from '../types';
import { IAvailability } from '../../models';

export namespace File {
    export function post(file: File, name: string): FileActions.PostFile {
        return {
            type: FileActions.ActionType.POST_FILE,
            payload: { file, name }
        };
    }

    export function reportSuccessfulPost(): FileActions.PostFileSuccess {
        return {
            type: FileActions.ActionType.POST_FILE_SUCCESS,
            payload: {}
        };
    } 

    export function reportFailedPost(reason: string): FileActions.PostFileError {
        return {
            type: FileActions.ActionType.POST_FILE_ERROR,
            payload: { reason }
        };
    }

    export function checkAvailability(fileName: string): FileActions.CheckFileAvailability {
        return {
            type: FileActions.ActionType.CHECK_FILE_AVAILABILITY,
            payload: { fileName }
        };
    }

    export function setAvailability(availability: IAvailability): FileActions.SetFileAvailability {
        return {
            type: FileActions.ActionType.SET_FILE_AVAILABILITY,
            payload: { availability }
        };
    }
}