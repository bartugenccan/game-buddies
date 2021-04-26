import React from "react"
import { ImageBackground, TouchableOpacity } from "react-native"
import style from "./GameView.component.style";
import { useNavigation } from '@react-navigation/native';


const GameView = ({ gameName, gameImage }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity 
        style={style.container} 
        onPress={() => navigation.navigate("DuoFinder")}
        activeOpacity = {0.7}>
            <ImageBackground
                resizeMode="cover"
                source={{ uri: gameImage }}
                style={{ width: "100%", height: 200, overflow: "hidden", borderRadius: 50 }} />
        </TouchableOpacity>
    )
}



export default GameView;