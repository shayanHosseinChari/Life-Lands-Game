import { Fragment, createRef } from "react";
import SpaceStyle from "../../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../../style/uiUtil";
import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "../../text/CustomText";
import PaintsHomePageComponent from "./PaintsHomePageComponent";
import PaintContextProvider from "../../../context/PaintContextProvider";
import { useListSlicerWraper } from "../utility";

const PaintHomePageComponent = ({ lastPaints, navigation }) => {
  const { firstList, secondList, thirdList } = useListSlicerWraper(lastPaints);
  const flatList1 = createRef();
  const flatList2 = createRef();
  let ind1 = 0;
  let ind2 = 0;

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
    } catch (error) {
      ind1 = 0;
      ind2 = 0;
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
    } catch (error) {
      ind1 = 0;
      ind2 = 0;
    }
  };
  return (
    <Fragment>
      <PaintContextProvider>
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
                        source={require("../../../../assets/icons/back.png")}
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
                      source={require("../../../../assets/icons/back.png")}
                      style={{ width: 13, height: 13 }}
                    />
                  </TouchableOpacity>
                </Row>
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
          <PaintsHomePageComponent
            flatList={flatList1}
            lastPaints={firstList}
            navigation={navigation}
          />
          <PaintsHomePageComponent
            flatList={flatList2}
            lastPaints={secondList}
            navigation={navigation}
          />
        </>
      </PaintContextProvider>
    </Fragment>
  );
};
export default PaintHomePageComponent;
