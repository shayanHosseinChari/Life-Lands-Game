import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

const ScoreComponent = ({ children }) => {
  let style = StyleSheet.create({
    container: {
      borderRadius: 180,
      borderWidth: 2,
      borderColor: "white",
      width: 45,
      height: 45,
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
      <CustomText style={{ width: 26 }}>{children}</CustomText>
    </View>
  );
};
export default ScoreComponent;
