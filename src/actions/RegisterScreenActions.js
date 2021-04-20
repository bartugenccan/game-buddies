// Actions Imports
import {
    REGISTER_EMAIL_CHANGED,
    REGISTER_USER,
    REGISTER_PASSWORD_CHANGED,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL
} from './types';

// Firebase Import
import auth from '@react-native-firebase/auth';

// React-Native Alert Import
import { Alert } from 'react-native';

export const register_email_changed = (email) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_EMAIL_CHANGED,
            payload: email
        })
    }
};


export const register_password_changed = (password) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_PASSWORD_CHANGED,
            payload: password
        })
    }
};


export const register_user = (register_email, register_password) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_USER
        });
        auth().createUserWithEmailAndPassword(register_email, register_password)
            .then(() => {
                dispatch({
                    type: REGISTER_USER_SUCCESS
                })
                console.log("Creation is successful"); // Register Pagede then function ile navigate to main scenes navigator
            })
            .catch((err) => {
                if (err.code == "auth/email-already-in-use") {
                    Alert.alert(
                        "Hatalı Kayıt İşlemi",
                        "E-mail adresi başka bir kullanıcı tarafından kullanımda.",
                        [{
                            text: "Tamam", onPress: () => null
                        }]
                    )
                } else if (err.code == "auth/weak-password") {
                    Alert.alert(
                        "Zayıf Şifre",
                        "Şifrenize çok zayıf!",
                        [{
                            text: "Tamam", onPress: () => null
                        }]
                    )
                } else if (err.code == "auth/invalid-email") {
                    Alert.alert(
                        "Geçersiz E-mail",
                        "E-mail adresiniz geçersiz.",
                        [{
                            text: "Tamam", onPress: () => null
                        }]
                    )
                }
                dispatch({
                    type: REGISTER_USER_FAIL
                })
            })
    }
}