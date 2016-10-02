import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';

export interface RootProps {
    store: any; // todo
    history: any; // todo
}

class Root extends React.Component<RootProps, void> {
    render(): JSX.Element {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <main>
                    <Router routes={routes} history={history} />
                </main>
            </Provider>
        );
    }
}

export default Root;