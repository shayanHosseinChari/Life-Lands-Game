import React, { useCallback, useEffect } from "react"
import { View,Text, StatusBar,TouchableOpacity } from "react-native"

import Theme from "../../Theme/Theme"
import { RFPercentage } from "react-native-responsive-fontsize"
import CustomText from "../text/CustomText"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Icon } from "../../appsetting/icons"
import PublicPageHeader from "../share/PublicPageHeader"
const ConsoleGames = ({navigation})=>{
    
    return(
        <>
            <View style={{width:'100%',flexDirection:"row",justifyContent:"space-between",backgroundColor:Theme.boxBgColor,paddingVertical:StatusBar.currentHeight,paddingHorizontal:RFPercentage(2),
            borderBottomRightRadius:23,
            borderBottomLeftRadius:23,
            alignItems:"center"

        }}>
           <View style={{flexDirection:"row",alignItems:"center",marginRight:6}}>
         
           <TouchableOpacity 
            activeOpacity={0.8} onPress={()=>{
                navigation.goBack()
            }}> 
            <AntDesign name="left" color={'white'} size={RFPercentage(2.6)} />
            </TouchableOpacity>
            <TouchableOpacity 
            activeOpacity={0.8} onPress={()=>{
                navigation.goBack()
            }} style={{marginHorizontal:13}}> 
            <AntDesign name="search1" color={'white'} size={RFPercentage(2.6)} />
            </TouchableOpacity>
           </View>
               
                    <CustomText fontSize={17}>
                        بازی های کنسول
                    </CustomText>
                    <TouchableOpacity onPress={() => navigation.navigate("Category Page", { department:"Game Post" })}>
                                <Icon
                                    dark={require("../../../assets/icons/category-2.png")}
                                    light={require("../../../assets/icons/category-2.png")}
                                    style={{ width: 24, height: 24 }}
                                />
                            </TouchableOpacity>
            </View>
          </>
    )
}


export default ConsoleGames