// Import Combine Reducers From redux
import { combineReducers } from 'redux';

// Reducers Imports
import LoginScreenReducers from './LoginScreenReducers';
import RegisterScreenReducers from './RegisterScreenReducers';
import ForgotScreenReducers from './ForgotScreenReducers';

export default combineReducers({
    LoginScreenResponse : LoginScreenReducers,
    RegisterScreenResponse : RegisterScreenReducers,
    ForgotScreenResponse : ForgotScreenReducers
});