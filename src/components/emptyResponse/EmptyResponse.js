import React from "react";
import Entypo from 'react-native-vector-icons/Entypo'

import {
    View,Text
}from 'react-native'

const EmptyResponse = (props)=>{
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Entypo name="emoji-sad" color={props.color} size={props.size} />
            {/* <Text style={{marginTop:7}}>{props.title}</Text> */}
        </View>
    )
}

export default EmptyResponse