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
  
  const LeaderProfile = ({ item, index, customWidth, imageSize, selfMode = false,profile }) => {
    const width = Dimensions.get("screen").width;
    const navigation = useNavigation()
    console.log('item from leard',item)
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
        paddingVertical: 3,
        borderRadius: 15,
        borderWidth: selfMode ? 2 : 0,
        borderColor: "#0c8ce9AA",
        flexDirection: "row",
      },
      justifyContentStyle: { justifyContent: "center" ,alignItems:"center"},
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
      <TouchableOpacity onPress={() => navigation.navigate("Public Profile Page", { userId: item._id })}>
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
                {item.totalScore}
              </Text>
            </View>
            
          </View>
          <View style={[styles.row,{alignItems:"center"}]}>
            <View
              style={{
                flexDirection: "row",
                alignItems:"center"
              }}
            >
             <View style={{alignItems:'flex-end',marginHorizontal:7}}>
              <Text style={{color:"white",fontFamily:"vazir"}}>{item.firstName} {item.lastName}</Text>
              <Text style={{color:"white",fontFamily:"vazir",opacity: 0.6}}
                
              >
                @{item.userName}
              </Text>
             </View>
             
             <CustomText fontSize={11}>{item?.userId?.userName}</CustomText>
                {/* <CustomText fontSize={11}>{item?.userId?.fullName}</CustomText> */}

              
              <CustomImage
                aspect={1 / 1}
                height={50}
                width={50}
                image={item?.profileImage}
                radius={100}
              />
             
            </View>
          </View>
        </View>
      </TouchableOpacity >
    );
  };
  export default LeaderProfile;
  