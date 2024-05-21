import { FlatList } from "react-native";
import ChannelItemComponent from "./ChannelItemComponent";

const ChannelsListComponent = ({ channels, navigation, setChannnelData }) => {
  channels.map((element) => {
    element.posts = [...(element.voices || []), ...(element.videos || [])];
  });
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      data={channels}
      // onEndReached={() => {
      //   if (!isFinishPages)
      //     setFilter({ ...filter, ...{ pageId: filter.pageId + 1 } });
      // }}
      renderItem={({ item, index }) => (
        <ChannelItemComponent
          setChannnelData={setChannnelData}
          channels={channels}
          index={index}
          item={item}
          navigation={navigation}
        />
      )}
    />
  );
};
export default ChannelsListComponent;
