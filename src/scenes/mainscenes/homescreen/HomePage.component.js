// React Imports
import React from 'react';
import { Text, View, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';

// Style Imports
import style from './HomePage.component.style';
import { Icon } from 'react-native-elements';
import GameView from "../../../components/HomeScreenGameView/GameView.component";

// Firebase Imports
import auth from '@react-native-firebase/auth';

// Example Data For Render
const gameData = [
    {
        id: '0',
        gameName: 'League of Legends',

    },
    {
        id: "1",
        gameName: "Brawl Stars"
    },

];



class HomePage extends React.Component {

    // Function for render game view depends on game id.
    renderGameView = ({ item }) => {
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

    // Initial State for Modal Visible state.
    state = {
        visible: false
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
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
                        <TouchableOpacity style={style.pcIcon} onPress={() => this.props.navigation.navigate("Modal" , { screen : "PCModal"})}>
                            <Icon
                                name="laptop"
                                type="font-awesome"
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={style.mobileIconView}>
                        <TouchableOpacity style={style.mobileIcon} onPress={ () => this.props.navigation.navigate("Modal" , { screen : "MobileModal"})}>
                            <Icon
                                name="mobile"
                                type="font-awesome"
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={gameData}
                    renderItem={this.renderGameView}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 0, marginBottom: 20 }}
                />
            </View>
        )
    }
}

export default HomePage;