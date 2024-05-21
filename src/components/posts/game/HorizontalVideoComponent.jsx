import { FlatList } from "react-native";
import VideoItemComponent from "../../../pages/tv/VideoItemComponent";

const HorizontalVideoComponent = ({ videos, navigation }) => {
  return (
    <FlatList
    showsHorizontalScrollIndicator={false}

      horizontal={true}
      inverted={true}
      keyExtractor={(item) => item._id}
      data={videos}
      renderItem={({ item }) => (
        <VideoItemComponent navigation={navigation} item={item} />
      )}
    />
  );
};
export default HorizontalVideoComponent;
