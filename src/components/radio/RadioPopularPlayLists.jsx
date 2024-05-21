import { FlatList, TouchableOpacity } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import RadioPopularPlayListItem from "./RadioPopularPlayListItem";

const RadioPopularPlayLists = ({ title, radios, navigation }) => {
  return (
    <SpaceStyle top={20}>
      <SpaceBetween>
        <SpaceStyle left={10} bottom={10}>
        <TouchableOpacity onPress={() => navigation.navigate("Public Page", { data: radios, mode: "Voice PlayList" , title})}>
          <Row>
            <Icon
              dark={require("../../../assets/icons/arrow-left.png")}
              light={require("../../../assets/icons/arrow-left.png")}
              style={{ width: 16, height: 16, marginTop: 5 }}
            />
            <CustomText fontSize={14} selfCenter>
              بیشتر
            </CustomText>
          </Row>
          </TouchableOpacity>
        </SpaceStyle>
        <SpaceStyle right={10} bottom={10}>
          <CustomText fontSize={14}>{title}</CustomText>
        </SpaceStyle>
      </SpaceBetween>
      <FlatList
          showsHorizontalScrollIndicator={false}

        horizontal={true}
        inverted={true}
        keyExtractor={(item) => item._id}
        data={radios}
        renderItem={({ item }) => <RadioPopularPlayListItem item={item} navigation={navigation} />}
      />
    </SpaceStyle>
  );
};
export default RadioPopularPlayLists;
