import React, { useState } from 'react';
import { Text, View, ScrollView, FlatList, ImageBackground, Image } from 'react-native';
import { Icon, ListItem, Avatar } from "react-native-elements";
import style from "./ProfileScreen.component.style";




const keyExtractor = (item, index) => index.toString()


const ProfileScreen = () => {
    const [nickanme, setNickname] = useState("Blackmamba97");


    const [list, setList] = useState([
        {
            name: 'League Of Legends',
            avatar_url: require("../../../assets/images/League_of_Legends_icon.png"),
            subtitle: 'BerattoBB #TR1',
            league : require("../../../assets/images/LOLLeagueEmblems/Emblem_Gold.png")
        },
        {
            name: 'Valorant',
            avatar_url: require("../../../assets/images/Valorant_icon.png"),
            subtitle: 'Blackmamba97 #TR1',
            league : require("../../../assets/images/LOLLeagueEmblems/Emblem_Gold.png")
        },
    ]
    )


    return (
        <ScrollView style={{ backgroundColor: "#ffffff" }}>
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ImageBackground style={style.header} source={{ uri: "https://media.istockphoto.com/photos/futuristic-scifi-concrete-room-with-glowing-neon-virtual-reality-picture-id1174871534?k=6&m=1174871534&s=612x612&w=0&h=RG-PSOQOYfY3n0_UDX3pg0IfQ0o_CYe0T33Gmp2AtQA=" }}>
                    <Avatar
                        source={{ uri: "https://static.wikia.nocookie.net/leagueoflegends/images/a/aa/Champie_Wukong_profileicon.png/revision/latest/scale-to-width-down/300?cb=20171024220605" }}
                        size={130}
                        rounded />
                    <Text style={style.nickname}>{nickanme}</Text>
                </ImageBackground>
                <View style={{ width: "100%", backgroundColor: "#892cdc", height: 1 }}>

                </View>
                <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 20, color: "white", marginLeft: 10, textAlign: 'left', height: 35, color: "#892cdc" }}>Oyunlar</Text>
                    <View>
                        {
                            list.map((l, i) => (
                                <ListItem key={i} bottomDivider topDivider>
                                    <Avatar source={l.avatar_url} rounded size={40} />
                                    <ListItem.Content>
                                        <ListItem.Title>{l.name}</ListItem.Title>
                                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Content style={{ alignItems: 'flex-end' }}>
                                        <ListItem.Title>
                                             <Avatar source = {l.league}>
                                                
                                             </Avatar>
                                        </ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                    </View>
                    <View style={{ width: "100%", backgroundColor: "#892cdc", height: 1 }}>
                    </View>
                </View>
                <View style={{ backgroundColor: "transparent", width : "100%"}}>

                </View>

            </View>
        </ScrollView>


    )

}

export default ProfileScreen;