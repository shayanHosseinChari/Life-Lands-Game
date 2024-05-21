import { Dimensions, TouchableOpacity, View } from "react-native";
import { Row } from "../../../style/uiUtil";
import CustomText from "../../text/CustomText";
import { useTheme } from "@react-navigation/native";
import CustomImage from "../../CustomImage/CustomImage";

const TwoRowPlayListItemComponent = ({ navigation, item }) => {
  const width = Dimensions.get("screen").width;
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{ width: width / 2.2, marginBottom: 20 }}
      onPress={() => {
        navigation.navigate("Voice PlayList", { id: item._id });
      }}
    >
      <Row>
        <View>
          <Row>
            <View>
              <CustomText fontSize={6} width={8} color={colors?.primary}>
                {item?.channel?.channelId}
              </CustomText>
              <CustomText fontSize={6} width={8} color={colors?.lightTextColor}>
                {item?.creator?.userId?.userName}
              </CustomText>
            </View>
            <CustomImage
              aspect={1 / 1}
              width={15}
              height={50}
              image={item?.channel?.image}
              radius={100}
              right={5}
              left={5}
            />
          </Row>
          <CustomText right={5} fontSize={9} lines={2} width={5.5}>
            {item?.title}
          </CustomText>
        </View>
        <CustomImage
          image={item?.coverImage}
          width={5}
          aspect={1 / 1}
          height={150}
        />
      </Row>
    </TouchableOpacity>
  );
};
export default TwoRowPlayListItemComponent;
