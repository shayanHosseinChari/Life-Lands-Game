import { TouchableOpacity } from "react-native";
import CustomText from "../text/CustomText";
import { useNavigation, useTheme } from "@react-navigation/native";

const NavigateActionComponent = ({ children, target, optons = {} }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <>
      {target ? (
        <TouchableOpacity onPress={() => navigation.navigate(target, optons)}>
          <CustomText style={{ zIndex: 100 }} color={colors.lightTextColor}>
            {children}
          </CustomText>
        </TouchableOpacity>
      ) : (
        <CustomText style={{ zIndex: 100 }} color={colors.lightTextColor}>
          {children}
        </CustomText>
      )}
    </>
  );
};
export default NavigateActionComponent;
