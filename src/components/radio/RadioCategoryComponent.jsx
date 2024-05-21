import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import CustomText from "../text/CustomText";
import { useTheme } from "@react-navigation/native";
import { lightPinkColor } from "../../appsetting/appsettingColor";
import { CenterStyled, Row, SpaceBetween } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import { TouchableOpacity } from "react-native";

const RadioCategoryComponent = ({ navigation, title }) => {
    const { colors } = useTheme();
    return (
        <View style={{ marginBottom: 60, marginTop: 40 }}>
            <SpaceBetween>
                <SpaceStyle left={10} bottom={10}>
                    <Row>
                        <Icon
                            dark={require("../../../assets/icons/arrow-left.png")}
                            light={require("../../../assets/icons/arrow-left.png")}
                            style={{ width: 16, height: 16, marginTop: 5 }}
                        />
                        <CustomText fontSize={14} selfCenter>
                            بیشتر
                        </CustomText>
                    </Row>
                </SpaceStyle>
                <SpaceStyle right={10} bottom={0}>
                    <CustomText fontSize={14}>{title}</CustomText>
                </SpaceStyle>
            </SpaceBetween>
            <View style={styles.innerContainer}>
                <SpaceStyle top={7}>
                    <SpaceBetween>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.itemContainer}>
                                <View
                                    style={styles.itemSubContainer}
                                >
                                    <Icon
                                        dark={require("../../../assets/icons/list-right.png")}
                                        light={require("../../../assets/icons/list-right.png")}
                                        style={{ width: 35, height: 35, alignSelf: "center" }}
                                    />
                                </View>
                                <CustomText
                                    fontSize={11}
                                    style={{ textAlign: "center" }}
                                    top={5}
                                    selfCenter
                                    lines={2}
                                >
                                    کلمات و
                                    دانستنی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.itemContainer}>
                                <View
                                    style={styles.itemSubContainer}
                                >
                                    <Icon
                                        dark={require("../../../assets/icons/sport-car.png")}
                                        light={require("../../../assets/icons/sport-car.png")}
                                        style={{ width: 35, height: 35, alignSelf: "center" }}
                                    />
                                </View>
                                <CustomText
                                    fontSize={11}
                                    style={{ textAlign: "center" }}
                                    top={5}
                                    selfCenter
                                    lines={2}
                                >
                                    رانندگی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.itemContainer}>
                                <View
                                    style={styles.itemSubContainer}
                                >
                                    <Icon
                                        dark={require("../../../assets/icons/sport.png")}
                                        light={require("../../../assets/icons/sport.png")}
                                        style={{ width: 35, height: 35, alignSelf: "center" }}
                                    />
                                </View>
                                <CustomText
                                    fontSize={11}
                                    style={{ textAlign: "center" }}
                                    top={5}
                                    selfCenter
                                    lines={2}
                                >
                                    ورزشی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.itemContainer}>
                                <View
                                    style={styles.itemSubContainer}
                                >
                                    <Icon
                                        dark={require("../../../assets/icons/adventure-burn.png")}
                                        light={require("../../../assets/icons/adventure-burn.png")}
                                        style={{ width: 35, height: 35, alignSelf: "center" }}
                                    />
                                </View>
                                <CustomText
                                    fontSize={11}
                                    style={{ textAlign: "center" }}
                                    top={5}
                                    selfCenter
                                    lines={2}
                                >
                                    ماجراجویی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.itemContainer}>
                                <View
                                    style={styles.itemSubContainer}
                                >
                                    <Icon
                                        dark={require("../../../assets/icons/baby-boy-pacifier.png")}
                                        light={require("../../../assets/icons/baby-boy-pacifier.png")}
                                        style={{ width: 35, height: 35, alignSelf: "center" }}
                                    />
                                </View>
                                <CustomText
                                    fontSize={11}
                                    style={{ textAlign: "center" }}
                                    top={5}
                                    selfCenter
                                    lines={2}
                                >
                                    کودک
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                    </SpaceBetween>
                </SpaceStyle>
                <SpaceStyle top={40}>
                    <SpaceBetween>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.itemContainer}>
                                <View
                                    style={styles.itemSubContainer}
                                >
                                    <Icon
                                        dark={require("../../../assets/icons/magnifier-glass.png")}
                                        light={require("../../../assets/icons/magnifier-glass.png")}
                                        style={{ width: 35, height: 35, alignSelf: "center" }}
                                    />
                                </View>
                                <CustomText
                                    fontSize={11}
                                    style={{ textAlign: "center" }}
                                    top={5}
                                    selfCenter
                                    lines={2}
                                >
                                    معمایی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.itemContainer}>
                                <View
                                    style={styles.itemSubContainer}
                                >
                                    <Icon
                                        dark={require("../../../assets/icons/strategy-svgrepo.png")}
                                        light={require("../../../assets/icons/strategy-svgrepo.png")}
                                        style={{ width: 35, height: 35, alignSelf: "center" }}
                                    />
                                </View>
                                <CustomText
                                    fontSize={11}
                                    style={{ textAlign: "center" }}
                                    top={5}
                                    selfCenter
                                    lines={2}
                                >
                                    استراتژی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.itemContainer}>
                                <View
                                    style={styles.itemSubContainer}
                                >
                                    <Icon
                                        dark={require("../../../assets/icons/tic-tac-toe.png")}
                                        light={require("../../../assets/icons/tic-tac-toe.png")}
                                        style={{ width: 35, height: 35, alignSelf: "center" }}
                                    />
                                </View>
                                <CustomText
                                    fontSize={11}
                                    style={{ textAlign: "center" }}
                                    top={5}
                                    selfCenter
                                    lines={2}
                                >
                                    تفننی
                                </CustomText>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.itemContainer}>
                                <View
                                    style={styles.itemSubContainer}
                                >
                                    <Icon
                                        dark={require("../../../assets/icons/hundredpointssymbol.png")}
                                        light={require("../../../assets/icons/hundredpointssymbol.png")}
                                        style={{ width: 35, height: 35, alignSelf: "center" }}
                                    />
                                </View>
                                <CustomText
                                    fontSize={11}
                                    style={{ textAlign: "center" }}
                                    top={5}
                                    selfCenter
                                    lines={2}
                                >
                                    امتیازی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.itemContainer}>
                                <View
                                    style={styles.itemSubContainer}
                                >
                                    <Icon
                                        dark={require("../../../assets/icons/gun.png")}
                                        light={require("../../../assets/icons/gun.png")}
                                        style={{ width: 35, height: 35, alignSelf: "center" }}
                                    />
                                </View>
                                <CustomText
                                    fontSize={11}
                                    style={{ textAlign: "center" }}
                                    top={5}
                                    selfCenter
                                    lines={2}
                                >
                                    اکشن
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                    </SpaceBetween>
                </SpaceStyle>
            </View>
        </View>
    );
};
export default RadioCategoryComponent;
const styles = StyleSheet.create({
    innerContainer: {
        borderRadius: 8,
        flex: 1,
        margin: 2,
        backgroundColor: "#17181A",
        padding: 8,
        zIndex: 1,
    },
    itemContainer: {
        width: 60,
        height: 60,
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",
        textAlign: "center",
    },
    itemSubContainer: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: "rgba(185, 238, 255, 0.10)"
    }
});
