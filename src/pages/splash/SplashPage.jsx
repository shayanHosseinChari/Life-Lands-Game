import { useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { Icon } from "../../appsetting/icons";
import { getTheme, getValueForTheme, setTheme } from "../../appsetting/storeConfig";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomText from "../../components/text/CustomText";
import { RootContext } from "../../context/RootContext";
import SpaceStyle from "../../style/SpaceStyle";
import { CenterStyled, Row } from "../../style/uiUtil";

// import { Constants } from "expo";
// import ScrollingBackground from "react-native-scrolling-images";
const SplashPage = () => {
  const [color, setColor] = useState();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const { wasChangedTheme, setWasChangedTheme } = useContext(RootContext);

  useEffect(() => {
    setTheme("dark");
    setWasChangedTheme(Date.now());
  }, [])

  const theme = getValueForTheme();
  useEffect(() => {
    setColorSetting();
  }, [wasChangedTheme]);
  const setColorSetting = async () => {
    setColor({
      text: (await getTheme()) === "dark" ? "#dbd7d8" : "#121211",
      primary: (await getTheme()) === "dark" ? "#ae4a54" : "#ae4a54",
    });
  };
  return (
    <View
      style={{
        width: windowWidth,
        height: Dimensions.get('window').height,
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          style={{
            width: windowWidth,
            height: windowHeight,
            display: "flex",
            alignItems: "center",
          }}
          resizeMode={"cover"}
          source={
            theme === "dark"
              ? require("../../../assets/bg-dark.gif")
              : require("../../../assets/bg.gif")
          }
        >
          {/* <Image source={require("../../../assets/comlogo.png")} /> */}
          <Icon
            style={{
              marginTop: 80,
              width: 200,
              height: 200,
            }}
            dark={require("../../../assets/comlogo.png")}
            light={require("../../../assets/lightlogo.png")}
          />
          <Icon
            style={{
              height: 40,
              resizeMode: "contain",
            }}
            dark={require("../../../assets/lifelands-dark.png")}
            light={require("../../../assets/lifelands-light.png")}
          />
        </ImageBackground>
      </View>
      {color && (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
          }}
        >
          <SpaceStyle bottom={-20}>
            <CenterStyled>
              <Row>
                <CustomText
                  style={{
                    alignSelf: "center",
                    fontSize: 12,
                  }}
                  color={color.text}
                >
                  powered by{" "}
                  {/* <CustomText
              style={{
                fontSize: 14,
              }}
              color={color.primary}
            >
              wGames
            </CustomText> */}
                </CustomText>
                <Icon
                  style={{
                    width: 50,
                    resizeMode: "contain",
                    marginTop: -10,
                  }}
                  dark={require("../../../assets/wgames.png")}
                  light={require("../../../assets/wgames.png")}
                />
              </Row>
            </CenterStyled>
          </SpaceStyle>

          <CustomText
            style={{
              alignSelf: "center",
              fontSize: 12,
            }}
            color={color.text}
          >
            version 1.0.0
          </CustomText>
        </View>
      )}
    </View>
    // <Image
    //   source={require("../../../assets/bg.jpg")}
    //   height={windowHeight}
    //   width={windowWidth + 1000}
    //   style={{
    //     height: windowHeight,
    //     width: windowWidth + 400,
    //   }}
    // />
  );
};
export default SplashPage;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  scrollingBackground: {
    backgroundColor: "#0B7483",
  },
});
{
  /* <ImageBackground
        style={{
          width: windowWidth,
          height: windowHeight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        source={require("../../../assets/bg.jpg")}
      >
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={require("../../../assets/iconapp.png")}
        />
      </ImageBackground> */
}
