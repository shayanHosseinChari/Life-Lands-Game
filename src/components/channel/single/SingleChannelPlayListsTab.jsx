import { ScrollView, View } from "react-native";
import PlayListsVideoComponent from "../../playList/video/PlayListsVideoComponent";

const SingleChannelPlayListsTab = ({ playlist, navigation, paging }) => {
  return (
    <ScrollView>
      <View>
        <PlayListsVideoComponent
          playLists={playlist}
          horizontal={false}
          navigation={navigation}
        />
        {paging}
      </View>
    </ScrollView>
  );
};
export default SingleChannelPlayListsTab;
