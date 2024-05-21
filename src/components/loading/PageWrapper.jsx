import { useEffect, useState } from "react";
import {
  Dimensions,
  Linking,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { CenterStyled } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import axios from "axios";
import { I18nManager } from "react-native";
import CustomButton from "../CustomButton/CustomButton";

I18nManager.allowRTL(false);
const PageWrapper = ({ children, isLoadingState, onRefresh }) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(isLoadingState);
  const [isNetConnect, setIsNetConnect] = useState(true);
  const style = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
     
      alignSelf: "center",
    },
    flex: {
      flex: 1,
    },
    column: {
      flexDirection: "column",
      marginTop: -150,
    },
  });
  useEffect(() => {
    setIsLoading(isLoadingState);
  }, [isLoadingState]);
  useEffect(() => {
    checkNet();
  }, []);
  const checkNet = async () => {
    try {
      await axios.get("https://lifelands.ir/api/");
      setIsNetConnect(true);
    } catch (error) {
      setIsNetConnect(false);
    }
  };
  return (
    <>
      {onRefresh ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        showsVerticalScrollIndicator={false}>
          <StatusBar hidden={true} />
          <View style={style.flex}>
            {/* <CustomText>isNetConnext : {isNetConnext ? "yes" : "no"}</CustomText> */}
            {isLoading ? (
              <View style={style.container}>
                <CenterStyled>
                  <View style={style.column}>
                    <CustomText
                      style={{ fontSize: 20 }}
                      color={colors?.titleColor}
                    >
                      در حال بارگیری...
                    </CustomText>
                    <CustomText
                      style={{
                        alignSelf: "center",
                        marginTop: 5,
                      }}
                      color={colors?.lightTextColor}
                    >
                      لطفا منتظر باشید
                    </CustomText>
                    {!isNetConnect && (
                      <>
                        <CustomText
                          style={{
                            alignSelf: "center",
                            marginTop: 5,
                            color: colors.primary,
                          }}
                        >
                          اینترنت متصل نمیباشد!
                        </CustomText>
                        {onRefresh && (
                          <View>
                            <CustomButton onClick={onRefresh}>
                              تلاش مجدد
                            </CustomButton>
                          </View>
                        )}
                      </>
                    )}
                  </View>
                </CenterStyled>
              </View>
            ) : (
              <>{children}</>
            )}
          </View>
        </ScrollView>
      ) : (
        <>
          <View style={style.flex}>
            <StatusBar hidden={true} />

            {/* <CustomText>isNetConnext : {isNetConnext ? "yes" : "no"}</CustomText> */}
            {isLoading ? (
              <View style={style.container}>
                <CenterStyled>
                  <View style={style.column}>
                    <CustomText
                      style={{ fontSize: 20 }}
                      color={colors?.titleColor}
                    >
                      در حال بارگیری...
                    </CustomText>
                    <CustomText
                      style={{
                        alignSelf: "center",
                        marginTop: 5,
                      }}
                      color={colors?.lightTextColor}
                    >
                      لطفا منتظر باشید
                    </CustomText>
                    {!isNetConnect && (
                      <CustomText
                        style={{
                          alignSelf: "center",
                          marginTop: 5,
                          color: colors.primary,
                        }}
                      >
                        اینترنت متصل نمیباشد!
                      </CustomText>
                    )}
                  </View>
                </CenterStyled>
              </View>
            ) : (
              <>{children}</>
            )}
          </View>
        </>
      )}
    </>
  );
};
export default PageWrapper;
