import * as React from 'react';
import { Provider } from 'react-redux';
import App from './app';

export interface RootProps {
    store: any; // todo
}

class Root extends React.Component<RootProps, void> {
    render(): JSX.Element {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <main>
                    <App />
                </main>
            </Provider>
        );
    }
}

export default Root;