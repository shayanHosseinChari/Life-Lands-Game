import { WebView } from "react-native-webview";
import { LOAD_FILE, LOAD_WEBGL } from "../../service/APIs";
import HeaderComponent from "../../components/layout/HeaderComponent";
import { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { Icon } from "../../appsetting/icons";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../../components/text/CustomText";
import { getToken, getValueFor } from "../../appsetting/storeConfig";
import { addRunCountService } from "../../service/PostService";
const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;

const WebFileViewer = (navigation) => {
  let { uri, title, isLandscape, gameId, token } = navigation.route.params;
  console.log(`${uri}`);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    addRunCount();
  }, []);
  const addRunCount = async () => {
    if (gameId) await addRunCountService(gameId);
  };
  useEffect(() => {
    setData();
    if (isLandscape) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    }
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    setTimeout(async () => {
      console.log({
        uri,
      });
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      setDataBeforBack();
    };
  }, []);
  const setDataBeforBack = async () => {
    if (isLandscape) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  const setData = async () => {
    console.log(await getValueFor());
  };
  return (
    <>
      {/* <TouchableOpacity
        onPress={() => navigation.navigation.goBack()}
        style={{
          position: "absolute",
          top: 30,
          left: 10,
          zIndex: 10,
          width: 30,
          height: 30,
        }}
      >
        <Icon
          style={{
            width: 20,
            height: 20,
            alignSelf: "center",
            alignItems: "center",
          }}
          dark={require("../../../assets/icons/close.png")}
          light={require("../../../assets/icons/close.png")}
        />
      </TouchableOpacity> */}

      {isLoaded && token && (
        <>
          <WebView
            javaScriptEnabled
            originWhitelist={["*"]}
            cacheEnabled={true}
            source={{
              uri,
            }}
          />
        </>
      )}
    </>
  );
};
export default WebFileViewer;
