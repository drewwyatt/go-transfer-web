import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import { Layout, Header, Content, Navigation } from 'react-mdl';

export interface RootProps {
    store: any; // todo
    history: any; // todo
}

class Root extends React.Component<RootProps, void> {
    render(): JSX.Element {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <Layout fixedHeader>
                    <Header title='Go Transfer'>
                        <Navigation>
                            <a href='https://github.com/daltonclaybrook/go-transfer' target='_blank'>Go Transfer</a>
                            <a href='https://github.com/drewwyatt/go-transfer-web' target='_blank'>[This App]</a>
                        </Navigation>
                    </Header>
                    <Content>
                        <Router routes={routes} history={history} />
                    </Content>
                </Layout>
            </Provider>
        );
    }
}

export default Root;