import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import file from './file';

export default combineReducers({
    routing,
    file
});