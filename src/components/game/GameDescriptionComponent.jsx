import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import SpaceStyle from "../../style/SpaceStyle";
import CustomText from "../text/CustomText";
import CustomCard from "../CustomCard/CustomCard";
import CustomButton from "../CustomButton/CustomButton";
import { Text } from "react-native";
import WebView from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
const GameDescriptionComponent = ({ game }) => {
  const { colors } = useTheme();
  return (
    <SpaceStyle left={10} right={10} top={10}>
      <LinearGradient colors={['transparent','rgba(26, 26, 26, 1)']} style={{borderRadius:20,padding:10}}>
        <CustomText bottom={5} fontSize={14}>توضیحات بازی</CustomText>
       
        <Text  color={colors.lightTextColor} style={{textAlign:"right",color:"white",fontFamily:"vazir",opacity:0.5,fontSize:12,marginTop:8}}>
          {game.description}
         </Text>
      </LinearGradient>
    </SpaceStyle>
  );
};
export default GameDescriptionComponent;
