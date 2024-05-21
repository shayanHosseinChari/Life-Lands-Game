import { useFonts } from "expo-font";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import SpaceStyle from "../../style/SpaceStyle";
import CustomText from "../text/CustomText";
import { border } from "../../appsetting/styleSetting";
import { Icon } from "../../appsetting/icons";

const CustomInput = (props) => {
  const { colors } = useTheme();
  const [fontsLoaded] = useFonts({
    vaszir: require("../../../assets/vazir.ttf"),
  });
  const style = StyleSheet.create({
    input: {
      backgroundColor: props?.inputBgColor || colors?.inputBgColor,
      borderColor: props?.inputBorderColor || colors?.inputBorderColor,
      fontSize: 12,
      borderRadius: props.border || border,
      paddingHorizontal: 15,
      paddingVertical: 8,
      textAlign: props.align || "right",
      minWidth: props.minWidth || 150,
      maxWidth: props.maxWidth || 150,
      color: colors.paragraph,
      direction: "rtl",
      fontFamily: "vaszir",
    },
    inputContainer: {
      backgroundColor: props?.inputBgColor || colors?.inputBgColor,
      borderColor: props?.inputBorderColor || colors?.inputBorderColor,
      borderRadius: props.border || border,
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "space-between",
      direction: "rtl",
    },
    image: {
      width: 20,
      height: 20,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginLeft: 30,
    },
  });
  return (
    <>
      {fontsLoaded && (
        <View>
          {props.lable && (
            <SpaceStyle right={10} bottom={5}>
              <CustomText>{props.lable}</CustomText>
            </SpaceStyle>
          )}
          <View style={style.inputContainer}>
            {props.lightIcon || props.darkIcon ? (
              <>
                <Icon
                  style={style.image}
                  width={20}
                  height={20}
                  dark={props.darkIcon}
                  light={props.lightIcon}
                />
                <View>
                  <TextInput
                    placeholderTextColor={colors?.placeholderTextColor}
                    {...props}
                    direction={"rtl"}
                    style={style.input}
                    onChangeText={props.changeText}
                  />
                </View>
                
              </>
            ) : (
              <TextInput
                placeholderTextColor={colors?.placeholderTextColor}
                {...props}
                direction={"rtl"}
                style={style.input}
                onChangeText={props.changeText}
              />
            )}
          </View>
        </View>
      )}
    </>
  );
};
export default CustomInput;
