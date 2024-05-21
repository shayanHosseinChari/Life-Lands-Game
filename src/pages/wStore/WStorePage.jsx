import { View } from "react-native";
import HeaderComponent from "../../components/layout/HeaderComponent";
import CustomText from "../../components/text/CustomText";

const WStorePage = ({ navigation }) => {
  return (
    <View>
      <HeaderComponent
        darkIcon={require("../../../assets/icons/cups.png")}
        lightIcon={require("../../../assets/icons/Light/cups.png")}
        hasBack={true}
        navigation={navigation}
        title={"wStore"}
      />
      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 250,
        }}
      >
        <CustomText fontSize={14}>به زودی</CustomText>
      </View>
    </View>
  );
};
export default WStorePage;
