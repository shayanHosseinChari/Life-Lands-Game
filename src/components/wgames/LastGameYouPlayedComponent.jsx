import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import WGamesDivider from "./WGamesDivider";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { border } from "../../appsetting/styleSetting";
import { useTheme } from "@react-navigation/native";
import { LOAD_FILE } from "../../service/APIs";
import { Hr } from "../../style/uiUtil";
import { gameLinkMaker } from "../../utility/gameLinkMaker";

const LastGameYouPlayedComponent = ({ games, navigation }) => {
  const { colors } = useTheme();
  let count = 0;
  let isWorked = false;
  const width = Dimensions.get("screen").width;
  return (
    <>
      <WGamesDivider
        title={"تجربه اخیر شما"}
        description={"Enjoy Milions Of The Lotest Games"}
      />
      <FlatList
          showsHorizontalScrollIndicator={false}

        keyExtractor={(item) => item._id}
        style={{ alignSelf: "center" }}
        horizontal
        inverted
        data={games}
        renderItem={({ item }) => (
          <SpaceStyle bottom={15}>
            <TouchableOpacity
              onPress={() => {
                count++;
                setTimeout(async () => {
                  if (count > 1 && !isWorked) {
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
                  aspect={1 / 1}
                  width={5.3}
                  image={item?.image}
                  radius={border}
                />
                <CustomText top={5} width={5.5} fontSize={11} alignSelf>
                  {item?.title}
                </CustomText>
                <CustomText
                  color={colors.lightTextColor}
                  top={-1}
                  fontSize={8}
                  bottom={5}
                  selfCenter
                  alignSelf
                >
                  {item?.categoryName}
                </CustomText>
                <Hr width={width / 7.2} padding={0} />
                <CustomText
                  color={colors.lightTextColor}
                  top={-1}
                  fontSize={8}
                  selfCenter
                  alignSelf
                  style={{
                    backgroundColor: colors.card,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                >
                  {item?.createdAt}
                </CustomText>
              </SpaceStyle>
            </TouchableOpacity>
          </SpaceStyle>
        )}
      />
    </>
  );
};
export default LastGameYouPlayedComponent;
