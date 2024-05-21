import { useTheme } from "@react-navigation/native";
import { Fragment, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import HeaderComponent from "../../components/layout/HeaderComponent";
import SecurityItem from "../../components/security/SecurityItem";
import { OpenToast } from "../../components/share/OpenToast";
import CustomText from "../../components/text/CustomText";
import {
  getUsersSecurityService,
  updateUsersSecurityService,
} from "../../service/UserService";
import SpaceStyle from "../../style/SpaceStyle";

const SecurityPage = ({ navigation }) => {
  const { colors } = useTheme();
  const [securityData, setSecurityData] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const {
      data: { data: res },
    } = await getUsersSecurityService();
    setSecurityData(res);
  };
  const updateUsersSecurity = async () => {
    const {
      data: { data, state },
    } = await updateUsersSecurityService(securityData);
    OpenToast("بروزشد", "حریم شخصی با موفقیت بروزشد");
  };
  return (
    <Fragment>
      <HeaderComponent
        hasBack={true}
        navigation={navigation}
        darkIcon={require("../../../assets/icons/shield-security.png")}
        lightIcon={require("../../../assets/icons/shield-security.png")}
      />
      {securityData && (
        <SpaceStyle styles={{ flex: 1, position: "relative" }}>
          <SecurityItem
            itemValue={securityData.isShowProfileImage}
            onAction={() => {
              setSecurityData({
                ...securityData,
                ...{ isShowProfileImage: !securityData.isShowProfileImage },
              });
            }}
            rightDarkIcon={require("../../../assets/icons/profile-security.png")}
            rightLightIcon={require("../../../assets/icons/Light/profile-security.png")}
            title="نمایش تصویر پروفایل"
          />
          <SecurityItem
            itemValue={securityData.isShowUserName}
            onAction={() => {
              setSecurityData({
                ...securityData,
                ...{ isShowUserName: !securityData.isShowUserName },
              });
            }}
            rightDarkIcon={require("../../../assets/icons/id-card-security.png")}
            rightLightIcon={require("../../../assets/icons/Light/id-card-security.png")}
            title="نمایش نام کاربری"
          />
          <SecurityItem
            itemValue={securityData.isShowPhoneNumber}
            onAction={() => {
              setSecurityData({
                ...securityData,
                ...{ isShowPhoneNumber: !securityData.isShowPhoneNumber },
              });
            }}
            rightDarkIcon={require("../../../assets/icons/phone-number-security.png")}
            rightLightIcon={require("../../../assets/icons/Light/phone-number-security.png")}
            title="نمایش شماره تماس"
          />
          <SecurityItem
            itemValue={securityData.isShowFirstName}
            onAction={() => {
              setSecurityData({
                ...securityData,
                ...{ isShowFirstName: !securityData.isShowFirstName },
              });
            }}
            rightDarkIcon={require("../../../assets/icons/other-security.png")}
            rightLightIcon={require("../../../assets/icons/Light/other-security.png")}
            title="نمایش نام"
          />
          <SecurityItem
            itemValue={securityData.isShowLastName}
            onAction={() => {
              setSecurityData({
                ...securityData,
                ...{ isShowLastName: !securityData.isShowLastName },
              });
            }}
            rightDarkIcon={require("../../../assets/icons/other-security.png")}
            rightLightIcon={require("../../../assets/icons/Light/other-security.png")}
            title="نمایش نام خانوادگی"
          />
          <SecurityItem
            itemValue={securityData.isShowEmail}
            onAction={() => {
              setSecurityData({
                ...securityData,
                ...{ isShowEmail: !securityData.isShowEmail },
              });
            }}
            rightDarkIcon={require("../../../assets/icons/email-security.png")}
            rightLightIcon={require("../../../assets/icons/Light/email-security.png")}
            title="نمایش ایمیل"
          />
          <SecurityItem
            itemValue={securityData.posts}
            onAction={() => {
              setSecurityData({
                ...securityData,
                ...{ posts: !securityData.posts },
              });
            }}
            rightDarkIcon={require("../../../assets/icons/post-security.png")}
            rightLightIcon={require("../../../assets/icons/Light/post-security.png")}
            title="نمایش پست ها"
          />
          <CustomButton styles={{position:"absolute", bottom:20, left:20, right:20, borderRadius:555, padding:5, backgroundColor:"#5FBDFF"}} onClick={updateUsersSecurity}>ثبت</CustomButton>
        </SpaceStyle>
      )}
    </Fragment>
  );
};
export default SecurityPage;
