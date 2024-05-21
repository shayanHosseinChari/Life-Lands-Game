import { useNavigation, useTheme } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { useContext, useEffect, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "../../appsetting/icons";
import { RootContext } from "../../context/RootContext";
import CustomText from "../text/CustomText";
import CustomImage from "../CustomImage/CustomImage";
import SpaceStyle from "../../style/SpaceStyle";
import { Row } from "../../style/uiUtil";

const HeaderComponent = ({
  title,
  darkIcon,
  lightIcon,
  rightSide,
  leftSide,
  hasBack,
  navigation,
  hasLogo = false,
  backTitle,
  iconStyle = {},
  hasSearch = true,
  searchDepartment,
  titleLogo,
  hasRightSearch,
}) => {
  navigation = useNavigation();
  const { colors } = useTheme();
  const { user } = useContext(RootContext);

  const style = StyleSheet.create({
    container: {
      width: "100%",
      height: 65,
      backgroundColor: 'black',
      justifyContent: "space-between",
      alignContent: "space-between",
      flexDirection: "row",
      borderBottomEndRadius: 15,
      alignItems:"center",
      borderBottomStartRadius: 15,
    },
    headerChild: {
      width: "33%",
      justifyContent: "center",
      alignContent: "center",
      alignSelf: "center",
      alignItems: "center",
    },
    center: {
      alignSelf: "center",
    },
    headerTitleStyle: {
      width: 30,
      height: 30,
      marginHorizontal: 20,
      ...iconStyle,
    },
    headerBackIconStyle: {
      width: 25,
      height: 25,
      marginHorizontal: 20,
    },
    logoIconStyle: {
      width: 60,
      height: 60,
      resizeMode: "contain",
    },
    left: {
      alignSelf: "flex-start",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
  });
  return (
    <View style={style.container}>
      <StatusBar hidden={false} />
      <View style={style.headerChild}>
        <View style={style.left}>
          {hasBack ? (
            <TouchableOpacity
              style={{
                height: "100%",
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon
                style={style.headerBackIconStyle}
                dark={require("../../../assets/icons/arrow-left.png")}
                light={require("../../../assets/icons/arrow-left.png")}
              />
            </TouchableOpacity>
          ) : (
            <>
              {user?._id && hasSearch ? (
                <SpaceStyle left={15}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Search Page", { searchDepartment })
                    }
                    style={{ width: 35, height: 35, justifyContent: "center" }}
                  >
                    <Icon
                      dark={require("../../../assets/icons/search.png")}
                      light={require("../../../assets/icons/Light/searchlight2.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </SpaceStyle>
              ) : (
                <>{leftSide}</>
              )}
            </>
          )}
        </View>
      </View>
      <View style={style.headerChild}>
        <View style={style.center}>
          {darkIcon && lightIcon && (
            <>
              <Icon
                style={style.headerTitleStyle}
                dark={darkIcon}
                light={lightIcon}
              />
            </>
          )}
          {title && (
            <CustomText
              selfCenter
              textAlign={"center"}
              style={{
                fontSize: 8,
                marginTop: 2,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {title}
            </CustomText>
          )}
        </View>
      </View>
      <View style={style.headerChild}>
        <View style={style.center}>
          {rightSide ? (
            <>{rightSide}</>
          ) : (
            <>
              {hasRightSearch && (
                <View right={-50} style={{height:"100%",justifyContent:"center"}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Search Page", { searchDepartment })
                    }
                    style={{ width: 35, height: 35, justifyContent: "center" }}
                  >
                    <Icon
                      dark={require("../../../assets/icons/search.png")}
                      light={require("../../../assets/icons/Light/searchlight2.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {hasLogo && (
                <SpaceStyle right={20}>
                  <Row>
                    <CustomText fontSize={14} style={{ color: "white", width: 250, textAlign: "right" }}>{titleLogo}</CustomText>
                    {/* <Icon
                      style={{
                        ...style.logoIconStyle,
                      }}
                      dark={require("../../../assets/LifeText.png")}
                      light={require("../../../assets/lifelands-light.png")}
                    /> */}
                  </Row>
                </SpaceStyle>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default HeaderComponent;