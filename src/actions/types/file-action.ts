import { BaseAction } from './base-action';

export type FileAction = FileActions.PostFile;

export namespace FileActions {
    export const ActionType = {
        POST_FILE: 'POST_FILE' as 'POST_FILE'
    };

    export interface PostFile extends BaseAction {
        type: 'POST_FILE';
        payload: { file: File };
    };

    export interface PostFileSuccess extends BaseAction {
        type: 'POST_FILE_SUCCESS',
        payload: {}
    };

    export interface PostFileError extends BaseAction {
        type: 'POST_FILE_ERROR',
        payload: { reason: string }
    };
}