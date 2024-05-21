import { Fragment, useContext, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DownloadVideoTab from "./DownloadVideoTab";
import CustomText from "../../components/text/CustomText";
import { opacityDarkColor } from "../../appsetting/appsettingColor";
import DownloadVoiceTab from "./DownloadVoiceTab";
import DownloadBookTab from "./DownloadBookTab";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { RootContext } from "../../context/RootContext";
import HeaderComponent from "../../components/layout/HeaderComponent";
import DownloadGameTab from "./DownloadGameTab";

const Tab = createMaterialTopTabNavigator();

const DownloadsPageRoot = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Fragment>
      <HeaderComponent
        hasBack={true}
        navigation={navigation}
        title={"آرشیو"}
        darkIcon={require("../../../assets/icons/archive-profile.png")}
        lightIcon={require("../../../assets/icons/Light/archive-profile.png")}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 2,
          },
          tabBarStyle: {
            backgroundColor: colors.background,
          },
          tabBarLabelStyle: {
            fontFamily: "vaszir",
            color: colors.titleColor,
          },
          tabBarIndicatorStyle: {
            height: 2,
            backgroundColor: colors.primary,
            opacity: 0.5,
          },
        }}
      >
        <Tab.Screen name="ویدیو" component={DownloadVideoTab} />
        <Tab.Screen name="صدا" component={DownloadVoiceTab} />
        <Tab.Screen name="کتاب" component={DownloadBookTab} />
        <Tab.Screen name="بازی" component={DownloadGameTab} />
      </Tab.Navigator>
    </Fragment>
  );
};
export default DownloadsPageRoot;
