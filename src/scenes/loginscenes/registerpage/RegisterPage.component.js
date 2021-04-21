// React Imports
import React from 'react';
import { View, Text, TextInput, ScrollView , Alert} from 'react-native';

// Style Imports
import style from "./RegisterPage.component.style";
import { Icon, CheckBox } from 'react-native-elements'
import SwitchSelector from "react-native-switch-selector";
import { TouchableOpacity } from 'react-native-gesture-handler';


class RegisterPage extends React.Component {
    state = {
        username: "",
        gender: "M",
        preferred: 2,
        realPassword: "",
        repeatPassword: "",
        mail: "",
        checked: false
    }

    onPress = () => {
        if (!this.state.checked){
            Alert.alert(
                "Hata",
                "Kullanıcı sözleşmesini kabul etmeniz gerekmektedir.",
                [{
                    text : "Tamam" , onPress : () => null
                }]
            )
        } if (this.state.realPassword != this.state.repeatPassword){
            Alert.alert(
                "Hata",
                "Şifreler aynı olmalıdır.",
                [{
                    text : "Tamam" , onPress : () => null
                }]
            );
            this.setState({repeatPassword : ""});
            this.setState({realPassword : ""});

        }
    }

    renderChoice = (g) => {
        if (g === "M" || g === "N") {
            return null
        } else {
            return (
                <View alignItems="center" justifyContent="center">
                    <Text style={style.playQuestion}>
                        Kimlerle oynamak istiyorsun?
                    </Text>
                    <SwitchSelector
                        style={style.switchSelector}
                        initial={0}
                        onPress={value => this.setState({ gender: value })}
                        textColor='#7a44cf'
                        selectedColor="white"
                        buttonColor='#7a44cf'
                        borderColor='#7a44cf'
                        hasPadding
                        options={[
                            { label: "Erkeklerle", value: 0 },
                            { label: "Kadınlarla", value: 1 },
                            { label: "Farketmez", value: 2 }
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                    />
                </View>
            )
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
                    <Text style={style.registerTxt}>
                        Kayıt Ol
                </Text>
                    <View style={style.inputBackground}>
                        <View style={{ flex: 0.2, flexDirection: "row" }}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon
                                    name="user"
                                    type="font-awesome"
                                    color='white'
                                    size={27} />
                            </View>
                            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={style.inputText}
                                    placeholder = {"Kullanıcı Adı"}
                                    onChangeText={(value) => this.setState({ username: value })}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.2, flexDirection: "row" }}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon
                                    name="key"
                                    type="font-awesome"
                                    color="white"
                                    size={25} />
                            </View>
                            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={style.inputText}
                                    placeholder = {"Şifre"}
                                    value = {this.state.realPassword}
                                    onChangeText={(value) => this.setState({ realPassword: value })}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 0.2, flexDirection: "row" }}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon
                                    name="key"
                                    type="font-awesome"
                                    color="white"
                                    size={27} />
                            </View>
                            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={style.inputText}
                                    placeholder = {"Şifre Tekrar"}
                                    value = {this.state.repeatPassword}
                                    onChangeText={(value) => this.setState({ repeatPassword: value })}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.2, flexDirection: "row" }}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon
                                    name="envelope"
                                    type="font-awesome"
                                    color="white"
                                    size={27} />
                            </View>
                            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={style.inputText}
                                    placeholder = {"E-Mail Adresiniz"}
                                    onChangeText={(value) => this.setState({ mail: value })}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.2 }}>
                            <CheckBox
                                title='Kullanıcı Sözleşmesini ve KVKK metnini okudum ve kabul ediyorum.'
                                checked={this.state.checked}
                                onPress={() => {
                                    this.setState({ checked: !this.state.checked })
                                }}
                                containerStyle={{ borderWidth: 0, backgroundColor: 'transparent', width: '80%' }}
                                textStyle={{ fontSize: 11, color: "white" }}
                                checkedColor="white"
                            />
                        </View>
                    </View>

                    <Icon
                        name="venus-mars"
                        type="font-awesome"
                        color="black" />
                    <Text style={{ marginBottom: 10 }}>Cinsiyetinizi Seçin</Text>

                    <SwitchSelector
                        style={style.switchSelector}
                        initial={0}
                        onPress={value => this.setState({ gender: value })}
                        textColor='#7a44cf'
                        selectedColor="white"
                        buttonColor='#7a44cf'
                        borderColor='#7a44cf'
                        hasPadding
                        options={[
                            { label: "Erkek", value: "M" },
                            { label: "Kadın", value: "F" },
                            { label: "Belirtmek İstemiyorum", value: "N" }
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                    />
                    {this.renderChoice(this.state.gender)}
                    <TouchableOpacity style={style.registerBTN} onPress = {this.onPress}>
                        <Text style={style.registerBTNTXT}>
                            KAYIT OL
                        </Text>
                    </TouchableOpacity>
                </View >
            </ScrollView>

        )
    }

}

export default RegisterPage;