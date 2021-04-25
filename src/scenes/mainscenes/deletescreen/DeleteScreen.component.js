import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Text, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Image, Avatar, Icon } from 'react-native-elements';
import style from './DeleteScreen.component.style';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Spinner from '../../../components/Spinner/Spinner.component';

import { useNavigation } from '@react-navigation/native';


// Profile icon id alınacak

const DeleteScreen = (props) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(true);
    const [profileName, setProfileName] = useState("BerattoBB");
    const [iconId, setIconId] = useState(1);
    const [lolAccountRef, setLolAccountRef] = useState();

    useEffect(() => {
        switch (props.gameName) {
            case "League Of Legends":
                firestore()
                    .collection("users")
                    .where("UserEmail", "==", auth().currentUser.email)
                    .get()
                    .then(resp => {
                        resp.forEach(doc => {
                            firestore()
                                .collection("collection")
                                .doc(doc.id)
                                .get()
                                .then(resp => {
                                    resp.forEach(doc => {
                                        setLolAccountRef(doc.data().LolAccount)
                                    })
                                })
                        })
                    })
                    .then( () => {
                        firestore()
                        .doc(lolAccountRef)
                        .get()
                        .then(resp => {
                            resp.forEach(doc => {
                                setProfileName(doc.data().Nickname)
                                setIconId(doc.data().ProfileIconID)
                            })
                        })
                    })
            default:
                break;
        }
    }, []);
    switch (props.gameName) {
        case "League Of Legends":
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
                                <View style={style.bigTextView}>
                                    <View style={style.smallTextView}>
                                        <Text style={style.dangerText}>Bu hesaba bağlı bir {props.gameName} hesabı bulduk.</Text>
                                    </View>
                                    <View style={style.smallIconView}>
                                        <View style={style.profileIconView}>
                                            <Avatar
                                                source={{ uri: "https://ddragon.leagueoflegends.com/cdn/9.3.1/img/profileicon/" + iconId + ".png" }}
                                                rounded
                                                size="large"
                                                containerStyle={{ marginRight: 10 }}
                                            />
                                        </View>
                                        <View style={style.profileNameView}>
                                            <View style={{ height: "50%", backgroundColor: "white", width: "90%", borderRadius: 20, alignItems: 'flex-start', justifyContent: 'center', overflow: "scroll" }}>
                                                <Text numberOfLines={2} style={style.profileNameText}>{profileName}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={style.buttonView}>
                                    <Button
                                        icon={
                                            <Icon
                                                name="trash"
                                                type="font-awesome"
                                                size={20}
                                                color="white"
                                            />
                                        }
                                        iconLeft
                                        title="Hesaptan çıkış yap."
                                        buttonStyle={style.buttonStyle}

                                    />
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                </View>
            )

        default:
            return (
                <Text>ERROR</Text>
            )
    }

}

export default DeleteScreen;