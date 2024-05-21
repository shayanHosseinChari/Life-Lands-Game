import { CommonActions } from "@react-navigation/native";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import CustomButton from "../../components/CustomButton/CustomButton";
import { NavigationActions } from "react-navigation";

const GameOne = ({ navigation }) => {
  const handleBackButtonClick = () => {
    navigation.reset({
      routes: [{ name: "Home" }, { name: "GameOne" }],
    });
  };
  return (
    <>
      <CustomButton onClick={handleBackButtonClick}>Back</CustomButton>
      <WebView
        javaScriptEnabled
        originWhitelist={["*"]}
        cacheEnabled={true}
        source={{
          uri: `https://divar.ir/s/abadan`,
        }}
      />
    </>
  );
};
export default GameOne;
