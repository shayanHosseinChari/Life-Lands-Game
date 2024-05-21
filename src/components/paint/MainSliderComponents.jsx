import { FlatList } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import MainSliderComponentItems from "./MainSliderComponentItems";

const MainSliderComponents = ({ title, paints, navigation }) => {
  return (
    <SpaceStyle top={20}>
      <SpaceBetween>
        <SpaceStyle left={5} right={5} bottom={15}>
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
        data={paints}
        renderItem={({ item }) => <MainSliderComponentItems item={item} navigation={navigation} />}
      />
    </SpaceStyle>
  );
};
export default MainSliderComponents;
