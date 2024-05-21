import { FlatList } from "react-native";
import TvVideoItemComponent from "./TvVideoItemComponent";

const TvNewVideoComponent = ({ videos }) => {
  return (
    <FlatList
    showsHorizontalScrollIndicator={false}

      horizontal={true}
      inverted={true}
      keyExtractor={(item) => item._id}
      data={videos}
      renderItem={({ item }) => <TvVideoItemComponent item={item} />}
    />
  );
};
export default TvNewVideoComponent;
