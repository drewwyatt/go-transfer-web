import { Store, Action } from 'redux';
import { Types, Creators } from '../actions';

const { FileActions } = Types;

type Next = (action: Action) => any; // TODO

function postFile(file: File): Promise<Response> {
    const name = file.name.split('.');
    const extension = name[name.length - 1];
    return fetch(`https://go-transfer.herokuapp.com/${new Date().getMilliseconds().toString()}.${extension}`, {
        method: 'POST',
        body: file
    })
}

function handlePostFileSuccess(next: Next): (response: Response) => Next {
    return function (response: Response) {
        if (response.status === 200) {
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
    switch (action.type) {
        case FileActions.ActionType.POST_FILE:
            return postFile((action as Types.FileActions.PostFile).payload.file)
                .then(handlePostFileSuccess(next))
                .catch(handlePostFileError(next));
        default:
            return next(action);
    }
}