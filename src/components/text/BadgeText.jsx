import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

const BadgeText = ({ children, color }) => {
  let style = StyleSheet.create({
    container: {
      marginTop: 10,
      borderRadius: 180,
      backgroundColor: color,
      width: 30,
      height: 30,
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
  });
  return (
    <View style={style.container}>
      <CustomText style={{ paddingRight: 10 }}>{children}</CustomText>
    </View>
  );
};
export default BadgeText;
