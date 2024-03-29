// Actions Imports
import {
  FORGOT_MAIL,
  FORGOT_MAIL_CHANGED,
  FORGOT_MAIL_SUCCESS_SEND,
  FORGOT_MAIL_FAILED_SEND,
} from './types';

// Firebase Import
import auth from '@react-native-firebase/auth';

// React-Native Alert Import
import {Alert} from 'react-native';

// Function for update forgot_email states
export const forgot_mail_changed = forgot_email => {
  return dispatch => {
    dispatch({
      type: FORGOT_MAIL_CHANGED,
      payload: forgot_email,
    });
  };
};

// Function for send forgot email with firebase function
export const forgot_mail = forgot_email => {
  return dispatch => {
    if (forgot_email == '') {
      Alert.alert('Hatalı Giriş', 'Mail kısmı boş bırakılamaz.', [
        {
          text: 'Tamam',
          onPress: () => null,
        },
      ]);
      dispatch({type: FORGOT_MAIL_FAILED_SEND});
    } else {
      auth()
        .sendPasswordResetEmail(forgot_email)
        .then(() => {
          dispatch({type: FORGOT_MAIL});
          dispatch({type: FORGOT_MAIL_SUCCESS_SEND});
        })
        .catch(err => {
          console.log(err);
          dispatch({type: FORGOT_MAIL_FAILED_SEND});
        });
    }
  };
};
