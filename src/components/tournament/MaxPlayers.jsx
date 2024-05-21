import { FlatList, View } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import SpaceStyle from "../../style/SpaceStyle";
import MaxPlayerItems from "./MaxPlayerItems";

const MaxPlayers = ({ players }) => {
console.log('players',players);
  return (
    <SpaceStyle>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        inverted={true}
        keyExtractor={(item) => item._id}
        data={players}
        renderItem={({ item }) => <MaxPlayerItems item={item} />}
      />
    </SpaceStyle>
  );
};
export default MaxPlayers;
