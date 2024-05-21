import { LinearGradient } from "expo-linear-gradient";
import CustomImage from "../CustomImage/CustomImage";
import { StyleSheet, View } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import { TouchableOpacity } from "react-native";
import { addRunCountService } from "../../service/PostService";
import { gameLinkMaker } from "../../utility/gameLinkMaker";
import { Animated } from 'react-native';
import { useEffect, useState } from "react";

const WGameGameBannerComponent = ({ game, navigation }) => {
  let count = 0;
  let isWorked = false;

  const [pulseAnimation, setPulseAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const borderColorAnimation = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fcab0d', 'rgba(0, 0, 0, 0)'],
  });
  return (
    <TouchableOpacity
      onPress={() => {
        count++;
        setTimeout(async () => {
          if (count > 1 && !isWorked) {
            await addRunCountService(game?._id);
            await gameLinkMaker(game, navigation);

            isWorked = true;
          } else if (count <= 1 && !isWorked) {
            navigation.navigate("Game Post", { id: game._id });
            isWorked = true;
          }
        }, 300);
        setTimeout(() => {
          isWorked = false;
          count = 0;
        }, 500);
        //
      }}
    >
      <View style={{
        marginTop: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Animated.View
          style={{
            width: "97%",
            borderRadius: 9,
            borderColor: borderColorAnimation,
            borderWidth: 3,
          }}
        >
          <CustomImage
            width={1.04}
            image={game?.image}
            isBackground={true}
            radius={8}
            height={170}
            selfCenter
          >
            <LinearGradient
              colors={["#1B163A00", "#2F273DE5"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 8,
                height: 170,
                padding: 10,
              }}
            >
              <View style={styles.bottomViews}>
                <View>
                  <CustomText fontSize={16}>{game?.title}</CustomText>
                  <CustomText fontSize={13} top={5}>
                    برای شروع بازی کافیه کلیک کنی!
                  </CustomText>
                </View>
                <SpaceStyle top={10}>
                  <Row>
                    <View style={[styles.secondBadge, {}]}>
                      <CustomText>{"+32"}</CustomText>
                    </View>
                    <View style={styles.secondBadge}>
                      <Row>
                        <CustomText >{game?.downloadCount || 0}</CustomText>
                        <Icon
                          style={{ width: 12, height: 12, marginTop: 2, marginLeft: 5 }}
                          dark={require("../../../assets/icons/play-circle.png")}
                          light={require("../../../assets/icons/play-circle.png")}
                        />
                      </Row>
                    </View>
                    <View style={styles.secondBadge}>
                      <Row>
                        <CustomText selfCenter>{game?.score || 0}</CustomText>
                        <Icon
                          style={{ width: 12, height: 12, marginTop: 2, marginLeft: 5 }}
                          dark={require("../../../assets/icons/heart-icon.png")}
                          light={require("../../../assets/icons/heart-icon.png")}
                        />
                      </Row>
                    </View>
                    <View style={styles.primaryBadge}>
                      <CustomText>{game?.category?.title}</CustomText>
                    </View>
                  </Row>
                </SpaceStyle>
              </View>
            </LinearGradient>
          </CustomImage>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};
export default WGameGameBannerComponent;

const styles = StyleSheet.create({
  bottomViews: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
  },
  primaryBadge: {
    backgroundColor: "rgba(132, 114, 248, 0.2)",
    borderRadius: 4,
    marginLeft: 10,
    padding: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  secondBadge: {
    backgroundColor: "rgba(62, 65, 72, .7)",
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 4,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    padding: 5,
  },
});
