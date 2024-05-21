import React from "react";

import { StyleSheet,StatusBar } from "react-native";

import { RFPercentage } from "react-native-responsive-fontsize";
import { cardColor } from "../../appsetting/appsettingColor";

export const Styles = StyleSheet.create({
    SearchContainer:{
        marginTop:RFPercentage(2),
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        
        paddingHorizontal:RFPercentage(3)
    },
    filterItem:{
        width:"100%",
        alignItems:"center",
        backgroundColor:cardColor,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:RFPercentage(2),
        flex:1,
        marginHorizontal:RFPercentage(0.5),
        paddingHorizontal:RFPercentage(1.2),
        paddingVertical:RFPercentage(0.8)
    }
})