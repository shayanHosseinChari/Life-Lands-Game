import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../text/CustomText";
import { Row } from "../../style/uiUtil";
import CustomImage from "../CustomImage/CustomImage";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const LastUserReadBookItem = ({ item,navigation }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Book Post", { id: item?._id })}>
            <View>
                <View style={[style.container, { backgroundColor: "transparent" }]}>
                    <CustomImage
                        image={item?.image}
                        width={110}
                        height={150}
                        radius={10}
                        selfCenter
                    />
                   <Pressable onPress={()=>{
                    navigation.navigate('Public Profile Page',{userId: item?.creator?.userId?._id})
                   }} style={[style.circleUserImage,{borderRadius:100}]}>
                   <CustomImage
                        image={item?.creator?.userId?.profileImage}
                        width={60}
                        height={60}
                        radius={100}
                        selfCenter
                        
                    />
                   </Pressable>

                    <View style={style.circleSmallUsers}></View>
                    <View style={{ margin: 5 }}></View>
                    <Row>
                        <View>
                            <CustomText selfCenter>@{item?.creator?.userId?.userName}</CustomText>
                            <CustomText selfCenter>{item?.creator?.fullName}</CustomText>
                        </View>
                    </Row>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default LastUserReadBookItem;

const style = StyleSheet.create({
    container: {
        backgroundColor: "#3E4148",
        borderRadius: 8,
        height: 200,
        marginHorizontal: 10,
        width: 110,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    circleSmallUsers: {
        width: 15, height: 15, borderRadius: 50, position: "absolute", top: 150, left: -8, backgroundColor: "#00B7AC", borderWidth: 2, borderColor: "#3E4148"
    },
    circleUserImage: {
        position: "absolute", top: 105, left: -13, borderWidth: 2, borderColor: "#3E4148"
    }
});