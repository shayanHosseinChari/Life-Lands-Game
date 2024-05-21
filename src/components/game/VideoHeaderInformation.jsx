import { Fragment } from "react";
import { Image, View } from "react-native";
import { grayColor } from "../../appsetting/appsettingColor";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomImage from "../CustomImage/CustomImage";
import PostActionComponent from "../share/PostActionComponent";
import CustomText from "../text/CustomText";

const VideoHeaderInformation = ({
  video,
  fileId,
  fileUrl,
  mimetype,
  setIsDownloading,
  post,
}) => {
  return (
    <Fragment>
      <SpaceBetween>
        <View>
          <Row>
            <Image
              source={require("../../../assets/icons/Play.png")}
              style={{ width: 8, height: 8, marginTop: 4 }}
            />
            <SpaceStyle left={5}>
              <CustomText style={{ fontSize: 11 }} color={grayColor}>
                {video?.video?.playCount}
              </CustomText>
            </SpaceStyle>
          </Row>
        </View>
        <CustomText
          width={1.3}
          style={{
            fontSize: 13,
          }}
        >
          {video?.video?.title}
        </CustomText>
      </SpaceBetween>
      <SpaceStyle top={10}>
        <PostActionComponent
          post={post}
          isLike={video?.video?.isLiked}
          department={"video"}
          onDownloadAction={(e) => {
            // setIsDownloading(!e);
          }}
          fileId={fileId}
          fileUrl={fileUrl}
          mimeType={mimetype}
          imageUrl={video.video.image}
        />
      </SpaceStyle>
    </Fragment>
  );
};
export default VideoHeaderInformation;
