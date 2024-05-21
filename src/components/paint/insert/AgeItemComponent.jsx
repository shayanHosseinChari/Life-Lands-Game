import { TouchableOpacity } from "react-native";
import CustomCard from "../../CustomCard/CustomCard";
import CustomText from "../../text/CustomText";
import { useTheme } from "@react-navigation/native";

const AgeItemComponent = ({ ageItem, currentAge, setAge }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 3 }}
      onPress={() => setAge(ageItem)}
    >
      <CustomCard color={currentAge === ageItem ? colors.primary : undefined}>
        <CustomText fontSize={7} style={{ marginHorizontal: 10 }}>
          {ageItem}
        </CustomText>
      </CustomCard>
    </TouchableOpacity>
  );
};
export default AgeItemComponent;
