import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import {
  inputBorderColor,
  inputColor,
  lightTextColor,
  primaryColor,
} from "../../appsetting/appsettingColor";
import { border } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import CustomCard from "../CustomCard/CustomCard";
import CustomText from "../text/CustomText";
const CategoryFilterItem = ({ children, isActive = false }) => {
  const { colors } = useTheme();
  const style = StyleSheet.create({
    container: {
      borderRadius: border,
      backgroundColor: inputColor,
      paddingVertical: 5,
      paddingHorizontal: 15,
      backgroundColor: isActive ? colors.primary : colors.card,
      borderWidth: 1,
    },
  });
  return (
    <SpaceStyle right={5} bottom={5}>
      <View style={style.container}>
        <CustomText
          style={{ fontSize: 10 }}
          color={isActive ? "white" : lightTextColor}
        >
          {children}
        </CustomText>
      </View>
    </SpaceStyle>
  );
};
export default CategoryFilterItem;
