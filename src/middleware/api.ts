/// <reference path="fetch.d.ts" />
/**********************************************************************************************************
 * ^ it's weird that I'm having to do that, but it's the only way I can prevent errors in the browser -_- *
 **********************************************************************************************************/

import { Store, Action } from 'redux';
import { Types, Creators } from '../actions';
import { Availability } from '../models';

const { FileActions } = Types;

type Next = (action: Action) => any; // TODO

const API_BASE = 'https://go-transfer.herokuapp.com';

function postFile(file: File, fileName: string, progressCallback: (p: number) => void): Promise<void> {
    /**
     * Fetch doesn't have a progress API, so I had to switch to lower-level XHR request.
     */

    // return fetch(`${API_BASE}/${fileName}`, {
    //     method: 'POST',
    //     body: file
    // });

    /**
     * This is pretty mich stright from here:
     * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress
     */

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            console.log(this.readyState);
            if (this.readyState === 4) {
                console.log(this.responseText);
                resolve();
            }
        });

        // xhr.upload.addEventListener('progress', function(){ ... })

        xhr.upload.addEventListener('progress', function updateProgress (event: ProgressEvent) {
            if (event.lengthComputable) {
                progressCallback(Math.floor(event.loaded / event.total * 100));
            } else {
                // Unable to compute progress information since the total size is unknown
                progressCallback(0);
            }
        });

        xhr.open("POST", `${API_BASE}/${fileName}`);

        xhr.send(file);
    });
}

function handlePostFileSuccess(next: Next): () => Next {
    return function () {
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

function checkAvailability(filename: string): Promise<Response> {
    return fetch(`${API_BASE}/exists/${filename}`);
}

function handleFileAvailable(next: Next): (response: Response) => Next {
    return function (response: Response) {
        if (response.status !== 200) {
            throw new Error('File not available.');
        }

        return next(Creators.File.setAvailability(Availability.AVAILABLE));
    }
}

function handleFileNotAvailable(next: Next): (error: Error) => Next {
    return function (error) {
        return next(Creators.File.setAvailability(Availability.NOT_AVAILABLE));
    }
}

function createProgressCallback(dispatch: Next): (p: number) => void {
    return function (progress: number): void {
        dispatch(Creators.File.reportProgress(progress));
    }
}

export default (store: Store<any>) => (next: Next) => (action: Action) => {
    next(action);
    const dispatch = store.dispatch;
    switch (action.type) {
        case FileActions.ActionType.POST_FILE:
            const { file, name } = (action as Types.FileActions.PostFile).payload;

            return postFile(file, name, createProgressCallback(dispatch))
                .then(handlePostFileSuccess(dispatch))
                .catch(handlePostFileError(dispatch));
        case FileActions.ActionType.CHECK_FILE_AVAILABILITY:
            const { fileName } = (action as Types.FileActions.CheckFileAvailability).payload;

            return checkAvailability(fileName)
                .then(handleFileAvailable(next))
                .catch(handleFileNotAvailable(next));
    }
}