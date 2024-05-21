import { StyleSheet, TouchableOpacity, View } from "react-native";
import { navbarColor } from "../../appsetting/appsettingColor";
import { CenterStyled, SpaceAround } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import { useNavigation } from "@react-navigation/native";

const HeaderPublicComponent = ({ icons = true }) => {
    const navigate = useNavigation()
    return (
        <View style={styles.container}>
            <SpaceAround>
                {icons && (
                    <TouchableOpacity onPress={() => navigate.pop()}>
                        <Icon
                            dark={require("../../../assets/icons/arrow-left.png")}
                            light={require("../../../assets/icons/arrow-left.png")}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                )}
                <CenterStyled minus={icons ? 200 : null}>
                    <Icon
                        dark={require("../../../assets/lifelands-media-page-logo.png")}
                        light={require("../../../assets/lifelands-media-page-logo.png")}
                        style={{ width: 110, height: 17, marginTop: 3 }}
                    />
                </CenterStyled>
                {icons && (
                    <TouchableOpacity onPress={() => navigate.navigate("Category Page")}>
                        <Icon
                            dark={require("../../../assets/icons/category-2.png")}
                            light={require("../../../assets/icons/category-2.png")}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                )}
            </SpaceAround>
        </View>
    );
};
export default HeaderPublicComponent;
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
