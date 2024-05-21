import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { cardColor } from "../../appsetting/appsettingColor";
import { border } from "../../appsetting/styleSetting";

const CustomCard = ({
  children,
  paddingHorizontal = 10,
  paddingTop = 10,
  paddingBottom = 10,
  borderRadius = border,
  color,
  styles = {},
}) => {
  const { colors } = useTheme();
  if (!color) {
    color = colors?.card;
  }
  const style = StyleSheet.create({
    container: {
      ...{
        borderWidth: 0,
        borderRadius,
        borderColor: "rgba(250,250,250,0.1)",

        paddingHorizontal,
        paddingTop,
        paddingBottom,
        backgroundColor: color,
      },
      ...styles,
    },
  });
  return <View style={style.container}>{children}</View>;
};
export default CustomCard;
