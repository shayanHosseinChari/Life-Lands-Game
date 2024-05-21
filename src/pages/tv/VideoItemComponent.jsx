import { useTheme } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { border, postBorder } from "../../appsetting/styleSetting";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomText from "../../components/text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import { Dimensions } from "react-native";

const VideoItemComponent = ({ item, navigation }) => {
  const { colors } = useTheme();
  let width = 2.7;

  return (
    <View style={{ marginHorizontal: 20 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Video Post", { id: item._id });
        }}
      >
        <SpaceStyle top={5} bottom={5}>
          <CustomImage
            isBackground={true}
            aspect={5 / 3}
            width={width}
            image={item?.image}
            radius={postBorder}
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
                  backgroundColor: colors?.hoverTextColor,
                  borderRadius: border,
                  padding: 5,
                  margin: 7,
                }}
              >
                {item?.videoLength}
              </CustomText>
            </View>
          </CustomImage>
          <SpaceStyle top={10}>
            <CustomText width={width} lines={1}>
              {item.title}
            </CustomText>
          </SpaceStyle>
          <SpaceStyle>
            <CustomText color={"#494b52"} width={width} lines={2}>
              {item.category?.categoryId?.title}
            </CustomText>
          </SpaceStyle>
          <CustomText color={"#494b52"} width={width} lines={2}>
            {item.playCount} بازدید {item.createdAt}
          </CustomText>
        </SpaceStyle>
      </TouchableOpacity>
    </View>
  );
};
export default VideoItemComponent;
