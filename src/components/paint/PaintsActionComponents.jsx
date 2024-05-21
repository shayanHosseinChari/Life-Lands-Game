import { View, StyleSheet } from 'react-native'
import React from 'react'
import SpaceStyle from '../../style/SpaceStyle';
import { SpaceBetween } from '../../style/uiUtil';
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from '../../appsetting/icons';
import CustomText from '../text/CustomText';
import { TouchableOpacity } from 'react-native';

export default function PaintsActionComponents({ navigation }) {
    return (
        <SpaceStyle top={20}>
            <SpaceBetween>
                <TouchableOpacity onPress={() => navigation.navigate("Category Page", { department: "paint" })}>
                    <View style={styles.itemContainer}>
                        <LinearGradient
                            colors={["#FFA822CC", "#FFDC22CC"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ padding: 8, borderRadius: 12 }}
                        >
                            <Icon
                                dark={require("../../../assets/icons/paint-gategory-icon.png")}
                                light={require("../../../assets/icons/paint-gategory-icon.png")}
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
                <TouchableOpacity onPress={() => navigation.navigate("Comments Page", { department: "paint" })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#84337BD4", "#B3258DD4"]}
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
                <TouchableOpacity onPress={() => navigation.navigate("Public Page", { mode: "Paint Viewer", title: "دوره های آموزشی", cid: "1" })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#FFA822CC", "#FFDC22CC"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/paint-amozesh-icon.png")}
                                    light={require("../../../assets/icons/paint-amozesh-icon.png")}
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
                                دوره آموزشی
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Public Page", { mode: "Paint Viewer", title: "همه آثار" })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#84337BD4", "#B3258DD4"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/all-proj-icon.png")}
                                    light={require("../../../assets/icons/all-proj-icon.png")}
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
                                همه آثار
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("My Buttons", { department: "paint", title: 'نقاشی های من' })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#FFA822CC", "#FFDC22CC"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/my-art-icon.png")}
                                    light={require("../../../assets/icons/my-art-icon.png")}
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
                                نقاشی من
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
