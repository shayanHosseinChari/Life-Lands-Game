import { View } from "react-native";
import {
  grayColor,
  lightTextColor,
  opacityDarkColor,
  opacityWhiteColor,
  pinkColor,
  primaryColor,
  redColor,
} from "../../appsetting/appsettingColor";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";

const VideoUserInformationComponent = ({
  video,
  onFollowHandler,
  isFollowed,
  onNavigate,
}) => {
  return (
    <SpaceBetween>
      <View style={{ justifyContent: "center" }}>
        <SpaceStyle right={20}>
          <View style={{ justifyContent: "center" }}>
            <CustomText
              left={10}
              onClick={onFollowHandler}
              color={isFollowed ? primaryColor : redColor}
            >
              {isFollowed ? "دنبال نشود" : "دنبال کردن"}
            </CustomText>
          </View>
        </SpaceStyle>
      </View>
      <Row>
        <View style={{ justifyContent: "center", marginRight: 15 }}>
          <CustomText>{video?.video?.creator?.userId?.userName}</CustomText>
          <CustomText color={grayColor} style={{ fontSize: 10 }}>
            {video?.video?.creator?.userId?.followersCount} دنبال کننده
          </CustomText>
        </View>
        <View>
          <CustomImage
            aspect={1 / 1}
            radius={100}
            linkUserId={video?.video?.creator?.userId?._id}
            image={video?.video?.creator?.userId?.profileImage}
            onClick={onNavigate}
            width={8}
          />
        </View>
      </Row>
    </SpaceBetween>
  );
};
export default VideoUserInformationComponent;
