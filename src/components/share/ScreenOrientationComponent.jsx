import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useState } from "react";
const ScreenOrientationComponent = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const chnageOrientation = async () => {
    if (isLandscape) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setIsLandscape(false);
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
      setIsLandscape(true);
    }
  };
  return (
    <TouchableOpacity onPress={chnageOrientation}>
      <Image
        source={require("../../../assets/icons/orientation.png")}
        style={{ width: 20, height: 20, marginHorizontal: 20 }}
      />
    </TouchableOpacity>
  );
};
export default ScreenOrientationComponent;
