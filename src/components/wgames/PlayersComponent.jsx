import { FlatList } from "react-native";
import PlayersItemComponent from "./PlayersItemComponent";

const PlayersComponent = ({ players }) => {
  return (
    <FlatList
    showsHorizontalScrollIndicator={false}

      horizontal={true}
      inverted={true}
      keyExtractor={(item) => item._id}
      data={players}
      renderItem={({ item }) => <PlayersItemComponent item={item} />}
    />
  );
};
export default PlayersComponent;
