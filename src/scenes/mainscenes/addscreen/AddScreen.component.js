import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, Linking, KeyboardAvoidingView } from 'react-native';
import style from './AddScreen.component.style';

import { Input, Button, Avatar, Icon } from 'react-native-elements';

import fire from '../../../../firebase/fire';


const AddScreen = ({ navigation, route }) => {

    const [addModalVisible, setAddModalVisible] = useState(true);
    const { type } = route.params;

    // Girmeden önce bak eğer lol account varsa başka bağlamayız de yoksa return et    
    switch (type) {
        case "League Of Legends":
            return (
                <View style={{ flex: 1 }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={addModalVisible}
                        onRequestClose={() => {
                            setAddModalVisible(false)
                            navigation.navigate("MobileModal");
                        }}
                    >
                        <View style={style.container}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={style.closeView}
                                onPress={() => {
                                    console.log(addModalVisible);
                                    setAddModalVisible(!addModalVisible);
                                    console.log(addModalVisible);
                                    navigation.navigate("PCModal");

                                }}></TouchableOpacity>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={style.bigView}
                            >
                                <View style={style.iconView}>
                                    <View>
                                        <Avatar
                                            rounded
                                            source={require("../../../assets/images/League_of_Legends_icon.png")}
                                            size={55}></Avatar>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={style.textStyle}>League Of Legends</Text>
                                    </View>
                                </View>
                                <View style={style.inputView}>
                                    <Input
                                        placeholder='Kullanıcı Adınız'
                                        leftIcon={
                                            <Icon
                                                name='user'
                                                size={24}
                                                type={"font-awesome"}
                                                color='white'
                                            />
                                        }
                                        containerStyle={{ width: "80%" }}
                                    />
                                    <Input
                                        placeholder='Doğrulama Kodunuz'
                                        leftIcon={
                                            <Icon
                                                name='unlock-alt'
                                                size={24}
                                                type={"font-awesome"}
                                                color='white'
                                            />
                                        }
                                        containerStyle={{ width: "80%" }}
                                    />
                                </View>
                                <View style={style.buttonView}>
                                    <Button
                                        title="Hesabını Bağla"
                                        type="outline"
                                        raised
                                        containerStyle={{ backgroundColor: "white", width: "70%" }}
                                        titleStyle={{ color: "#892cdc" }}
                                    />
                                    <Text
                                        style={{ color: "rgba(255,255,255,0.5)", marginTop: 5, textDecorationLine: "underline" }}
                                        onPress={() => Linking.openURL("https://stackoverflow.com/questions/43804032/open-url-in-default-web-browser")}
                                    >Yardıma mı ihtiyacın var?</Text>
                                </View>
                                <View>

                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                </View>
            );
        
        default:
            return <Text>BBB</Text>
    }

}


export default AddScreen;