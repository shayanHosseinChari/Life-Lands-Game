import { View, TouchableOpacity, Image, FlatList } from "react-native";
import SpaceStyle from "../../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../../style/uiUtil";
import CustomText from "../../text/CustomText";
import PaintsHomePageComponent from "./PaintsHomePageComponent";
import React from "react";
import { useListSlicerWraper } from "../utility";
import NavigateActionComponent from "../NavigateActionComponent";
const MergePaintsHomePage = ({ navigation, lastPaints }) => {
  const flatList1 = React.createRef();
  const flatList2 = React.createRef();

  const { firstList, secondList } = useListSlicerWraper(lastPaints);

  let elements = [
    {
      id: "paint-1",
      element: (
        <PaintsHomePageComponent
          flatList={flatList1}
          navigation={navigation}
          lastPaints={firstList}
        />
      ),
    },
    {
      id: "video-2",
      element: (
        <PaintsHomePageComponent
          flatList={flatList2}
          navigation={navigation}
          lastPaints={secondList}
        />
      ),
    },
  ];
  return (
    <SpaceStyle bottom={80}>
      <SpaceStyle right={20} left={20} bottom={15} top={20}>
        <SpaceBetween>
          <View style={{ alignSelf: "center" }}>
            <NavigateActionComponent target={"Paints Page"}>
              صفحه اصلی
            </NavigateActionComponent>
          </View>
          <Row>
            <CustomText style={{ marginRight: 10, marginBottom: 4 }}>
              نقاشی
            </CustomText>
            <Image
              source={require("../../../../assets/icons/PaintGallery.png")}
              style={{ width: 30, height: 30 }}
            />
          </Row>
        </SpaceBetween>
      </SpaceStyle>
      <FlatList
          showsHorizontalScrollIndicator={false}

        keyExtractor={(item) => item.id}
        data={elements}
        renderItem={({ item }) => <>{item.element}</>}
      />
    </SpaceStyle>
  );
};
export default MergePaintsHomePage;
