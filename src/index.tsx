/// <refrence path="../typings/react-file-drop" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/root';
import configureStore from './store/configure';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));