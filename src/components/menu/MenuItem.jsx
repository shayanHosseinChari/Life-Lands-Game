import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "../../appsetting/icons";
import { Hr, Row } from "../../style/uiUtil";
import CustomText from "../text/CustomText";

const MenuItem = ({
  title,
  rightDarkIcon,
  rightLightIcon,
  action,
  description,
  color,
}) => {
  const { colors } = useTheme();
  const style = StyleSheet.create({
    icon: {
      alignSelf: "center",
      width: 25,
      height: 25,
      objectFit: "cover",
    },
  });
  return (
    <View>
      <TouchableOpacity onPress={action}>
        <Row>
          <View>
            <Row>
              <View
                style={{
                  alignSelf: "center",
                  marginHorizontal: 10,
                }}
              >
                <CustomText color={color}>{title}</CustomText>
                {description && (
                  <CustomText color={colors.lightTextColor}>
                    {description}
                  </CustomText>
                )}
              </View>

              <Icon
                style={style.icon}
                dark={rightDarkIcon}
                light={rightLightIcon}
              />
            </Row>
          </View>
        </Row>
      </TouchableOpacity>
      <Hr color={"rgba(0,0,0,0)"} opacity={0.2} />
    </View>
  );
};
export default MenuItem;
