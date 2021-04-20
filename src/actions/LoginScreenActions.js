// Firebase Auth Import
import auth from '@react-native-firebase/auth';

// Action Types Import
import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL
} from './types';

// React-Native Imports 
import { Alert } from 'react-native';


// Login Email Changed with Payload
export const login_email_changed = (email) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_EMAIL_CHANGED,
            payload: email
        })
    }
};


// Login Password Changed with Payload
export const login_password_changed = (password) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_PASSWORD_CHANGED,
            payload: password
        })
    }
};

// Login User Function
export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        if (email = "" || password == "") {
            Alert.alert(
                "Hatalı Giriş",
                "E-mail veya şifre boş bırakılamaz.",
                [{
                    text: "Tamam", onPress: () => null
                }]
            )
            dispatch({ type: LOGIN_USER_FAIL })
        } else {
            auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    login_user_succes(dispatch, user);
                })
                .catch((err) => {
                    console.log(err);
                    Alert.alert(
                        "Hatalı Giriş",
                        "Mail adresi veya şifre hatalı.",
                        [{
                            text: "Tamam", onPress: () => null
                        }]
                    )
                    dispatch({ type: LOGIN_USER_FAIL })
                })
        }
    }
}


// Login User Function and Payload
const login_user_succes = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    })
};