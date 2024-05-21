import { FlatList, Image, Pressable } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { RootContext } from "../../context/RootContext";
import { View } from "react-native";
import CustomCard from "../CustomCard/CustomCard";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import CustomImage from "../CustomImage/CustomImage";
import { useNavigation, useTheme } from "@react-navigation/native";
import { border } from "../../appsetting/styleSetting";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const OnlineUsersListComponent = ({
  onPress,
  title = "درخواست رقابت",
  customUserList,
}) => {
  const width = Dimensions.get("screen").width;
  const { colors } = useTheme();
  const { users } = useContext(SocketContext);
  const navigation = useNavigation()
  const { user } = useContext(RootContext);
  const style = StyleSheet.create({
    center: {
      alignSelf: "center",
    },
    top: {
      alignSelf: "flex-start",
    },
    boldText: {
      fontSize: 12,
    },
    simpleText: {
      fontSize: 8,
      color: colors.lightTextColor,
      alignSelf: "flex-end",
    },
    challangeBtn: {
      borderRadius: 55555,
      justifyContent: "center",
      alignSelf: "center",
      alignContent: "center",
      paddingHorizontal: 10,
      height: 35,
      fontSize: 16
    },
    gameView: {
      width: width / 2.4,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(250,250,250,0.4)",
      alignSelf: "center",
      margin: 5,
      borderRadius: 10,
      padding: 10,
    },
    gameViewActive: {
      width: width / 2.4,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(250,250,250,0.4)",
      alignSelf: "center",
      margin: 5,
      borderRadius: 10,
      padding: 10,
      backgroundColor: colors.primary,
    },
  });

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}

      keyExtractor={(item) => item.fullName}
      inverted={true}
      data={(customUserList || users).filter(
        (item) => item.userId !== user._id
      )}
      renderItem={({ item }) => (
        <SpaceStyle top={10} right={10} left={10}>
          <CustomCard styles={{ backgroundColor: "#282828" }}>
            <SpaceBetween>
            <TouchableOpacity
onPress={()=>onPress(item)}
              >
                <LinearGradient
                  colors={["#9025B7", "#2096A3"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={style.challangeBtn}
                >
                  <CustomText fontSize={12}>
                    {title}
                  </CustomText>
                </LinearGradient>
              </TouchableOpacity>
              <View style={style.center}>
                <View
                  style={{
                    alignSelf: "flex-end",
                  }}
                >
                  <TouchableOpacity 
                  onPress={()=>{
                    console.log(item)
                    navigation.navigate('Public Profile Page',{userId: item.userId})
                  }}
                  style={{flexDirection:'row'}}
                  >
                    <SpaceStyle top={5}>
                      <CustomText style={{ ...style.top, ...style.boldText }}>
                        {item.fullName}
                      </CustomText>
                      <CustomText
                        style={{ ...style.top, ...style.simpleText }}
                      >
                        {item.flag}
                      </CustomText>
                    </SpaceStyle>
                    <SpaceStyle left={10} bottom={10}>
                    {
                  item.profile?<CustomImage
                  image={item?.profile}
                  width={50}
                  height={50}
                  aspect={1 / 1}
                  radius={100}
                  styles={{ marginRight: 8 }}
                />:<Image
                  source={require('../../../assets/def.jpg')}
                  style={{width: 50,height: 50,borderRadius: 100,marginRight: 8}}
               
              />
                }
                      
                    </SpaceStyle>
                  </TouchableOpacity>
                </View>
              </View>
              
            </SpaceBetween>
            
            
          </CustomCard>
        </SpaceStyle >
      )}
    />
  );
};
export default OnlineUsersListComponent;
