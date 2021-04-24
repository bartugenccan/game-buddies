// React Imports
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';

// Style Imports
import style from './HomePage.component.style';
import { Icon } from 'react-native-elements';
import GameView from "../../../components/HomeScreenGameView/GameView.component";
import Spinner from '../../../components/Spinner/Spinner.component';

// Firebase Imports
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

// React Redux Imports
import { connect, useDispatch } from 'react-redux';

import {
    set_loading_home,
    games_set
} from "../../../actions"


function HomePage(props) {


    // Dispatch
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(set_loading_home(true));
        console.log(auth().currentUser.email);

        firestore()
            .collection("users")
            .where("UserEmail", "==", auth().currentUser.email)
            .get()
            .then(resp => {
                let batch = firestore().batch();
                resp.docs.forEach((doc => {
                    const docRef = firestore().collection("users").doc(doc.id)
                    batch.update(docRef, { uid: auth().currentUser.uid })
                }))
                batch.commit().then(() => {
                    console.log("Re");
                })
            });

        // Set games while entering the homescreen    
        firestore()
            .collection("users")
            .where("UserEmail", "==", auth().currentUser.email)
            .get()
            .then(resp => {
                resp.forEach(doc => {
                    dispatch(games_set(doc.data().Games))
                })
            })
            .then(() => dispatch(set_loading_home(false)))


        /*
    firestore()
        .collection("users")
        .where("UserEmail", "==", auth().currentUser.email)
        .get()
        .then(resp => {
            resp.forEach(doc => {
                let tempList = doc.data().Games;
                
                tempList.push({
                    id : "0",
                    gameName : "League of Legends"
                })

                console.log(tempList);
                //dispatch(games_set(tempList))
            })
        })
        .then(() => dispatch(set_loading_home(false)))
        */

    }, [dispatch])



    // Function for render game view depends on game id.
    const renderGameView = ({ item }) => {

        if (item.id == "0") {
            return (
                <View style={{ width: "100%", height: 200, marginTop: 20, overflow: "hidden" }}>
                    <GameView gameName={item.gameName} gameImage={"https://wallpaperaccess.com/full/217097.jpg"} />
                </View>
            )
        } else if (item.id == "1") {
            return (
                <View style={{ width: "100%", height: 200, marginTop: 10, overflow: "hidden" }}>
                    <GameView gameName={item.gameName} gameImage={"https://www.gaziemir.com.tr/wp-content/uploads/2020/12/brawl-stars.jpg"} />
                </View>
            )
        }
    };




    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.loading}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <View style={{ height: 100, width: 200, backgroundColor: "#892cdc", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner color={"yellow"} size={100}></Spinner>
                    </View>
                </View>
            </Modal>
            <View style={style.firstView}>
                <View style={style.bigTextView}>
                    <Text style={style.textStyle} onPress={() => auth().signOut()}>
                        Merhabalar! GameBuddies'e hoş geldin.
                        Hemen aşağıdaki platformlardan oyunlarını bağlamaya başla!
                        Senin için en uygun takım arkadaşını bulacağız!
                        </Text>
                </View>
            </View>
            <View style={style.iconView}>
                <View style={style.pcIconView}>
                    <TouchableOpacity style={style.pcIcon} onPress={() => props.navigation.navigate("Modal", { screen: "PCModal" })}>
                        <Icon
                            name="laptop"
                            type="font-awesome"
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
                <View style={style.mobileIconView}>
                    <TouchableOpacity style={style.mobileIcon} onPress={() => props.navigation.navigate("Modal", { screen: "MobileModal" })}>
                        <Icon
                            name="mobile"
                            type="font-awesome"
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={props.games_arr}
                renderItem={renderGameView}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 0, marginBottom: 20 }}
            />
        </View>
    )
}

const mapStateToProps = ({ HomeScreenResponse }) => {
    const { games_arr, loading } = HomeScreenResponse;

    return {
        games_arr,
        loading
    }
}

export default connect(mapStateToProps, { set_loading_home, games_set })(HomePage);