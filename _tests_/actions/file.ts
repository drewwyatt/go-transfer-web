import { Creators, Types } from '../../src/actions';

it('Can create file actions...', () => {
    const file = new File(['foo'], 'some-file.txt');
    const name = 'a-file-name';
    const reason = 'Test Reason';

    expect(Creators.File.post(file, name)).toEqual({
        type: Types.FileActions.ActionType.POST_FILE,
        payload: { file, name }
    });

    expect(Creators.File.reportSuccessfulPost()).toEqual({
        type: Types.FileActions.ActionType.POST_FILE_SUCCESS,
        payload: {}
    });

    expect(Creators.File.reportFailedPost(reason)).toEqual({
        type: Types.FileActions.ActionType.POST_FILE_ERROR,
        payload: { reason }
    });
});