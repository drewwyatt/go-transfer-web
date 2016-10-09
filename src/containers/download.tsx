import * as React from 'react';
import { connect } from 'react-redux';
import { Creators } from '../actions';
import { IAppState, IAvailability, Availability } from '../models';

export interface DownloadProps {
    fileName: string;
    fileAvailability: IAvailability;
    checkAvailability(fileName: string): void;
}

class Download extends React.Component<DownloadProps, void> {
    componentWillMount(): void {
        const { fileName, checkAvailability } = this.props;
        checkAvailability(fileName);
    }

    render(): JSX.Element {
        return (
            <div>
                <p>this is the download page</p>
                {this._linkIfExists()}
            </div>
        );
    }

    private _linkIfExists(): JSX.Element {
        const { fileName, fileAvailability } = this.props;
        if (fileAvailability === Availability.AVAILABLE) {
            // TODO: make this an environment variable
            return <a href={`https://go-transfer.herokuapp.com/${fileName}`} download={fileName}>DOWNLOAD THE FILE</a>;
        }

        return <p>uh oh... you shouldn't be seeing this.</p>;
    }
}

function mapStateToProps(state: IAppState, ownProps) {
    return {
        fileName: ownProps.params.fileName,
        fileAvailability: state.file.availability
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkAvailability(fileName: string): void {
            dispatch(Creators.File.checkAvailability(fileName));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Download);

