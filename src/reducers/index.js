// Import Combine Reducers From redux
import {combineReducers} from 'redux';

// Reducers Imports
import LoginScreenReducers from './LoginScreenReducers';
import RegisterScreenReducers from './RegisterScreenReducers';
import ForgotScreenReducers from './ForgotScreenReducers';
import HomeScreenReducers from './HomeScreenReducers';
import ProfileScreenReducers from './ProfileScreenReducers';
import LolAddPostReducers from './LolAddPostReducers';
import WebsocketReducers from './WebsocketReducers';

export default combineReducers({
  LoginScreenResponse: LoginScreenReducers,
  RegisterScreenResponse: RegisterScreenReducers,
  ForgotScreenResponse: ForgotScreenReducers,
  HomeScreenResponse: HomeScreenReducers,
  ProfileScreenResponse: ProfileScreenReducers,
  LolAddPostResponse: LolAddPostReducers,
  WebsocketResponse: WebsocketReducers,
});
