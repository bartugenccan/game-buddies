// Firebase Class For All App
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore();

class Fire {

    constructor() { }

    getUid = async () => {
        return auth().currentUser.uid;
    }

    addUserToData = async (username, useremail, gender) => {
        let userRef = firestore().collection("users");
        await userRef
            .add({
                UserName: username,
                UserEmail: useremail,
                Gender: gender,
                IsOnline: true,
                IsOnlineForLol: false,
                IsOnlineForValorant: false,
                IsOnlineForApex: false,
                IsOnlineForPUBGMobile: false,
                Review: {},
                StarsMean: 0,
                Dislikes: { Count: 0, Users: [] },
                Likes: { Count: 0, Users: [] },
                Games: [],
                uid: null,
                LolAccount: null,
                ValorantAccount: null,
                ApexAccount: null,
                PUBGMobileAccount: null,
                iconID: 1
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
                IsOnlineForLol: false,
                IsOnlineForValorant: false,
                IsOnlineForApex: false,
                IsOnlineForPUBGMobile: false,
                Review: {},
                StarsMean: 0,
                Dislikes: { Count: 0, Users: [] },
                Likes: { Count: 0, Users: [] },
                PrefferedGender: preferredGender,
                Games: [],
                uid: null,
                LolAccount: null,
                ValorantAccount: null,
                ApexAccount: null,
                PUBGMobileAccount: null,
                iconID: 1
            })

    }

    checkForLolAccount = async (uid) => {
        let checkSnapShot = await db.collection("users").doc(uid).get()
        if (checkSnapShot.data().LolAccount) {
            return false;
        } else {
            return true;
        }
    }
}


const fire = new Fire();
export default fire;