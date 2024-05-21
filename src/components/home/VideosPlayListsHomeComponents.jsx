import { Image, View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import PlayListsVideoComponent from "../playList/video/PlayListsVideoComponent";
import CustomText from "../text/CustomText";
import { TouchableOpacity } from "react-native";
import { createRef } from "react";
import { useListSlicerWraper } from "./utility";

const VideosPlayListsHomeComponents = ({ playLists, navigation }) => {
  const flatList1 = createRef();
  const flatList2 = createRef();
  const flatList3 = createRef();
  const { firstList, secondList, thirdList } = useListSlicerWraper(playLists);
  let ind1 = 0;
  let ind2 = 0;
  let ind3 = 0;

  const _goToNextPage = () => {
    try {
      flatList1.current.scrollToIndex({
        index: ++ind1,
        animated: true,
      });
      flatList2.current.scrollToIndex({
        index: ++ind2,
        animated: true,
      });
      flatList3.current.scrollToIndex({
        index: ++ind3,
        animated: true,
      });
    } catch (error) {
      ind1 = 0;
      ind2 = 0;
      ind3 = 0;
    }
  };
  const _goToBackPage = () => {
    try {
      flatList1.current.scrollToIndex({
        index: --ind1,
        animated: true,
      });
      flatList2.current.scrollToIndex({
        index: --ind2,
        animated: true,
      });
      flatList3.current.scrollToIndex({
        index: --ind3,
        animated: true,
      });
    } catch (error) {
      ind1 = 0;
      ind2 = 0;
      ind3 = 0;
    }
  };
  return (
    <>
      <SpaceStyle right={20} left={20} bottom={15} top={20}>
        <SpaceBetween>
          <View style={{ alignSelf: "center" }}>
            <Row>
              <View style={{ marginRight: 40 }}>
                <TouchableOpacity
                  style={{ width: 25, height: 25 }}
                  onPress={() => _goToNextPage()}
                >
                  <Image
                    source={require("../../../assets/icons/back.png")}
                    style={{
                      width: 13,
                      height: 13,
                      transform: [{ rotate: "180deg" }],
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{ width: 25, height: 25 }}
                onPress={() => _goToBackPage()}
              >
                <Image
                  source={require("../../../assets/icons/back.png")}
                  style={{ width: 13, height: 13 }}
                />
              </TouchableOpacity>
            </Row>
          </View>
          <Row>
            <CustomText style={{ marginRight: 10, marginBottom: 4 }}>
              TV
            </CustomText>
            <Image
              source={require("../../../assets/icons/TV2.png")}
              style={{ width: 30, height: 30 }}
            />
          </Row>
        </SpaceBetween>
      </SpaceStyle>
      <PlayListsVideoComponent
        flatList={flatList1}
        playLists={firstList}
        navigation={navigation}
      />
      <PlayListsVideoComponent
        flatList={flatList2}
        playLists={secondList}
        navigation={navigation}
      />
      <PlayListsVideoComponent
        flatList={flatList3}
        playLists={thirdList}
        navigation={navigation}
      />
    </>
  );
};
export default VideosPlayListsHomeComponents;
