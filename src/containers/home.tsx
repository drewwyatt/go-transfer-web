import * as React from 'react';
import { connect } from 'react-redux';
import { Creators } from '../actions';
import { IFetchStatus, FetchStatus } from '../models';

export interface HomeProps {
    fileStatus: IFetchStatus;
    errorReason: string;
    postFile(file: File): void;
}

class Home extends React.Component<HomeProps, void> {
    render(): JSX.Element {
        const { fileStatus, errorReason } = this.props;        
        return (
            <section>
                <input type='file' onChange={this._onFileChange.bind(this)} />
                <br /><br /><br />
                <fieldset>
                    <legend>Upload Status</legend>
                    { fileStatus }
                </fieldset>
                <br />
                <fieldset>
                    <legend>Error Messages</legend>
                    { errorReason }
                </fieldset>
            </section>
        );
    }

    private _onFileChange(event: Event): void {
        const { postFile } = this.props;
        event.preventDefault();
        const input = event.target as HTMLInputElement;
        if (this._filesExist(input)) {
            postFile(input.files[0]);
        }
    }

    private _filesExist(input: HTMLInputElement): boolean {
        return !!(input && input.files && input.files.length);
    }
}

function mapStateToProps(state) {
    return {
        fileStatus: state.file.fetchStatus,
        errorReason: state.file.errorReason
    };
}

export default connect(mapStateToProps, { postFile: Creators.File.post })(Home);