import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import SpaceStyle from "../../../style/SpaceStyle";
import { CenterStyled, Hr, Row, SpaceBetween } from "../../../style/uiUtil";
import CustomButton from "../../CustomButton/CustomButton";
import CustomCard from "../../CustomCard/CustomCard";
import CustomImage from "../../CustomImage/CustomImage";
import CustomText from "../../text/CustomText";
import { LOAD_FILE } from "../../../service/APIs";
import {
  addRunCountService,
  likePostService,
} from "../../../service/PostService";
import { platform } from "../../../utility/platform";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { getToken, getValueFor } from "../../../appsetting/storeConfig";
import { gameLinkMaker } from "../../../utility/gameLinkMaker";

const BasicInformationGameComponent = ({ game, navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const [isLikeState, setIsLikeState] = useState(game?.game?.isLiked || false);
  const { colors } = useTheme();
  const onDownloadClickListener = async () => {
    await addRunCountService(game?.game?._id);
    gameLinkMaker(game?.game, navigation);
  };
  const onLikeAction = async () => {
    const {
      data: { state },
    } = await likePostService({ postId: game?.game?._id, department: "game" });
    if (state) {
      setIsLikeState(!isLikeState);
    }
  };
  return (
    <SpaceStyle top={20}>
      <CustomCard>
        <SpaceBetween>
          <View></View>
          <Row>
            <View>
              <SpaceStyle right={10} left={10}>
                <CustomText fontSize={15}>{game.game.title}</CustomText>
                <CustomText color={colors.lightTextColor}>
                  پلتفرم : {platform(game?.game?.platform)}
                </CustomText>
              </SpaceStyle>
            </View>
            <CustomImage aspect={1 / 1} image={game.game.image} width={3} />
          </Row>
        </SpaceBetween>
        {(game?.game?.webGameUri || game?.game?.platform === "console") && (
          <View
            style={{
              width: windowWidth / 3,
              alignItems: "center",
              marginTop: -45,
              flexDirection: "row",
            }}
          >
            <CustomButton onClick={onDownloadClickListener}>
              ورود به بازی
            </CustomButton>
            <SpaceStyle left={15}>
              <TouchableOpacity onPress={onLikeAction}>
                {isLikeState ? (
                  <Image
                    source={require("../../../../assets/icons/like4.png")}
                    style={{
                      width: 20,
                      height: 20,
                      alignSelf: "center",
                      opacity: 0.5,
                    }}
                  />
                ) : (
                  <Image
                    source={require("../../../../assets/icons/Like.png")}
                    style={{
                      width: 20,
                      height: 20,
                      alignSelf: "center",
                      opacity: 0.5,
                    }}
                  />
                )}
              </TouchableOpacity>
            </SpaceStyle>
          </View>
        )}

        <Hr width={windowWidth / 1.1} />
        <SpaceBetween>
          <CenterStyled width={windowWidth / 4.5}>
            <View>
              <CustomText>اجرا</CustomText>
              <CustomText>{game.game.runCount}</CustomText>
            </View>
          </CenterStyled>
          <CenterStyled width={windowWidth / 4.5}>
            <View>
              <CustomText>حجم</CustomText>
              <CustomText>{game.game.fileSize}</CustomText>
            </View>
          </CenterStyled>
          <CenterStyled width={windowWidth / 4.5}>
            <View>
              <CustomText>رای</CustomText>
              <CustomText>
                {game.game.scoreStatistic.totalScore} از {game.game.score}
              </CustomText>
            </View>
          </CenterStyled>
          <CenterStyled width={windowWidth / 4.5}>
            <View>
              <CustomText>دسته بندی</CustomText>
              <CustomText>{game.game.category.title}</CustomText>
            </View>
          </CenterStyled>
        </SpaceBetween>
      </CustomCard>
    </SpaceStyle>
  );
};
export default BasicInformationGameComponent;
