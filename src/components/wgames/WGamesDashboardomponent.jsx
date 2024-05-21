import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import CustomText from "../text/CustomText";
import { useTheme } from "@react-navigation/native";
import { lightPinkColor } from "../../appsetting/appsettingColor";
import { SpaceBetween } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from "react-native-responsive-fontsize";

const WGamesDashboardomponent = ({ navigation }) => {
  const { colors } = useTheme();
  
  const [words,setWords] = useState({
    type:"En",
    users:"Users",
    Wars:"Wars",
    Leaders:"Leaders",
    Stores:"Stores",
    Rooms:"Rooms",
    Groups:"Groups",
    Awards:"Awards",
    Spins:"Spins",
    Comments:"Comments",
    Inventory:"Inventory"

  })
  const Enwords= {
    type:"En",

    users:"Users",
    Wars:"Wars",
    Leaders:"Leaders",
    Stores:"Stores",
    Rooms:"Rooms",
    Groups:"Groups",
    Awards:"Awards",
    Spins:"Spins",
    Comments:"Comments",
    Inventory:"Inventory"
  }

  const PerWords = {
    type:"Fa",

    users:"کاربران",
    Wars:"جنگ ها",
    Leaders:"رهبران",
    Stores:"فروشگاه ها",
    Rooms:"اتاق ها",
    Groups:"گروه ها",
    Awards:"جوایز",
    Spins:"گردونه ها",
    Comments:"نظرات",
    Inventory:"فهرست"
  }
 
  return (
    <View style={{ marginTop: 10 }}>
      <CustomText
        bottom={-20}
        style={{
          backgroundColor: colors.background,
          zIndex: 100,
          alignSelf: "flex-start",
          paddingHorizontal: 5,
        }}
        color={lightPinkColor}
        left={30}
      >
        Games Dashboard
      </CustomText>
      <LinearGradient
        colors={["#B539E1", "#39BECD","black","black"]}
        
        style={styles.linearGradient}
      >
        <View style={styles.innerContainer}>
          <SpaceStyle top={7}>
            <SpaceBetween>
              <TouchableOpacity onPress={() => navigation.navigate('Online Users')}>
                <View style={styles.itemContainer}>
                  <LinearGradient
                    colors={["#B539E1", "#39BECD"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 10, borderRadius: 8 }}
                  >
                    <Icon
                      dark={require("../../../assets/icons/onlineUserIcon.png")}
                      light={require("../../../assets/icons/onlineUserIcon.png")}
                      style={{ width: 40, height: 40, alignSelf: "center" }}
                    />
                  </LinearGradient>
                  <CustomText
                    fontSize={11}
                    style={{ textAlign: "center" }}
                    top={5}
                    selfCenter
                    lines={2}
                  >
                    {words.users}
                  </CustomText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                navigation.navigate("Tournament Page")
              }}>
                <View style={styles.itemContainer}>
                  <View>
                    <LinearGradient
                      colors={["#B539E1", "#39BECD"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ padding: 10, borderRadius: 8 }}
                    >

                      <Icon
                        dark={require("../../../assets/icons/tornomentIcon.png")}
                        light={require("../../../assets/icons/tornomentIcon.png")}
                        style={{ width: 40, height: 40, alignSelf: "center" }}
                      />
                    </LinearGradient>
                    <CustomText lines={2} selfCenter fontSize={11} top={5}>
                    {words.Wars}
                    </CustomText>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Leaderboard Page")}>
                <View style={styles.itemContainer}>
                  <View>
                    <LinearGradient
                      colors={["#B539E1", "#39BECD"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ padding: 10, borderRadius: 8,position:"relative",zIndex:-1 }}
                    >
                      
                      <Icon
                        dark={require("../../../assets/icons/leaderBoardIcon.png")}
                        light={require("../../../assets/icons/leaderBoardIcon.png")}
                        style={{ width: 40, height: 40, alignSelf: "center" }}
                      />
                    </LinearGradient>
                    <CustomText
                      fontSize={11}
                      style={{ textAlign: "center" }}
                      top={5}
                      selfCenter
                      lines={2}
                    >
                      Leaders
                    </CustomText>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.itemContainer}>
                <View>
                  <LinearGradient
                    colors={["#B539E1", "#39BECD"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 10, borderRadius: 8 ,position:"relative",zIndex:-1}}
                  >
                    <View style={{width:60,height:60,borderRadius:8,backgroundColor:'#000000aa',position:"absolute",top:0,left:0,justifyContent:'center',alignItems:"center",zIndex:999}}>

                      <AntDesign name="lock" color={'white'} size={RFPercentage(3.8)}/>
                    </View>
                    <Icon
                      dark={require("../../../assets/icons/storeIcon.png")}
                      light={require("../../../assets/icons/storeIcon.png")}
                      style={{ width: 40, height: 40, alignSelf: "center" }}
                    />
                  </LinearGradient>
                  <CustomText
                    selfCenter
                    fontSize={11}
                    top={5}
                    style={{ textAlign: "center" }}
                    lines={2}
                  >
                    {words.Stores}
                  </CustomText>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <View>
                  <LinearGradient
                    colors={["#B539E1", "#39BECD"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 10, borderRadius: 8,position:"relative" }}
                  >
                     <View style={{width:60,height:60,borderRadius:8,backgroundColor:'#000000aa',position:"absolute",top:0,left:0,justifyContent:'center',alignItems:"center",zIndex:99}}>

