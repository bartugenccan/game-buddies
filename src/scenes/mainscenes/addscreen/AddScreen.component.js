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
import {
    checkVerificationCode,
    getID,
    fetchStats,
    getProfileIconId
} from '../../../utils/RiotApiFunc';

// Redux Imports
import { connect, useDispatch } from 'react-redux';

import {
    games_set
} from '../../../actions';




const AddScreen = ({ navigation, route }) => {

    // Common States
    const [addModalVisible, setAddModalVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [canAddValorant, setCanAddValorant] = useState(true);
    const [canAddLol, setCanAddLol] = useState(true);
    const [errMessage, setErrMessage] = useState("");

    // League Of Legends && Valorant
    const [summonerName, setSummonerName] = useState("BerattoBB"); // ""

    // League Of Legends
    const [code, setCode] = useState("");

    // Valorant 
    const [tag, setTag] = useState("");

    // Route Params
    const { type } = route.params;
    console.log("Type is " + type);

    // Dispath
    const dispatch = useDispatch();


    // Success Callback 
    const _success_callback = async (g) => {

        switch (g) {
            case "League Of Legends":

                let id = await getID("BerattoBB");
                let stats = await fetchStats("BerattoBB");
                let profileIconId = await getProfileIconId("BerattoBB");
                
                await firestore()
                    .collection("lolaccounts")
                    .get()
                    .then(resp => {
                        resp.forEach(doc => {
                            if (doc.data().Nickname == summonerName) {
                                setLoading(false);
                                Alert.alert(
                                    "Hatalı Giriş",
                                    "Girmiş olduğun kullanıcı adıyla başka bir hesapla giriş yapılmış."
                                )
                                return;
                            }



                            firestore()
                                .collection("users")
                                .where("UserEmail", "==", auth().currentUser.email)
                                .get()
                                .then(resp => {
                                    resp.forEach(doc => {
                                        firestore()
                                            .collection("lolaccounts")
                                            .doc(doc.id)
                                            .set({
                                                Nickname: "BerattoBB", // summonername
                                                SoloQueueRanked: stats[0],
                                                FlexRanked: stats[1],
                                                ID: id,
                                                ProfileIconId: profileIconId
                                            })
                                            .then(() => {
                                                let tempList = doc.data().Games;
                                                tempList.push({ id: "0", gameName: "League Of Legends" });

                                                dispatch(games_set(tempList));
                                                doc.ref.update({ Games: tempList });

                                            })
                                            .then(() => {
                                                doc.ref.update({ LolAccount: firestore().collection("lolaccounts").doc(doc.id) });
                                            })
                                    })
                                })

                                .then(() => {
                                    navigation.navigate("HomePage")
                                    setLoading(false);
                                })


                        })

                    })
                break;

            default:
                break;
        }

    }

    const _onPressValorant = async () => {
        await firestore()
            .collection("valorantaccounts")
            .get()
            .then(resp => {
                resp.forEach(doc => {
                    if (doc.data().Nickname == summonerName && doc.data().Tag == tag) {
                        setLoading(false);
                        Alert.alert(
                            "Hatalı Giriş",
                            "Girmiş olduğun kullanıcı adıyla başka bir hesapla giriş yapılmış."
                        )
                        return;
                    }
                    firestore()
                        .collection("users")
                        .where("UserEmail", "==", auth().currentUser.email)
                        .get()
                        .then(resp => {
                            resp.forEach(doc => {
                                firestore()
                                    .collection("valorantaccounts")
                                    .doc(doc.id)
                                    .set({
                                        Nickname: "BerattoBB", //summonername
                                        Tag: tag
                                    })
                                    .then(() => {
                                        let tempList = doc.data().Games;
                                        tempList.push({ id: "1", gameName: "Valorant" });

                                        dispatch(games_set(tempList));
                                        doc.ref.update({ Games: tempList });

                                    }).then(() => {
                                        doc.ref.update({ ValorantAccount: firestore().collection("valorantaccounts").doc(doc.id) })
                                    })
                            })
                        })
                        .then(() => {
                            setLoading(false);
                            navigation.navigate("HomePage");
                        })
                })
            })

    }

    const _failed_callback = () => {
        setErrMessage("* Sihirdar adı veya doğrulama kodu hatalı.");
        setSummonerName("");
        setCode("");
        setTag("");
    }

    const useEffectLeagueOfLegends = () => {
        console.log("Beratto");
        firestore()
            .collection("users")
            .where("UserEmail", "==", auth().currentUser.email)
            .get()
            .then(resp => {
                resp.forEach(doc => {
                    if (doc.data().LolAccount != null) {
                        setCanAddLol(false);
                    } else if (doc.data().LolAccount == null) {
                        setCanAddLol(true)
                    }
                })
            }).then(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true);

        switch (type) {
            case "League Of Legends":
                useEffectLeagueOfLegends();

            case "Valorant":
                firestore()
                    .collection("users")
                    .where("UserEmail", "==", auth().currentUser.email)
                    .get()
                    .then(resp => {
                        resp.forEach(doc => {
                            if (doc.data().ValorantAccount == null) {
                                setCanAddValorant(true);
                            } else if (doc.data().ValorantAccount != null) {
                                setLoading(false);
                                setCanAddValorant(false);
                            }
                        })
                    }).then(() => setLoading(false))

            default:
                break;
        }
    }, []);

    switch (type) {
        case "League Of Legends":
            if (canAddLol) {

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
                                                    checkVerificationCode("BerattoBB", "zaxd31", _success_callback(type), _failed_callback);
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
            } else if (!canAddLol) {
                return <DeleteScreen gameName={type} ></DeleteScreen>
            }
        case "Valorant":
            if (canAddValorant) {
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
                                                source={require("../../../assets/images/Valorant_icon.png")}
                                                size={70}></Avatar>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={style.textStyleValorant}>{type}</Text>
                                        </View>
                                    </View>
                                    <View style={style.inputViewValorant}>
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
                                            containerStyle={{ width: "40%" }}
                                            value={summonerName}
                                        />
                                        <Input
                                            placeholder='Tag'
                                            leftIcon={
                                                <Icon
                                                    name='tag'
                                                    size={24}
                                                    type={"material-icons"}
                                                    color='white'
                                                />
                                            }
                                            inputStyle={{ color: "white" }}
                                            onChangeText={val => setTag(val)}
                                            containerStyle={{ width: "40%" }}
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
                                            containerStyle={{ backgroundColor: "white", width: "70%", marginTop: 20 }}
                                            titleStyle={{ color: "#892cdc" }}
                                            onPress={async () => {
                                                try {
                                                    setLoading(true);
                                                    _onPressValorant();
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
                                </KeyboardAvoidingView>
                            </View>
                        </Modal>
                    </View>
                );
            } else if (!canAddValorant) {
                return <DeleteScreen gameName={type} ></DeleteScreen>
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