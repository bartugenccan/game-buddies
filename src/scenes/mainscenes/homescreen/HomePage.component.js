import React from 'react';
import { Text , View } from 'react-native';

class HomePage extends React.Component{
    render(){
        return(
            <View style = {{flex : 1 , backgroundColor : "#ffffff" , justifyContent : 'center' , alignItems :'center'}}>
                <Text>HomePage</Text>
            </View>
        )
    }
}

export default HomePage;