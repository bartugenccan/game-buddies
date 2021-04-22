import { StyleSheet } from "react-native";

export default StyleSheet.create({
    pcBg:{
        backgroundColor: "white",
        height : 50,
        width: 80,
        marginTop: 30,
        marginLeft:100,
        borderRadius: 15,
        shadowColor: "black",
        borderColor:"#892cdc",
        borderWidth:2,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        elevation:5,
        alignItems: "center",
        justifyContent: "center"
    },
    mobileBg:{
        backgroundColor: "white",
        height : 50,
        width: 80,
        marginTop: 30,
        marginLeft:40,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#892cdc",
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        elevation:5,
        alignItems: "center",
        justifyContent: "center"
    }
})