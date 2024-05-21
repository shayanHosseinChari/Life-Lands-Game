import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  lightBlueColor,
  primaryColor,
} from "../../../appsetting/appsettingColor";
import { border, postBorder } from "../../../appsetting/styleSetting";
import CustomImage from "../../CustomImage/CustomImage";
import CustomText from "../../text/CustomText";
import { useTheme } from "@react-navigation/native";

const PlayListItem = ({ item, navigation, width = 5.2 }) => {
  const { colors } = useTheme();
  const style = StyleSheet.create({
    badge: {
      backgroundColor: lightBlueColor,
      width: 25,
      height: 25,

      borderRadius: border,
      alignSelf: "flex-end",
      margin: -7,
    },
    badgeText: {
      height: 25,
      paddingTop: 4,
      color: primaryColor,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
    },
  });
  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate("Voice Play List", { id: item._id });
          navigation.navigate("Voice PlayList", { id: item._id });
        }}
      >
        <CustomImage
          isBackground={true}
          aspect={1 / 1}
          width={width}
          image={item.coverImage}
          radius={postBorder}
        >
          <View style={style.badge}>
            <CustomText style={style.badgeText}>{item.childCount}</CustomText>
          </View>
        </CustomImage>
        <CustomText width={width}>{item.title}</CustomText>
        <CustomText width={width} color={colors.lightTextColor}>
          {item?.category?.categoryId?.title}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
export default PlayListItem;
