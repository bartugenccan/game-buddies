import React from 'react';
import { Text , View } from 'react-native';

class ProfileScreen extends React.Component{
    render(){
        return(
            <View style = {{flex : 1 , backgroundColor : "#ffffff" , justifyContent : 'center' , alignItems :'center'}}>
                <Text>ProfileScreen</Text>
            </View>
        )
    }
}

export default ProfileScreen;