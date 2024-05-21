import { View } from "react-native";
import { Hr, Row } from "../../../style/uiUtil";
import CustomImage from "../../CustomImage/CustomImage";
import CustomText from "../../text/CustomText";
import { useTheme } from "@react-navigation/native";
import SpaceStyle from "../../../style/SpaceStyle";
import { TouchableOpacity } from "react-native";

const PostChannelInfo = ({ channel, navigation }) => {
  const { colors } = useTheme();

  return (
    <View>
      <Hr />
      <SpaceStyle>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Single Channel", {
              channelId: channel.channelId,
              id: channel?._id,
            });
          }}
        >
          <Row>
            <View style={{ justifyContent: "center" }}>
              <CustomText color={colors.lightTextColor}>
                {channel.title}
              </CustomText>
              <CustomText>{channel.channelId}</CustomText>
            </View>
            <View>
              <CustomImage
                image={channel?.image}
                width={12}
                height={50}
                aspect={1 / 1}
                left={10}
                radius={100}
              />
            </View>
          </Row>
        </TouchableOpacity>
      </SpaceStyle>
    </View>
  );
};
export default PostChannelInfo;
