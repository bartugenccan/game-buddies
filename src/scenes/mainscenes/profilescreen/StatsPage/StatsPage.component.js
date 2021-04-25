import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import style from "./StatsPage.components.style";
import { ListItem, Avatar } from 'react-native-elements'

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://i1.sndcdn.com/artworks-000065334969-gmnp3t-t500x500.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://i1.sndcdn.com/artworks-000065334969-gmnp3t-t500x500.jpg',
        subtitle: 'Vice Chairman'
    },]


const StatsPage = () => {
    return (

        <View style={{ flex: 1 }}>
            <View>
                {
                    list.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar source={{ uri: l.avatar_url }}
                            size={50} />
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>zaxd31</ListItem.Title>
                                <ListItem.Subtitle>asdasdasd</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>


        </View>

    )
}

export default StatsPage;