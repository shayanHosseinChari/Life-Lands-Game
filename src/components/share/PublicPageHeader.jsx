import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { navbarColor } from "../../appsetting/appsettingColor";
import { CenterStyled, Row, SpaceAround } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../text/CustomText";
import { useEffect, useState } from "react";

const PublicPageHeader = ({ icons = true, title, department, filterData }) => {
    const navigate = useNavigation()
    const [searchBoxShow, setSearchBoxShow] = useState(false)
    const [inputOnChange, setInputOnChange] = useState("")
    useEffect(() => {
        filterData(inputOnChange)
    }, [inputOnChange])
    return (
        <View style={styles.container}>
            <SpaceAround>
                <Row>
                    {icons && !searchBoxShow && (
                        <TouchableOpacity onPress={() => navigate.pop()}>
                            <Icon
                                dark={require("../../../assets/icons/arrow-left.png")}
                                light={require("../../../assets/icons/arrow-left.png")}
                                style={{ width: 24, height: 24 }}
                            />
                        </TouchableOpacity>
                    )}
                    {icons && (
                        <TouchableOpacity onPress={() => setSearchBoxShow(!searchBoxShow)}>
                            {searchBoxShow ? (
                                <Icon
                                    dark={require("../../../assets/icons/close.png")}
                                    light={require("../../../assets/icons/close.png")}
                                    style={{ width: 16, height: 16, marginLeft: 17, marginTop: 12 }}
                                />
                            ) : (
                                <Icon
                                    dark={require("../../../assets/icons/search.png")}
                                    light={require("../../../assets/icons/search.png")}
                                    style={{ width: 20, height: 20, marginLeft: 17, marginTop: 2 }}
                                />
                            )}
                        </TouchableOpacity>
                    )}
                </Row>
                {searchBoxShow && (
                    <>
                        <TextInput
                            onChangeText={(e) => setInputOnChange(e)}
                            placeholderTextColor="#FFF"
                            placeholder="جستجو"
                            direction="rtl"
                            style={{ width: "75%", borderWidth: 1, borderColor: "#fff", borderRadius: 10, padding: 5, paddingHorizontal:10, color: "#fff", fontFamily: "vaszir", direction: "rtl" }}
                        />
                    </>
                )}
                {!searchBoxShow && (
                    <>
                        <CenterStyled minus={icons ? 200 : null}>
                            <CustomText fontSize={14}>{title}</CustomText>
                        </CenterStyled>
                        {icons && (
                            <TouchableOpacity onPress={() => navigate.navigate("Category Page", { department })}>
                                <Icon
                                    dark={require("../../../assets/icons/category-2.png")}
                                    light={require("../../../assets/icons/category-2.png")}
                                    style={{ width: 24, height: 24 }}
                                />
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </SpaceAround>
        </View>
    );
};
export default PublicPageHeader;
const styles = StyleSheet.create({
    container: {
        backgroundColor: navbarColor,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
        height: 65,
        width: "100%",
    },
});
