import { FlatList, TouchableOpacity, View } from "react-native";
import { Row } from "../../../style/uiUtil";
import CustomImage from "../../CustomImage/CustomImage";
import CustomText from "../../text/CustomText";
import SpaceStyle from "../../../style/SpaceStyle";
import { useTheme } from "@react-navigation/native";
import { border, postBorder } from "../../../appsetting/styleSetting";
import VideoPlayListItemComponent from "./VideoPlayListItemComponent";
const VideosListComponent = ({
  videos,
  navigation,
  title,
  onClick,
  inverted = true,
  onNavigate,
}) => {
  const { colors } = useTheme();
  return (
    <>
      {title && (
        <SpaceStyle bottom={20}>
          <CustomText style={{ fontSize: 10 }}>{title}</CustomText>
        </SpaceStyle>
      )}
      <FlatList
          showsHorizontalScrollIndicator={false}

        keyExtractor={(item) => item?._id}
        data={videos}
        inverted={inverted}
        renderItem={({ item }) => (
          <VideoPlayListItemComponent
            item={item}
            navigation={navigation}
            onClick={onClick}
            onNavigate={onNavigate}
          />
        )}
      />
    </>
  );
};
export default VideosListComponent;
