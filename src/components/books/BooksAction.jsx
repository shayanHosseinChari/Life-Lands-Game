import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import SpaceStyle from '../../style/SpaceStyle';
import { SpaceBetween } from '../../style/uiUtil';
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from '../../appsetting/icons';
import CustomText from '../text/CustomText';
import { OpenToast } from '../share/OpenToast';

export default function BooksAction({ navigation }) {
    return (
        <SpaceStyle top={20}>  
            <View style={{flexDirection:'row',alignItems:"center",justifyContent:'space-around'}}>
                <TouchableOpacity onPress={() => navigation.navigate("Category Page", { department: "book" })}>
                    <View style={styles.itemContainer}>
                        <LinearGradient
                            colors={["#B3FFABB2", "#12FFF7B2"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ padding: 8, borderRadius: 12 }}
                        >
                            <Icon
                                dark={require("../../../assets/icons/categoryBook.png")}
                                light={require("../../../assets/icons/categoryBook.png")}
                                style={{ width: 45, height: 45, alignSelf: "center" }}
                            />
                        </LinearGradient>
                        <CustomText
                            fontSize={11}
                            style={{ textAlign: "center", whiteSpace: "nowrap" }}
                            top={5}
                            selfCenter
                            lines={2}
                        >
                            دسته بندی
                        </CustomText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Comments Page", { department: "book" })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#F6D365D4", "#FDA085D4"]}
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
                <TouchableOpacity onPress={() => navigation.navigate("Public Page", { mode: `Book Post`, title: "کتاب انگلیسی", cid: "65c3c946f02c4f6f61357c58" })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#B3FFABB2", "#12FFF7B2"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/english-books-icon.png")}
                                    light={require("../../../assets/icons/english-books-icon.png")}
                                    style={{ width: 45, height: 45, alignSelf: "center" }}
                                />
                            </LinearGradient>
                            <CustomText
                                fontSize={11}
                                style={{ textAlign: "center", whiteSpace: "nowrap" }}
                                top={5}
                                selfCenter
                                lines={2}
                            >
                                کتاب انگلیسی
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    OpenToast("اعلان","متاسفانه این مورد فعلا در دسترس نیست","success")
                }}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#F6D365D4", "#FDA085D4"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/manga.png")}
                                    light={require("../../../assets/icons/manga.png")}
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
                                مانگا
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("My Buttons", { department: "book", title: 'کتابخانه من' })}>
                    <View style={styles.itemContainer}>
                        <View>
                            <LinearGradient
                                colors={["#B3FFABB2", "#12FFF7B2"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 8, borderRadius: 12 }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/action-book-icon.png")}
                                    light={require("../../../assets/icons/action-book-icon.png")}
                                    style={{ width: 45, height: 45, alignSelf: "center" }}
                                />
                            </LinearGradient>
                            <CustomText
                                selfCenter
                                fontSize={11}
                                top={5}
                                style={{ textAlign: "center", whiteSpace: "nowrap" }}
                                lines={2}
                            >
                                کتابخانه من
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
