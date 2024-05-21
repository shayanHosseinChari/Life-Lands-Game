import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "../../appsetting/icons";
import { CenterStyled, Row } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
export const BTN_COLORS = {
  GREEN: {
    backgroundColor: "#202f22",
    borderColor: "#347d2b",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  BLUE: {
    backgroundColor: "#242639",
    borderColor: "#454894",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  RED: {
    backgroundColor: "#251f23",
    borderColor: "#6b3538",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  GRAY: {
    backgroundColor: "#202125",
    borderColor: "#202125",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
};
const CustomColorfulButton = ({
  color,
  children,
  lightIcon,
  darkIcon,
  isWide = false,
  onClick,
}) => {
  const width = Dimensions.get("window").width;
  const style = StyleSheet.create({
    btn: {
      ...color,
      width: (isWide && width - 40) || undefined,
    },
    icon: {
      width: 15,
      height: 15,
      marginHorizontal: 10,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        if (onClick) onClick();
      }}
    >
      <View style={style.btn}>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          <Row>
            {lightIcon && darkIcon && (
              <Icon dark={darkIcon} light={lightIcon} style={style.icon} />
            )}
            <CustomText style={{ alignSelf: "center", fontSize: 10 }}>
              {children}
            </CustomText>
          </Row>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CustomColorfulButton;
