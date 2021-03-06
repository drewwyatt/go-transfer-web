import * as React from 'react';
import { connect } from 'react-redux';
import { Creators } from '../actions';
import Upload from './upload';

export interface AppProps {
}

class App extends React.Component<AppProps, void> {
    render(): JSX.Element {
        const { children } = this.props;
        const styles = {
            textAlign: 'center'
        };
        return (
            <section style={styles}>
                { children || <Upload /> }
            </section>
        );
    }
}

function mapStateToProps(state: any): any { // TODO
    return {};
}

export default connect(mapStateToProps)(App);