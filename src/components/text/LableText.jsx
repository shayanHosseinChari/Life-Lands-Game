import { StyleSheet, View } from "react-native";
import { menuColor } from "../../appsetting/appsettingColor";
import { border } from "../../appsetting/styleSetting";
import CustomText from "./CustomText";

const LableText = ({ children }) => {
  const style = StyleSheet.create({
    container: {
      backgroundColor: menuColor,
      borderRadius: border,
      paddingHorizontal: 30,
      paddingVertical: 7,
      margin: 5,
    },
  });
  return (
    <View style={style.container}>
      <CustomText>{children}</CustomText>
    </View>
  );
};
export default LableText;
