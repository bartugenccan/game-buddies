import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Text, Linking, KeyboardAvoidingView, Alert } from 'react-native';
import style from './AddScreen.component.style';

import { Input, Button, Avatar, Icon } from 'react-native-elements';

import Spinner from '../../../components/Spinner/Spinner.component';
import DeleteScreen from '../../mainscenes/deletescreen/DeleteScreen.component';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// API Functions
import { checkVerificationCode } from '../../../utils/RiotApiFunc';

// Redux Imports
import { connect, useDispatch } from 'react-redux';

import {
    games_set
} from '../../../actions';

const AddScreen = ({ navigation, route }) => {

    // Initial States
    const [addModalVisible, setAddModalVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [canAdd, setCanAdd] = useState(true);
    const [summonerName, setSummonerName] = useState("");
    const [code, setCode] = useState("");
    const [errMessage, setErrMessage] = useState("")
    // Route Params
    const { type } = route.params;

    // Dispath
    const dispatch = useDispatch();


    // Success Callback
    const _success_callback = async () => {
        // LOL ACCOUNT OLUŞTURUP API YARDIMIYLA DOLDURMA , GAME_ARR SET ETMECE REDUXTAN , LOL ACC İLE FİREBASE BAĞLAMA
        await firestore()
            .collection("lolaccounts").get().then(() => {
                navigation.navigate("HomePage")
                setLoading(false);
            });

    }

    const _failed_callback = () => {
        setErrMessage("* Sihirdar adı veya doğrulama kodu hatalı.");
        setSummonerName("");
        setCode("");
    }

    useEffect(() => {
        setLoading(true);

        switch (type) {
            case "League Of Legends":
                firestore()
                    .collection("users")
                    .where("UserEmail", "==", auth().currentUser.email)
                    .get()
                    .then(resp => {
                        resp.forEach(doc => {
                            if (doc.data().LolAccount == null) {
                                console.log("Yok");
                                setCanAdd(true);
                            } else if (doc.data().LolAccount != null) {
                                console.log("Var");
                                setLoading(false);
                                setCanAdd(false);
                            }

                        })
                    }).then(() => setLoading(false))

            default:
                break;
        }
    }, []);

    switch (type) {
        case "League Of Legends":
            if (canAdd) {
                return (
                    <View style={{ flex: 1 }}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={loading}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                                <View style={{ height: 100, width: 200, backgroundColor: "#892cdc", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Spinner color={"yellow"} size={100}></Spinner>
                                </View>
                            </View>
                        </Modal>
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
                                            inputStyle={{ color: "white" }}
                                            onChangeText={val => setSummonerName(val)}
                                            containerStyle={{ width: "80%" }}
                                            value={summonerName}
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
                                            inputStyle={{ color: "white" }}
                                            onChangeText={val => setCode(val)}
                                            containerStyle={{ width: "80%" }}
                                            value={code}
                                            errorMessage={errMessage}
                                            errorStyle={{ color: "#dcedc1" }}
                                            autoCorrect={false}
                                        />
                                    </View>
                                    <View style={style.buttonView}>
                                        <Button
                                            title="Hesabını Bağla"
                                            type="outline"
                                            raised
                                            containerStyle={{ backgroundColor: "white", width: "70%" }}
                                            titleStyle={{ color: "#892cdc" }}
                                            onPress={async () => {
                                                try {
                                                    setLoading(true);
                                                    checkVerificationCode("BerattoBB", "zaxd31", _success_callback, _failed_callback);
                                                }
                                                catch (err) {
                                                    console.error(err);
                                                }
                                            }}
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
            } else if (!canAdd) {
                return <DeleteScreen></DeleteScreen>
            }
        default:
            return <Text>Error</Text>;
    }

}

const mapStateToProps = ({ HomeScreenResponse }) => {
    const { games_arr } = HomeScreenResponse;

    return {
        games_arr
    }
};

export default connect(mapStateToProps, { games_set })(AddScreen);