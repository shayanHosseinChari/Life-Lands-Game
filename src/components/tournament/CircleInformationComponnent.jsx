import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import CustomText from "../text/CustomText";

const CircleInformationComponnent = ({ color, size, title, description }) => {
  let circleSize = size === "large" ? 65 : 55;
  const { colors } = useTheme();
  const Colors = {
    purple: "#5555c7",
    green: "#357042",
    yellow: "#f0c419",
  };
  const style = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor: Colors[color],
      borderRadius: 100,
      width: circleSize,
      height: circleSize,
      justifyContent: "center",
      alignContent: "center",
    },

    title: {
      fontSize: 12,
      alignSelf: "center",
    },
    description: {
      fontSize: 7,
      alignSelf: "center",
      color: "#7b7c7b",
    },
  });
  return (
    <View style={style.container}>
      <CustomText style={style.title}>{title}</CustomText>
      <CustomText style={style.description}>{description}</CustomText>
    </View>
  );
};
export default CircleInformationComponnent;
