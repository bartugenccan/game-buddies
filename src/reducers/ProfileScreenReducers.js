// Actions Import
import {
  PROFILE_NAME_SET,
  PROFILE_SCREEN_STATS_SET,
  PROFILE_SCREEN_STATS_ADD,
  PROFILE_SCREEN_STATS_DELETE,
  PROFILE_SCREEN_LEAGUE_SET,
} from '../actions/types';

// Initialize INITIAL_STATE
const INITIAL_STATE = {
  profile_name: '',
  profile_games_arr: [],
};

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Util Imports
import * as selector from '../utils/LeagueImageSelectors';

// Switch case for action and payload
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_NAME_SET:
      return {...state, profile_name: action.payload};

    case PROFILE_SCREEN_STATS_SET:
      return {...state, profile_games_arr: action.payload};

    case PROFILE_SCREEN_STATS_ADD:
      return {
        ...state,
        profile_games_arr: [...state.profile_games_arr, action.newItem],
      };

    case PROFILE_SCREEN_STATS_DELETE:
      return {
        ...state,
        profile_games_arr: state.profile_games_arr.filter(
          element => element.name !== action.payload,
        ),
      };

    case PROFILE_SCREEN_LEAGUE_SET:
      let list = [...state.profile_games_arr];

      list.forEach(elem => {
        if (elem.name == action.gameName) {
          console.log(elem);
          if (action.gameName === 'League Of Legends') {
            elem.league = selector.lolLeagueImageSelector(action.payload);
            firestore()
              .collection('users')
              .where('UserEmail', '==', auth().currentUser.email)
              .onSnapshot(querySnaphot => {
                querySnaphot.forEach(docSnaphot => {
                  docSnaphot.ref.update({
                    LolAccount: {
                      Nickname: docSnaphot.data().LolAccount.Nickname,
                      iconID: docSnaphot.data().LolAccount.iconID,
                      ID: docSnaphot.data().LolAccount.ID,
                      FlexRanked: docSnaphot.data().LolAccount.FlexRanked,
                      SoloQueueRanked: action.payload,
                    },
                  });
                });
              });
          } else if (action.gameName === 'Apex Legends') {
            elem.league = selector.apexImageSelector(action.payload);
            firestore()
              .collection('users')
              .where('UserEmail', '==', auth().currentUser.email)
              .onSnapshot(querySnaphot => {
                querySnaphot.forEach(docSnaphot => {
                  docSnaphot.ref.update({
                    ApexAccount: {
                      Nickname: docSnaphot.data().ApexAccount.Nickname,
                      League: action.payload,
                    },
                  });
                });
              });
          } else if (action.gameName === 'Valorant') {
            elem.league = selector.valorantImageSelector(action.payload);

            firestore()
              .collection('users')
              .where('UserEmail', '==', auth().currentUser.email)
              .onSnapshot(querySnaphot => {
                querySnaphot.forEach(docSnaphot => {
                  docSnaphot.ref.update({
                    ValorantAccount: {
                      Nickname: docSnaphot.data().ValorantAccount.Nickname,
                      League: action.payload,
                    },
                  });
                });
              });
          }
        }
      });

      return {
        ...state,
        profile_games_arr: list,
      };

    default:
      return {...state};
  }
};
