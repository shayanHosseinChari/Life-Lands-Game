import { StyleSheet, View } from "react-native";
import CustomText from "../text/CustomText";
import { useTheme } from "@react-navigation/native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import { TouchableOpacity } from "react-native";

const WGamesCategoryComponent = ({ navigation, title }) => {
    const { colors } = useTheme();
    return (
        <View style={{ marginBottom: 100 }}>
            <SpaceBetween>
                <TouchableOpacity onPress={() => navigation.navigate('Category Page', { department: "game" })}>
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
                </TouchableOpacity>
                <SpaceStyle right={10} bottom={0}>
                    <CustomText fontSize={14}>{title}</CustomText>
                </SpaceStyle>
            </SpaceBetween>
            <View style={styles.innerContainer}>
                <SpaceStyle top={7}>
                    <SpaceBetween>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Game Post", title: "معمایی", cid: "645eb6fc0a3ba9170a53ee34" })}>
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
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Game Post", title: "هیجانی", cid: "645eb71e0a3ba9170a53ee39" })}>
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
                                    هیجانی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Game Post", title: "امتیازی", cid: "6469c34feeed3587b9866e5c" })}>
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
                                    امتیازی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Game Post", title: "تفننی", cid: "6469c359eeed3587b9866e63" })}>
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
                                    تفننی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Game Post", title: "بقا", cid: "645eb72d0a3ba9170a53ee3e" })}>
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
                                    بقا
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                    </SpaceBetween>
                </SpaceStyle>
                <SpaceStyle top={40}>
                    <SpaceBetween>
                        {/* بعدا تکمیل شود */}
                        <TouchableOpacity style={{ opacity: 0 }} onPress={() => { }}>
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
                                    ورزشی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ opacity: 0 }} onPress={() => { }}>
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
                                    ورزشی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        {/* بعدا تکمیل شود */}

                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Game Post", title: "استراتژی", cid: "6469c334eeed3587b9866e52" })}>
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
                                    استراتژی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Game Post", title: "اکشن", cid: "6469c341eeed3587b9866e57" })}>
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
                                    اکشن
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Game Post", title: "ورزشی", cid: "649049b78851f4989664f0de" })}>
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
                                    ورزشی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                    </SpaceBetween>
                </SpaceStyle>
            </View>
        </View>
    );
};
export default WGamesCategoryComponent;
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
