import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';

// Firebase Imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const EditProfileAvatar = ({size}) => {
  const [profileIcon, setProfileIcon] = useState(
    'https://www.mycontact.london/wp-content/uploads/2019/04/2560x1440-gray-solid-color-background.jpg',
  );

  useEffect(() => {
    const subs = firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .onSnapshot(resp => {
        resp.forEach(doc => {
          setProfileIcon(doc.data().iconUrl);
        });
      });

    return () => {
      subs();
    };
  }, []);

  return <Avatar source={{uri: profileIcon}} size={size} rounded />;
};

export default EditProfileAvatar;
