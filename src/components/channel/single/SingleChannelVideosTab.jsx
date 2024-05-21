import { ScrollView, View } from "react-native";
import SpaceStyle from "../../../style/SpaceStyle";
import VideosListComponent from "../../posts/game/VideosListComponent";

const SingleChannelVideosTab = ({ videos, navigation, paging }) => {
  return (
    <ScrollView>
      <View>
        <VideosListComponent navigation={navigation} videos={videos} />
        {paging}
      </View>
    </ScrollView>
  );
};
export default SingleChannelVideosTab;
