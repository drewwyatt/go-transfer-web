import { BaseAction } from './base-action';
import { IAvailability } from '../../models';

export type FileAction = FileActions.PostFile | FileActions.PostFileSuccess | FileActions.PostFileError | FileActions.CheckFileAvailability | FileActions.SetFileAvailability | FileActions.ReportUploadProgress;

export namespace FileActions {
    export const ActionType = {
        POST_FILE: 'POST_FILE' as 'POST_FILE',
        POST_FILE_SUCCESS: 'POST_FILE_SUCCESS' as 'POST_FILE_SUCCESS',
        POST_FILE_ERROR: 'POST_FILE_ERROR' as 'POST_FILE_ERROR',
        
        CHECK_FILE_AVAILABILITY: 'CHECK_FILE_AVAILABILITY' as 'CHECK_FILE_AVAILABILITY',
        SET_FILE_AVAILABILITY: 'SET_FILE_AVAILABILITY' as 'SET_FILE_AVAILABILITY',

        REPORT_UPLOAD_PROGRESS: 'REPORT_UPLOAD_PROGRESS' as 'REPORT_UPLOAD_PROGRESS',
    };

    export interface PostFile extends BaseAction {
        type: 'POST_FILE';
        payload: { file: File, name: string };
    };

    export interface PostFileSuccess extends BaseAction {
        type: 'POST_FILE_SUCCESS',
        payload: {}
    };

    export interface PostFileError extends BaseAction {
        type: 'POST_FILE_ERROR',
        payload: { reason: string }
    };

    export interface CheckFileAvailability extends BaseAction {
        type: 'CHECK_FILE_AVAILABILITY',
        payload: { fileName: string }
    };

    export interface SetFileAvailability extends BaseAction {
        type: 'SET_FILE_AVAILABILITY',
        payload: { availability: IAvailability }
    };

    export interface ReportUploadProgress extends BaseAction {
        type: 'REPORT_UPLOAD_PROGRESS',
        payload: { progress: number }
    }
}