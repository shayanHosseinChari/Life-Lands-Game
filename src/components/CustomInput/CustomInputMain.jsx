import { useFonts } from "expo-font";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import SpaceStyle from "../../style/SpaceStyle";
import CustomText from "../text/CustomText";
import { border } from "../../appsetting/styleSetting";
import { Icon } from "../../appsetting/icons";

const CustomInputMain = (props) => {
    const { colors } = useTheme();
    const [fontsLoaded] = useFonts({
        vaszir: require("../../../assets/vazir.ttf"),
    });
    const style = StyleSheet.create({
        input: {
            borderColor: props?.inputBorderColor || colors?.inputBorderColor,
            fontSize: 14,
            paddingHorizontal: 10,
            paddingVertical: 10,
            width: "100%",
            textAlign: props.align || "right",
            color: colors.paragraph,
            direction: "rtl",
            fontFamily: "vaszir",
        },
        inputContainer: {
            backgroundColor: "transparent",
            borderColor: "#938F99",
            borderRadius: 5,
            width: "100%",
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "space-between",
            direction: "rtl",
            position: "relative",
            zIndex: -1
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
                <View style={{ width: "100%", padding: 5,paddingHorizontal:15, position: "relative" }}>
                    {props.lable && (

                        <CustomText style={{ position: "relative", top: 10, right: 10, backgroundColor: "#282828", Zindex: 10 }} fontSize={12}>{props.lable}</CustomText>

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
                                    />
                                </View>
                            </>
                        ) : (
                            <TextInput
                                placeholderTextColor={colors?.placeholderTextColor}
                                {...props}
                                direction={"rtl"}
                                style={style.input}
                            />
                        )}
                    </View>
                </View>
            )}
        </>
    );
};
export default CustomInputMain;
