import React from "react";
import { Text, View, Image, } from "react-native";
import style from "./MatchesPage.component.style";
import { Avatar, ListItem } from "react-native-elements";

const list = [
    {
        name: 'Victory',
        avatar_url: 'https://i1.sndcdn.com/artworks-000065334969-gmnp3t-t500x500.jpg',
        subtitle: 'ARAM'
    },
    {
        name: 'Defeat',
        avatar_url: 'https://i1.sndcdn.com/artworks-000065334969-gmnp3t-t500x500.jpg',
        subtitle: 'Solo Queue'
    },]

const MatchesPage = () => {
    return (
        <View style={{ flex: 1 }}>
            <View>
                {
                    list.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar source={{ uri: l.avatar_url }}
                            size={50} />
                            <ListItem.Content>
                                <ListItem.Title style ={[l.name == "Victory" ? style.greenStyle : style.redStyle]}>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>16/8/8</ListItem.Title>
                                <ListItem.Subtitle >162 CS</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>


        </View>
    )
}

export default MatchesPage;