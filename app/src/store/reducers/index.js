import { combineReducers } from 'redux';

import authReducer from './auth';
import notiReducer from './noti';

const rootReducer = combineReducers({ auth: authReducer, noti: notiReducer });

export default rootReducer;
