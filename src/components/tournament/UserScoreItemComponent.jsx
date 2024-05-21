import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "../text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Icon } from "../../appsetting/icons";
import { Text } from "react-native";

const UserScoreItemComponent = ({ item, index, customWidth, imageSize, selfMode = false,profile }) => {
  const width = Dimensions.get("screen").width;
  const navigation = useNavigation()
  const { colors } = useTheme();
  console.log('leaders user ,',item)
  let styles = StyleSheet.create({
    mainContainer: {
      alignSelf: "center",
    },
    startAlign: {
      alignSelf: "flex-start",
    },
    itemContainer: {
      backgroundColor: selfMode ? "#243345" : (index === 3 || index === 4 || index === 5) ? "#970F891A" : "#282828",
      width: customWidth || width * 0.95,
      marginVertical: 5,
      justifyContent: "space-between",
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 15,
      borderWidth: selfMode ? 2 : 0,
      borderColor: "#0c8ce9AA",
      flexDirection: "row",
    },
    justifyContentStyle: { justifyContent: "center" },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    statisticsContainer: {
      flexDirection: "row",
      alignItems: "center",

      marginLeft: 10,
    },
    iconSize: { width: 13, height: 13 },
  });
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Public Profile Page", { userId: item?.userId?._id })}>
      <View style={styles.itemContainer}>
        <View style={styles.justifyContentStyle}>
          <View style={{ justifyContent: "center", flexDirection: "row", backgroundColor: "#FFFFFF1A", padding: 5, paddingHorizontal: 10, borderRadius: 5 }}>
            <Icon
              dark={require("../../../assets/icons/medal-icon.png")}
              light={require("../../../assets/icons/medal-icon.png")}
              style={{ width: 18, height: 18 }}
            />
            <Text
              left={5}
              fontSize={12}
              style={[styles.startAlign,{marginHorizontal: 4,color:"white"}]}
              color={colors.lightTextColor}
            >
              {item?.totalScore}
            </Text>
          </View>
          
        </View>
        <View style={styles.row}>
          <SpaceStyle right={10}>
            {/* <CustomText fontSize={13}>{profile?.userName}</CustomText> */}
            <View>
              <Text style={{color:"white",fontFamily:'vazir'}}>{item.firstName} {item.lasttName}</Text>
              <CustomText fontSize={11}>{item?.userId?.userName}</CustomText>
            </View>
          </SpaceStyle>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <CustomImage
              aspect={1 / 1}
              height={60}
              width={imageSize || 7}
              image={item?.userId?.profileImage}
              radius={100}
            />
            {item?.isActive && (
              <View style={{ width: 13, height: 13, backgroundColor: "#00B7AC", borderRadius: 5555, borderWidth: 2, borderColor: '#221026', position: "absolute", top: 35, left: 0 }} />
            )}
            <CustomText
              fontSize={17}
              style={{
                alignSelf: "center",
                marginLeft: 15,
                color: "#FFF",
              }}
            >
              {selfMode ? 0 : index + 1}
            </CustomText>
          </View>
        </View>
      </View>
    </TouchableOpacity >
  );
};
export default UserScoreItemComponent;
