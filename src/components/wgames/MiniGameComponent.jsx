import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import WGamesDivider from "./WGamesDivider";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { LOAD_FILE } from "../../service/APIs";
import { addRunCountService } from "../../service/PostService";
import { useTheme } from "@react-navigation/native";
import { border } from "../../appsetting/styleSetting";
import { Icon } from "../../appsetting/icons";
import { Hr, Row, SpaceBetween } from "../../style/uiUtil";
import { gameLinkMaker } from "../../utility/gameLinkMaker";

const MiniGameComponent = ({
  games,
  navigation,
  hasDivider = true,
  isHorizontal = false,
}) => {
  const { colors } = useTheme();
  let count = 0;
  let isWorked = false;
  const width = Dimensions.get("screen").width;
  return (
    <>
      {hasDivider && (
        <WGamesDivider
          title={"Mini Games"}
          description={"Enjoy Milions Of The Lotest Games"}
          target={"wGames Single Page"}
          option={{ type: "Mini" }}
        />
      )}
      <FlatList
          showsHorizontalScrollIndicator={false}

        horizontal={isHorizontal}
        keyExtractor={(item) => item._id}
        numColumns={isHorizontal ? undefined : 4}
        inverted
        style={{ alignSelf: "center" }}
        data={games}
        renderItem={({ item }) => (
          <SpaceStyle bottom={15}>
            <TouchableOpacity
              onPress={() => {
                count++;
                setTimeout(async () => {
                  if (count > 1 && !isWorked) {
                    await addRunCountService(item?._id);
                    await gameLinkMaker(item, navigation);
                    // navigation.navigate("Web File Viewer", {
                    //   uri:
                    //     item?.platform === "console"
                    //       ? `http://185.105.239.182:9632/Emulatrix.htm?url=${LOAD_FILE}${item?.consoleUrl}`
                    //       : item?.webGameUri,
                    //   title: item?.title,
                    //   isLandscape: item?.isLandscape,
                    //   gameId: item?._id,
                    // });
                    isWorked = true;
                  } else if (count <= 1 && !isWorked) {
                    navigation.navigate("Game Post", { id: item._id });
                    isWorked = true;
                  }
                }, 300);
                setTimeout(() => {
                  isWorked = false;
                  count = 0;
                }, 500);
                //
              }}
            >
              <SpaceStyle right={5} left={5} top={5} bottom={5}>
                <CustomImage
                  aspect={3 / 5}
                  width={5}
                  image={item?.image}
                  radius={0}
                />
                <CustomText top={5} width={5.5} alignSelf>
                  {item?.title}
                </CustomText>
              </SpaceStyle>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 5,
                }}
              >
                <View>
                  <Row>
                    <Icon
                      dark={require("../../../assets/icons/gr-comment-icon.png")}
                      light={require("../../../assets/icons/gr-comment-icon.png")}
                      style={{ width: 11, height: 11 }}
                    />
                    <CustomText fontSize={7} left={2} right={3}>
                      {item?.commentCount}
                    </CustomText>
                  </Row>
                </View>
                <View>
                  <Row>
                    <Icon
                      dark={require("../../../assets/icons/gr-play-e.png")}
                      light={require("../../../assets/icons/gr-play-e.png")}
                      style={{ width: 11, height: 11, marginLeft: 3 }}
                    />
                    <CustomText fontSize={7} left={3} right={2}>
                      {item?.runCount}
                    </CustomText>
                  </Row>
                </View>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate("Game Post", { id: item._id });
              }}
            >
              <Hr width={width / 5} padding={0} />
              <View
                style={{
                  backgroundColor: colors.card,
                  padding: 5,
                  marginTop: 5,
                  flexDirection: "row",
                  borderRadius: border,
                  width: width / 5,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <CustomText
                  color={colors.lightTextColor}
                  selfCenter
                  fontSize={7}
                >
                  صفحه بازی
                </CustomText>
              </View>
            </TouchableOpacity> */}
          </SpaceStyle>
        )}
      />
    </>
  );
};
export default MiniGameComponent;
