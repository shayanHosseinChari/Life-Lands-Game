import { FlatList, TouchableOpacity, View } from "react-native";
import { primaryColor } from "../../../appsetting/appsettingColor";
import SpaceStyle from "../../../style/SpaceStyle";
import { SpaceBetween } from "../../../style/uiUtil";
import CustomCard from "../../CustomCard/CustomCard";
import CustomText from "../../text/CustomText";

const TournamentComponent = ({ game, navigation }) => {
  return (
    <SpaceStyle top={20}>
      <FlatList
          showsHorizontalScrollIndicator={false}

        keyExtractor={(item) => item._id}
        data={game.tournaments}
        renderItem={({ item }) => (
          <SpaceStyle bottom={5} top={5}>
            <CustomCard>
              <SpaceBetween>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigation.navigate("Tournament Page", {
                        item,
                      });
                    }}
                  >
                    <CustomText style={{ color: primaryColor }}>
                      جزئیات
                    </CustomText>
                  </TouchableOpacity>
                </View>

                <View>
                  <CustomText>{item.title}</CustomText>
                </View>
              </SpaceBetween>
            </CustomCard>
          </SpaceStyle>
        )}
      />
    </SpaceStyle>
  );
};
export default TournamentComponent;
