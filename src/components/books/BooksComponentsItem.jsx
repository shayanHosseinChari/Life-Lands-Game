import { StyleSheet, View } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import { Row } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import CustomText from "../text/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

const BooksComponentsItem = ({ item, navigation }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Book Post", { id: item?._id })}>
            <View style={{ width: 110, marginHorizontal: 8, paddingBottom: 10 }}>
                <CustomImage
                    isBackground={true}
                    width={110}
                    height={150}
                    radius={8}
                    image={item?.image}
                >
                    {/* <View style={{ ...styles.tagGameInfo, ...{ left: 5 } }}>
                    <Row>
                        <CustomText selfCenter color={"#fff"}>
                            {item?.score}
                        </CustomText>

                        <Icon
                            dark={require("../../../assets/icons/heart-icon.png")}
                            light={require("../../../assets/icons/heart-icon.png")}
                            style={{ width: 12, height: 12, marginTop: 3,marginLeft:3 }}
                        />
                    </Row>
                </View> */}

                    {/* <View style={{ ...styles.tagGameInfo, ...{ right: 5 } }}>
                    <Row>
                        <CustomText selfCenter color={"#fff"}>
                            {item?.score}
                        </CustomText>

                        <Icon
                            dark={require("../../../assets/icons/eye.png")}
                            light={require("../../../assets/icons/eye.png")}
                            style={{ width: 12, height: 12, marginTop: 3,marginLeft:3 }}
                        />
                    </Row>
                </View> */}
                </CustomImage>
                <CustomText selfCenter fontSize={11} color={"#fefefe"} top={10}>
                    {item?.title}
                </CustomText>
            </View>
        </TouchableOpacity >
    );
};
export default BooksComponentsItem;

const styles = StyleSheet.create({
    tagGameInfo: {
        backgroundColor: "#3E4148",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        opacity: 0.9,
        width: 45,
        bottom: 5,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        position: "absolute",
        alignSelf: "center",
    }
});
