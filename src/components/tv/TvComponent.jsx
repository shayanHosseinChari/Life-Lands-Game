import { FlatList, TouchableOpacity } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import TvComponentItem from "./TvComponentItem";

const TvComponent = ({ title, videos, navigation, sort = "_id", cid = "" }) => {
  return (
    <SpaceStyle top={20}>
      <SpaceBetween>
        <SpaceStyle left={5} right={5} bottom={15}>
          <TouchableOpacity onPress={() => navigation.navigate("Public Page", { data: videos, mode: "Video Post", title, sort, cid })}>
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
        data={videos}
        renderItem={({ item }) => <TvComponentItem item={item} navigation={navigation} />}
      />
    </SpaceStyle>
  );
};
export default TvComponent;
