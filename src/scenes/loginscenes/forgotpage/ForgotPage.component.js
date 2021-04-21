// React Imports
import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Style Import
import style from "../forgotpage/ForgotPage.component.style";
import { Icon } from 'react-native-elements'
import Spinner from '../../../components/Spinner/Spinner.component';

// Redux Import
import { connect } from 'react-redux';

import {
    forgot_mail,
    forgot_mail_changed
} from '../../../actions';

class ForgotPage extends React.Component {

    onCLick() {
        const email = this.props.forgot_mail;
        this.props.forgot_mail(email);
    }

    renderSendButton() {
        if (this.props.loading) {
            return (
                <TouchableOpacity style={style.newPass}>
                    <Spinner></Spinner>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity style={style.newPass}>
                <Text style={style.newPassTxt}>
                    Şifremi Sıfırla
                </Text>
            </TouchableOpacity>
        )
    }
    render() {
        console.log(this.props.forgot_email)
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
                <Image style={style.logoImage}
                    source={{
                        uri:
                            "https://i.pinimg.com/originals/99/30/23/993023109d483f3348d2d0745cf57d98.png"
                    }}
                />
                <Text style={style.forgotPassTxt}>
                    Şifreni mi Unuttun?
                </Text>
                <Text style={style.enterEmailTxt}>
                    Emailini gir.
                </Text>
                <View style={style.inputBackground}>
                    <View style={{ flex: 0.2 }}>

                    </View>
                    <View style={{ flex: 0.6, flexDirection: "row", width: "90%", alignSelf: 'center' }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon
                                name="user"
                                type="font-awesome"
                                color='white'
                                size={30} />
                        </View>
                        <View style={{ flex: 0.8 , justifyContent :'center' }}>
                            <TextInput
                                style={style.inputText}
                                placeholderTextColor="black"
                                onChangeText = { (e) => this.props.forgot_mail_changed(e)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.2 }}>

                    </View>
                </View>
                {this.renderSendButton()}
            </View>
        )
    }
};

const mapStateProps = ({ ForgotScreenResponse }) => {
    const { forgot_email, loading } = ForgotScreenResponse;

    return {
        forgot_email,
        loading
    }
}


export default connect(mapStateProps, { forgot_mail_changed, forgot_mail })(ForgotPage);