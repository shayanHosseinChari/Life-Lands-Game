import { FlatList, Image, TouchableOpacity, View } from "react-native";
import {
  Hr,
  Row,
  SpaceBetween,
  SpaceVerticalBetween,
} from "../../../style/uiUtil";
import CustomImage from "../../CustomImage/CustomImage";
import CustomText from "../../text/CustomText";

const GetBooksListComponent = ({ books, navigation }) => {
  return (
    <FlatList
      data={books}
      showsHorizontalScrollIndicator={false}

      keyExtractor={(item) => item?._id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 0, marginHorizontal: 20 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Book Post", { id: item?._id });
            }}
          >
            <SpaceBetween>
              <View>
                <SpaceVerticalBetween>
                  <View>
                    <CustomText></CustomText>
                  </View>
                </SpaceVerticalBetween>
              </View>
              <View>
                <Row>
                  <SpaceVerticalBetween>
                    <View style={{ marginRight: 20 }}>
                      <CustomText style={{ fontSize: 14 }}>
                        {item?.title}
                      </CustomText>
                      <CustomText color={"#5a5c62"}>{item?.author}</CustomText>
                    </View>
                    <View>
                      <View style={{ marginRight: 20 }}>
                        <Row>
                          <Image
                            source={require("../../../../assets/icons/form.png")}
                            style={{
                              width: 25,
                              height: 25,
                              marginHorizontal: 10,
                            }}
                          />
                          <CustomText>{item?.processPercent}</CustomText>
                        </Row>
                      </View>
                    </View>
                  </SpaceVerticalBetween>
                  <CustomImage
                    radius={0}
                    image={item?.image}
                    width={6}
                    height={90}
                  />
                </Row>
              </View>
            </SpaceBetween>
          </TouchableOpacity>
          <Hr />
        </View>
      )}
    />
  );
};
export default GetBooksListComponent;
