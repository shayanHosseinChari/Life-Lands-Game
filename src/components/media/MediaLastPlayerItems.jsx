import { StyleSheet, View } from "react-native";
import CustomText from "../text/CustomText";
import CustomImage from "../CustomImage/CustomImage";
import { useTheme } from "@react-navigation/native";

const MediaLastPlayerItems = ({ item }) => {
    const { colors } = useTheme();
    return (
        <View>
            <View style={[style.container, { backgroundColor: "transparent" }]}>
                <CustomImage
                    image={item?.profile}
                    width={65}
                    height={65}
                    radius={100}
                    selfCenter
                />
                <View>
                    <CustomText selfCenter style={{ fontSize: 10,marginTop:5 }}>{item?.fullName}</CustomText>
                </View>
            </View >
        </View >
    );
};
export default MediaLastPlayerItems;
const style = StyleSheet.create({
    container: {
        backgroundColor: "#3E4148",
        borderRadius: 8,
        height: 100,
        marginHorizontal: 10,
        width: 70,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
});