import { Dimensions, FlatList, TouchableOpacity, View ,Text,Image} from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { useNavigation, useTheme } from "@react-navigation/native";
import CustomCard from "../CustomCard/CustomCard";
import SpaceStyle from "../../style/SpaceStyle";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
const UserGameListComponent = ({ userGame, isShowGame }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("screen").width;
  const { colors } = useTheme();
  return (
    <SpaceStyle left={10} right={10} top={10}>
      <LinearGradient colors={['transparent','rgba(26, 26, 26, 1)']} style={{borderRadius:20,padding:10}}>
        <CustomText style={{fontFamily:"vazir",fontSize:RFPercentage(2),marginBottom:RFPercentage(1.4),textAlign:"right"}}>
          آخرین بازیکن ها
        </CustomText>
        <FlatList
            showsHorizontalScrollIndicator={false}

          keyExtractor={(item) => item?._id}
          horizontal={true}
          data={userGame}
          inverted={true}
          renderItem={({ item, index }) => (
            <View style={{ width: 70 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Public Profile Page", {
                    userId: item?.userId?._id,
                  });
                }}
              >
                {
                  item.userId.profileImage?<CustomImage
                  styles={{
                    borderColor: index != 0 ? colors.darkGreen : colors.orange,
                    borderWidth: 2,
                  }}
                  image={item?.userId?.profileImage}
                  linkUserId={item?.userId?._id}
                  width={60}
                  height={60}
                  radius={100}
                  aspect={1 / 1}
                  selfCenter={true}
                />:<Image source={require('../../../assets/def.jpg')} style={{borderRadius: 100,width:60,height:60}} />
                }
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor:
                    index != 0 ? colors.darkGreen : colors.orange,
                  borderWidth: 1,
                  borderRadius: 100,
                  width: 20,
                  height: 20,
                  alignSelf: "center",
                  marginTop: -10,
                }}
              >
                <CustomText fontSize={9} color={"#000"} selfCenter>
                  {index + 1}
                </CustomText>
              </View>
              <CustomText
                selfCenter
                color={index != 0 ? colors.darkGreen : colors.orange}
                fontSize={9}
              >
                {item?.userId?.userName}
              </CustomText>
              <CustomText selfCenter fontSize={7}>
                {item?.score}
              </CustomText>
              {isShowGame && (
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    width: 40,
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <CustomText
                    selfCenter
                    right={5}
                    color={colors.lightTextColor}
                    fontSize={8}
                  >
                    {item?.gameId?.title}
                  </CustomText>
                  <CustomImage
                    image={item?.gameId?.image}
                    width={20}
                    height={20}
                    radius={100}
                    aspect={1 / 1}
                    selfCenter={true}
                  />
                </View>
              )}
            </View>
          )}
        />
      </LinearGradient>
    </SpaceStyle>
  );
};
export default UserGameListComponent;
