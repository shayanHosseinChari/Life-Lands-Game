import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import SpaceStyle from "../../style/SpaceStyle";
import { Row } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
const CustomButton = ({
  children,
  onClick,
  color,
  width,
  icon,
  sizeT,
  size,
  fontColor = "#fff",
  textStyle = {},
  maxHeight = 45,
  borderRadius = 0,
  borderWidth = 0,
  styles = {},
  borderColor,
}) => {
  const { colors } = useTheme();

  let style = StyleSheet.create({
    btn: {
      backgroundColor: color ? color : colors?.primary,
      borderRadius: borderRadius,
      color: fontColor,
      justifyContent: "center",
      alignItems: "center",
      borderWidth,
      minWidth: width ? width : 80,
      maxHeight,
      borderColor,
      ...styles,

    },
    text: {
      color: fontColor,
      paddingRight: 10,
      paddingLeft: 10,
      fontSize: 10,
      alignSelf: "center",
      fontSize: sizeT,
      ...textStyle,
    },
  });
  let customStyle = {};

  return (
    <TouchableOpacity
      style={{ ...style.btn, ...customStyle }}
      onPress={async () => {
        onClick();
      }}
    >
      <View>
        <SpaceStyle top={10} bottom={10}>
          <Row>
            {icon}
            <CustomText style={style.text}>{children}</CustomText>
          </Row>
        </SpaceStyle>
      </View>
    </TouchableOpacity>
  );
};
export default CustomButton;
