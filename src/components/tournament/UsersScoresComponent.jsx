import { FlatList, View } from "react-native";
import UserScoreItemComponent from "./UserScoreItemComponent";
import GameFilterComponent from "./GameFilterComponent";

const UsersScoresComponent = ({ usersScores }) => {
  console.log('users scores component : ',usersScores)
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        style={{
          alignSelf: "center",
        }}
        data={usersScores}
        renderItem={({ item, index }) => (
          index > 2 && <UserScoreItemComponent item={item} index={index} />
        )}
      />
    </View>
  );
};
export default UsersScoresComponent;
