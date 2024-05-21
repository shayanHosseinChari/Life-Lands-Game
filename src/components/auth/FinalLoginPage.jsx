import { BottomSheet } from "react-native-btr";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "../text/CustomText";
import SpaceStyled from "../../style/SpaceStyle";
import CustomInput from "../CustomInput/CustomInput";
import CustomIconButton from "../CustomButton/CustomIconButton";
import SpaceStyle from "../../style/SpaceStyle";
import {
  forgetPasswordFirstStepService,
  forgetPasswordSecondStepService,
  loginService,
} from "../../service/UserService";
import { useContext, useState } from "react";
import { save, setToken } from "../../appsetting/storeConfig";
import { OpenToast } from "../share/OpenToast";
import { Icon } from "../../appsetting/icons";
import { useTheme } from "@react-navigation/native";
import CustomButton from "../CustomButton/CustomButton";
import { border } from "../../appsetting/styleSetting";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Hr } from "../../style/uiUtil";
import { RootContext } from "../../context/RootContext";
import { RFPercentage } from "react-native-responsive-fontsize";

const FinalLoginPage = ({
  route: {
    params: { phoneNumber },
  },
  navigation,
}) => {
  const { setReloadUser } = useContext(RootContext);
  const { colors } = useTheme();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [forgetPasswwordData, setForgetPasswwordData] = useState({
    phoneNumber: phoneNumber || "",
    code: "",
    isValid: phoneNumber ? true : false,
    isSendSms: false,
    isValidConfirmSms: false,
    code: "",
  });
  const [isForgetPasswordVisible, setIsForgetPasswordVisible] = useState();
  const login = async () => {
    console.log('send data for login')

    const { data } = await loginService({
      userName: phoneNumber || userName,
      password,
    });

    if (data.state) {
      setReloadUser(Date.now());
      await setToken(data.data.token);
      save(data.data.token);
      OpenToast("وارد شدید", "شما با موفقیت وارد حساب کاربری خود شده اید");
      // save("sessionId", data.data.sessionId);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  };
  const setForgetPasswordDataHandler = (field, val) => {
    let data = { ...forgetPasswwordData };
    data[field] = val;
    data.isValid =
      data?.phoneNumber?.length === 11 && data?.phoneNumber?.length > 3;

    data.isValidConfirmSms =
      data.isSendSms && data.newPassword?.length > 8 && data.code?.length === 5;
    setForgetPasswwordData(data);
  };
  const sendForgetPassword = async () => {
    try {
      if (
        forgetPasswwordData.isSendSms &&
        forgetPasswwordData.isValidConfirmSms
      ) {
        await forgetPasswordSecondStepService(forgetPasswwordData);
        setIsForgetPasswordVisible(false);
        OpenToast("تغییر یافت", "کلمه ی عبور شما با موفقیت تغییر یافت");
        setForgetPasswwordData({
          phoneNumber: phoneNumber || "",
          code: "",
          isValid: phoneNumber ? true : false,
          isSendSms: false,
          isValidConfirmSms: false,
          code: "",
        });
      } else if (forgetPasswwordData.isValid) {
        await forgetPasswordFirstStepService(forgetPasswwordData);
        setForgetPasswwordData({
          ...forgetPasswwordData,
          ...{ isSendSms: true },
        });
      }
    } catch (e) {
      setForgetPasswwordData({
        phoneNumber: phoneNumber || "",
        code: "",
        isValid: phoneNumber ? true : false,
        isSendSms: false,
        isValidConfirmSms: false,
        code: "",
      });
      setIsForgetPasswordVisible(false);
      OpenToast(
        "خطا رخ داد",
        "موارد ورودی را بررسی کنید یا کاربری با این مشخصات یافت نشد",
        "error"
      );
    }
  };
  const onCloseButtonSheet = () => {
    setIsForgetPasswordVisible(false);
    setForgetPasswwordData({
      phoneNumber: phoneNumber || "",
      code: "",
      isValid: phoneNumber ? true : false,
      isSendSms: false,
      isValidConfirmSms: false,
      code: "",
    });
  };
  return (
    <ScrollView>
      <View style={{paddingHorizontal: RFPercentage(2)}}>
        <Icon
          style={{
            width: 120,
            height: 120,
            alignSelf: "center",
            marginTop: 40,
          }}
          dark={require("../../../assets/comlogo.png")}
          light={require("../../../assets/lightlogo.png")}
        />
        <SpaceStyled>
          <CustomText style={{ fontSize: 18, alignSelf: "center" }}>
            ورود
          </CustomText>
        </SpaceStyled>
        <TextInput
                    placeholderTextColor={'gray'}
                    placeholder="نام کاربری یا شماره تلفن"
                    direction={"rtl"}
                    style={{
                      with:"80%",
                      backgroundColor:"rgba(16, 16, 16, 1)",
                      height:50,
                      borderRadius: 8,
                      marginTop: 10,
                      color:"white",
                      paddingHorizontal: 10
                      

                    }}
                    onChangeText={(e)=>{
                      console.log(e)
                      setUserName(e)
                    }}
                  />
        <TextInput
                    placeholderTextColor={'gray'}
                    placeholder="رمز عبور"
                    direction={"rtl"}
                    style={{
                      with:"80%",
                      backgroundColor:"rgba(16, 16, 16, 1)",
                      height:50,
                      borderRadius: 8,
                      marginTop: 10,
                      color:"white",
                      paddingHorizontal: 10
                      

                    }}
                    onChangeText={(e)=>{
                      console.log(e)
                      setPassword(e)
                    }}
                  />
       

        <SpaceStyle top={20}>
          <TouchableOpacity onPress={login} style={{width:"80%",alignSelf:"center",paddingHorizontal: RFPercentage(2),borderRadius:10,height:55,flexDirection:"row",alignItems:"center",justifyContent:'space-between',backgroundColor:"#9b42f5"}}>
            <AntDesign name="left" size={RFPercentage(2)} color={'white'} />
            <Text style={{color:"white",fontFamily:"vazir"}}>ورود</Text>

          </TouchableOpacity>
          
        
        </SpaceStyle>
        <SpaceStyle>
          <TouchableOpacity
            onPress={() => {
              setIsForgetPasswordVisible();
            }}
          >
            <CustomText color={colors.primary} style={{ alignSelf: "center" }}>
              فراموشی رمز عبور
            </CustomText>
          </TouchableOpacity>
        </SpaceStyle>
        <BottomSheet
          onBackdropPress={onCloseButtonSheet}
          onBackButtonPress={onCloseButtonSheet}
          visible={isForgetPasswordVisible}
        >
          <View>
            <View
              style={{
                height: 380,
                backgroundColor: colors.background,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                borderTopLeftRadius: border,
                borderTopRightRadius: border,
              }}
            >
              <View
                style={{
                  width: 80,
                  marginBottom: 30,
                  marginTop: -20,
                  height: 3,
                  borderRadius: 20,
                  backgroundColor: colors.titleColor,
                  alignSelf: "center",
                }}
              ></View>
              <View style={{ width: "80%" }}>
                <SpaceStyle bottom={10}>
                  <CustomInput
                    editable={!forgetPasswwordData.isSendSms}
                    value={forgetPasswwordData.phoneNumber}
                    onChangeText={(e) => {
                      setForgetPasswordDataHandler("phoneNumber", e);
                    }}
                    direction={"rtl"}
                    keyboardType="number-pad"
                    placeholder={"شماره تماس را وارد کنید..."}
                  />
                </SpaceStyle>
                {forgetPasswwordData.isSendSms && (
                  <>
                    <Hr />
                    <SpaceStyle bottom={10}>
                      <CustomInput
                        direction={"rtl"}
                        keyboardType="number-pad"
                        onChangeText={(e) => {
                          setForgetPasswordDataHandler("code", e);
                        }}
                        placeholder={"کد ارسال شده را وارد کنید..."}
                      />
                    </SpaceStyle>
                    <SpaceStyle bottom={10}>
                      <CustomInput
                        onChangeText={(e) => {
                          setForgetPasswordDataHandler("newPassword", e);
                        }}
                        placeholder={"کلمه ی عبور جدید را وارد کنید..."}
                      />
                    </SpaceStyle>
                  </>
                )}

                {forgetPasswwordData.isValid &&
                  !forgetPasswwordData.isSendSms && (
                    <SpaceStyle>
                      <CustomButton onClick={sendForgetPassword}>
                        ارسال کد تایید
                      </CustomButton>
                    </SpaceStyle>
                  )}
                {forgetPasswwordData.isValidConfirmSms &&
                  forgetPasswwordData.isSendSms && (
                    <SpaceStyle>
                      <CustomButton onClick={sendForgetPassword}>
                        تایید و تغییر کلمه عبور
                      </CustomButton>
                    </SpaceStyle>
                  )}
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    </ScrollView>
  );
};
export default FinalLoginPage;
