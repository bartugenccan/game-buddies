import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, StyleSheet, Dimensions } from "react-native";
import style from "./DuoFinderScreen.component.style";
import { Avatar, Icon } from "react-native-elements";
import SwipeCards from "react-native-swipe-cards-deck";


function Card({ data }) {
    return (
        <View style={[styles.card, { backgroundColor: "#ffffff" }]}>
            <Text>{data.text}</Text>
        </View>
    )
}


function StatusCard({ text }) {
    return (
        <View>
            <Text style={styles.cardsText}>{text}</Text>
        </View>
    );
}


function handleYup(card) {
    console.log(`Yup for ${card.text}`);
    return true; // return false if you wish to cancel the action
}


function handleNope(card) {
    console.log(`Nope for ${card.text}`);
    return true;
}

function handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
    return false;
}


const DuoFinderScreen = () => {
    const [cards, setCards] = useState();

    useEffect(() => {
        setTimeout(() => {
            setCards([
                { text: "Tomato" },
                { text: "Aubergine" },
                { text: "Courgette" },
                { text: "Blueberry" },
                { text: "Umm..." },
                { text: "orange" },
            ]);
        }, 0);
    }, []);


    return (
        <View style={styles.container}>
            <View style={{ flex: 1, width: "100%" }}>
                {cards ? (
                    <SwipeCards
                        cards={cards}
                        renderCard={(cardData) => <Card data={cardData} />}
                        keyExtractor={(cardData) => String(cardData.text)}
                        renderNoMoreCards={() => <StatusCard text="No more cards..." />}
                        handleYup={handleYup}
                        handleNope={handleNope}
                        handleMaybe={handleMaybe}
                        hasMaybeAction={true}

                        // If you want a stack of cards instead of one-per-one view, activate stack mode
                        stack={true}
                        stackDepth={1}
                    />
                ) : (
                    <StatusCard text="Loading..." />
                )}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get("screen").height * 80 / 100,
        width: Dimensions.get("screen").width * 4 / 5,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    },
    cardsText: {
        fontSize: 22,
    },
});


export default DuoFinderScreen;