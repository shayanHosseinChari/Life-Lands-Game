import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { border } from "../../appsetting/styleSetting";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomText from "../../components/text/CustomText";
import { SpaceAround, SpaceBetween } from "../../style/uiUtil";

const TournamentItem = ({ item, navigation }) => {
  console.log(item);
  let rightUser = item?.sender ? item?.sender : item?.losserUserId;
  let leftUser = item?.reciever ? item?.reciever : item?.winnerUserId;
  const { colors } = useTheme();
  const style = StyleSheet.create({
    container: {
      borderTopRightRadius: border,
      borderTopLeftRadius: border,
      borderColor: "#292a2e",
      borderBottomWidth: 3,
      borderBottomColor: "#5f606a",
      borderWidth: 2,
      margin: 10,
      backgroundColor: "#1b1c1f",
      padding: 10,
    },
    resulteBoardContainer: {
      backgroundColor: "#17181a",
      padding: 10,
      justifyContent: "center",
      alignContent: "center",
      borderRadius: border,
      margin: 10,
    },
    textResulte: {
      fontSize: 17,
      marginHorizontal: 5,
    },
  });
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("End Tournament Page", {
          id: item._id,
        });
      }}
    >
      <View style={style.container}>
        <SpaceAround minus={40}>
          <CustomImage
            image={leftUser?.profileImage}
            linkUserId={leftUser?._id}
            width={6}
            aspect={1 / 1}
            radius={100}
            height={60}
          />
          <View style={style.resulteBoardContainer}>
            <SpaceBetween>
              <CustomText style={style.textResulte} color={"#c4244a"}>
                {item.losserScore || 0}
              </CustomText>
              <CustomText color={"#5f606a"} style={style.textResulte}>
                -
              </CustomText>
              <CustomText color={"#52b039"} style={style.textResulte}>
                {item.winnerScore || 0}
              </CustomText>
            </SpaceBetween>
          </View>
          <CustomImage
            image={rightUser?.profileImage}
            linkUserId={rightUser?._id}
            width={6}
            aspect={1 / 1}
            radius={100}
            height={60}
          />
        </SpaceAround>
        <SpaceAround minus={40}>
          <View>
            <CustomText>{leftUser?.userName}</CustomText>
            <CustomText style={{ fontSize: 8 }} color={colors.primary}>
              مشاهده پروفایل
            </CustomText>
          </View>
          <View>
            <CustomImage
              image={item?.gameId?.image}
              aspect={1 / 1}
              width={15}
              height={30}
              radius={0}
            />
          </View>
          <View>
            <CustomText>{rightUser?.userName}</CustomText>
            <CustomText style={{ fontSize: 8 }} color={colors.primary}>
              مشاهده پروفایل
            </CustomText>
          </View>
        </SpaceAround>
      </View>
    </TouchableOpacity>
  );
};
export default TournamentItem;
