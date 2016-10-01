import * as React from 'react';
import { Provider } from 'react-redux';

export interface RootProps {
    store: any; // todo
}

class Root extends React.Component<RootProps, void> {
    render(): JSX.Element {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <main>
                    <h1>Typescript 2 + Redux</h1>
                    <p>This is a react app.</p>
                </main>
            </Provider>
        );
    }
}

export default Root;