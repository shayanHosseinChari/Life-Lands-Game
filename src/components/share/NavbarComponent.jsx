import { StyleSheet, View } from "react-native";
import { navbarColor } from "../../appsetting/appsettingColor";
import { CenterStyled, SpaceAround } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const NavbarComponent = ({ icons = true, logoSrc = require("../../../assets/lifelands-media-page-logo.png"), width = 110, height = 17,routing }) => {
    return (
        <View style={styles.container}>
            <SpaceAround>
                {icons && (
                    <Pressable onPress={()=>{
                        routing.navigate('MyPain')
                    }}>
                        <Icon
                        dark={require("../../../assets/icons/direct-send.png")}
                        light={require("../../../assets/icons/direct-send.png")}
                        style={{ width: 24, height: 24, marginTop: 8 }}
                    />
                    </Pressable>
                )}
                <CenterStyled minus={icons ? 200 : null}>
                    <Icon
                        dark={logoSrc}
                        light={logoSrc}
                        style={{ width, height, marginTop: 3 }}
                    />
                </CenterStyled>
                {icons && (
                    <Icon
                        dark={require("../../../assets/icons/search-normal.png")}
                        light={"../../../assets/icons/search-normal.png"}
                        style={{ width: 24, height: 24, opacity: 0 }}
                    />
                )}
                
            </SpaceAround>
        </View>
    );
};
export default NavbarComponent;
const styles = StyleSheet.create({
    container: {
        backgroundColor: navbarColor,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
        // height: 65,
        borderBottomColor: "#262626",
        borderBottomWidth:1,
        paddingBottom:10,
        width: "100%",
    },
});
