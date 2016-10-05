import * as React from 'react';

type IDropState = 'DRAGGING' | 'DROPPED' | 'WAITING';

const DropState = {
    DRAGGING: 'DRAGGING' as 'DRAGGING',
    DROPPED: 'DROPPED'   as 'DROPPED',
    WAITING: 'WAITING'   as 'WAITING',
}

export interface FileDropProps {
    onFile(file: File): void;
}

export interface FileDropState {
    dropState: IDropState;
}

export class FileDrop extends React.Component<FileDropProps, FileDropState> {
    componentWillMount(): void {
        // this._startFrameListeners();
        this.setState({
            dropState: DropState.WAITING
        });
    }

    componentWillUnmount(): void {
        // this._stopFrameListeners()
    }

    render(): JSX.Element {
        const containerStyles = {
            display: 'inline-block',
            width: '80%',
            maxWidth: '400px',
            color: 'white'
        };

        const circleStyles = {
            display: 'inline-block',
            background: 'rgb(63,81,181)',
            width: '100%',
            borderRadius: '50%',
            padding: '50% 0',
            position: 'relative',
            whiteSpace: 'nowrap',
            fontSize: '30px'
        };

        const iStyles = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '80px'
        }

        return (
            <div style={containerStyles} onDragOver={this._handleOnDragOver.bind(this)} onDragEnter={this._handleDragEnter.bind(this)} onDrop={this._handleDrop.bind(this)}>
                <div style={circleStyles}>
                    <i style={iStyles} className="icon material-icons">{this._getIcon()}</i>
                </div>
            </div>
        );
    }

    private _getIcon(): string {
        const { dropState } = this.state;
        switch (dropState) {
            case DropState.DRAGGING:
                return 'backup';
            case DropState.DROPPED:
                return 'done';
            case DropState.WAITING:
            default:
                return 'add_box';
        }
    }

    private _setDropState(dropState: IDropState): void {
        this.setState(Object.assign({}, this.state, { dropState }));
    }

    private _handleOnDragOver(e: Event): void {
        e.preventDefault();
    }

    private _handleDragEnter(e: Event): void {
        e.preventDefault();
        this._setDropState(DropState.DRAGGING);
    }

    private _handleDrop(event: DragEvent): void {
        event.preventDefault();
        const files: FileList = (event.dataTransfer) ? event.dataTransfer.files : (event['frame']) ? event['frame']['files'] : undefined;
        if (files && files.length) {
            this._setDropState(DropState.DROPPED);
            console.log(files, files[0]);
            this.props.onFile(files[0])
        } else {
            this._setDropState(DropState.WAITING);
        }
    }

    // private _stopFrameListeners(): void {
    //     const frame = document;
    //     frame.removeEventListener('dragenter', this._handleDragEnter);
    //     frame.removeEventListener('drop', this._handleDrop);
    // }

    // private _startFrameListeners(): void {
    //     const frame = document;
    //     frame.addEventListener('dragenter', this._handleDragEnter);
    //     frame.addEventListener('drop', this._handleDrop);
    // }
}