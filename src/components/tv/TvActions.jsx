import { View, StyleSheet } from 'react-native'
import React from 'react'
import SpaceStyle from '../../style/SpaceStyle';
import { SpaceBetween } from '../../style/uiUtil';
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from '../../appsetting/icons';
import CustomText from '../text/CustomText';
import { TouchableOpacity } from 'react-native';

export default function TvActions({ navigation }) {
    return (
        <SpaceStyle top={20}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                <TouchableOpacity onPress={() => navigation.navigate("Category Page", { department: "video" })}>
                    <View style={styles.itemContainer}>
                        <LinearGradient
                            colors={["rgba(132, 51, 123, 0.83)", "rgba(179, 37, 141, 0.83)"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ padding: 8, borderRadius: 12 }}
                        >
                            <Icon
                                dark={require("../../../assets/icons/category-icon2.png")}
                                light={require("../../../assets/icons/category-icon2.png")}
                                style={{ width: 45, height: 45, alignSelf: "center" }}
                            />
                        </LinearGradient>
                        <CustomText
                            fontSize={11}
                            style={{ textAlign: "center" }}
                            top={5}
                            selfCenter
                            lines={2}
                        >
                            دسته بندی
                        </CustomText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Comments Page", { department: "video" })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["rgba(132, 51, 123, 0.83)", "rgba(179, 37, 141, 0.83)"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/comments-icon.png")}
                                    light={require("../../../assets/icons/comments-icon.png")}
                                    style={{ width: 45, height: 45, alignSelf: "center" }}
                                />
                            </LinearGradient>
                            <CustomText lines={2} selfCenter fontSize={11} top={5}>
                                نظرات
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Public Page", { mode: `Video Post`, title: "انیمیشن های سریالی", cid: "645f821bd610ebea7bc3aaee" })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["rgba(132, 51, 123, 0.83)", "rgba(179, 37, 141, 0.83)"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/serial-icon.png")}
                                    light={require("../../../assets/icons/serial-icon.png")}
                                    style={{ width: 45, height: 45, alignSelf: "center" }}
                                />
                            </LinearGradient>
                            <CustomText
                                fontSize={11}
                                style={{ textAlign: "center" }}
                                top={5}
                                selfCenter
                                lines={2}
                            >
                                سریال
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Public Page", { mode: `Video Post`, title: "انیمه", cid: "65a94c73fd64ad4148364be3" })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["rgba(132, 51, 123, 0.83)", "rgba(179, 37, 141, 0.83)"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/animate-icon.png")}
                                    light={require("../../../assets/icons/animate-icon.png")}
                                    style={{ width: 45, height: 45, alignSelf: "center" }}
                                />
                            </LinearGradient>
                            <CustomText
                                selfCenter
                                fontSize={11}
                                top={5}
                                style={{ textAlign: "center" }}
                                lines={2}
                            >
                                انیمه
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("My Buttons", { department: "video", title: 'ویدیو های من' })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["rgba(132, 51, 123, 0.83)", "rgba(179, 37, 141, 0.83)"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/my-video-icon.png")}
                                    light={require("../../../assets/icons/my-video-icon.png")}
                                    style={{ width: 45, height: 45, alignSelf: "center" }}
                                />
                            </LinearGradient>
                            <CustomText
                                selfCenter
                                fontSize={11}
                                top={5}
                                style={{ textAlign: "center" }}
                                lines={2}
                            >
                                ویدیو من
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </SpaceStyle>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
        width: 65,
        heigh5: 80,
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",
        textAlign: "center",
    },
});
