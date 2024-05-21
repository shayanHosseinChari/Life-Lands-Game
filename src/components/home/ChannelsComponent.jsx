import { FlatList } from "react-native";
import ChannelItem from "../channel/ChannelItem";
import CustomText from "../text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import { View, Image } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import NavigateActionComponent from "./NavigateActionComponent";
const ChannelsComponent = ({ channels, navigation }) => {
  return (
    <View>
      <SpaceStyle right={20} left={20} bottom={15} top={20}>
        <View>
          <SpaceBetween>
            <View style={{ alignSelf: "center", marginTop: 10 }}>
              <NavigateActionComponent target={"Channels Page"}>
                صفحه اصلی
              </NavigateActionComponent>
            </View>
            <Row>
              <CustomText style={{ marginRight: 10, marginBottom: 8 }}>
                کانال
              </CustomText>
              <Image
                source={require("../../../assets/icons/tv.png")}
                style={{ width: 30, height: 30 }}
              />
            </Row>
          </SpaceBetween>
        </View>
      </SpaceStyle>
      <FlatList
          showsHorizontalScrollIndicator={false}

        style={{ alignSelf: "flex-end" }}
        keyExtractor={(item) => item._id}
        inverted={true}
        data={channels}
        renderItem={({ item }) => (
          <ChannelItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};
export default ChannelsComponent;
