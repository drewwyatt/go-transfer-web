import * as React from 'react';
import { connect } from 'react-redux';
import { Creators } from '../actions';
import Home from './home';

export interface AppProps {
}

class App extends React.Component<AppProps, void> {
    render(): JSX.Element {
        const { children } = this.props;
        return (
            <section>
                <h1>Go Transfer</h1>
                <p>this is the app component</p>
                { children || <Home /> }
            </section>
        );
    }
}

function mapStateToProps(state: any): any { // TODO
    return {};
}

export default connect(mapStateToProps)(App);