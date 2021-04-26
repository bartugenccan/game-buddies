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
        flex: 0.4,
        width: "100%",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 23,
        color: "white",
    },
    textStyleValorant : {
        fontSize : 30,
        color : "white"
    },  
    inputView: {
        flex: 0.4,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputViewValorant: {
        flex: 0.2,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    rankView: {
        flex: 0.18,
        width: "100%",
    },

    buttonView: {
        flex: 0.2,
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});