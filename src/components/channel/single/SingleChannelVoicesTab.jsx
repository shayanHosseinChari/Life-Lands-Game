import { View, FlatList } from "react-native";
import CustomImage from "../../CustomImage/CustomImage";
import CustomText from "../../text/CustomText";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";

const SingleChannelVoicesTab = ({ voices, paging, navigation }) => {
  return (
    <ScrollView>
      <View>
        <FlatList
            showsHorizontalScrollIndicator={false}
          style={{ alignSelf: "center" }}
          keyExtractor={(item) => item._id}
          numColumns={4}
          inverted={true}
          data={voices}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Voice Play List", {
                    voiceId: item._id,
                    voice: item,
                  });
                }}
              >
                <CustomImage
                  image={item?.image}
                  width={4.5}
                  styles={{ marginHorizontal: 5, marginVertical: 5 }}
                  aspect={1 / 1}
                  radius={0}
                />
                <CustomText width={4.5}>{item?.title}</CustomText>
              </TouchableOpacity>
            </View>
          )}
        />
        {paging}
      </View>
    </ScrollView>
  );
};
export default SingleChannelVoicesTab;
