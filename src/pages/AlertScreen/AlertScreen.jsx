import { Image, View } from "react-native";
import { redColor, yellowColor } from "../../appsetting/appsettingColor";
import CustomButton from "../../components/CustomButton/CustomButton";
import HeaderComponent from "../../components/layout/HeaderComponent";
import CustomText from "../../components/text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import { CenterStyled, Row } from "../../style/uiUtil";

const AlertScreen = ({ navigation }) => {
  return (
    <View>
      <HeaderComponent
        hasBack={true}
        darkIcon={require("../../../assets/icons/info2.png")}
        lightIcon={require("../../../assets/icons/Light/Information.png")}
        title={"هشدار"}
      />
      <CenterStyled>
        <SpaceStyle top={50}>
          <Image
            resizeMode="cover"
            width={"100%"}
            height={"100%"}
            source={require("../../../assets/danger.png")}
          />
          <CustomText style={{ fontSize: 15 }}>
            شما وارد حساب کاربری خودتون نشدید!
          </CustomText>
          <SpaceStyle top={40}>
            <CustomButton onClick={() => navigation.replace("Profile")}>
              ورود / ثبت نام
            </CustomButton>
          </SpaceStyle>
          <SpaceStyle top={10}>
            <CustomButton onClick={() => navigation.goBack()} color={redColor}>
              ادامه به عنوان مهمان
            </CustomButton>
          </SpaceStyle>
        </SpaceStyle>
      </CenterStyled>
    </View>
  );
};
export default AlertScreen;
