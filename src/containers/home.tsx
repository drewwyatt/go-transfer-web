import * as React from 'react';
import { connect } from 'react-redux';

export interface HomeProps {
    fileName: string;
    link: string;
}

class Home extends React.Component<HomeProps, void> {
    render(): JSX.Element {
        return (
            <section>
                <input type='file' onChange={this._onFileChange.bind(this)} />
            </section>
        );
    }

    private _onFileChange(event: Event): void {
        event.preventDefault();
        const input = event.target as HTMLInputElement;
        if (this._filesExist(input)) {
            const file = input.files[0];
            console.log(file);
            fetch(`https://go-transfer.herokuapp.com/${new Date().getMilliseconds().toString()}.txt`, {
                method: 'POST',
                body: file
            }).then(response => console.log(response));
        }
    }

    private _filesExist(input: HTMLInputElement): boolean {
        return !!(input && input.files && input.files.length);
    }
}

export default connect(() => ({}))(Home);