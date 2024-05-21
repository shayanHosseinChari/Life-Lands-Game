import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import WGamesDivider from "./WGamesDivider";
import CustomImage from "../CustomImage/CustomImage";
import { border } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import CustomText from "../text/CustomText";
import { useTheme } from "@react-navigation/native";
import { Hr, Row, SpaceAround, SpaceBetween } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import { LOAD_FILE } from "../../service/APIs";
import { addRunCountService } from "../../service/PostService";
import { gameLinkMaker } from "../../utility/gameLinkMaker";

const MainGamesComponent = ({
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
          title={"Main Games"}
          description={"Enjoy Milions Of The Lotest Games"}
          target={"wGames Single Page"}
          option={{ type: "Main" }}
        />
      )}
      <FlatList
          showsHorizontalScrollIndicator={false}

        keyExtractor={(item) => item._id}
        horizontal={isHorizontal}
        numColumns={isHorizontal ? undefined : 3}
        style={{ alignSelf: "center" }}
        inverted={isHorizontal}
        data={games}
        renderItem={({ item }) => (
          <SpaceStyle bottom={15}>
            <TouchableOpacity
              onPress={async () => {
                count++;
                setTimeout(async () => {
                  if (count > 1 && !isWorked) {
                    await gameLinkMaker(item, navigation);

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
                  aspect={1 / 1}
                  width={3.6}
                  image={item?.image}
                  radius={border}
                />
                <CustomText top={5} width={3.6} alignSelf>
                  {item?.title}
                </CustomText>
                <CustomText
                  bottom={5}
                  color={colors.lightTextColor}
                  selfCenter
                  alignSelf
                >
                  {item?.categoryName}
                </CustomText>
                <View
                  style={{
                    width: width / 4.7,
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <SpaceBetween>
                    <View>
                      <Row>
                        <Icon
                          dark={require("../../../assets/icons/gr-user2.png")}
                          light={require("../../../assets/icons/gr-user2.png")}
                          style={{ width: 11, height: 11 }}
                        />
                        <CustomText fontSize={7} left={3}>
                          {item?.userScoreCount}
                        </CustomText>
                      </Row>
                    </View>
                    <View>
                      <Row>
                        <Icon
                          dark={require("../../../assets/icons/gr-comment-icon.png")}
                          light={require("../../../assets/icons/gr-comment-icon.png")}
                          style={{ width: 11, height: 11 }}
                        />
                        <CustomText fontSize={7} left={3}>
                          {item?.commentCount}
                        </CustomText>
                      </Row>
                    </View>
                    <View>
                      <Row>
                        <Icon
                          dark={require("../../../assets/icons/gr-play-e.png")}
                          light={require("../../../assets/icons/gr-play-e.png")}
                          style={{ width: 11, height: 11 }}
                        />
                        <CustomText fontSize={7} left={3}>
                          {item?.runCount}
                        </CustomText>
                      </Row>
                    </View>
                  </SpaceBetween>
                </View>
              </SpaceStyle>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={async () => {
                navigation.navigate("Game Post", { id: item._id });
              }}
            >
              <Hr width={width / 3.6} padding={0} />
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
export default MainGamesComponent;
