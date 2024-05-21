import React from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import EvillIcons from 'react-native-vector-icons/EvilIcons'
import { View,Text,TouchableOpacity,Image,Pressable } from 'react-native'
import { cardColor } from '../../appsetting/appsettingColor'

import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet,StatusBar } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { cardColor } from "../../appsetting/appsettingColor";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";


export const  AwardsBox = (props)=>{
    return(
        <Pressable style={{width:'33.3333336%'}}>
           <View style={Styles.awardBoxHeader}>
           <View style={{marginVertical:6}}>
            <Text>{props.image}</Text>
           <Image source={require('../../../assets/crown.png')} style={{width:"100%",height:50}}/>
           </View>
           <Text>props.title</Text>
            <Text></Text>

           </View>
        </Pressable>
    )
}

