import * as React from 'react';
import { connect } from 'react-redux';
import { Creators } from '../actions';
import { IFetchStatus, FetchStatus, IAppState } from '../models';
import { Spinner, Textfield } from 'react-mdl';
import { FileDrop } from '../components/file-drop';

export interface UploadProps {
    fileStatus: IFetchStatus;
    errorReason: string;
    fileName: string;
    postFile(file: File): void;
}

class Upload extends React.Component<UploadProps, void> {
    render(): JSX.Element {
        const { fileStatus, errorReason } = this.props;        
        return (
            <section>
                <FileDrop onFile={this._onFile.bind(this)} />

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
        const { fileName, fileStatus } = this.props;
        if (fileName && fileName.trim() && (fileStatus === FetchStatus.FETCHING || fileStatus === FetchStatus.SUCCESS)) {
            return (
                <div>
                    <Textfield label='Your Link' floatingLabel value={`http:localhost:3000/download/${fileName}`} />
                </div>
            );
        }
    }

    private _onFile(file: File): void {
        if (file) {
            this.props.postFile(file);
        }
    }
}

function generateFileName(file: File): string {
    const name = file.name.split('.');
    const extension = name[name.length - 1];
    return `${new Date().getMilliseconds().toString()}.${extension}`;
}

function mapStateToProps(state: IAppState): any { // TODO
    return {
        fileStatus: state.file.fetchStatus,
        errorReason: state.file.errorReason,
        fileName: state.file.name
    };
}

function mapDispatchToProps(dispatch): any { // TODO
    return {
        postFile: function (file: File) {
            dispatch(Creators.File.post(file, generateFileName(file)));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);