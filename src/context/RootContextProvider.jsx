import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { getValueFor } from "../appsetting/storeConfig";
import { OpenToast } from "../components/share/OpenToast";
import CustomText from "../components/text/CustomText";
import useForceUpdate from "../database/useForceUpdate";
import { getProfileService } from "../service/UserService";
import SpaceStyle from "../style/SpaceStyle";
import { CenterStyled } from "../style/uiUtil";
import { RootContext } from "./RootContext";
import { io } from "socket.io-client";
import { NotifcationStore } from "../Store/NotifcationSotre";
import { useNavigation } from "@react-navigation/core";
// import { useNavigation } from "@react-navigation/native";

const RootContextProvider = ({ children }) => {
 
  const [user, setUser] = useState({});
  // const navigationRoute = useNavigation() 
  const [reloadUser, setReloadUser] = useState();
  const [pageBottomBar, setPageBottomBar] = useState("");
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [reload, setReload] = useState();
  const [sound, setSound] = React.useState();
  const [isFileDownloading, setIsFileDownloading] = useState(false);
  const [postData, setPostData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [wasChangedTheme, setWasChangedTheme] = useState();
  const [isShowNotifcation,setIsSowNotifcation] = useState(false)
  const [notifcations,setNotifcations] = useState([])
  const [showBell,setIsShowBell] = useState(false)
  useEffect(() => {
    getUserData();
  }, [reloadUser, getValueFor()]);
  var mainSocket = undefined
 
  const onDownload = (post, department, onDownloadAction) => {
      OpenToast(
        "خطا رخ داد",
        "این مورد فعلا در دسترس نمیباشد"
      );
    }
    
    
  

  const getUserData = async () => {
    setTimeout(async () => {
      const {
        data: { data: userRes },
      } = await getProfileService();
      setUser(userRes);
    }, 2000);
  };

  return (
    <RootContext.Provider
      value={{
        onDownload,
        wasChangedTheme,
        setWasChangedTheme,
        reload,
        setReload,
        user,
        setReloadUser,
        pageBottomBar,
        isShowNotifcation,
        setIsSowNotifcation,
        setPageBottomBar,
        isLoading,
        setIsLoading,
        notifcations,
        setNotifcations,
        setIsShowBell,
        showBell
      }}
    >
      {children}
      {isFileDownloading && (
        <View style={{display:'none'}}>
          <CenterStyled>
            <SpaceStyle top={8} bottom={8}>
              <CustomText>در حال دانلود {postData?.title}...</CustomText>
            </SpaceStyle>
          </CenterStyled>
        </View>
      )}
    </RootContext.Provider>
  );
};
export default RootContextProvider;
