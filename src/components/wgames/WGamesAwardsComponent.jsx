import { FlatList } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import WGamesAwardItemComponent from "./WGamesAwardItemComponent";

const WGamesAwardsComponent = ({ awards, title }) => {
  return (
    <SpaceStyle top={20}>
      <SpaceBetween>
        <SpaceStyle left={10} bottom={5}>
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
        <SpaceStyle right={10} bottom={5}>
          <CustomText fontSize={14}>{title}</CustomText>
        </SpaceStyle>
      </SpaceBetween>
      <CustomImage
        isLocalAsset={true}
        resizeMode={"cover"}
        isBackground={true}
        image={require("../../../assets/icons/bg-colorful.png")}
        selfCenter
        width={1.04}
        top={10}
        height={190}
      >
        <FlatList
            showsHorizontalScrollIndicator={false}

          horizontal={true}
          inverted={true}
          keyExtractor={(item) => item._id}
          data={awards}
          renderItem={({ item }) => <WGamesAwardItemComponent award={item} />}
        />
      </CustomImage>
    </SpaceStyle>
  );
};
export default WGamesAwardsComponent;
