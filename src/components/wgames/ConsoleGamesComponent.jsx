import { FlatList, TouchableOpacity, View } from "react-native";
import { border } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import WGamesDivider from "./WGamesDivider";
import CustomText from "../text/CustomText";
import { Hr, Row, SpaceBetween } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import { useTheme } from "@react-navigation/native";
import { LOAD_FILE } from "../../service/APIs";
import { addRunCountService } from "../../service/PostService";
import ConsoleTypeComponent from "./ConsoleTypeComponent";
import { Dimensions } from "react-native";
import { gameLinkMaker } from "../../utility/gameLinkMaker";

const ConsoleGamesComponent = ({
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
          title={"Console Games"}
          description={"Enjoy Milions Of The Lotest Games"}
          target={"wGames Single Page"}
          option={{ type: "Console" }}
        />
      )}
      <FlatList
          showsHorizontalScrollIndicator={false}

        keyExtractor={(item) => item._id}
        horizontal={isHorizontal}
        inverted={isHorizontal}
        numColumns={isHorizontal ? undefined : 5}
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
              <SpaceStyle right={5} left={5} top={10} bottom={5}>
                <View>
                  <View
                    style={{
                      position: "absolute",
                      top: -13,
                      right: 5,
                      left: 5,
                      width: "70%",
                      zIndex: 100,
                    }}
                  >
                    <SpaceBetween>
                      <View></View>
                      <View
                        style={{
                          backgroundColor: colors.card,
                          padding: 5,
                          borderRadius: 7,
                          width: 25,
                          height: 25,
                        }}
                      >
                        <ConsoleTypeComponent type={item.consoleType} />
                      </View>
                    </SpaceBetween>
                  </View>
                  <CustomImage
                    aspect={1 / 1}
                    width={5.5}
                    image={item?.image}
                    radius={border}
                  />
                </View>
                <CustomText fontSize={11} top={5} width={5.5} alignSelf>
                  {item?.title}
                </CustomText>
                <CustomText
                  fontSize={8}
                  color={colors.lightTextColor}
                  top={-2}
                  selfCenter
                  alignSelf
                  bottom={8}
                >
                  {item?.categoryName}
                </CustomText>
                <View
                  style={{
                    flexDirection: "row",
                    direction: "rtl",
                    justifyContent: "center",
                  }}
                >
                  <View>
                    <Row>
                      <Icon
                        dark={require("../../../assets/icons/comments.png")}
                        light={require("../../../assets/icons/comments.png")}
                        style={{ width: 12, height: 12 }}
                      />
                      <CustomText fontSize={7} left={5} right={4}>
                        {item?.commentCount}
                      </CustomText>
                    </Row>
                  </View>
                  <View>
                    <Row>
                      <Icon
                        dark={require("../../../assets/icons/play_e.png")}
                        light={require("../../../assets/icons/play_e.png")}
                        style={{ width: 12, height: 12, marginLeft: 4 }}
                      />
                      <CustomText fontSize={7} left={5}>
                        {item?.runCount}
                      </CustomText>
                    </Row>
                  </View>
                </View>
              </SpaceStyle>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate("Game Post", { id: item._id });
              }}
            >
              <Hr width={width / 5.5} padding={0} />
              <View
                style={{
                  backgroundColor: colors.card,
                  padding: 5,
                  marginTop: 5,
                  flexDirection: "row",
                  borderRadius: border,
                  width: 55,
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
export default ConsoleGamesComponent;
