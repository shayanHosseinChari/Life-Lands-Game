import { FlatList } from "react-native";
import CustomText from "../text/CustomText";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { LinearGradient } from "expo-linear-gradient";
import SpaceStyle from "../../style/SpaceStyle";
import { Icon } from "../../appsetting/icons";
import WGamesStoreItemomponent from "./WGamesStoreItemomponent";

const WGamesStoresomponent = ({ stores, title }) => {
  return (
    <SpaceStyle top={20}>
      <SpaceBetween>
        <SpaceStyle left={10} bottom={10}>
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
      <LinearGradient
        colors={["rgba(0,0,0,0)", "#544881"]}
        style={{
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
            showsHorizontalScrollIndicator={false}

          horizontal={true}
          inverted={true}
          keyExtractor={(item) => item._id}
          data={stores}
          renderItem={({ item }) => <WGamesStoreItemomponent store={item} />}
        />
      </LinearGradient>
    </SpaceStyle>
  );
};
export default WGamesStoresomponent;
