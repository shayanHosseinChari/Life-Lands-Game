import { TouchableOpacity, View } from "react-native";
import SpaceStyle from "../../../style/SpaceStyle";
import { Row } from "../../../style/uiUtil";
import CustomText from "../../text/CustomText";
import CustomImage from "../../CustomImage/CustomImage";
import { border, postBorder } from "../../../appsetting/styleSetting";
import { useTheme } from "@react-navigation/native";

const VideoPlayListItemComponent = ({
  item,
  onNavigate,
  onClick,
  navigation,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        if (onNavigate) onNavigate();
        if (onClick) onClick(item?._id);
        else navigation.navigate("Video Post", { id: item?._id });
      }}
    >
      <SpaceStyle left={10}>
        <Row>
          <SpaceStyle top={5} right={15} left={30}>
            <View style={{ display: "flex", justifyContent: "space-between" }}>
              <CustomText width={2.7} style={{ fontSize: 11 }}>
                {item?.title}
              </CustomText>
              <SpaceStyle top={10}>
                <Row>
                  <CustomText
                    color={"#686974"}
                    style={{ fontSize: 8, marginTop: 20 }}
                  >
                    {item?.category?.title}
                  </CustomText>
                </Row>
              </SpaceStyle>
              <SpaceStyle top={4}>
                <Row>
                  <SpaceStyle right={10}>
                    <CustomText color={"#686974"} style={{ fontSize: 8 }}>
                      {item?.createdAt}
                    </CustomText>
                  </SpaceStyle>
                  <CustomText color={"#686974"} style={{ fontSize: 8 }}>
                    {item?.playCount} بازدید
                  </CustomText>
                </Row>
              </SpaceStyle>
            </View>
          </SpaceStyle>
          <SpaceStyle bottom={10}>
            <CustomImage
              isMobileOPT={false}
              isBackground={true}
              radius={postBorder}
              image={item?.image}
              width={2.7}
              height={90}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <CustomText
                  style={{
                    backgroundColor: colors?.darkOpacityColor,
                    borderRadius: border,
                    padding: 5,
                    margin: 7,
                    color: "white",
                  }}
                >
                  {item?.videoLength}
                </CustomText>
              </View>
            </CustomImage>
          </SpaceStyle>
        </Row>
      </SpaceStyle>
    </TouchableOpacity>
  );
};
export default VideoPlayListItemComponent;
