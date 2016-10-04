import * as React from 'react';

export class FileDrop extends React.Component<void, void> {
    componentWillMount(): void {
        this._startFrameListeners();
    }

    componentWillUnmount(): void {
        this._stopFrameListeners()
    }

    render(): JSX.Element {
        const styles = {border: '1px solid black', width: 600, color: 'black', padding: 20};
        return (
            <div style={styles} onDragOver={this._handleOnDragOver.bind(this)} onDragEnter={this._handleDragEnter.bind(this)} onDrop={this._handleDrop.bind(this)}>
                This is a file dropper.
            </div>
        );
    }

    private _handleOnDragOver(e: Event): void {
        e.preventDefault();
    }

    private _handleDragEnter(e: Event): void {
        e.preventDefault();
        console.info('_handleDragEnter');
        console.log(e);
    }

    private _handleDrop(event: DragEvent): void {
        event.preventDefault();
        console.info('_handleDrop');
        const files = (event.dataTransfer) ? event.dataTransfer.files : (event['frame']) ? event['frame']['files'] : undefined;
        console.log(files); 
    }

    private _stopFrameListeners(): void {
        const frame = document;
        frame.removeEventListener('dragenter', this._handleDragEnter);
        frame.removeEventListener('drop', this._handleDrop);
    }

    private _startFrameListeners(): void {
        const frame = document;
        frame.addEventListener('dragenter', this._handleDragEnter);
        frame.addEventListener('drop', this._handleDrop);
    }
}