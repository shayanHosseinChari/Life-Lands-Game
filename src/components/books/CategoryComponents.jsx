import { StyleSheet, Text, View } from "react-native";
import CustomText from "../text/CustomText";
import { useTheme } from "@react-navigation/native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import { TouchableOpacity } from "react-native";

const CategoryComponents = ({ navigation, title }) => {
    const { colors } = useTheme();
    return (
        <View style={{ marginBottom: 60, marginTop: 40 }}>
            <SpaceBetween>
                <TouchableOpacity onPress={() => navigation.navigate('Category Page', { department: "book" })}>
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
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Book Post", title: "خلاقیت", cid: "645228ec7022b06d3179070c" })}>
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
                                    خلاقیت
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Book Post", title: "مهارت های زندگی", cid: "645228b67022b06d31790704" })}>
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
                                    مهارت های زندگی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Book Post", title: "ماجراجویی", cid: "6452286b7022b06d317906fd" })}>
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
                                    ماجراجویی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Book Post", title: "بامزه ها", cid: "645229077022b06d31790714" })}>
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
                                    بامزه ها
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Book Post", title: "قصه شب", cid: "645229297022b06d31790718" })}>
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
                                    قصه شب
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

                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Book Post", title: "حیوانات", cid: "64521d9e7022b06d31790658" })}>
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
                                    حیوانات
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Book Post", title: "علمی آموزشی", cid: "645228e07022b06d31790708" })}>
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
                                    علمی آموزشی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Book Post", title: "تخیلی", cid: "645228f97022b06d31790710" })}>
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
                                    تخیلی
                                </CustomText>
                            </View>
                        </TouchableOpacity>
                    </SpaceBetween>
                </SpaceStyle>
            </View>
        </View>
    );
};
export default CategoryComponents;

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
