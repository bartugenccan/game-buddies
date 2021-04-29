import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, Modal } from 'react-native';
import style from "./ProfileScreen.component.style";
import { Icon } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements'

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import Spinner from '../../../components/Spinner/Spinner.component';
import ModalDropdown from 'react-native-modal-dropdown';


const lolLeagueImageSelector = (l) => {
    switch (l) {
        case "IRON I":
        case "IRON II":
        case "IRON III":
        case "IRON IV":
            return require("../../../assets/images/LOLLeagueEmblems/Emblem_Iron.png")

        case "BRONZE I":
        case "BRONZE II":
        case "BRONZE III":
        case "BRONZE IV":
            return require("../../../assets/images/LOLLeagueEmblems/Emblem_Bronze.png")

        case "SILVER I":
        case "SILVER II":
        case "SILVER III":
        case "SILVER IV":
            return require("../../../assets/images/LOLLeagueEmblems/Emblem_Silver.png")

        case "GOLD I":
        case "GOLD II":
        case "GOLD III":
        case "GOLD IV":
            return require("../../../assets/images/LOLLeagueEmblems/Emblem_Gold.png")

        case "GOLD I":
        case "GOLD II":
        case "GOLD III":
        case "GOLD IV":
            return require("../../../assets/images/LOLLeagueEmblems/Emblem_Gold.png")

        case "PLATINUM I":
        case "PLATINUM II":
        case "PLATINUM III":
        case "PLATINUM IV":
            return require("../../../assets/images/LOLLeagueEmblems/Emblem_Platinum.png")

        case "DIAMOND I":
        case "DIAMOND II":
        case "DIAMOND III":
        case "DIAMOND IV":
            return require("../../../assets/images/LOLLeagueEmblems/Emblem_Platinum.png")

        case "MASTER I":
            return require("../../../assets/images/LOLLeagueEmblems/Emblem_Master.png")

        case "GRANDMASTER I":
            return require("../../../assets/images/LOLLeagueEmblems/Emblem_Grandmaster.png")

        case "CHALLENGER I":
            return require("../../../assets/images/LOLLeagueEmblems/Emblem_Challenger.png")

        default:
            return false;
    }
}

const valorantImageSelector = (l) => {
    switch (l) {
        case "IRON I":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Iron1.png")
        case "IRON II":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Iron2.png")
        case "IRON III":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Iron3.png")

        case "BRONZE I":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Bronze1.png")
        case "BRONZE II":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Bronze2.png")
        case "BRONZE III":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Bronze3.png")

        case "SILVER I":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Silver1.png")
        case "SILVER II":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Silver2.png")
        case "SILVER III":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Silver3.png")

        case "GOLD I":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Gold1.png")
        case "GOLD II":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Gold2.png")
        case "GOLD III":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Gold3.png")


        case "PLATINUM I":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Platinum1.png")
        case "PLATINUM II":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Platinum2.png")
        case "PLATINUM III":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Platinum3.png")

        case "DIAMOND I":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Diamond1.png")
        case "DIAMOND II":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Diamond2.png")
        case "DIAMOND III":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Diamond3.png")

        case "IMMORTAL I":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Immortal1.png")
        case "IMMORTAL II":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Immortal2.png")
        case "IMMORTAL III":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Immortal3.png")

        case "RADIANT I":
            return require("../../../assets/images/ValorantRanksAssets/Valorant_Radiant.png")

        default:
            return false;
    }
}

const apexImageSelector = (l) => {
    switch (l) {
        case "BRONZE I":
        case "BRONZE II":
        case "BRONZE III":
        case "BRONZE IV":
            return require("../../../assets/images/ApexRankEmbles/Ranked_Tier1_Bronze.png")

        case "SILVER I":
        case "SILVER II":
        case "SILVER III":
        case "SILVER IV":
            return require("../../../assets/images/ApexRankEmbles/Ranked_Tier2_Silver.png")

        case "GOLD I":
        case "GOLD II":
        case "GOLD III":
        case "GOLD IV":
            return require("../../../assets/images/ApexRankEmbles/Ranked_Tier3_Gold.png")

        case "PLATINUM I":
        case "PLATINUM II":
        case "PLATINUM III":
        case "PLATINUM IV":
            return require("../../../assets/images/ApexRankEmbles/Ranked_Tier4_Platinum.png")

        case "DIAMOND I":
        case "DIAMOND II":
        case "DIAMOND III":
        case "DIAMOND IV":
            return require("../../../assets/images/ApexRankEmbles/Ranked_Tier5_Diamond.png")

        case "MASTER I":
        case "MASTER II":
        case "MASTER III":
        case "MASTER IV":
            return require("../../../assets/images/ApexRankEmbles/Ranked_Tier6_Master.png")

        case "APEX PREDATOR I":
            return require("../../../assets/images/ApexRankEmbles/Ranked_Tier7_Apex_Predator.png")


        default:
            return false;
    }
}

