import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/root';
import configureStore from './store/configure';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// import 'react-mdl/extra/material.css';
// import 'react-mdl/extra/material.js';

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));