import { FlatList } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import WGamesGameItemComponent from "./WGamesGameItemComponent";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import { RFPercentage } from "react-native-responsive-fontsize";
const WGamesGamesComponent = ({ title, games, navigation, sort = "_id", cid = "" }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState([]);

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    setIsVideoPlaying(viewableItems.map(item => item.item._id));
  }, []);

  const renderItem = useCallback(({ item }) => (
    <WGamesGameItemComponent
      item={item}
      navigation={navigation}
      isVideoPlaying={isVideoPlaying.includes(item._id)}
    />
  ), [isVideoPlaying]);

  return (
    <SpaceStyle top={30}>
      <SpaceBetween>
        <SpaceStyle left={5} right={5} bottom={10}>
      {
        games ?    <TouchableOpacity onPress={() => navigation.navigate("Public Page", { data: games, mode: "Game Post", title, sort, cid  })}>
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
      </TouchableOpacity>:<Row>
        <Feather name="emoji-sad" color={'white'} size={RFPercentage(2)} style={{marginHorizontal:10}}/>
        <CustomText>   هیچ بازی وجود ندارد  </CustomText>
        <Feather name="emoji-sad" color={'white'} size={RFPercentage(2)} style={{marginHorizontal:10}}/>

      </Row>
      }
        </SpaceStyle>
        <SpaceStyle right={10} bottom={10}>
          <CustomText fontSize={14}>{title}</CustomText>
        </SpaceStyle>
      </SpaceBetween>
      <FlatList
        horizontal={true}
        inverted={true}
        keyExtractor={(item) => item._id}
        data={games}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        renderItem={renderItem}
      />
    </SpaceStyle>
  );
};
export default WGamesGamesComponent;
