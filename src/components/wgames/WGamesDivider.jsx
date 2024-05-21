import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CenterStyled, SpaceAround, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { useNavigation, useTheme } from "@react-navigation/native";
import SpaceStyle from "../../style/SpaceStyle";
import { Icon } from "../../appsetting/icons";

const WGamesDivider = ({ title, description, target, option = {} }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
  });
  return (
    <SpaceStyle bottom={15} top={10}>
      <TouchableOpacity
        onPress={() => {
          if (target) navigation.navigate(target, option);
        }}
      >
        <View style={style.container}>
          <SpaceBetween minus={40}>
            <View style={{ justifyContent: "center" }}>
              <Icon
                dark={require("../../../assets/icons/back.png")}
                light={require("../../../assets/icons/back.png")}
                style={{
                  width: 12,
                  height: 12,
                  transform: [{ rotate: "181deg" }],
                }}
              />
            </View>
            <View>
              <CustomText top={10} fontSize={16} color={colors.red}>
                {title}
              </CustomText>
              <CustomText
                fontSize={7}
                bottom={10}
                color={colors.lightTextColor}
              >
                {description}
              </CustomText>
            </View>
          </SpaceBetween>
        </View>
      </TouchableOpacity>
    </SpaceStyle>
  );
};
export default WGamesDivider;
