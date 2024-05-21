import { Text, View } from "react-native";
import CustomText from "../text/CustomText";
import { style } from "./style";

const CustomDivider = (props) => {
  return (
    <View style={style.container}>
      <View style={style.childrenSmall}>.</View>
      <View style={style.text}></View>
      <View style={style.childrenSmall}></View>
    </View>
  );
};
export default CustomDivider;
