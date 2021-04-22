import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        backgroundColor: "#ffffff"
    },
    firstView: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigTextView: {
        width: "90%",
        height: "85%",
        backgroundColor: "#892cdc",
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: "hidden",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: "#ffffff",
        fontSize: 14,
        width : "85%"
    },
    iconView: {
        height: 70,
        width: "100%",
        flexDirection: "row",
    },
    pcIconView: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    mobileIconView: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    pcIcon: {
        backgroundColor: "white",
        height: 60,
        width: 90,
        borderRadius: 15,
        shadowColor: "black",
        borderColor: "#892cdc",
        borderWidth: 2,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginRight : 15
    },
    mobileIcon: {
        backgroundColor: "white",
        height: 60,
        width: 90,
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
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginLeft : 15
    }
})