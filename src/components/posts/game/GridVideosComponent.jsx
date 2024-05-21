import { Dimensions, FlatList, View } from "react-native";
import VideoItemComponent from "../../../pages/tv/VideoItemComponent";

const GridVideosComponent = ({ videos, navigation }) => {
  return (
    <View>
      <FlatList
          showsHorizontalScrollIndicator={false}

        keyExtractor={(item) => item._id}
        numColumns={2}
        data={videos}
        renderItem={({ item }) => (
          <View
            style={{
              marginHorizontal: 20,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              alignContent: "center",
              width: "38%",
            }}
          >
            <VideoItemComponent navigation={navigation} item={item} />
          </View>
        )}
      />
    </View>
  );
};
export default GridVideosComponent;
