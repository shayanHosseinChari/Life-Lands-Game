import * as DocumentPicker from "expo-document-picker";
import { Fragment } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import CustomIconButton from "../CustomButton/CustomIconButton";
import SpaceStyled from "../../style/SpaceStyle";
import CustomText from "../text/CustomText";
import CustomInput from "../CustomInput/CustomInput";
import { Row } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
const CompleteProfilePage = () => {
  const style = StyleSheet.create({});
  return (
    <Fragment>
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
            <Row>
              <View></View>

              <View></View>
            </Row>
            <CustomInput />
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
};
export default CompleteProfilePage;
