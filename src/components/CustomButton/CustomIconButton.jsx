import { useContext } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { primaryColor } from "../../appsetting/appsettingColor";
import { RootContext } from "../../context/RootContext";
import { SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { border } from "../../appsetting/styleSetting";

const CustomIconButton = ({
  children,
  icon,
  isBorder,
  isRotate,
  color,
  onClick,
}) => {
  const { colors } = useTheme();
  if (!color) {
    color = colors?.primary;
  }
  const windowWidth = Dimensions.get("window").width;
  const style = StyleSheet.create({
    btnContainer: {
      backgroundColor: color,
      marginVertical: 10,
      borderRadius: border,
      paddingHorizontal: 30,
      paddingVertical: 20,
      width: windowWidth - 80,
      alignSelf: "center",
    },
    borderBtnContainer: {
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: color,
      marginVertical: 10,
      borderRadius: border,
      paddingHorizontal: 30,
      paddingVertical: 20,
      width: windowWidth - 80,
      alignSelf: "center",
      borderWidth: 2,
    },
    imageStyle: {
      width: 20,
      height: 20,
      transform: [{ rotate: isRotate ? "181deg" : "0deg" }],
    },
  });
  return (
    <TouchableOpacity
      onPress={async () => {
        onClick();
      }}
    >
      <View style={isBorder ? style.borderBtnContainer : style.btnContainer}>
        <SpaceBetween>
        <Image style={style.imageStyle} source={icon} />
          <CustomText style={{ alignSelf: "center", fontSize: 10 }}>
            {children}
          </CustomText>
         
        </SpaceBetween>
      </View>
    </TouchableOpacity>
  );
};
export default CustomIconButton;
