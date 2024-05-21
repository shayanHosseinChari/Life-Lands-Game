import React from "react";
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

const Inventory = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <WdashboardTitle icon={<Pressable onPress={() => { navigation.goBack() }}>
                <MaterialIcons name="keyboard-arrow-left" color={'white'} size={RFPercentage(3)} />
            </Pressable>} text={<Text style={{ color: "white", fontWeight: "900", fontSize: RFPercentage(2) }}>
                My Inventory
            </Text>} />





        </View>
    )
}

export default Inventory