import React from 'react';
import PlatformList from '../PlatformList/PlatformList.component';
import { View, Text, FlatList } from 'react-native';
import style from './ListModalView.component.style';



const list = [
    {
        name: 'League Of Legends',
        avatar_url: require("../../assets/images/League_of_Legends_icon.png"),
        subtitle: 'Online'
    },
    {
        name: 'PUBG',
        avatar_url: require("../../assets/images/PUBG_icon.png"),
        subtitle: 'Çok yakında.'
    },
    {
        name: "Apex Legends",
        avatar_url: require("../../assets/images/Apex_Legends_icon.png"),
        subtitle: "Çok yakında."
    },
    {
        name: "Rocket League",
        avatar_url: require("../../assets/images/Rocket_League_icon.png"),
        subtitle: "Çok yakında."
    }

]


const keyExtractor = (item, index) => index.toString()


const ListModalView = (props) => {



    return (
        <View style={style.bigView}>
            <View style={style.textView}>
                <Text style={style.textStyle}>PC Platformları</Text>
            </View>
            <View style={style.lineView} ></View>
            <View>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={list}
                    renderItem={({ item }) =>
                        <PlatformList
                            avatar_url={item.avatar_url}
                            name={item.name}
                            subtitle={item.subtitle}
                        />
                    }
                />
            </View>
        </View>
    )
}

export default ListModalView;
