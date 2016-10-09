import * as React from 'react';
import { Route } from 'react-router';
import { App, Download, Upload } from './containers';

console.info('process.env.BASE_PATH', process.env.BASE_PATH);

export default (
    <Route path={process.env.BASE_PATH} component={App}>
        <Route path='upload' component={Upload} />
        <Route path='download/:fileName' component={Download} />
    </Route>
);