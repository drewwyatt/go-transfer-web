import * as React from 'react';
import { connect } from 'react-redux';

export interface DownloadProps {
    fileName: string;
}

class Download extends React.Component<DownloadProps, void> {
    render(): JSX.Element {
        return (
            <div>
                <p>this is the download page</p>
                {this._linkIfExists()}
            </div>
        );
    }

    private _linkIfExists(): JSX.Element {
        const { fileName } = this.props;
        if (fileName && fileName.trim()) {
            return <a href={`https://go-transfer.herokuapp.com/${fileName}`} download={fileName}>DOWNLOAD THE FILE</a>;
        }

        return <p>uh oh... you shouldn't be seeing this.</p>;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        fileName: ownProps.params.fileName
    };
}

export default connect(mapStateToProps)(Download);

