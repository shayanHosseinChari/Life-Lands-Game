import { StyleSheet, View } from "react-native";
import CustomText from "../text/CustomText";
import { Row } from "../../style/uiUtil";
import CustomImage from "../CustomImage/CustomImage";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const RadioLastListenerItem = ({ item, navigation }) => {
  const { colors } = useTheme();
  return (
    // <TouchableOpacity
    //   onPress={() => {
    //     navigation.navigate("Voice PlayList", { id: item._id });
    //   }}
    // >
      <View>
        <View style={[style.container, { backgroundColor: "transparent" }]}>
          <CustomImage
            image={item.image}
            width={120}
            height={75}
            radius={5}
            selfCenter
          />
          <CustomImage
            image={item?.creator?.userId?.profileImage}
            width={50}
            height={50}
            radius={100}
            selfCenter
            styles={{ position: "absolute", top: 40, left: -10, borderWidth: 1, borderColor: "#3E4148" }}
          />
          <View style={{ margin: 5 }}></View>
          <Row>
            <View>
              <CustomText selfCenter>@{item?.creator?.userId?.userName}</CustomText>
              <CustomText selfCenter>{item?.creator?.fullName}</CustomText>
            </View>
          </Row>
        </View>
      </View>
    // </TouchableOpacity>
  );
};
export default RadioLastListenerItem;
const style = StyleSheet.create({
  container: {
    backgroundColor: "#3E4148",
    borderRadius: 8,
    height: 125,
    marginHorizontal: 7,
    width: 120,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});