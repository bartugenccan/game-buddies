// React Native Imports
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

// Style Import
import style from "./LoginPage.component.style";

// Spinner Component Import
import Spinner from '../../../components/Spinner/Spinner.component';

// Redux Import
import { connect } from 'react-redux';

// Actions Import
import {
    login_email_changed,
    login_password_changed,
    loginUser
} from "../../../actions";

// Import React-Native-Elements
import { Icon } from "react-native-elements";


import { Input } from 'react-native-elements';

class LoginPage extends React.Component {

    // Click Login Function
    clickLogin() {
        const email = this.props.email;
        const password = this.props.password;
        this.props.loginUser({ email, password })
    }

    renderLoginButton() {
        if (!this.props.loading) {
            return (
                <TouchableOpacity style={style.loginBTN}>
                    <Text style={style.loginBTNTXT} onPress={this.clickLogin.bind(this)}>
                        GİRİŞ YAP
                    </Text>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity style={style.loginBTN} activeOpacity={1}>
                <Spinner color = {"white"} size = {30}></Spinner>
            </TouchableOpacity>
        )
    };

    render() {
        console.log(this.props.email);
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
                <Image style={style.logoImage}
                    source={{
                        uri:
                            "https://i.pinimg.com/originals/99/30/23/993023109d483f3348d2d0745cf57d98.png"
                    }}
                />
                <Text style={style.entryText}>Giriş Yap</Text>
                <View style={style.inputBackground}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.5, flexDirection: "row" }}>
                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon
                                    name="user"
                                    type="font-awesome"
                                    color='white'
                                    size={30} />
                            </View>
                            <View style={{ flex: 0.8 , justifyContent :'center' }}>
                                <TextInput
                                    style={style.inputText}
                                    placeholder = {"Kullanıcı Adı"}
                                    onChangeText={(email) => this.props.login_email_changed(email)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.5, flexDirection: 'row' }}>
                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon
                                    name="key"
                                    type="font-awesome"
                                    color='white'
                                    size={30} />
                            </View>
                            <View style={{ flex: 0.8 , justifyContent :'center'}}>
                                <TextInput
                                    style={style.inputText}
                                    placeholder = {"Şifre"}
                                    onChangeText={(email) => this.props.login_email_changed(email)}
                                />
                            </View>


                        </View>
                    </View>


                </View>
                <Text style={style.forgotPass} onPress={() => this.props.navigation.navigate("Forgot")}>
                    Şifremi Unuttum
                </Text>
                {this.renderLoginButton()}
                <Text style={style.signUp} onPress={() => this.props.navigation.navigate("Register")}>
                    Kayıt Ol
                </Text>
            </View>
        )
    }


}

// Props to State Function In Redux
const mapStateToProps = ({ LoginScreenResponse }) => {
    const { email, password, loading } = LoginScreenResponse;
    return {
        email,
        password,
        loading
    }
};


export default connect(mapStateToProps, { login_email_changed, login_password_changed, loginUser })(LoginPage);