import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import style from "./HomeHeader.component.style";

class HomeHeader extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: "row", width: "100%", backgroundColor: "red" }}>
                <View style={style.pcBg}>
                    <Icon
                        name="laptop"
                        type="font-awesome"
                        size={40}
                        style = {style.pcIcon} />

                </View>
                <View style={style.mobileBg}>
                    <Icon
                        name="mobile"
                        type="font-awesome"
                        size={40} />
                </View>
            </View>
        )
    }
}

export default HomeHeader;