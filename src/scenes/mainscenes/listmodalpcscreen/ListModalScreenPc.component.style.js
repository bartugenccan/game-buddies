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
        borderTopRightRadius: 15
    },
    textView: {
        height: 55,
        justifyContent: 'center',
        paddingLeft: 30
    },
    textStyle: {
        color: "white",
        fontSize: 20,
        textAlign: 'left',
        fontFamily : "Roboto-Medium"
    },
    lineView: {
        height: 1,
        backgroundColor: "white",
        width: "100%",
        alignSelf: 'center'
    }
})