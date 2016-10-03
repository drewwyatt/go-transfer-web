import { BaseAction } from './base-action';

export type FileAction = FileActions.PostFile | FileActions.PostFileSuccess | FileActions.PostFileError;

export namespace FileActions {
    export const ActionType = {
        POST_FILE: 'POST_FILE' as 'POST_FILE',
        POST_FILE_SUCCESS: 'POST_FILE_SUCCESS' as 'POST_FILE_SUCCESS',
        POST_FILE_ERROR: 'POST_FILE_ERROR' as 'POST_FILE_ERROR'
    };

    export interface PostFile extends BaseAction {
        type: 'POST_FILE';
        payload: { file: File };
    };

    export interface PostFileSuccess extends BaseAction {
        type: 'POST_FILE_SUCCESS',
        payload: { link: string }
    };

    export interface PostFileError extends BaseAction {
        type: 'POST_FILE_ERROR',
        payload: { reason: string }
    };
}