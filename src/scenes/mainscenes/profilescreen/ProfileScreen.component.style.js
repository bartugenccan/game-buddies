import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    header: {
        width: "100%",
        height: 250,
        alignItems: "center",
        justifyContent: "center",
    },
    nickname: {
        marginTop: 25,
        fontSize: 25,
        color: "black"
    },
    reviewTxt: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 20,
    },
    cardContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    coverBio: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
    },
    coverContainer: {
        marginBottom: 55,
        position: 'relative',
    },
    coverImage: {
        height: Dimensions.get('window').width * (2 / 4),
        width: Dimensions.get('window').width,
    },
    coverMetaContainer: {
        backgroundColor: 'transparent',
        paddingBottom: 10,
        paddingLeft: 135,

    },
    coverName: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        paddingBottom: 2,
    },
    coverTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    coverTitleContainer: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 45,
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    profileImage: {
        borderColor: '#FFF',
        borderRadius: 55,
        borderWidth: 3,
        height: 110,
        width: 110,
    },
    profileImageContainer: {
        bottom: 7,
        left: 10,
        position: 'absolute',
    },
    tabBar: {
        backgroundColor: 'red',
        marginBottom: -10,
        marginLeft: 120,
        marginRight: 5,
    },
    tabContainer: {
        height: 50,
        width: "100%",
        position: "absolute",
        bottom: -5,
        flexDirection: "row"
    },
    gamesView: {
        flex: 0.40,
        justifyContent: "center",
        alignItems: "center",
    },
    gamesContainer: {
        width: "85%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0, 1)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 10, // Android
    },
    messageView: {
        flex: 0.24,
        alignItems: "center",
        justifyContent: "center"
    },
    messageContainer: {
        width: "85%",
        height: "80%",
        backgroundColor: "#892cdc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0, 1)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 10, // Android
    },
    gameListView: {
        height: 120,
        marginTop: 10
    },
    gameTextView: {
        height: 120,
    },
    apexTextView: {
        flex: 0.20,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    apexLeagueView: {
        flex: 0.5,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    apexButtonView: {
        flex: 0.3,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
    },
    item: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
        alignSelf: "center",
        marginHorizontal: 5,
        borderColor: "red"
    }
})