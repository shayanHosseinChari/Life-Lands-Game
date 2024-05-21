import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity,Text } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import { Row } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import CustomText from "../text/CustomText";
import { Video, ResizeMode } from "expo-av";
import { LOAD_FILE } from "../../service/APIs";
import { RFPercentage } from 'react-native-responsive-fontsize';

const WGamesGameItemComponent = ({ item, navigation, isVideoPlaying }) => {
  let count = 0;
  let isWorked = false;

  return (
    <TouchableOpacity
      onPress={() => {
       
        navigation.navigate("Game Post", { id: item._id });
      }}
    >
      <View style={{ width: 120, height: 150, marginLeft: 5, marginRight: 5, position: "relative" }}>
      <CustomImage
            isBackground={true}
            aspect={1 / 1}
            width={120}
            height={120}
            radius={8}
            image={item?.image}
            resizeMode={"cover"}
            styles={{  top: 0, zIndex: 20 }}
          />
        {/* <View style={{ width: 120, height: 120, position: "relative", zIndex: 30, display: "flex", flexDirection: "row" }}>
          <View style={{ flex: 1, height: 120 }}>
            <View style={{ ...styles.tagUserContainer, ...{ left: 5 } }}>
              <Row>
                <Icon
                  dark={require("../../../assets/icons/tag-user.png")}
                  light={require("../../../assets/icons/tag-user.png")}
                  style={{ width: 12, height: 12, marginRight: 2 }}
                />

                <CustomText color={"#1E6775"}>{item?.downloadCount || 0}</CustomText>
              </Row>
            </View>

            <View style={{ ...styles.tagInfo, ...{ left: 5 } }}>
              <Row>
                <CustomText selfCenter color={"#fff"}>
                  {item?.score || 0}
                </CustomText>
                <Icon
                  dark={require("../../../assets/icons/heart-icon.png")}
                  light={require("../../../assets/icons/heart-icon.png")}
                  style={{ width: 10, height: 10, marginTop: 3, marginLeft: 3 }}
                />
              </Row>
            </View>
          </View>
          <View style={{ flex: 1, height: 120 }}>
            <View style={{ ...styles.tagUserContainer, ...{ right: 5, paddingHorizontal: 6 } }}>
              <Row>
                <TouchableOpacity onPress={""}>
                  {isMuted ? (
                    <Icon
                      dark={require("../../../assets/icons/volume-mute-fill.png")}
                      light={require("../../../assets/icons/volume-mute-fill.png")}
                      style={{ width: 15, height: 15 }}
                    />
                  ) : (
                    <Icon
                      dark={require("../../../assets/icons/volume-high.png")}
                      light={require("../../../assets/icons/volume-high.png")}
                      style={{ width: 15, height: 15 }}
                    />
                  )}
                </TouchableOpacity>
              </Row>
            </View>
            <View style={{ ...styles.tagInfo, ...{ right: 5 } }}>
              <Row>
                <CustomText selfCenter color={"#fff"}>
                  {item?.userScoreCount || 0}
                </CustomText>

                <Icon
                  dark={require("../../../assets/icons/play-circle.png")}
                  light={require("../../../assets/icons/play-circle.png")}
                  style={{ width: 10, height: 10, marginTop: 3, marginLeft: 3 }}
                />
              </Row>
            </View>
          </View>
        </View> */}
        <CustomText selfCenter fontSize={13} color={"#fefefe"} top={125}>
          {item?.title}
        </CustomText>
      </View>
    </TouchableOpacity>
    // </InView>
  );
};
export default WGamesGameItemComponent;

// const styles = StyleSheet.create({
//   tagUserContainer: {
//     backgroundColor: "#BAF3FD",
//     padding: 3,
//     borderRadius: 4,
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     top: 5,
//     paddingHorizontal: 4,
//     height: 20,
//     position: "absolute",
//   },
//   tagInfo: {
//     backgroundColor: "#3E4148",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 4,
//     opacity: 0.9,
//     bottom: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     alignContent: "center",
//     position: "absolute",
//     alignSelf: "center",
//   },
//   categoryContainer: {
//     borderRadius: 4,
//     backgroundColor: "rgba(132, 114, 248, 0.20)",
//     paddingHorizontal: 5,
//     justifyContent: "center",
//     alignContent: "center",
//     minWidth: 50,
//     alignSelf: "center",
//     textAlign: "center",
//     borderRadius: 4,
//     paddingVertical: 3,
//     marginTop: 5,
//     marginBottom: 10,
//   },
// });
