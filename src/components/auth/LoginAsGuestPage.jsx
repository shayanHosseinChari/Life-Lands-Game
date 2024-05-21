import { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getSession,
  getValueForSession,
  saveSession,
  setSession,
} from "../../appsetting/storeConfig";
import { insertSessionService } from "../../service/SessionService";
import SpaceStyled from "../../style/SpaceStyle";
import CustomText from "../../components/text/CustomText";
import CustomButton from "../../components/CustomButton/CustomButton";
import { SpaceBetween } from "../../style/uiUtil";
import CustomIconButton from "../CustomButton/CustomIconButton";
import { lightRedColor, redColor } from "../../appsetting/appsettingColor";
import { useTheme } from "@react-navigation/native";
import { border } from "../../appsetting/styleSetting";
import { Icon } from "../../appsetting/icons";

const LoginAsGuestPage = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const { colors } = useTheme();
  const style = StyleSheet.create({
    container: {
      backgroundColor: colors?.inputBgColor,
      width: windowWidth - 80,
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: border,
    },
  });
  const [sessionId, setSessionId] = useState();
  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    const {
      data: { data: sessionData },
    } = await insertSessionService();
    setSession(sessionData._id);
    setSessionId(sessionData._id);
    getSession();
    saveSession();
    getValueForSession();
  };
  return (
    <View style={{ alignSelf: "center", flex: 1 }}>
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
        <View style={style.container}>
          <SpaceBetween>
            <View>
              <SpaceStyled top={11}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    transform: [{ rotate: "181deg" }],
                  }}
                  source={require("../../../assets/icons/back.png")}
                />
              </SpaceStyled>
            </View>
            <View>
              <CustomText color={"#676767"}>نام کاربری</CustomText>
              <CustomText color={"#676767"}>{sessionId}</CustomText>
            </View>
          </SpaceBetween>
        </View>
      </SpaceStyled>
      <SpaceStyled top={20} bottom={50}>
        <CustomText
          width={1.9}
          lines={20}
          color={lightRedColor}
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          توجه داشته باشید که با ورود به عنوان مهمان امتیازهای شما محاسبه نخواهد
          شد و قابلیت اضافه کردن کاربران به لیست دوستان خود را نخواهید داشت
        </CustomText>
      </SpaceStyled>
      {sessionId && (
        <CustomIconButton
          onClick={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }}
          isRotate={true}
          icon={require("../../../assets/icons/back.png")}
        >
          ورود به عنوان مهمان
        </CustomIconButton>
      )}
    </View>
  );
};
export default LoginAsGuestPage;
