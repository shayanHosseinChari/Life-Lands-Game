import { StyleSheet, View } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import { Row } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import CustomText from "../text/CustomText";

const PopularBookComponentsItems = ({ item, navigation }) => {
    let count = 0;
    let isWorked = false;

    return (
        <View style={{ width: 110, marginHorizontal: 8,paddingBottom:10 }}>
            <CustomImage
                isBackground={true}
                width={110}
                height={150}
                radius={8}
                image={item?.image}
            >
                <View style={{ ...styles.tagGameInfo, ...{ left: 5 } }}>
                    <Row>
                        <CustomText selfCenter color={"#fff"}>
                            {item?.score}
                        </CustomText>

                        <Icon
                            dark={require("../../../assets/icons/heart-icon.png")}
                            light={require("../../../assets/icons/heart-icon.png")}
                            style={{ width: 12, height: 12, marginTop: 2,marginLeft:3 }}
                        />
                    </Row>
                </View>

                <View style={{ ...styles.tagGameInfo, ...{ right: 5 } }}>
                    <Row>
                        <CustomText selfCenter color={"#fff"}>

                            {item?.score}
                        </CustomText>

                        <Icon
                            dark={require("../../../assets/icons/play-circle.png")}
                            light={require("../../../assets/icons/play-circle.png")}
                            style={{ width: 12, height: 12, marginTop: 2,marginLeft:3 }}
                        />
                    </Row>
                </View>
            </CustomImage>
            <View>
                <Row styles={{ justifyContent: "center", padding: 10 }}>
                    <Icon
                        dark={require("../../../assets/icons/favorite.png")}
                        light={require("../../../assets/icons/favorite.png")}
                        style={{ width: 13, height: 13, marginHorizontal: 3 }}
                    />
                    <Icon
                        dark={require("../../../assets/icons/favorite.png")}
                        light={require("../../../assets/icons/favorite.png")}
                        style={{ width: 13, height: 13, marginHorizontal: 3 }}
                    />

                    <Icon
                        dark={require("../../../assets/icons/favorite.png")}
                        light={require("../../../assets/icons/favorite.png")}
                        style={{ width: 13, height: 13, marginHorizontal: 3 }}
                    />

                </Row>
            </View>
            <View>
                <Row styles={{ justifyContent: "center", }}>
                    <CustomText selfCenter style={{ backgroundColor: "#166A654D", padding: 5, paddingHorizontal: 20, borderRadius: 10 }} color={"#fff"}>
                        {"علمی"}
                    </CustomText>
                </Row>
            </View>
        </View>
    );
};
export default PopularBookComponentsItems;

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
