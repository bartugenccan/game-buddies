import { StyleSheet } from "react-native";

export default StyleSheet.create({
    registerTxt: {
        fontSize: 35,
        marginBottom: 25,
        marginTop: 10
    },
    inputText: {
        backgroundColor: "white",
        width : "93%",
        borderRadius: 20,
        paddingVertical : 10,
        paddingHorizontal : 15
    },
    inputBackground: {
        backgroundColor: "#892cdc",
        borderRadius: 10,
        height: 300,
        width: "85%",
        padding: 10,
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        elevation: 5,
        marginBottom: 30

    },
    iconBg: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    switchSelector: {
        width : "85%"
    },
    playQuestion: {
        marginTop: 10,
        marginBottom : 10
    },
    registerBTN: {
        marginTop: 30,
        marginBottom: 35,
        backgroundColor: "#892cdc",
        borderRadius: 10,
        height: 50,
        width : 200,
        justifyContent : "center",
        alignItems :"center",
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        elevation: 5,


    },
    registerBTNTXT: {
        fontSize: 30,
        color: "white"
    }


})