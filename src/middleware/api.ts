import { Store, Action } from 'redux';
import { Types, BaseAction } from '../actions';

const { FileActions } = Types;

function postFile(file: File): Promise<Response> {
    const name = file.name.split('.');
    const extension = name[name.length - 1];
    return fetch(`https://go-transfer.herokuapp.com/${new Date().getMilliseconds().toString()}.${extension}`, {
        method: 'POST',
        body: file
    })
}

export default (store: Store<any>) => (next: (action: Action) => void) => (action: Action) => {
    let actionableAction: Action;
    switch (action.type) {
        case FileActions.ActionType.POST_FILE:
            actionableAction = action as Types.FileAction;
        default:
            return next(action);
    }
}