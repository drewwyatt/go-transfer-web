import * as React from 'react';
import { connect } from 'react-redux';
import { Creators } from '../actions';

export interface HomeProps {
    postFile(file: File): void;
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

export default connect(() => ({}), { postFile: Creators.File.post })(Home);