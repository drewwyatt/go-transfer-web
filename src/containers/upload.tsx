import * as React from 'react';
import { connect } from 'react-redux';
import { Creators } from '../actions';
import { IFetchStatus, FetchStatus, IAppState } from '../models';
import { Spinner, Textfield, Button, ProgressBar } from 'react-mdl';
import { FileDrop } from '../components/file-drop';
import { ComboField } from '../components/combo-field';
import { FileName } from '../components/file-name';

export interface UploadProps {
    fileStatus: IFetchStatus;
    errorReason: string;
    fileName: string;
    uploadProgress: number;
    postFile(file: File): void;
}

class Upload extends React.Component<UploadProps, void> {
    render(): JSX.Element {
        const { fileStatus, errorReason, fileName } = this.props;      

        const comboWrapperStyles = {
            height: (fileName && fileName.trim()) ? '36px' : '0',
            overflow: 'hidden',
            transition: 'height 500ms ease-out'
        };

        const comboStyles = {
            opacity: (fileName && fileName.trim()) ? 1 : 0,
            transition: 'opacity 1000ms ease-out',
            transitionDelay: '400ms'
        };

        return (
            <section>
                <h1>{this._getHeader()}</h1>
                <div className='mdl-grid'>
                    <div className='mdl-cell mdl-cell--12-col' style={comboWrapperStyles}> 
                        <ComboField styles={comboStyles} text={this._fileUrl(fileName)} /> 
                    </div>
                </div>
               <div className='mdl-grid'>
                    <div className='mdl-cell mdl-cell--12-col'>  
                         <FileDrop onFile={this._onFile.bind(this)} />
                    </div>
                </div>

                {this._progressIndicator()}
                {this._errorMessageIfExists()}
            </section>
        );
    }

    private _getHeader(): string {
        return this.props.fileStatus === FetchStatus.NOT_FETCHED ? 'DROP YOUR FILE' : 'COPY THIS LINK';
    }

    private _fileUrl(fileName: string): string {
        return [
            window.location.origin,
            process.env.BASE_PATH,
            'download',
            fileName
        ].filter(i => i !== '/').join('/');
    }


    private _progressIndicator(): JSX.Element {
        const { fileStatus, uploadProgress } = this.props;
        console.log('_progressIndicator', uploadProgress);
        if (fileStatus === FetchStatus.FETCHING) {
            const msg = (uploadProgress === 100) ? 'DONE!' : '';
            return (
                <div style={{ textAlign: 'center' }}>
                    <ProgressBar style={{ margin: '10px auto' }} progress={uploadProgress} />
                    <p style={{ display: 'block' }}>{msg}</p>
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
    return FileName.generate(extension);
}

function mapStateToProps(state: IAppState): any { // TODO
    return {
        fileStatus: state.file.fetchStatus,
        errorReason: state.file.errorReason,
        fileName: state.file.name,
        uploadProgress: state.file.uploadProgress
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