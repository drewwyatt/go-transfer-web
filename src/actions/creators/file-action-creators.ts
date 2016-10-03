import { FileActions } from '../types';

export namespace File {
    export function post(file: File): FileActions.PostFile {
        return {
            type: FileActions.ActionType.POST_FILE,
            payload: { file }
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
}