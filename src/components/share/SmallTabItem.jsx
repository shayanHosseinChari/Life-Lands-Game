import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../text/CustomText";

const SmallTabItem = ({ text, isSelected, width, onClick }) => {
  const { colors } = useTheme();
  const style = StyleSheet.create({
    container: {
      backgroundColor: isSelected ? "#202f22" : "#1b1c20",
      borderColor: isSelected ? "#316e29" : "#1b1c20",
      borderWidth: 2,
      borderRadius: 20,
      marginHorizontal: 5,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      minWidth: "20%",
    },
    icon: {
      width: 30,
      height: 30,
      padding: 10,
    },
    text: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
  });
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onClick}>
        <CustomText style={style.text}>{text}</CustomText>
      </TouchableOpacity>
    </View>
  );
};
export default SmallTabItem;
