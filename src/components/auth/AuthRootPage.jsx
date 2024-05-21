import { Dimensions, Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { primaryColor, redColor } from "../../appsetting/appsettingColor";
import { Icon } from "../../appsetting/icons";
import { border } from "../../appsetting/styleSetting";
import SpaceStyled from "../../style/SpaceStyle";
import { SpaceBetween } from "../../style/uiUtil";
import CustomButton from "../CustomButton/CustomButton";
import CustomText from "../text/CustomText";
import BackIconLfet from "../BackIconLeft/BackIconLeft";
import { RFPercentage } from "react-native-responsive-fontsize";
const AuthRootPage = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const style = StyleSheet.create({
    btnContainer: {
      backgroundColor: primaryColor,
      marginVertical: 10,
      borderRadius: border,
      paddingHorizontal: 30,
      paddingVertical: 20,
      flexDirection:"row",
      alignItems:'center',
      justifyContent:"space-between",
      width: windowWidth - 80,
    },
    redBtnContainer: {
      backgroundColor: redColor,
      marginVertical: 10,
      borderRadius: border,
      paddingHorizontal: 30,
      paddingVertical: 20,
      width: windowWidth - 80,
    },
    borderBtnContainer: {
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: primaryColor,
      marginVertical: 10,
      borderRadius: border,
      paddingHorizontal: 30,
      paddingVertical: 20,
      width: windowWidth - 80,
      borderWidth: 2,
    },
  });
  return (
    <View style={{ alignSelf: "center" }}>
      <Icon
        style={{ width: 120, height: 120, alignSelf: "center", marginTop: 40 }}
        dark={require("../../../assets/comlogo.png")}
        light={require("../../../assets/lightlogo.png")}
      />
      <SpaceStyled>
        <CustomText style={{ fontSize: 17, alignSelf: "center" }}>
          بدون نصب بازی کن!
        </CustomText>
      </SpaceStyled>
      <SpaceStyled top={40}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login Page", { isLogin: true });
          }}
        >
          <View style={style.btnContainer}>
          <BackIconLfet color={'white'} size={RFPercentage(3.5)} />

<CustomText>ورود</CustomText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login First Step", { isLogin: false });
          }}
        >
          <View style={style.border}>
            <View style={style.borderBtnContainer}>
              <SpaceBetween>
                {/* <Image
                  style={{
                    width: 20,
                    height: 20,
                    transform: [{ rotate: "181deg" }],
                  }}
                  source={require("../../../assets/icons/back.png")}
                /> */}
                  <BackIconLfet color={'white'} size={RFPercentage(3.5)} />
                <CustomText>ثبت نام</CustomText>
              </SpaceBetween>
            </View>
          </View>
        </TouchableOpacity>
      </SpaceStyled> 
     
      <CustomText lines={20} width={1.3}>
        جهت استفاده از برنامه نیاز هست ابتدا ثبت نام کنید ، اگر حساب کاربری
        دارید و یا قبلا در وب سایت ثبت نام کرده اید میتوانید در قسمت ورود وارد
        حساب کاربری خود شوید. 
      </CustomText>
    </View>
  );
};
export default AuthRootPage;
