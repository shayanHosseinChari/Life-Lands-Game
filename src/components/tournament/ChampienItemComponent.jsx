import { useNavigation, useTheme } from "@react-navigation/native";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { border } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import { Row } from "../../style/uiUtil";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";

const ChampienItemComponent = ({ usersScore, chmpImage, number }) => {
  let userInfo = usersScore.userId;
  const { colors } = useTheme();
  const navigation = useNavigation()
  const style = StyleSheet.create({
    container: {
      marginTop: -25,
      alignContent: "center",
      justifyContent: "center",
      alignItems: "flex-start",
      alignSelf: "flex-start",
    },
  });
  return (
    <SpaceStyle>
      <TouchableOpacity onPress={() => navigation.navigate("Public Profile Page", { userId: userInfo?._id })}>
        <View style={style.container}>
          <ImageBackground
            source={number === "one" ? chmpImage : null}
            width={number === "one" ? 110 : 71}
            height={number === "one" ? 110 : 80}
            style={{ width: number === "one" ? 210 : 71, height: number === "one" ? 210 : 80, marginTop: number === "one" ? 0 : 80 }}
          >
            <CustomImage
              image={userInfo?.profileImage}
              aspect={1 / 1}
              width={number === "one" ? 92 : 70}
              height={number === "one" ? 92 : 70}
              radius={100}
              styles={{
                marginTop: number === "one" ? 54.5 : 1,
                marginLeft: number === "one" ? 58.5 : 1,
                borderWidth: 2,
                borderColor: number === "one" ? "#FFF609" : number === "two" ? "#56F0FA" : "#E998E5"
              }}
            />
            <View style={{
              position: "absolute",
              top: number === "one" ? 135 : 60,
              left: number === "one" ? 65 : -3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80
            }}>
              <CustomText
                selfCenter
                style={{
                  fontSize: 14,
                  borderRadius: 100,
                  width: 25,
                  height: 25,
                  color: "#282828",
                  paddingVertical: 3,
                  paddingHorizontal: number === "one" ? 10 : number === "two" ? 8 : 7,
                  backgroundColor: number === "one" ? "#FFF609" : number === "two" ? "#56F0FA" : "#E998E5"
                }}
              >
                {number === "one" ? "1" : number === "two" ? "2" : "3"}
              </CustomText>
              <CustomText selfCenter fontSize={12} style={{ maxWidth: 80 }}>{userInfo?.userName}</CustomText>
              <CustomText selfCenter fontSize={10} style={{ maxWidth: 80 }}>{`${userInfo?.firstName} ${userInfo?.lastName}`}</CustomText>
              <CustomText selfCenter fontSize={14} top={5} style={{ maxWidth: 80, color: "#58DEFB" }}>{usersScore?.totalScore}</CustomText>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </SpaceStyle>
  );
};
export default ChampienItemComponent;
