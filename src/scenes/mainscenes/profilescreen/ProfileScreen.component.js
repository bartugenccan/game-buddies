import React, { useState } from 'react';
import { Text, View, ScrollView, FlatList, ImageBackground, Image, TextPropTypes } from 'react-native';
import { Icon, ListItem, Avatar } from "react-native-elements";
import style from "./ProfileScreen.component.style";






const ProfileScreen = () => {
    const [nickanme, setNickname] = useState("Blackmamba97");


    const [list, setList] = useState([
        {
            name: 'League Of Legends',
            avatar_url: require("../../../assets/images/League_of_Legends_icon.png"),
            subtitle: 'BerattoBB #TR1',
            league: require("../../../assets/images/LOLLeagueEmblems/Emblem_Gold.png")
        },
        {
            name: 'Valorant',
            avatar_url: require("../../../assets/images/Valorant_icon.png"),
            subtitle: 'Blackmamba97 #TR1',
            league: require("../../../assets/images/LOLLeagueEmblems/Emblem_Gold.png")
        },
    ]
    )


    return (
        <ScrollView style={{ backgroundColor: "#ffffff" }}>
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ImageBackground style={style.header} >
                    <Avatar
                        source={{ uri: "https://static.wikia.nocookie.net/leagueoflegends/images/a/aa/Champie_Wukong_profileicon.png/revision/latest/scale-to-width-down/300?cb=20171024220605" }}
                        size={130}
                        rounded />
                    <Text style={style.nickname}>{nickanme}</Text>
                </ImageBackground>
                <View style={{ width: "100%", backgroundColor: "gray", height: 1 }}>

                </View>
                <View style={{ width: "100%", backgroundColor: "black" }}>
                    <Text style={{ fontSize: 20, color: "white", marginLeft: 10, textAlign: 'left', height: 35, color: "white", textAlignVertical: "center" }}>Oyunlar</Text>
                    <View>
                        {
                            list.map((l, i) => (
                                <ListItem key={i} containerStyle={{ backgroundColor: "black" }}>
                                    <Avatar source={l.avatar_url} rounded size={40} />
                                    <ListItem.Content>
                                        <ListItem.Title style={{ color: "white" }}>{l.name}</ListItem.Title>
                                        <ListItem.Subtitle style={{ color: "white" }}>{l.subtitle}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Content style={{ alignItems: 'flex-end' }}>
                                        <ListItem.Title>
                                            <Avatar source={l.league}>
                                            </Avatar>
                                        </ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                    </View>
                    <View style={{ width: "100%", backgroundColor: "gray", height: 1 }}>
                    </View>
                </View>
                <View style={{ backgroundColor: "black", width: "100%", height: 500 }}>
                    <Text>zaxd</Text>
                </View>

            </View>
        </ScrollView>


    )

}

export default ProfileScreen;