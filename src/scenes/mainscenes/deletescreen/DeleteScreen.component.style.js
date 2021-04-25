import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeView: {
        flex: 0.5,
        width: "100%",
    },
    bigView: {
        backgroundColor: "#892cdc",
        flex: 0.5,
        width: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: "hidden",
        flexGrow: 0.6
    },
    iconView: {
        flex: 0.3,
        width: "100%",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 23,
        color: "white",
    },
    bigTextView: {
        flex: 0.4,
        justifyContent: "space-around",
        alignItems: 'center',
        overflow: "scroll"
    },
    smallTextView: {
        flex: 0.35,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    dangerText: {
        fontSize: 17,
        width: "95%",
        textAlign: 'center',
        color: "yellow"
    },
    smallIconView: {
        flex: 0.65,
        width: "100%",
        flexDirection: "row",
        overflow: "scroll",
    },
    profileIconView: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    profileNameView: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileNameText: {
        marginLeft: 10,
        color: "#892cdc",
        fontSize: 24,
        marginLeft : 15
    },
    buttonView : {
        flex : 0.3,
        width : "100%",
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttonStyle : {
        height : 50,
        backgroundColor : "red",
        width : "80%",
        justifyContent : 'center',
        alignItems : 'center'
    }
});