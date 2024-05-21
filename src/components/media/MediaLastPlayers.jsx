import { FlatList, View } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import SpaceStyle from "../../style/SpaceStyle";
import MediaLastPlayerItems from "./MediaLastPlayerItems";

const MediaLastPlayers = ({ players }) => {

  return (
    <SpaceStyle>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        inverted={true}
        keyExtractor={(item) => item._id}
        data={players}
        renderItem={({ item }) => <MediaLastPlayerItems item={item} />}
      />
    </SpaceStyle>
  );
};
export default MediaLastPlayers;
