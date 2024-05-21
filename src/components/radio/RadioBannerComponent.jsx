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

const RadioBannerComponent = ({ radios, navigation }) => {
  let count = 0;
  let isWorked = false;
  return (
    <View style={{ marginTop: 15 }}>
      <CustomImage
        width={1.05}
        image={radios?.profileImage}
        isBackground={true}
        radius={8}
        height={170}
        selfCenter
      >
        <LinearGradient
          colors={["#2D728100", "#205560CC"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 0.9 }}
          style={{
            borderRadius: 8,
            height: 170,
            padding: 10,
          }}
        >
          <View style={styles.bottomViews}>
            <SpaceBetween>
              <TouchableOpacity
                onPress={() => {
                  count++;
                  setTimeout(async () => {
                    if (count > 1 && !isWorked) {
                      await addRunCountService(radios?._id);
                      await gameLinkMaker(radios, navigation);

                      isWorked = true;
                    } else if (count <= 1 && !isWorked) {
                      navigation.navigate("Game Post", { id: radios._id });
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
                <LinearGradient
                  colors={["#2D7281", "#58DEFB"]}
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
                <CustomText fontSize={18}>{radios?.title || "تست نرم افزاری"}</CustomText>
                <CustomText fontSize={13} top={5}>
                  برای شروع بای کافیه کلیک کنی!
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
                    <CustomText selfCenter>{radios?.downloadCount || 10}</CustomText>
                    <Icon
                      style={{ width: 12, height: 12, marginTop: 2, marginLeft: 5 }}
                      dark={require("../../../assets/icons/heart-icon.png")}
                      light={require("../../../assets/icons/heart-icon.png")}
                    />
                  </Row>
                </View>
                <View style={styles.secondBadge}>
                  <Row>
                    <CustomText >{radios?.userScoreCount || 10}</CustomText>
                    <Icon
                      style={{ width: 12, height: 12, marginTop: 2, marginLeft: 5 }}
                      dark={require("../../../assets/icons/play-circle.png")}
                      light={require("../../../assets/icons/play-circle.png")}
                    />
                  </Row>
                </View>
                <View style={styles.primaryBadge}>
                  <CustomText>{"امتیازی"}</CustomText>
                </View>
              </Row>
            </SpaceStyle>
          </View>
        </LinearGradient>
      </CustomImage>
    </View>
  );
};
export default RadioBannerComponent;

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
