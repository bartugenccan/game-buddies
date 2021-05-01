// Import Combine Reducers From redux
import { combineReducers } from 'redux';

// Reducers Imports
import LoginScreenReducers from './LoginScreenReducers';
import RegisterScreenReducers from './RegisterScreenReducers';
import ForgotScreenReducers from './ForgotScreenReducers';
import HomeScreenReducers from "./HomeScreenReducers";
import ProfileScreenReducers from './ProfileScreenReducers';

export default combineReducers({
    LoginScreenResponse: LoginScreenReducers,
    RegisterScreenResponse: RegisterScreenReducers,
    ForgotScreenResponse: ForgotScreenReducers,
    HomeScreenResponse: HomeScreenReducers,
    ProfileScreenResponse: ProfileScreenReducers
});