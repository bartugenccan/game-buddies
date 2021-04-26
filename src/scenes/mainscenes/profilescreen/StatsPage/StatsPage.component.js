import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import style from "./StatsPage.components.style";
import { ListItem, Avatar } from 'react-native-elements'

const list = [
    {
        name: 'Solo Queue League',
        avatar_url: 'https://i1.sndcdn.com/artworks-000065334969-gmnp3t-t500x500.jpg',
        subtitle: 'Silver 3'
    },
    {
        name: 'Flex League',
        avatar_url: 'https://i1.sndcdn.com/artworks-000065334969-gmnp3t-t500x500.jpg',
        subtitle: 'Flex'
    },]


const StatsPage = () => {
    return (

        <View style={{ flex: 1 }}>
            <View>
                {
                    list.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar source={{ uri: l.avatar_url }}
                            size={35} />
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Avatar  
                                    source= {require("../../../../assets/images/LOLLeagueEmblems/Emblem_Silver.png")
                                    }
                                    size = {70}
                                    avatarStyle={{marginLeft: 25}}/>
                                    </ListItem.Title>
                                <ListItem.Subtitle style = {style.lp}>LP=35</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>


        </View>

    )
}

export default StatsPage;