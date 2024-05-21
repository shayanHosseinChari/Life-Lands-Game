import { useState,useEffect } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import WdashboardTitleStyles from "./WdashboardTitleStyles";
import { View } from "react-native";



const WdashboardTitle = (props)=>{
    return (
        <View style={WdashboardTitleStyles.container}>
              {props.icon}
            {props.text}

            <View></View>
          

        </View>
    )
}

export default WdashboardTitle