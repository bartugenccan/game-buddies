// Firebase Class For All App
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';

const db = firestore();

class Fire {

    constructor() { }

    addUserToData = async (username, useremail, gender) => {
        let userRef = firestore().collection("users");
        await userRef
            .add({
                UserName: username,
                UserEmail: useremail,
                Gender: gender,
                IsOnline: true,
                Review: {},
                StarsMean: 0,
                Dislikes: { Count: 0, Users: [] },
                Likes: { Count: 0, Users: [] }
            })
    }

    addUserToData = async (username, useremail, gender, preferredGender) => {
        let userRef = firestore().collection("users");
        await userRef
            .add({
                UserName: username,
                UserEmail: useremail,
                Gender: gender,
                IsOnline: true,
                Review: {},
                StarsMean: 0,
                Dislikes: { Count: 0, Users: [] },
                Likes: { Count: 0, Users: [] },
                PrefferedGender: preferredGender
            })
    }

    createLolAccount = async (uid,lolnickname) => {
        let checkSnapShot = await db.collection("lolaccounts").where("LolNickName", "==", lolnickname).get();

        if (checkSnapShot.empty) {
            return false;
        }

    }

}


const fire = new Fire();
export default fire;