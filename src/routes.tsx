import * as React from 'react';
import { Route } from 'react-router';
import { App, Download, Upload } from './containers';

export default (
    <Route path='/' component={App}>
        <Route path='upload' component={Upload} />
        <Route path='download/:fileName' component={Download} />
    </Route>
);