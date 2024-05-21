import { useTheme } from "@react-navigation/native";
import { StyleSheet, Switch, View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";

const SecurityItem = ({
  title,
  onAction,
  itemValue,
  rightDarkIcon,
  rightLightIcon,
}) => {
  const { colors } = useTheme();
  const style = StyleSheet.create({
    switchLabelStyle: {
      alignSelf: "center",
      width: 40,
    },
    icon: {
      alignSelf: "center",
      width: 25,
      height: 25,
      objectFit: "cover",
      marginHorizontal: 10,
    },
  });
  return (
    <SpaceStyle right={15} top={15} left={15}>
      <View style={{ backgroundColor: "#8472F826", borderRadius: 10, padding: 10 }}>
        <SpaceBetween>
          <View>
            <Row>
              <View style={{ backgroundColor: itemValue ? "#8472F8" : "transparent", height: 30, width: 53, borderRadius: 555, borderWidth: 2, borderColor: itemValue ? "transparent" : "#938F99" }}>
                <Switch
                  trackColor={{ false: "transparent", true: "transparent" }}
                  thumbColor={itemValue ? "#FFF" : "#737372"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={onAction}
                  value={itemValue}
                  style={{ position: "relative", top: -11, left: -2 }}
                />
              </View>
            </Row>
          </View>
          <View
            style={{ justifyContent: "center", alignContent: "center", marginRight: 10 }}
          >
            <Row>
              <CustomText fontSize={12} color={"#FFF"}>{title}</CustomText>
            </Row>
          </View>
        </SpaceBetween>
      </View>
    </SpaceStyle>
  );
};
export default SecurityItem;
