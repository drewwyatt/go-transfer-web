import * as React from 'react';
import { connect } from 'react-redux';
import { Creators } from '../actions';
import { IFetchStatus, FetchStatus, IAppState } from '../models';
import { Spinner } from 'react-mdl';

export interface HomeProps {
    fileStatus: IFetchStatus;
    errorReason: string;
    fileLink: string;
    postFile(file: File): void;
}

class Home extends React.Component<HomeProps, void> {
    render(): JSX.Element {
        const { fileStatus, errorReason } = this.props;        
        return (
            <section>
                <input type='file' onChange={this._onFileChange.bind(this)} />

                {this._spinnerIfUploading()}
                {this._linkIfExists()}
                <br /><br />
                {this._errorMessageIfExists()}
            </section>
        );
    }

    private _spinnerIfUploading(): JSX.Element {
        const { fileStatus } = this.props;
        if (fileStatus === FetchStatus.FETCHING) {
            return (
                <div>
                    <br />
                    <Spinner />
                    <br />
                </div>
            );
        }
    }

    private _errorMessageIfExists(): JSX.Element {
        const { errorReason } = this.props;
        if (errorReason && errorReason.trim()) {
            return (
                <fieldset>
                    <legend>Error Messages</legend>
                    { errorReason }
                </fieldset>
            );
        }
    }

    private _linkIfExists(): JSX.Element {
        const { fileLink } = this.props;
        if (fileLink && fileLink.trim()) {
            return <a href={fileLink} target='_blank'>DOWNLOAD THE FILE</a>;
        }
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

function mapStateToProps(state: IAppState): any { // TODO
    return {
        fileStatus: state.file.fetchStatus,
        errorReason: state.file.errorReason,
        fileLink: state.file.link
    };
}

export default connect(mapStateToProps, { postFile: Creators.File.post })(Home);