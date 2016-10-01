import * as React from 'react';
import { connect } from 'react-redux';

export interface AppProps {
    todos: any[]; // TODO
}

class App extends React.Component<AppProps, void> {
    componentWillMount(): void {
        console.log(this.props.todos);
    }

    render(): JSX.Element {
        return (
            <section>
                <h1>Typescript 2 + Redux</h1>
                <p>This is a react app.</p>
            </section>
        );
    }
}

function mapStateToProps(state: any): AppProps {
    return {
        todos: state
    };
}

export default connect(mapStateToProps)(App);