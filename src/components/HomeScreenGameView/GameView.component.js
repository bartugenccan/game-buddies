import React from "react"
import { View, Text, FlatList, Image, ImageBackground, ScrollView } from "react-native"
import style from "./GameView.component.style"



const GameView = ({ gameName, gameImage }) => {
    return (
        <View style={style.container}>
            <ImageBackground resizeMode="cover" source={{ uri: gameImage }} style={{ width: "100%", height: 200, overflow: "hidden", borderRadius: 50 }}>
            </ImageBackground>
        </View>)
}



export default GameView;