<AntDesign name="lock" color={'white'} size={RFPercentage(3.8)}/>
</View>

                    <Icon
                      dark={require("../../../assets/icons/exchangeIcon.png")}
                      light={require("../../../assets/icons/exchangeIcon.png")}
                      style={{ width: 40, height: 40, alignSelf: "center" }}
                    />
                  </LinearGradient>
                  <CustomText
                    selfCenter
                    fontSize={11}
                    top={5}
                    style={{ textAlign: "center" }}
                    lines={2}
                  >
                    {words.Rooms}
                  </CustomText>
                </View>
              </View>
            </SpaceBetween>
          </SpaceStyle>
          <SpaceStyle top={40}>
            <SpaceBetween>
              <View style={styles.itemContainer}>
                <View>
                  <LinearGradient
                    colors={["#B539E1", "#39BECD"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 10, borderRadius: 8,position:"relative" }}
                  >
                     <View style={{width:60,height:60,borderRadius:8,backgroundColor:'#000000aa',position:"absolute",top:0,left:0,justifyContent:'center',alignItems:"center",zIndex:99}}>

<AntDesign name="lock" color={'white'} size={RFPercentage(3.8)}/>
</View>

                    <Icon
                      dark={require("../../../assets/icons/groupIcon.png")}
                      light={require("../../../assets/icons/groupIcon.png")}
                      style={{ width: 40, height: 40, alignSelf: "center" }}
                    />
                  </LinearGradient>
                  <CustomText
                    selfCenter
                    fontSize={11}
                    top={5}
                    style={{ textAlign: "center" }}
                    lines={2}
                  >
                    {words.Groups}
                  </CustomText>
                </View>
              </View>

              <TouchableOpacity >
                <View style={styles.itemContainer}>
                  <View>
                    <LinearGradient
                      colors={["#B539E1", "#39BECD"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ padding: 10, borderRadius: 8 ,position:"relative"}}
                    >
                                          <View style={{width:60,height:60,borderRadius:8,backgroundColor:'#000000aa',position:"absolute",top:0,left:0,justifyContent:'center',alignItems:"center",zIndex:99}}>

<AntDesign name="lock" color={'white'} size={RFPercentage(3.8)}/>
</View>
 
                      <Icon
                        dark={require("../../../assets/icons/awardIcon.png")}
                        light={require("../../../assets/icons/awardIcon.png")}
                        style={{ width: 40, height: 40, alignSelf: "center" }}
                      />
                    </LinearGradient>
                    <CustomText
                      selfCenter
                      fontSize={11}
                      top={5}
                      style={{ textAlign: "center" }}
                      lines={2}
                    >
                     {words.Awards}
                    </CustomText>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.itemContainer}>
                <View>
                  <LinearGradient
                    colors={["#B539E1", "#39BECD"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 10, borderRadius: 8,position:'relative' }}
                  >
                     <View style={{width:60,height:60,borderRadius:8,backgroundColor:'#000000aa',position:"absolute",top:0,left:0,justifyContent:'center',alignItems:"center",zIndex:99}}>

<AntDesign name="lock" color={'white'} size={RFPercentage(3.8)}/>
</View>

                    <Icon
                      dark={require("../../../assets/icons/spinIcon.png")}
                      light={require("../../../assets/icons/spinIcon.png")}
                      style={{ width: 40, height: 40, alignSelf: "center" }}
                    />
                  </LinearGradient>
                  <CustomText
                    selfCenter
                    fontSize={11}
                    top={5}
                    style={{ textAlign: "center" }}
                    lines={2}
                  >
                   {words.Spins}
                  </CustomText>
                </View>
              </View>
            
              <View style={styles.itemContainer}>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate("Comments Page")
                }}>
                  <LinearGradient
                    colors={["#B539E1", "#39BECD"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 10, borderRadius: 8 }}
                  >
                    <Icon
                      dark={require("../../../assets/icons/achivementIcon.png")}
                      light={require("../../../assets/icons/achivementIcon.png")}
                      style={{ width: 40, height: 40, alignSelf: "center" }}
                    />
                  </LinearGradient>
                  <CustomText
                    selfCenter
                    fontSize={10}
                    top={5}
                    style={{ textAlign: "center" }}
                    lines={2}
                  >
                    {words.Comments}
                  </CustomText>
                </TouchableOpacity>
              </View>
              <View style={styles.itemContainer}>
                <Pressable >
                  <LinearGradient
                    colors={["#B539E1", "#39BECD"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 10, borderRadius: 8 ,position:"relative"}}
                  >
                                         <View style={{width:60,height:60,borderRadius:8,backgroundColor:'#000000aa',position:"absolute",top:0,left:0,justifyContent:'center',alignItems:"center",zIndex:99}}>

<AntDesign name="lock" color={'white'} size={RFPercentage(3.8)}/>
</View>

                    <Icon
                      dark={require("../../../assets/icons/abilityIcon.png")}
                      light={require("../../../assets/icons/abilityIcon.png")}
                      style={{ width: 40, height: 40, alignSelf: "center" }}
                    />
                  </LinearGradient>
                  <CustomText
                    selfCenter
                    fontSize={11}
                    top={5}
                    style={{ textAlign: "center" }}
                    lines={2}
                  >
                    {words.Inventory}
                  </CustomText>
                </Pressable>
              </View>
            </SpaceBetween>
          </SpaceStyle>
        </View>
      </LinearGradient>
    </View>
  );
};
export default WGamesDashboardomponent;
const styles = StyleSheet.create({
  linearGradient: {
    minHeight: 220,
    borderRadius: 8,
    margin: 10,
    zIndex: 1,
  },
  innerContainer: {
    borderRadius: 8,
    flex: 1,
    margin: 2,
    backgroundColor: "#000000",
    padding: 8,
    zIndex: 1,
  },
  itemContainer: {
    width: 60,
    height: 65,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
