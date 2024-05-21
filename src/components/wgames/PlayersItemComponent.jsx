import { StyleSheet, Touchable, View } from "react-native";
import CustomText from "../text/CustomText";
import { Hr, Row } from "../../style/uiUtil";
import CustomImage from "../CustomImage/CustomImage";
import { useTheme } from "@react-navigation/native";

const PlayersItemComponent = ({ item }) => {
  const { colors } = useTheme();

  return (
    <View>
      <CustomImage
        image={item.profile}
        width={60}
        height={60}
        radius={100}
        selfCenter
        styles={style.customImageStye}
        bottom={-40}
      />
      <View style={style.container}>
        <CustomText selfCenter>{item.fullName}</CustomText>
        <View style={style.hr}></View>
        <Row>
          <View>
            <CustomText>Game Name</CustomText>
            <CustomText fontSize={14} color={"#C291FF"}>{item.winCount}</CustomText>
          </View>
          <CustomImage
            image={"game-file-1705429403668.webp"}
            width={24}
            height={24}
            selfCenter
            left={5}
          />
        </Row>
      </View>
    </View>
  );
};
export default PlayersItemComponent;
const style = StyleSheet.create({
  container: {
    backgroundColor: "#3E4148",
    borderRadius: 8,
    height: 140,
    margin: 5,
    width: 120,
    justifyContent: "center",
    paddingTop: 20,
    alignContent: "center",
    alignItems: "center",
  },
  hr: {
    height: 1,
    width: "80%",
    opacity: 0.2,
    marginVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  customImageStye: {
    borderWidth: 4,
    borderColor: "#3E4148",
    zIndex: 100
  }
});
