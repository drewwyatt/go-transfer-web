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

function handlePostFileSuccess(next: Next): (response: Response) => Next {
    return function (response: Response) {
        if (response.status !== 200) {
            throw new Error('Something went wrong.');
        }

        return next(Creators.File.reportSuccessfulPost());
    }
}

function handlePostFileError(next: Next): (error: Error) => Next {
    return function(error: Error) {
        console.warn('middleware.api.handlePostFileError');
        console.error(error);
        return next(Creators.File.reportFailedPost(error.message));
    };
}

export default (store: Store<any>) => (next: Next) => (action: Action) => {
    next(action);
    switch (action.type) {
        case FileActions.ActionType.POST_FILE:
            const { file, name } = (action as Types.FileActions.PostFile).payload;

            return postFile(file, name)
                .then(handlePostFileSuccess(next))
                .catch(handlePostFileError(next));
    }
}