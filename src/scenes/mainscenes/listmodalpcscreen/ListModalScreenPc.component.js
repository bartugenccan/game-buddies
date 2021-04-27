// React Imports
import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, FlatList   } from 'react-native';

// Style Imports
import style from './ListModalScreenPc.component.style';
import { ListItem, Avatar } from 'react-native-elements'


// Data For PC Platform
const list = [
    {
        name: 'League Of Legends',
        avatar_url: require("../../../assets/images/League_of_Legends_icon.png"),
        subtitle: 'Online'
    },
    {
        name: 'Valorant',
        avatar_url: require("../../../assets/images/Valorant_icon.png"),
        subtitle: 'Online'
    },
    {
        name: "Apex Legends",
        avatar_url: require("../../../assets/images/Apex_Legends_icon.png"),
        subtitle: "Online"
    },
    {
        name: "Rust",
        avatar_url: require("../../../assets/images/Rust_icon.png"),
        subtitle: "Çok yakında."
    }
]


const keyExtractor = (item, index) => index.toString()

const ListModalScreenPc = ({ navigation }) => {

    // Initial State For Modal Visibility
    const [pcModalVisible, setPcModalVisible] = useState(true);


    // Cusstom Component For FlatLists Item
    const PlatformList = (props) => {
        
        function renderChoice(name, avatar_url, subtitle) {
            if (subtitle != "Çok yakında.") {
                return (
                    <ListItem bottomDivider containerStyle={{ backgroundColor: "transparent" }} onPress={() => {
                        navigation.navigate("AddScreen", { type: name });
                    }}
                        activeOpacity={1}
                        underlayColor={"rgba(0,0,0,0.5)"}>
                        <Avatar source={avatar_url} rounded size={44} />
                        <ListItem.Content>
                            <ListItem.Title style={{ color: "white" }}>{name}</ListItem.Title>
                            <ListItem.Subtitle style={{ color: "rgba(169,169,169,0.5)" }}>{subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            } else if (subtitle == "Çok yakında.") {
                return (
                    <ListItem bottomDivider containerStyle={{ backgroundColor: "transparent" }} >
                        <Avatar source={avatar_url} rounded size={44} />
                        <ListItem.Content>
                            <ListItem.Title style={{ color: "white" }}>{name}</ListItem.Title>
                            <ListItem.Subtitle style={{ color: "rgba(169,169,169,0.5)" }}>{subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            }
        }
        return (
            <View>
                {
                    renderChoice(props.name, props.avatar_url, props.subtitle)
                }
            </View>
        )
    };



    return (
        <View style={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={pcModalVisible}
                onRequestClose={() => {
                    console.log(navigation.isFocused());
                    setPcModalVisible(false);
                    navigation.navigate("HomePage");
                }}
            >
                <View style={style.container}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={style.closeView}
                        onPress={() => {
                            setPcModalVisible(false)
                            navigation.navigate("HomePage");
                        }}></TouchableOpacity>
                    <View style={style.bigView}>
                        <View style={style.textView}>
                            <Text style={style.textStyle}>PC Platformları</Text>
                        </View>
                        <View style={style.lineView}></View>
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
                                contentContainerStyle={{ paddingBottom: 100 }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ListModalScreenPc;