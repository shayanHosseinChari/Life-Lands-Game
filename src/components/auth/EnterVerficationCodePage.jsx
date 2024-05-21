import { Dimensions, Image, StyleSheet, TextInput, View } from "react-native";
import CustomText from "../text/CustomText";
import SpaceStyled from "../../style/SpaceStyle";
import { CenterStyled, Row } from "../../style/uiUtil";
import React, { useEffect, useState } from "react";
import { greenColor, lightTextColor } from "../../appsetting/appsettingColor";
import CustomIconButton from "../CustomButton/CustomIconButton";
import { confirmSmsService } from "../../service/SmsService";
import { border } from "../../appsetting/styleSetting";
import { Icon } from "../../appsetting/icons";
const EnterVerficationCodePage = ({ route, navigation }) => {
  let phoneNumber = route.params.phoneNumber;
  let ex = route.params.ex;
  let isLogin = route.params.isLogin;
  const windowWidth = Dimensions.get("window").width;
  const [firstCode, setFirstCode] = useState();
  const [secondCode, setSecondCode] = useState();
  const [thirdCode, setThirdCode] = useState();
  const [fourthCode, setFourthCode] = useState();
  const [fiveCode, setFiveCode] = useState();
  const [hasCode, setHasCode] = useState();
  let first = React.createRef();
  let second = React.createRef();
  let third = React.createRef();
  let fourth = React.createRef();
  let fiveth = React.createRef();
  const style = StyleSheet.create({
    input: {
      backgroundColor: "#252429",
      width: windowWidth / 6,
      borderRadius: border,
      height: 150,
      aspectRatio: 1 / 1,
      color: "white",
      marginHorizontal: 5,
      fontSize: 17,
    },
  });
  const sendSms = async () => {
    if (hasCode) {
      const {
        data: { state },
      } = await confirmSmsService({
        phoneNumber,
        code: firstCode + secondCode + thirdCode + fourthCode + fiveCode,
      });
      navigation.navigate(isLogin ? "Login Page" : "Register Page", {
        phoneNumber,
      });
    }
  };

  useEffect(() => {
    setHasCode(
      firstCode?.length == 1 &&
        secondCode?.length == 1 &&
        thirdCode?.length == 1 &&
        fourthCode?.length == 1 &&
        fiveCode?.length == 1
    );
  }, [firstCode, secondCode, thirdCode, fourthCode, fiveCode]);

  return (
    <View>
      <View style={{ alignSelf: "center" }}>
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
            کد تایید
          </CustomText>
        </SpaceStyled>
        <SpaceStyled top={40}>
          <Row>
            <TextInput
              ref={(re) => (first = re)}
              maxLength={1}
              textAlign="center"
              style={style.input}
              onChangeText={(e) => {
                setFirstCode(e);
                if (e?.length != 0) {
                  second.focus();
                }
              }}
            />
            <TextInput
              ref={(re) => (second = re)}
              maxLength={1}
              textAlign="center"
              style={style.input}
              onChangeText={(e) => {
                setSecondCode(e);
                if (e?.length == 0 || !e?.length) {
                  first.focus();
                  return;
                }
                third.focus();
              }}
            />
            <TextInput
              ref={(re) => (third = re)}
              maxLength={1}
              textAlign="center"
              style={style.input}
              onChangeText={(e) => {
                setThirdCode(e);
                if (e?.length == 0) {
                  second.focus();
                  return;
                }
                fourth.focus();
              }}
            />
            <TextInput
              ref={(re) => (fourth = re)}
              maxLength={1}
              textAlign="center"
              style={style.input}
              onChangeText={(e) => {
                setFourthCode(e);
                if (e?.length == 0) {
                  third.focus();
                  return;
                }
                fiveth.focus();
              }}
            />
            <TextInput
              ref={(re) => (fiveth = re)}
              maxLength={1}
              textAlign="center"
              style={style.input}
              onChangeText={(e) => {
                setFiveCode(e);
                if (e?.length == 0) {
                  fourth.focus();
                  return;
                } else {
                  sendSms();
                }
              }}
            />
          </Row>
          <SpaceStyled top={20}>
            <View style={{ alignSelf: "center" }}>
              <CustomText
                style={{ fontSize: 15, alignSelf: "center" }}
                color={greenColor}
              >
                کد پنج رقمی به شماره {phoneNumber} ارسال شد
              </CustomText>
              <CustomText
                style={{ fontSize: 15, alignSelf: "center" }}
                color={lightTextColor}
              >
                {ex}
              </CustomText>
            </View>
          </SpaceStyled>
        </SpaceStyled>
      </View>
      <SpaceStyled top={60}>
        {hasCode && (
          <CustomIconButton
            onClick={sendSms}
            isRotate={true}
            icon={require("../../../assets/icons/back.png")}
          >
            تایید کد
          </CustomIconButton>
        )}
      </SpaceStyled>
    </View>
  );
};
export default EnterVerficationCodePage;
