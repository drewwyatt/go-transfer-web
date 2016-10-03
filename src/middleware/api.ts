/// <reference path="fetch.d.ts" />
/**********************************************************************************************************
 * ^ it's weird that I'm having to do that, but it's the only way I can prevent errors in the browser -_- *
 **********************************************************************************************************/

import { Store, Action } from 'redux';
import { Types, Creators } from '../actions';

const { FileActions } = Types;

type Next = (action: Action) => any; // TODO

const API_BASE = 'https://go-transfer.herokuapp.com';

function postFile(file: File, fileName: string): Promise<Response> {

    return fetch(`${API_BASE}/${fileName}`, {
        method: 'POST',
        body: file
    });
}

function handlePostFileSuccess(next: Next, fileName: string): (response: Response) => Next {
    return function (response: Response) {
        if (response.status !== 200) {
            throw new Error('Something went wrong.');
        }

        return next(Creators.File.reportSuccessfulPost(`${API_BASE}/${fileName}`));
    }
}

function handlePostFileError(next: Next): (error: Error) => Next {
    return function(error: Error) {
        console.warn('middleware.api.handlePostFileError');
        console.error(error);
        return next(Creators.File.reportFailedPost(error.message));
    };
}

function generateFileName(file: File): string {
    const name = file.name.split('.');
    const extension = name[name.length - 1];
    return `${new Date().getMilliseconds().toString()}.${extension}`;
}

export default (store: Store<any>) => (next: Next) => (action: Action) => {
    switch (action.type) {
        case FileActions.ActionType.POST_FILE:
            const file = (action as Types.FileActions.PostFile).payload.file;
            const fileName = generateFileName(file);
            return postFile(file, fileName)
                .then(handlePostFileSuccess(next, fileName))
                .catch(handlePostFileError(next));
        default:
            return next(action);
    }
}