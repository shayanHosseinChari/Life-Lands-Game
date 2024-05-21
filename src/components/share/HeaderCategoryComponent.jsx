import { StyleSheet, TouchableOpacity, View } from "react-native";
import { navbarColor } from "../../appsetting/appsettingColor";
import { CenterStyled, SpaceAround } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../text/CustomText";
import { useEffect, useState } from "react";

const HeaderCategoryComponent = ({ icons = true, title = "" }) => {
    const navigate = useNavigation()
    const [titleS, setTitleS] = useState(title)

    useEffect(() => {
        if (title.includes("video")) {
            setTitleS("ویدیو ها")
        } else if (title.includes("game")) {
            setTitleS("بازی ها")
        } else if (title.includes("book")) {
            setTitleS("کتاب ها")
        } else if (title.includes("paint")) {
            setTitleS("نقاشی ها")
        } else if (title.includes("voice")) {
            setTitleS("صدا ها")
        } else {
            setTitleS(title)
        }
    }, [title])

    return (
        <View style={styles.container}>
            <SpaceAround>
                {icons && (
                    <TouchableOpacity onPress={() => navigate.pop()}>
                        <Icon
                            dark={require("../../../assets/icons/arrow-left.png")}
                            light={require("../../../assets/icons/arrow-left.png")}
                            style={{ width: 24, height: 24, marginLeft: 60 }}
                        />
                    </TouchableOpacity>
                )}
                <CenterStyled minus={-80}>
                    <CustomText fontSize={14}>{titleS}</CustomText>
                </CenterStyled>
            </SpaceAround>
        </View>
    );
};
export default HeaderCategoryComponent;
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
