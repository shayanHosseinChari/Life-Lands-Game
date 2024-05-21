import { StyleSheet, View } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import { useTheme } from "@react-navigation/native";

const MainSliderItemsComponent = ({ item, mode = "book-paint" }) => {
    const { colors } = useTheme();

    return (
        <View>
            <View style={[style.container, { height: mode === "book-paint" ? 70 : 40, width: mode === "book-paint" ? 70 : 100 }]}>
                <CustomImage
                    image={item.image}
                    width={mode === "book-paint" ? 70 : 100}
                    height={mode === "book-paint" ? 100 : 70}
                    radius={3}
                    selfCenter
                />
            </View >
        </View >
    );
};
export default MainSliderItemsComponent;
const style = StyleSheet.create({
    container: {
        borderRadius: 8,
        marginVertical: 15,
        marginHorizontal: 8,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
});