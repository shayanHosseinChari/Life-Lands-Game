import { Image, StyleSheet, View, Input, TextInput } from "react-native";
import CustomText from "../text/CustomText";
import SpaceStyled from "../../style/SpaceStyle";
import CustomInput from "../CustomInput/CustomInput";
import { SpaceBetween } from "../../style/uiUtil";
import CustomIconButton from "../CustomButton/CustomIconButton";
import { redColor } from "../../appsetting/appsettingColor";
import { useState } from "react";
import { sendSmsService } from "../../service/SmsService";
import { border } from "../../appsetting/styleSetting";
import { Icon } from "../../appsetting/icons";
const FirstLoginStepPage = ({ route, navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [isShowError, setIsShowError] = useState(false);
  let isLogin = route?.params?.isLogin;
  const style = StyleSheet.create({
    container: {
      backgroundColor: "#252429",
      borderRadius: border,
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: 50,
    },
    input: {
      color: "white",
      direction: "rtl",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "vaszir",
      textAlign: "right",
      color: "white",
      direction: "rtl",
      width: 250,
    },
  });
  const sendData = async () => {
    try {
      const {
        data: { data: res },
      } = await sendSmsService(phoneNumber);
      navigation.navigate("Enter Verfication Code Page", {
        phoneNumber,
        ex: res,
        isLogin,
      });
    } catch (e) {
      navigation.navigate("Login Page", {
        phoneNumber,
        isLogin: true,
      });
    }
  };
  return (
    <View style={{ alignSelf: "center" }}>
      <Icon
        style={{ width: 120, height: 120, alignSelf: "center", marginTop: 40 }}
        dark={require("../../../assets/comlogo.png")}
        light={require("../../../assets/lightlogo.png")}
      />
      <SpaceStyled>
        <CustomText style={{ fontSize: 18, alignSelf: "center" }}>
          {isLogin ? "ورود به حساب کاربری" : "ثبت نام کاربر"}
        </CustomText>
      </SpaceStyled>
      <View style={style.container}>
        <SpaceBetween>
          <Image
            source={require("../../../assets/icons/back.png")}
            width={20}
            style={{ width: 20, height: 20, alignSelf: "center" }}
            height={20}
          />
          <TextInput
            direction={"rtl"}
            keyboardType="number-pad"
            value={phoneNumber}
            onChangeText={(e) => {
              setPhoneNumber(e);
              if (e?.length !== 11) setIsShowError(true);
              else setIsShowError(false);
            }}
            style={style.input}
            placeholderTextColor={"#ffffff76"}
            placeholder={"شماره تماس"}
          />
        </SpaceBetween>
      </View>
      {isShowError && (
        <CustomText color={redColor}>
          لطفا شما تماس را صحیح وارد کنید
        </CustomText>
      )}

      <SpaceStyled top={60}>
        <CustomIconButton
          onClick={() => {
            navigation.navigate("Guest");
          }}
          isRotate={true}
          color={redColor}
          icon={require("../../../assets/icons/back.png")}
        >
          ورود به عنوان مهمان
        </CustomIconButton>
        <CustomIconButton
          onClick={() => {
            sendData();
          }}
          isRotate={true}
          icon={require("../../../assets/icons/back.png")}
        >
          دریافت کد تایید شماره همراه
        </CustomIconButton>
      </SpaceStyled>
    </View>
  );
};
export default FirstLoginStepPage;