const ProfileScreen = () => {

    const [username, setUsername] = useState("");
    const [list, setList] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [game, setGame] = useState();
    const [loading, setLoading] = useState(false);


    const [apexLeague, setApexLeague] = useState();

    useEffect(() => {

        const games = [];
        const fetchProfile = async () => {
            await firestore()
                .collection("users")
                .where("UserEmail", "==", auth().currentUser.email)
                .get()
                .then(resp => {
                    resp.forEach(doc => {
                        setUsername(doc.data().UserName);

                        if (doc.data().LolAccount != null) { // !=
                            let source = lolLeagueImageSelector(doc.data().LolAccount["SoloQueueRanked"]);

                            games.push({
                                name: "League Of Legends",
                                avatar_url: require("../../../assets/images/League_of_Legends_icon.png"),
                                league: source,
                                subtitle: doc.data().LolAccount["Nickname"],
                            })

                        } if (doc.data().ValorantAccount != null) { // !=
                            let source = valorantImageSelector(doc.data().ValorantAccount["League"])

                            games.push({
                                name: "Valorant",
                                avatar_url: require("../../../assets/images/Valorant_icon.png"),
                                league: source,
                                subtitle: doc.data().ValorantAccount["Nickname"]
                            })

                        } if (doc.data().ApexAccount != null) {

                            let source = apexImageSelector(doc.data().ApexAccount["League"])  // !=
                            games.push({
                                name: "Apex Legends",
                                avatar_url: require("../../../assets/images/Apex_Legends_icon.png"),
                                league: source,
                                subtitle: doc.data().ApexAccount["Nickname"]
                            })
                        }
                    })

                    setList(games)
                })
        }

        setLoading(true);
        fetchProfile()
            .then(() => setLoading(false))

    }, []);

    const _onPress = (gameName) => {
        setGame(gameName);
        setModalVisible(true);
    }

    const renderChoice = (c) => {
        if (c == "Apex Legends") {
            return (
                <View style={{ height: 250, width: 350, backgroundColor: "white", borderRadius: 30, overflow: "hidden" }}>
                    <View style={{ flex: 1 }}>
                        <View style={style.apexTextView}>
                            <Text style={{ fontFamily: "Roboto-Medium", fontSize: 20 }}>Apex Legends Liginizi Seçin</Text>
                        </View>
                        <View style={style.apexLeagueView}>

                        </View>
                        <View style={style.apexButtonView}>
                            <Icon name="times-circle" type="font-awesome" size={60} color="red" />
                            <TouchableOpacity style={{ height: 50, width: 150, backgroundColor: "#892cdc", justifyContent: 'center', alignItems: 'center', borderRadius: 15 , marginBottom : 5 }}>
                                <Text style={{ color: "white", fontSize: 25 }}>Kaydet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
    }
    return (
        <ScrollView style={{ backgroundColor: "#ffffff" }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <View style={{ height: 100, width: 200, backgroundColor: "#892cdc", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner color={"yellow"} size={100}></Spinner>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0,0,0,0.5)" }}>
                    {renderChoice(game)}
                </View>
            </Modal>
            <View style={style.headerContainer}>
                <View style={style.coverContainer}>
                    <ImageBackground
                        source={{ uri: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Diana_0.jpg" }}
                        style={style.coverImage}>
                        <View style={style.coverTitleContainer}>
                            <Text style={style.coverTitle} />
                        </View>
                        <View style={style.coverMetaContainer}>
                            <Text style={style.coverName}>{username}</Text>
                            <Text style={style.coverBio}>Saas</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={style.profileImageContainer}>
                    <Image
                        source={{ uri: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png" }}
                        style={style.profileImage}
                    />
                </View>
                <View style={style.tabContainer}>
                    <View style={{ flex: 0.36 }}></View>
                    <View style={style.gamesView}>
                        <TouchableOpacity style={style.gamesContainer} activeOpacity={1}>
                            <Text>{list.length} Games</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.messageView}>
                        <TouchableOpacity style={style.messageContainer} activeOpacity={1}>
                            <Icon
                                name="envelope"
                                type="font-awesome"
                                color="white"
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, fontFamily: "Roboto-Bold" }}>
                Oyunlar
            </Text>
            <View>
                {
                    list.map((l, i) => (
                        <ListItem key={i}>
                            <Avatar source={l.avatar_url} rounded size={40} />
                            <ListItem.Content>
                                <ListItem.Title style={{ fontFamily: "Roboto-Medium" }}>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Title>
                                {l.league == false
                                    ? <Icon name="edit" type="font-awesome" size={35} onPress={() => _onPress(l.name)} />
                                    : <Avatar size={38} source={l.league} />
                                }

                            </ListItem.Title>
                        </ListItem>

                    ))
                }
            </View>

            <View>

            </View>
        </ScrollView>


    )

}

export default ProfileScreen;