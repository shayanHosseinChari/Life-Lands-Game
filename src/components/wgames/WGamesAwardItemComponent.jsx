import { StyleSheet, Text, View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "../../appsetting/icons";
import CustomText from "../text/CustomText";
import { Row } from "../../style/uiUtil";
import CustomImage from "../CustomImage/CustomImage";

const WGamesAwardItemComponent = () => {
  return (
    <SpaceStyle top={20} right={7} left={7}>
      <View style={{ width: 92, height: 145 }}>
        <LinearGradient
          colors={["rgba(84,73,120,0)", "rgba(80, 48, 184, 0.5)", "#6436bc"]}
          style={{
            padding: 13,
            borderRadius: 5,
            width: 92,
            height: 95,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "rgba(88, 61, 179,0.5)",
          }}
        >
          <View style={{ position: "absolute", top: 0, right: 0 }}>
            <Text style={style.awardTopIcon}>130</Text>
          </View>
          <Icon
            dark={require("../../../assets/icons/moeny.png")}
            light={require("../../../assets/icons/moeny.png")}
            style={{
              width: 60,
              height: 80,
              marginTop: 10,
            }}
          />
        </LinearGradient>
        <CustomText selfCenter fontSize={14} bottom={5} top={10}>
          عنوان جایزه
        </CustomText>
        <SpaceStyle bottom={20}>
          <Row>
            <CustomText fontSize={9} selfCenter right={5}>
              Game Name
            </CustomText>
            <CustomImage
              aspect={1 / 1}
              image={"game-file-1705429306928.webp"}
              width={16}
              height={16}
              radius={100}
            />
          </Row>
        </SpaceStyle>
      </View >
    </SpaceStyle >
  );
};
export default WGamesAwardItemComponent;

const style = StyleSheet.create({
  awardTopIcon: {
    color: "#fff",
    backgroundColor: "#83A3C8",
    padding: 1,
    paddingHorizontal: 7,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    fontSize: 12
  }
})