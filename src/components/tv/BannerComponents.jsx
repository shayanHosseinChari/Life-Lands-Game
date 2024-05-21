import { LinearGradient } from "expo-linear-gradient";
import CustomImage from "../CustomImage/CustomImage";
import { StyleSheet, View } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import { TouchableOpacity } from "react-native";

const BannerComponents = ({ video, navigation }) => {

  return (
    <View style={{ marginTop: 15 }}>
      <CustomImage
        width={1.05}
        image={video?.image}
        isBackground={true}
        radius={8}
        height={170}
        selfCenter
      >
        <LinearGradient
          colors={["#64151F00", "#4A1344E5"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 8,
            height: 170,
            padding: 10,
          }}
        >
          <View style={styles.bottomViews}>
            <SpaceBetween>
              <TouchableOpacity
                onPress={() => navigation.navigate("Video Post", { id: video._id })}
              >
                <LinearGradient
                  colors={["#6F2E69", "#B3258D"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    padding: 13,
                    borderRadius: 100,
                    width: 64,
                    marginLeft: 10,
                    height: 40,
                  }}
                >
                  <Icon
                    dark={require("../../../assets/icons/play-fill.png")}
                    light={require("../../../assets/icons/play-fill.png")}
                    style={{
                      width: 24,
                      height: 24,
                      alignSelf: "center",
                      marginTop: -5,
                    }}
                  />
                </LinearGradient>
              </TouchableOpacity>
              <View>
                <CustomText fontSize={16}>{video?.title.substring(0,30)}</CustomText>
                <CustomText fontSize={13} top={5}>
                  برای پخش کافیه کلیک کنی!
                </CustomText>
              </View>
            </SpaceBetween>
            <SpaceStyle top={10}>
              <Row>
                <View style={[styles.secondBadge, {}]}>
                  <CustomText>{"+32"}</CustomText>
                </View>
                <View style={styles.secondBadge}>
                  <Row>
                    <CustomText >{video?.playCount || 0}</CustomText>
                    <Icon
                      style={{ width: 12, height: 12, marginTop: 2, marginLeft: 5 }}
                      dark={require("../../../assets/icons/play-circle.png")}
                      light={require("../../../assets/icons/play-circle.png")}
                    />
                  </Row>
                </View>
                <View style={styles.secondBadge}>
                  <Row>
                    <CustomText selfCenter>{video?.score || 0}</CustomText>
                    <Icon
                      style={{ width: 12, height: 12, marginTop: 2, marginLeft: 5 }}
                      dark={require("../../../assets/icons/heart-icon.png")}
                      light={require("../../../assets/icons/heart-icon.png")}
                    />
                  </Row>
                </View>
                <View style={styles.primaryBadge}>
                  <CustomText>{video?.category?.title}</CustomText>
                </View>
              </Row>
            </SpaceStyle>
          </View>
        </LinearGradient>
      </CustomImage>
    </View>
  );
};
export default BannerComponents;

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
