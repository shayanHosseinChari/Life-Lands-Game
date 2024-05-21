import { Dimensions, Image, View } from "react-native";
import { CenterStyled } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import CustomButton from "../CustomButton/CustomButton";
import SpaceStyle from "../../style/SpaceStyle";
import { redColor, yellowColor } from "../../appsetting/appsettingColor";

const CommingSoonComponent = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width * 0.7;
  return (
    <View>
      <CenterStyled>
        <View>
          <Image
            style={{ width: windowWidth, height: windowWidth }}
            source={require("../../../assets/comming.png")}
          />
        </View>
      </CenterStyled>
      <CenterStyled>
        <CustomText style={{ textAlign: "center", fontSize: 20 }}>
          در حال ساخت...
        </CustomText>
      </CenterStyled>
      <SpaceStyle right={40} left={40} top={40}>
        <CustomButton
          onClick={() => {
            navigation.goBack();
          }}
          color={redColor}
        >
          بازگشت
        </CustomButton>
      </SpaceStyle>
    </View>
  );
};
export default CommingSoonComponent;
