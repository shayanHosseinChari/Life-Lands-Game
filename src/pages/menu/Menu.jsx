import { Fragment, useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "../../appsetting/icons";
import MenuItem from "../../components/menu/MenuItem";
import SpaceStyle from "../../style/SpaceStyle";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { getSession, getToken, getValueForTheme, setTheme } from "../../appsetting/storeConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootContext } from "../../context/RootContext";
import React, { BackHandler } from "react-native";
import { getProfileService } from "../../service/UserService";
import { Hr, Row, SpaceBetween } from "../../style/uiUtil";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomText from "../../components/text/CustomText";
import { NavigationActions } from "react-navigation";
import HeaderComponent from "../../components/layout/HeaderComponent";
import Dialog from "react-native-dialog";

const Menu = ({ navigation }) => {
  const { setReloadUser, setWasChangedTheme } = useContext(RootContext);
  const [userProfile, setUserProfile] = useState({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const { setReload } = useContext(RootContext);
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const style = StyleSheet.create({
    start: {
      display: "flex",
      alignSelf: "flex-start",
    },
  });

  useEffect(() => {
    getUsersProfile();
  }, [isFocused, navigation]);

  const getUsersProfile = async () => {
    const {
      data: { data: res },
    } = await getProfileService();

    setUserProfile(res);
  };
  const exitAction = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("session");
    await getToken();
    await getSession();
    setReload(Date.now());
    // BackHandler.exitApp();
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }, 500);
  };

  const showDialog = () => {
    setDialogVisible(true)
  };

  const handleCancel = () => {
    setDialogVisible(false)
  };

  const handleLogout = () => {
    setDialogVisible(false)
    exitAction();
  };

  return (
    <Fragment>
      <Dialog.Container visible={dialogVisible} contentStyle={{backgroundColor: '#282828', borderRadius:30}}>
        <Dialog.Title style={{color:"#EA7F83",fontFamily:"vaszir"}}>خروج از حساب کاربری</Dialog.Title>
        <Dialog.Description style={{color:"#cccccc",fontFamily:"vaszir"}}>
          آیا از خروج از حساب کاربری خود اطمینان دارید؟
        </Dialog.Description>
        <Dialog.Button label="خروج" onPress={handleLogout} color={"#EA7F83"} style={{fontFamily:"vaszir"}}/>
        <Dialog.Button label="انصراف" onPress={handleCancel} color={"#CCCCCC"} style={{fontFamily:"vaszir"}}/>
      </Dialog.Container>
      <HeaderComponent
        navigation={navigation}
        
        hasSearch={false}
        rightSide={
          <>
            <TouchableOpacity
              onPress={() => {
                setTheme(getValueForTheme() === "dark" ? "light" : "dark");
                setWasChangedTheme(Date.now());
              }}
            >
              <Icon
                style={styles.headerBackIconStyle}
                dark={require("../../../assets/icons/sun.png")}
                light={require("../../../assets/icons/sun.png")}
              />
            </TouchableOpacity>
          </>
        }
        leftSide={
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
            >
              <Icon
                style={styles.rightBackIconStyle}
                dark={require("../../../assets/icons/arrow-left.png")}
                light={require("../../../assets/icons/arrow-left.png")}
              />
            </TouchableOpacity>
          </>
        }
      />
      <SpaceStyle top={20} right={20} left={20}>
        {userProfile?._id && (
          <SpaceBetween styles={{ alignItems: "center" }}>
            <View>
              <TouchableOpacity
                style={{ width: 40, height: 40 }}
                onPress={() => {
                  navigation.navigate("Edit Profile");
                }}
              >
                <Icon
                  style={{ width: 35, height: 35 }}
                  dark={require("../../../assets/icons/edit-icon.png")}
                  light={require("../../../assets/icons/edit-icon.png")}
                />
              </TouchableOpacity>
            </View>
            <Row>
              <View style={{ justifyContent: "center", marginHorizontal: 15 }}>
                <CustomText>
                  {userProfile.firstName} {userProfile.lastName}
                </CustomText>
                <CustomText>{userProfile.userName}</CustomText>
              </View>
              <View>
                <CustomImage
                  aspect={1 / 1}
                  image={userProfile?.profileImage}
                  linkUserId={userProfile?._id}
                  width={4.5}
                  radius={100}
                />
              </View>
            </Row>
          </SpaceBetween>
        )}
        <SpaceStyle top={30}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Security Page")}
          >
            <SpaceBetween styles={{ alignItems: "center", backgroundColor: "#8472F826", padding: 5, paddingHorizontal: 10, borderRadius: 10 }}>
              <Icon
                style={{ width: 22, height: 22 }}
                dark={require("../../../assets/icons/arrow-left.png")}
                light={require("../../../assets/icons/arrow-left.png")}
              />
              <Row styles={{ alignItems: "center", flexDirection: "row" }}>
                <CustomText fontSize={16} style={{ padding: 10 }} right={5}>حریم شخصی</CustomText>
                <Icon
                  style={{ width: 30, height: 30 }}
                  dark={require("../../../assets/icons/shield-security.png")}
                  light={require("../../../assets/icons/shield-security.png")}
                />
              </Row>
            </SpaceBetween>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Download Archive")}
          >
            <SpaceBetween styles={{ alignItems: "center", backgroundColor: "#8472F826", padding: 5, paddingHorizontal: 10, borderRadius: 10, marginTop: 20 }}>
              <Icon
                style={{ width: 22, height: 22 }}
                dark={require("../../../assets/icons/arrow-left.png")}
                light={require("../../../assets/icons/arrow-left.png")}
              />
              <Row styles={{ alignItems: "center", flexDirection: "row" }}>
                <CustomText fontSize={16} style={{ padding: 10 }} right={5}>آرشیو</CustomText>
                <Icon
                  style={{ width: 30, height: 30 }}
                  dark={require("../../../assets/icons/archive-tick.png")}
                  light={require("../../../assets/icons/archive-tick.png")}
                />
              </Row>
            </SpaceBetween>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Gallery")}
          >
            <SpaceBetween styles={{ alignItems: "center", backgroundColor: "#8472F826", padding: 5, paddingHorizontal: 10, borderRadius: 10, marginTop: 20 }}>
              <Icon
                style={{ width: 22, height: 22 }}
                dark={require("../../../assets/icons/arrow-left.png")}
                light={require("../../../assets/icons/arrow-left.png")}
              />
              <Row styles={{ alignItems: "center", flexDirection: "row" }}>
                <CustomText fontSize={16} style={{ padding: 10 }} right={5}>گالری</CustomText>
                <Icon
                  style={{ width: 30, height: 30 }}
                  dark={require("../../../assets/icons/gallery-icons.png")}
                  light={require("../../../assets/icons/gallery-icons.png")}
                />
              </Row>
            </SpaceBetween>
          </TouchableOpacity>
        </SpaceStyle>
      </SpaceStyle >
      <View style={{ flex: 1, position: "relative" }}>
        <TouchableOpacity
          style={{ position: "absolute", left: 20, right: 20, bottom: 10 }}
          onPress={() => showDialog()}
        >
          <SpaceBetween styles={{ alignItems: "center", backgroundColor: "#FF676733", padding: 5, paddingHorizontal: 10, borderRadius: 10 }}>
            <Icon
              style={{ width: 22, height: 22 }}
              dark={require("../../../assets/icons/arrow-left.png")}
              light={require("../../../assets/icons/arrow-left.png")}
            />
            <Row styles={{ alignItems: "center", flexDirection: "row" }}>
              <CustomText fontSize={16} style={{ padding: 10 }} right={5}>خروج از حساب کاربری</CustomText>
              <Icon
                style={{ width: 30, height: 30 }}
                dark={require("../../../assets/icons/logout.png")}
                light={require("../../../assets/icons/logout.png")}
              />
            </Row>
          </SpaceBetween>
        </TouchableOpacity>
      </View>
    </Fragment >
  );
};
export default Menu;

const styles = StyleSheet.create({
  headerBackIconStyle: {
    width: 25,
    height: 25,
    marginRight: -150,
  },
  rightBackIconStyle: {
    width: 25,
    height: 25,
    marginLeft: 30,
  },
})