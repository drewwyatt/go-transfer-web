import { FileActions } from '../types';

export namespace File {
    export function post(file: File): FileActions.PostFile {
        return {
            type: FileActions.ActionType.POST_FILE,
            payload: { file }
        };
    }
}