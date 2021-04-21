import React from 'react';
import { Text , View } from 'react-native';

class MessageScreen extends React.Component{
    render(){
        return(
            <View style = {{flex : 1 , backgroundColor : "#ffffff" , justifyContent : 'center' , alignItems :'center'}}>
                <Text>MessageScreen</Text>
            </View>
        )
    }
}

export default MessageScreen;