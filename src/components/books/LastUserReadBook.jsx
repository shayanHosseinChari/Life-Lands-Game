import { FlatList } from "react-native";
import LastUserReadBookItem from "./LastUserReadBookItem";

const LastUserReadBook = ({ books, navigation }) => {
  return (
    <FlatList
      horizontal={true}
      inverted={true}
      keyExtractor={(item) => item._id}
      data={books}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <LastUserReadBookItem item={item} navigation={navigation} />}
    />
  );
};
export default LastUserReadBook;
