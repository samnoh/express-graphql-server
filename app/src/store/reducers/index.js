import { combineReducers } from 'redux';

import authReducer from './auth';
import notiReducer from './noti';
import queryReducer from './query';

const rootReducer = combineReducers({ auth: authReducer, noti: notiReducer, query: queryReducer });

export default rootReducer;
