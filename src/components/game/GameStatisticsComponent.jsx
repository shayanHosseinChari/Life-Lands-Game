import { useContext } from "react";
import { View } from "react-native";
import CustomCard from "../CustomCard/CustomCard";
import { SpaceAround } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { useTheme } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import { yellowColor } from "../../appsetting/appsettingColor";
import SpaceStyle from "../../style/SpaceStyle";
import { SocketContext } from "../../context/SocketContext";
import {LinearGradient} from 'expo-linear-gradient'

const GameStatisticsComponent = ({ game }) => {
  const { colors } = useTheme();
  const { users } = useContext(SocketContext);
  return (
    <SpaceStyle left={10} right={10} top={10}>
      <LinearGradient colors={['rgba(26, 26, 26, 1)','transparent']} style={{borderRadius:10}}>
        <View style={{width:"100%",justifyContent:'center',alignItems:"center"}}>
        <CustomText  fontSize={16}>
          اطلاعات بازی
        </CustomText>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <View style={{width:"100%",flexDirection:"row",flexWrap:"wrap",justifyContent:'space-around'}}>
            <View>
              <CustomText color={colors.lightTextColor} fontSize={10} selfCenter>
                کاربران آنلاین
              </CustomText>
              <CustomText fontSize={13} selfCenter>
                {users?.length}
              </CustomText>
            </View>
            <View>
              <CustomText color={colors.lightTextColor} fontSize={10} selfCenter>
                تعداد کاربران
              </CustomText>
              <CustomText fontSize={13} selfCenter>
                {game?.totalUserScoreCount}
              </CustomText>
            </View>
            
            <View>
              <CustomText color={colors.lightTextColor} fontSize={10} selfCenter>
                پسندیدن
              </CustomText>
              <CustomText fontSize={13} selfCenter>
                {game?.likeCount}
              </CustomText>
            </View>
            <View>
              <CustomText color={colors.lightTextColor} fontSize={10} selfCenter>
                تعداد اجرا
              </CustomText>
              <CustomText fontSize={13} selfCenter>
                {game?.runCount}
              </CustomText>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SpaceStyle>
  );
};
export default GameStatisticsComponent;
