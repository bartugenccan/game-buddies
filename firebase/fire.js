// Firebase Class For All App
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore();

class Fire {
  constructor() {}

  getUid = async () => {
    return auth().currentUser.uid;
  };

  addUserToData = async (username, useremail, gender) => {
    let userRef = firestore().collection('users');
    await userRef
      .add({
        UserName: username,
        UserEmail: useremail,
        Gender: gender,
        IsOnline: true,
        Review: {},
        StarsMean: 0,
        Dislikes: {Count: 0, Users: []},
        Likes: {Count: 0, Users: []},
        Games: [],
        uid: null,
        iconUrl:
          'https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png',
        backgroundUrl:
          'https://t3.ftcdn.net/jpg/03/23/88/08/360_F_323880864_TPsH5ropjEBo1ViILJmcFHJqsBzorxUB.jpg',
        ApexAccount: null,
        LolAccount: null,
        PUBGMobileAccount: null,
        ValorantAccount: null,
        bio: '',
      })
      .catch(e => {
        console.log(e);
      });
  };

  addUserToData = async (username, useremail, gender, preferredGender) => {
    let userRef = firestore().collection('users');
    await userRef
      .add({
        UserName: username,
        UserEmail: useremail,
        Gender: gender,
        IsOnline: true,
        Review: {},
        StarsMean: 0,
        Dislikes: {Count: 0, Users: []},
        Likes: {Count: 0, Users: []},
        PrefferedGender: preferredGender,
        Games: [],
        uid: null,
        backgroundUrl:
          'https://t3.ftcdn.net/jpg/03/23/88/08/360_F_323880864_TPsH5ropjEBo1ViILJmcFHJqsBzorxUB.jpg',
        iconUrl:
          'https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png',
        ApexAccount: null,
        LolAccount: null,
        PUBGMobileAccount: null,
        ValorantAccount: null,
        bio: '',
      })
      .catch(e => {
        console.log(e);
      });
  };
}

const fire = new Fire();
export default fire;
