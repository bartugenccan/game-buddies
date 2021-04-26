import React from "react";
import { Text, View, ImageBackground } from "react-native";
import style from "./DuoFinderScreen.component.style";
import { Avatar, Icon } from "react-native-elements";

const DuoFinderScreen = () => {
    return (<View style={{ flex: 1 }}>
        <View style={style.profileHeader}>
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1, height: "100%", alignItems: "center", flexDirection: "row", opacity: 0.8, position: "relative", backgroundColor: "black" }} source={{ uri: "https://estnn.com/wp-content/uploads/2020/01/league-of-legends-header-x.jpg" }}>
                    <Avatar
                        source={{ uri: "https://cdnb.artstation.com/p/assets/images/images/008/384/347/large/cem-akkaya-3218-eastern-poro-summoner-icon.jpg?1512420575" }}
                        size={80}
                        rounded
                        containerStyle={{ marginLeft: 25 }} />
                    <Text style={style.nickname}>
                        BerattoBB
                </Text>
                </ImageBackground>
            </View>
        </View>
        <View style={style.genderArea}>
            <Text style={style.gendertxt}>
                Gender : Male
            </Text>

        </View>
        <View style={style.profileInfo}>
            <View style={{ flex: 0.5, }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.33, justifyContent: "center", alignItems: "center",flexDirection:"row" }}>
                        <View style={style.infologo}>
                            <Icon
                                name="user"
                                type="font-awesome"
                                color="white" />
                        </View>
                        <Text style = {style.infotxt}>LEVEL 134</Text>
                    </View>
                    <View style={{ flex: 0.33, justifyContent: "center", alignItems: "center",flexDirection:"row" }}>
                        <View style={style.infologo}>
                            <Icon
                                name="user"
                                type="font-awesome"
                                color="white" />

                        </View>
                        <Text style = {style.infotxt}>LEVEL 134</Text>

                    </View>
                    <View style={{ flex: 0.34, justifyContent: "center", alignItems: "center",flexDirection:"row" }}>
                        <View style={style.infologo}>
                            <Icon
                                name="user"
                                type="font-awesome"
                                color="white" />

                        </View>
                        <Text style = {style.infotxt}>LEVEL 134</Text>

                    </View>
                </View>

            </View>
            <View style={{ flex: 0.5 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.33, justifyContent: "center", alignItems: "center",flexDirection:"row" }}>
                        <View style={style.infologo}>
                            <Icon
                                name="user"
                                type="font-awesome"
                                color="white" />

                        </View>
                        <Text style = {style.infotxt}>LEVEL 134</Text>

                    </View>
                    <View style={{ flex: 0.33, justifyContent: "center", alignItems: "center",flexDirection:"row" }}>
                        <View style={style.infologo}>
                            <Icon
                                name="user"
                                type="font-awesome"
                                color="white" />

                        </View>
                        <Text style = {style.infotxt}>LEVEL 134</Text>

                    </View>
                    <View style={{ flex: 0.34, justifyContent: "center", alignItems: "center",flexDirection:"row" }}>
                        <View style={style.infologo}>
                            <Icon
                                name="user"
                                type="font-awesome"
                                color="white" />

                        </View>
                        <Text style = {style.infotxt}>LEVEL 134</Text>

                    </View>
                </View>

            </View>
        </View>
        <View style={{flex : 0.2,backgroundColor:"#892cdc"}}>
                <View style = {{flex : 0.3,alignItems:"center",justifyContent:"center",backgroundColor:"#892cdc",flexDirection:"row"}}>
                    <Icon  
                    name = "star"
                    type="font-awesome"
                    color="yellow"/>
                    <Icon  
                    name = "star"
                    type="font-awesome"
                    color="yellow"/>
                    <Icon  
                    name = "star"
                    type="font-awesome"
                    color="yellow"/>
                    <Icon  
                    name = "star"
                    type="font-awesome"
                    color="yellow"/>
                    <Icon  
                    name = "star"
                    type="font-awesome"
                    color="yellow"/>
                </View>
                <View style = {{flex:0.7,backgroundColor:"white"}}>
                    <Text style = {{fontSize:20,alignSelf:"center",color:"white"}}>
                        Reviews
                    </Text>
                    <Text style = {style.reviewtxt}>
                        Kalite oyuncu Thresh'le carryi verdi..
                    </Text>
                    <Text style = {style.reviewtxt}>
                        Fena supportladı eli taşıdı eline sağlık..
                    </Text>
                    <Text style = {style.reviewtxt}>
                        Lets go mann great game solid player ggs..
                    </Text>
                </View>
        </View>

    </View>)
}

export default DuoFinderScreen;