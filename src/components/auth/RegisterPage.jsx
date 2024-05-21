import { Image, ScrollView, View } from "react-native";
import CustomInput from "../CustomInput/CustomInput";
import CustomText from "../text/CustomText";
import SpaceStyled from "../../style/SpaceStyle";
import CustomIconButton from "../CustomButton/CustomIconButton";
import { useState } from "react";
import { registerService } from "../../service/UserService";
import { OpenToast } from "../share/OpenToast";
import { save, setToken } from "../../appsetting/storeConfig";
import { Icon } from "../../appsetting/icons";
import { useTheme } from "@react-navigation/native";
const RegisterPage = ({
  route: {
    params: { phoneNumber },
  },
  navigation,
}) => {
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const { colors } = useTheme();
  const [fName,setFname] = useState('')
  const [lName,setLname] = useState('')
  const [email,setEmail ] = useState('')
  const [paswd,setPassword] = useState('')
  const [username,setUserName] = useState(phoneNumber)
  const [number,setNumber] = useState(phoneNumber)
  const [formData, setFormData] = useState({
    firstName: fName,
    lastName: lName,
    email,
    password:paswd,
    userName: username,
    phoneNumber:number,
  });

  const setData = (obj) => {
    let formDataCopy = formData;
    formDataCopy = { ...formDataCopy, ...obj };
    setFormData(formDataCopy);
  };

  const register = async () => {
    if (
      formData.firstName.length > 2 &&
      formData.lastName.length > 2 &&
      formData.email.length > 8 &&
      formData.password.length > 7 
    ) {
      const {
        data: { data: res },
      } = await registerService(formData);
      save(res);
      setToken(res);
      OpenToast("وارد شدید", "شما با موفقیت وارد حساب کاربری خود شده اید");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      OpenToast("خطا", "اطلاعات را کامل وارد کنید");
    }
  };

  return (
    <View>
      <ScrollView>
        <View>
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
              ثبت نام کاربر
            </CustomText>
          </SpaceStyled>
          <SpaceStyled right={40} left={40} top={40}>
            <SpaceStyled bottom={5} right={5}>
              <CustomText
                style={{ fontSize: 10 }}
                color={colors.placeholderTextColor}
              >
                نام خانوادگی
              </CustomText>
            </SpaceStyled>
            <CustomInput
          
              changeText={(e) => setData({ lastName: e })}
              placeholder={"نام خانوادگی"}
              darkIcon={require("../../../assets/icons/id-card-security.png")}
              lightIcon={require("../../../assets/icons/Light/id-card-security.png")}
            />
          </SpaceStyled>
          <SpaceStyled right={40} left={40} top={10}>
            <SpaceStyled bottom={5} right={5}>
              <CustomText
                style={{ fontSize: 10 }}
                color={colors.placeholderTextColor}
              >
                نام
              </CustomText>
            </SpaceStyled>
            <CustomInput
              changeText={(e) => setData({ firstName: e })}
              placeholder={"نام"}
              darkIcon={require("../../../assets/icons/id-card-security.png")}
              lightIcon={require("../../../assets/icons/Light/id-card-security.png")}
            />
          </SpaceStyled>
          <SpaceStyled right={40} left={40} top={10}>
            <SpaceStyled bottom={5} right={5}>
              <CustomText
                style={{ fontSize: 10 }}
                color={colors.placeholderTextColor}
              >
                ایمیل
              </CustomText>
            </SpaceStyled>
            <CustomInput
              changeText={(e) => setData({ email: e })}
              placeholder={"ایمیل"}
              darkIcon={require("../../../assets/icons/email-security.png")}
              lightIcon={require("../../../assets/icons/Light/email-security.png")}
            />
          </SpaceStyled>
          <SpaceStyled right={40} left={40} top={10}>
            <SpaceStyled bottom={5} right={5}>
              <CustomText
                style={{ fontSize: 10 }}
                color={colors.placeholderTextColor}
              >
                نام کاربری
              </CustomText>
            </SpaceStyled>
            <CustomInput
              changeText={(e) => setData({ userName: e })}
              value={formData.userName}
              placeholder={"نام کاربری"}
              darkIcon={require("../../../assets/icons/other-security.png")}
              lightIcon={require("../../../assets/icons/Light/other-security.png")}
            />
          </SpaceStyled>
          <SpaceStyled right={40} left={40} top={10}>
            <SpaceStyled bottom={5} right={5}>
              <CustomText
                style={{ fontSize: 10 }}
                color={colors.placeholderTextColor}
              >
                شماره تماس
              </CustomText>
            </SpaceStyled>
            <CustomInput
              editable={false}
              placeholder={"شماره تماس"}
              changeText={(text)=>{
                setNumber(text)
              }}
              value={formData.phoneNumber}
              darkIcon={require("../../../assets/icons/post-security.png")}
              lightIcon={require("../../../assets/icons/Light/post-security.png")}
            />
          </SpaceStyled>
          <SpaceStyled right={40} left={40} top={10}>
            <SpaceStyled bottom={5} right={5}>
              <CustomText
                style={{ fontSize: 10 }}
                color={colors.placeholderTextColor}
              >
                رمز عبور
              </CustomText>
            </SpaceStyled>
            <CustomInput
              changeText={(e) => setData({ password: e })}
              secureTextEntry={true}
              placeholder={"رمز عبور"}
              darkIcon={require("../../../assets/icons/security.png")}
              lightIcon={require("../../../assets/icons/Light/security.png")}
            />
          </SpaceStyled>
          <SpaceStyled right={40} left={40} top={10}>
            <SpaceStyled bottom={5} right={5}>
              <CustomText
                style={{ fontSize: 10 }}
                color={colors.placeholderTextColor}
              >
                تکرار رمز عبور
              </CustomText>
            </SpaceStyled>
            <CustomInput
              changeText={(e) => {
                setData({ confirmPassword: e });
                setIsPasswordConfirmed(e === formData.password);
              }}
              secureTextEntry={true}
              placeholder={"تکرار رمز عبور"}
              darkIcon={require("../../../assets/icons/security.png")}
              lightIcon={require("../../../assets/icons/Light/security.png")}
            />
            {!isPasswordConfirmed && (
              <SpaceStyled top={5} right={5}>
                <CustomText color={colors.notification}>
                  کلمه ی عبور مطابقت ندارد
                </CustomText>
              </SpaceStyled>
            )}
          </SpaceStyled>
          <SpaceStyled top={40}>
            <CustomIconButton
              onClick={register}
              icon={require("../../../assets/icons/back.png")}
              isRotate={true}
            >
              ثبت نام و مرحله ی بعد
            </CustomIconButton>
          </SpaceStyled>
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisterPage;
