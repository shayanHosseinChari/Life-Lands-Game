import { View, StyleSheet } from 'react-native'
import React from 'react'
import SpaceStyle from '../../style/SpaceStyle';
import { SpaceBetween } from '../../style/uiUtil';
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from '../../appsetting/icons';
import CustomText from '../text/CustomText';
import { TouchableOpacity } from 'react-native';

export default function RadioActionComponent({ navigation }) {
    return (
        <SpaceStyle top={20}>
            <SpaceBetween>
                <TouchableOpacity onPress={() => navigation.navigate("Category Page", { department: "voice" })}>
                    <View style={styles.itemContainer}>
                        <LinearGradient
                            colors={["#388EA1D4", "#79E5FCD4"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ padding: 8, borderRadius: 12 }}
                        >
                            <Icon
                                dark={require("../../../assets/icons/Radio-Player-icon.png")}
                                light={require("../../../assets/icons/Radio-Player-icon.png")}
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
                <TouchableOpacity onPress={() => navigation.navigate("Comments Page", { department: "voice" })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#FF9153E5", "#CC7442E5"]}
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
                <TouchableOpacity onPress={() => navigation.navigate("Public Page", { mode: "voice post", title: "ترانه کودکان", cid: '645b52915f4f96c2a1fa1c39' })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#388EA1D4", "#79E5FCD4"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/Radio-Music-Icon.png")}
                                    light={require("../../../assets/icons/Radio-Music-Icon.png")}
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
                                ترانه کودکان
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Public Page", { mode: "voice post", title: "قصه شب", cid: '645b510c5f4f96c2a1fa1c11' })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#FF9153E5", "#CC7442E5"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/Radio-Moon-Icon.png")}
                                    light={require("../../../assets/icons/Radio-Moon-Icon.png")}
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
                                قصه شب
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("My Buttons", { department: "voice", title: 'صدا های من' })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#388EA1D4", "#79E5FCD4"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/Radio-Radio-Icon.png")}
                                    light={require("../../../assets/icons/Radio-Radio-Icon.png")}
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
                                رادیوی من
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
            </SpaceBetween>
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
