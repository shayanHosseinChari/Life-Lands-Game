import React from "react";
import Entypo from 'react-native-vector-icons/Entypo'

import {
    View,
    Text,
    StatusBar,
    Image
} from 'react-native'
import WdashboardTitle from "../../components/WdashBoardTitle/WdashBoardTitle";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Theme from "../../Theme/Theme";
import { RFPercentage } from "react-native-responsive-fontsize";
// import EmptyResponse from "../../components/emptyResponse/emptyResponse";
import CustomText from "../../components/text/CustomText";
const Wars = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <WdashboardTitle icon={<Pressable onPress={() => { navigation.goBack() }}>
                <MaterialIcons name="keyboard-arrow-left" color={'white'} size={RFPercentage(3)} />
            </Pressable>} text={<Text style={{ color: "white", fontWeight: "900", fontSize: RFPercentage(2) }}>
                My Wars
            </Text>} />
            {/* <EmptyResponse color='white' title='هنوز جنگی وجود ندارد' size={RFPercentage(2)}/> */}
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Entypo name="emoji-sad" color={'white'} size={RFPercentage(8)} />

                <CustomText style={{color:'white',marginTop:RFPercentage(2),fontSize:RFPercentage(2)}}>هنوز جنگی وجود ندارد</CustomText>
            </View>





        </View>
    )
}

export default Wars