// Firebase Class For All App
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const db = firestore();

class Fire {

    constructor() { }

    getUid = async () => {
        return firebase().currentUser.uid;
    }

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

    checkForLolAccount = async (uid) => {
        let checkSnapShot = await db.collection("users").doc(uid).get();

        let res = await checkSnapShot.docs.forEach( field => {
            if (field.data == "LolAccount"){
                return false
            }
        })

        if (res == false){
            return false;
        } else {
            return true
        }
    }

}


const fire = new Fire();
export default fire;