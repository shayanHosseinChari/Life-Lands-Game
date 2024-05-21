import { StyleSheet, View } from "react-native";
import CustomText from "../text/CustomText";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomImage from "../CustomImage/CustomImage";
import { useTheme } from "@react-navigation/native";
import { Icon } from "../../appsetting/icons";

const PaintsPopularChannelItems = ({ item }) => {
    const { colors } = useTheme();
    return (
        <View>
            <View style={[style.container, { backgroundColor: "transparent" }]}>
                <CustomImage
                    image={item.image}
                    width={90}
                    height={90}
                    radius={100}
                    selfCenter
                />
                <View style={{ margin: 2 }}></View>
                <Row>
                    <View>
                        <CustomText selfCenter style={{ fontSize: 15, }}>{"انیمه"}</CustomText>
                        {/* <CustomText>{item?.creator?.fullName}</CustomText> */}
                        <View style={style.tagContainer}>
                            <View style={{ ...style.tagInfo, right: 0 }} >
                                <Row>
                                    <CustomText selfCenter color={"#fff"}>
                                        {0}
                                    </CustomText>

                                    <Icon
                                        dark={require("../../../assets/icons/play-circle.png")}
                                        light={require("../../../assets/icons/play-circle.png")}
                                        style={{ width: 10, height: 10, marginTop: 3, marginLeft:3 }}
                                    />
                                </Row>
                            </View>
                            <View style={{ ...style.tagInfo, left: 0 }}>
                                <Row>
                                    <CustomText selfCenter color={"#fff"}>
                                        {0}
                                    </CustomText>

                                    <Icon
                                        dark={require("../../../assets/icons/eye.png")}
                                        light={require("../../../assets/icons/eye.png")}
                                        style={{ width: 10, height: 10, marginTop: 3, marginLeft:3 }}
                                    />
                                </Row>
                            </View>
                        </View>
                    </View>
                </Row>
            </View >
        </View >
    );
};
export default PaintsPopularChannelItems;
const style = StyleSheet.create({
    container: {
        backgroundColor: "#3E4148",
        borderRadius: 8,
        height: 170,
        marginHorizontal: 8,
        width: 100,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    tagInfo: {
        backgroundColor: "#3E4148",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        opacity: 0.9,
    },
    tagContainer:{
        width:100, backgroundColor: "#3E4148",flexDirection:"row", justifyContent:'space-between',padding:1, borderRadius:5, marginTop:8
    }
});