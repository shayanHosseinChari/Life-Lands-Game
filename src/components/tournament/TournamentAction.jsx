import { View, StyleSheet } from 'react-native'
import React from 'react'
import SpaceStyle from '../../style/SpaceStyle';
import { SpaceAround, SpaceBetween } from '../../style/uiUtil';
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from '../../appsetting/icons';
import CustomText from '../text/CustomText';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TournamentAction() {
    const navigation = useNavigation()

    return (
        <SpaceStyle top={20}>
            <SpaceAround>
                <TouchableOpacity onPress={() => navigation.navigate("Comments Page", { department: "game" })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#B539E1", "#39BECD"]}
                                start={{ x: .1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ padding: 8, borderRadius: 55555 }}
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
                <TouchableOpacity onPress={() => navigation.navigate("Games Post")}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#B539E1", "#39BECD"]}
                                start={{ x: .1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ padding: 8, borderRadius: 55555 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/gameicon.png")}
                                    light={require("../../../assets/icons/gameicon.png")}
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
                                بازی ها
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Game Selection Page")}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#B539E1", "#39BECD"]}
                                start={{ x: .1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ padding: 8, borderRadius: 55555 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/doubleCard-icon.png")}
                                    light={require("../../../assets/icons/doubleCard-icon.png")}
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
                                شروع رقابت
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("My Buttons", { department: "paint", title: 'نقاشی های من' })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#B539E1", "#39BECD"]}
                                start={{ x: .1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ padding: 8, borderRadius: 55555 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/tornomentIcon.png")}
                                    light={require("../../../assets/icons/tornomentIcon.png")}
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
                              رقابت های من
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
            </SpaceAround>
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
