import { StyleSheet, View } from "react-native";
import CustomText from "../text/CustomText";
import CustomImage from "../CustomImage/CustomImage";
import { useTheme } from "@react-navigation/native";

const TopPageListItem = ({ item }) => {
    const { colors } = useTheme();

    return (
        <View>
            <View style={[style.container, { backgroundColor: "transparent" }]}>
                <CustomImage
                    image={item.image}
                    width={70}
                    height={70}
                    radius={100}
                    styles={{borderWidth:3, borderColor:"#FFA822"}}
                    selfCenter
                />
                <View>
                    <CustomText selfCenter style={{ fontSize: 10,marginTop:5 }}>{item.title}</CustomText>
                </View>
            </View >
        </View >
    );
};
export default TopPageListItem;
const style = StyleSheet.create({
    container: {
        backgroundColor: "#3E4148",
        borderRadius: 8,
        height: 100,
        marginVertical:15,
        marginHorizontal: 10,
        width: 70,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
});