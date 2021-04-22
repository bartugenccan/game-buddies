import React from 'react';
import { ListItem, Avatar } from 'react-native-elements'

const PlatformList = (props) => {
    return (
        <ListItem bottomDivider containerStyle={{ backgroundColor: "transparent" }}   >
            <Avatar source={props.avatar_url} rounded size={44} />
            <ListItem.Content>
                <ListItem.Title style={{ color: "white" }}>{props.name}</ListItem.Title>
                <ListItem.Subtitle style={{ color: "rgba(169,169,169,0.5)" }}>{props.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default PlatformList;