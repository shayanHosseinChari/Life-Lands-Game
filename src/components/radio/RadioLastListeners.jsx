import { FlatList } from "react-native";
import RadioLastListenerItem from "./RadioLastListenerItem";

const RadioLastListeners = ({ radios, navigation }) => {
  return (
    <FlatList
    showsHorizontalScrollIndicator={false}

      horizontal={true}
      inverted={true}
      keyExtractor={(item) => item._id}
      data={radios}
      renderItem={({ item }) => <RadioLastListenerItem item={item} navigation={navigation} />}
    />
  );
};
export default RadioLastListeners;