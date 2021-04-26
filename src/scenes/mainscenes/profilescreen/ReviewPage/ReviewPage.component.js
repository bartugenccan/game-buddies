import React from "react";
import {Text, View} from "react-native";
import { ListItem, Avatar } from 'react-native-elements';
import style from "./ReviewPage.component.style";


const list = [
    {
        name: 'Blackmamba97',
        avatar_url: 'https://i1.sndcdn.com/artworks-000065334969-gmnp3t-t500x500.jpg',
        subtitle: 'Silver 3'
    },
    {
        name: 'BerattoBB',
        avatar_url: 'https://i1.sndcdn.com/artworks-000065334969-gmnp3t-t500x500.jpg',
        subtitle: 'Flex'
    },]

const ReviewPage = () => {
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
                                    <Text>
                                        Çok eğlenceliydi!
                                    </Text>
                                </ListItem.Title>
                                <ListItem.Subtitle>5 STARS</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>


        </View>
    )
}


export default ReviewPage;