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
        };

        const circleStyles = {
            display: 'inline-block',
            backgroundColor: this._getBG(),  //'rgb(63,81,181)',
            color: this._getColor(),
            width: '100%',
            borderRadius: '50%',
            padding: '50% 0',
            position: 'relative',
            whiteSpace: 'nowrap',
            fontSize: '30px',
            boxShadow: '0 1px 1.5px 0 rgba(0,0,0,.12),0 1px 1px 0 rgba(0,0,0,.24)',
            transition: 'background-color 500ms linear'
        };

        const iStyles = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '80px'
        }

        return (
            <div style={containerStyles} onDragLeave={this._handleDragLeave.bind(this)} onDragOver={this._handleOnDragOver.bind(this)} onDragEnter={this._handleDragEnter.bind(this)} onDrop={this._handleDrop.bind(this)}>
                <div style={circleStyles}>
                    <i style={iStyles} className="icon material-icons">{this._getIcon()}</i>
                </div>
            </div>
        );
    }

    // #ff4081

    private _getBG(): string {
        const { dropState } = this.state;
        switch (dropState) {
            case DropState.DRAGGING:
                return '#ff4081';
            case DropState.DROPPED:
                return 'rgb(63,81,181)';
            case DropState.WAITING:
            default:
                return 'rgba(158,158,158,.2)';
        }
    }

     private _getColor(): string {
        const { dropState } = this.state;
        switch (dropState) {
            case DropState.DRAGGING:
            case DropState.DROPPED:
                return '#fff';
            case DropState.WAITING:
            default:
                return '#000';
        }
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
                return 'move_to_inbox';
        }
    }

    private _setDropState(dropState: IDropState): void {
        this.setState(Object.assign({}, this.state, { dropState }));
    }

    private _handleDragLeave(e: Event): void {
        // e.preventDefault();
        // e.stopPropagation();
        this._setDropState(DropState.WAITING);
    }

    private _handleOnDragOver(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        this._setDropState(DropState.DRAGGING);
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