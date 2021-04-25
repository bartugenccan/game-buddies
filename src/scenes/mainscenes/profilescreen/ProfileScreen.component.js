import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from "react-native-elements";
import style from "./ProfileScreen.component.style";
import { Rating, AirbnbRating } from 'react-native-elements';
import StatsPage from "./StatsPage/StatsPage.component";
import MatchesPage from "./MatchesPage/MatchesPage.component";





const ProfileScreen = () => {

    const [currentPage , setCurrentPage] = useState(0);

    function pageChanger() {
 
        if (currentPage == 0){
            return (
                <StatsPage/>
            )
        }else if (currentPage == 1){
            return (<MatchesPage/>)
        }else if (currentPage == 2){
            return (<Text>Reviews Page</Text>) 
        }
        
    
    }

    return (
        <View style={{ flex: 1 , backgroundColor : "white"}}>
            <View style={{ flex: 0.30, }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Image
                        source={{ uri: "https://i.pinimg.com/236x/ea/a6/68/eaa668ece7e463e23e42db4c9bab09b2.jpg" }}
                        style={style.lolsumIcon} />
                    <Text style={style.nickname}>
                        BerattoBB
                    </Text>
                    <Rating style = {style.rating}/>
                </View>
                <View>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={style.bio}>
                        Lorem ipsum dolor amet.
                    </Text>
                    <View style={style.gamesCount}>
                        <Text>
                            6 Games
                        </Text>
                    </View>
                    <View style={style.envelope}>
                        <Icon
                            name="envelope"
                            type="font-awesome"
                            color="white" />
                    </View>
                </View>
            </View>
            <View style={{ flex: 0.08, backgroundColor: "#892cdc" }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <View style = {{flex : 0.33,alignItems:"center",justifyContent:"center"}}>
                        <TouchableOpacity  
                        onPress = {() => {setCurrentPage(0)}}>
                            <Text style={{ color: "white", fontSize: 20 }}>
                                Stats
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex : 0.33,alignItems:"center",justifyContent:"center"}}>
                        <TouchableOpacity
                        onPress = {() => {setCurrentPage(1)}}>
                            <Text style={{ color: "white", fontSize: 20 }}>
                                Matches
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex : 0.33,alignItems:"center",justifyContent:"center"}}>
                        <TouchableOpacity
                        onPress = {() => {setCurrentPage(2)}}>
                            <Text style={{ color: "white", fontSize: 20 }}>
                                Reviews
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style = {{flex: 0.62}}>
                    { 
                    pageChanger(currentPage)}
            </View>
            

        </View>
    )

}

export default ProfileScreen;