import { StyleSheet, View } from "react-native";
import CustomText from "../text/CustomText";
import { LinearGradient } from "expo-linear-gradient";

const DividerComponent = ({ title,colors }) => {
  return (
    <View style={style.container}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        style={style.line}
        end={{ x: 1, y: 0 }}
      />
      <CustomText fontSize={14} right={10} left={10}>
        {title}
      </CustomText>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        style={style.line}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
};
export default DividerComponent;
const style = StyleSheet.create({
  line: {
    display: "flex",
    flex: 1,
    height: 2,
    backgroundColor: "#B539E1",
  },
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
});
