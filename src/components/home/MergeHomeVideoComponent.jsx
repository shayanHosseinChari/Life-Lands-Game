import { createRef, useEffect } from "react";
import { FlatList, Image, View } from "react-native";
import { TouchableOpacity } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import VideosComponent from "./VideosComponent";
import { useListSlicerWraper } from "./utility";
import NavigateActionComponent from "./NavigateActionComponent";

const MergeHomeVideoComponent = ({ videos, navigation, categoryBlock }) => {
  const flatList1 = createRef();
  const flatList2 = createRef();
  const flatList3 = createRef();
  const flatList4 = createRef();
  const { firstList, secondList, thirdList, fourthList } =
    useListSlicerWraper(videos);

  let elements = [
    {
      id: "video-1",
      element: (
        <VideosComponent
          flatList={flatList1}
          navigation={navigation}
          videos={firstList}
        />
      ),
    },
    {
      id: "video-2",
      element: (
        <VideosComponent
          flatList={flatList2}
          navigation={navigation}
          videos={secondList}
        />
      ),
    },
    {
      id: "video-3",
      element: (
        <VideosComponent
          flatList={flatList3}
          navigation={navigation}
          videos={thirdList}
        />
      ),
    },
    {
      id: "video-4",
      element: (
        <VideosComponent
          flatList={flatList4}
          navigation={navigation}
          videos={fourthList}
        />
      ),
    },
  ];
  return (
    <>
      <SpaceStyle right={20} left={30} bottom={20} top={20}>
        <SpaceBetween>
          <View style={{ alignSelf: "center" }}>
            <NavigateActionComponent target={"Videos Post"}>
              صفحه اصلی
            </NavigateActionComponent>
          </View>
          <Row>
            <CustomText style={{ marginRight: 10, marginBottom: 4 }}>
              TV
            </CustomText>
            <Image
              source={require("../../../assets/icons/tv.png")}
              style={{ width: 30, height: 30 }}
            />
          </Row>
        </SpaceBetween>
      </SpaceStyle>
      <FlatList
          showsHorizontalScrollIndicator={false}

        onEndReachedThreshold={0.7}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={1} // Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={7}
        keyExtractor={(item) => item.id}
        data={elements}
        renderItem={({ item }) => <>{item.element}</>}
      />
      {categoryBlock}
    </>
  );
};
export default MergeHomeVideoComponent;
