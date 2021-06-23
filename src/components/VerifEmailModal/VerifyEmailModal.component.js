import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';

// Firebase Import
import auth from '@react-native-firebase/auth';

const VerifEmailModal = ({visible, onPressOut, onSendPress}) => {
  // Initial State
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    setIsVerified(auth().currentUser.emailVerified);
  }, []);

  const renderContent = () => {
    if (isVerified == null) {
      return null;
    } else if (isVerified == false) {
      return (
        <View
          style={{
            height: '30%',
            backgroundColor: 'white',
            width: '80%',
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <View
            style={{
              flex: 0.35,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Icon name="envelope" type="font-awesome" size={35} />
            <Text style={{fontSize: 17, fontFamily: 'Roboto-Bold'}}>
              Epostanı Doğrula
            </Text>
          </View>
          <View
            style={{
              flex: 0.4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',

                width: '90%',
                textAlign: 'center',
                fontSize: 16,
              }}>
              Görünüşe göre email adresini doğrulamamışsın. Doğrulamak için
              aşağıdaki butona basabilirsin.
            </Text>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              title="Epostamı Doğrula"
              type="outline"
              raised
              onPress={onSendPress}
            />
          </View>
        </View>
      );
    } else if (isVerified == true) {
      return (
        <View
          style={{
            height: '20%',
            backgroundColor: 'white',
            width: '80%',
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <View
            style={{
              flex: 0.35,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Icon
              name="envelope"
              type="font-awesome"
              size={35}
              color="#892cdc"
            />
          </View>
          <View
            style={{
              flex: 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',

                width: '90%',
                textAlign: 'center',
                fontSize: 16,
              }}>
              Epostan zaten doğrulanmış.
            </Text>
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="smile-wink"
              type="font-awesome-5"
              size={40}
              color="#892cdc"
            />
          </View>
        </View>
      );
    }
  };
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        onPressOut={onPressOut}
        activeOpacity={1}>
        <TouchableWithoutFeedback>{renderContent()}</TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default VerifEmailModal;
