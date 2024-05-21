import { FlatList, TouchableOpacity } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";

const GamesListComponent = ({ games, navigation }) => {
  return (
    <FlatList
    showsHorizontalScrollIndicator={false}

      numColumns={3}
      keyExtractor={(item) => item._id}
      data={games}
      renderItem={({ item }) => (
        <SpaceStyle bottom={10}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Game Post", { id: item?._id });
            }}
          >
            <SpaceStyle left={10} right={10}>
              <CustomImage image={item?.image} width={3.9} height={100} />
              <CustomText width={3.9}>{item?.title}</CustomText>
            </SpaceStyle>
          </TouchableOpacity>
        </SpaceStyle>
      )}
    />
  );
};
export default GamesListComponent;
