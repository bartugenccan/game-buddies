import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, Linking, KeyboardAvoidingView, Alert } from 'react-native';
import { Input, Button, Avatar, Icon } from 'react-native-elements';
import style from './DeleteScreen.component.style';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Spinner from '../../../components/Spinner/Spinner.component';

import { useNavigation } from '@react-navigation/native';


const DeleteScreen = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(true);


    return (
        <View style={{ flex: 1 }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
                >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <View style={{ height: 100, width: 200, backgroundColor: "#892cdc", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner color={"yellow"} size={100}></Spinner>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => {
                    setDeleteModalVisible(false)
                    navigation.navigate("MobileModal");
                }}
            >
                <View style={style.container}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={style.closeView}
                        onPress={() => {
                            setDeleteModalVisible(!deleteModalVisible);
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
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </View>
    )
}

export default DeleteScreen;