import { Image, TouchableOpacity, View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import React from "react";
import { useListSlicerWraper } from "./utility";
import PlayListsVoiceComponent from "../playList/voice/PlayListsVoiceComponent";
import NavigateActionComponent from "./NavigateActionComponent";

const MergeRadioComponent = ({ navigation, radio }) => {
  const flatList1 = React.createRef();
  const flatList2 = React.createRef();
  const flatList3 = React.createRef();
  const { firstList, secondList, thirdList } = useListSlicerWraper(radio);

  return (
    <>
      <SpaceStyle right={20} left={20} bottom={30} top={10}>
        <View>
          <SpaceBetween>
            <View style={{ alignSelf: "center", marginTop: 10 }}>
              <NavigateActionComponent target={"Play Lists Voice Page"}>
                صفحه اصلی
              </NavigateActionComponent>
            </View>
            <Row>
              <CustomText style={{ marginRight: 10, marginBottom: 8 }}>
                رادیو
              </CustomText>
              <Image
                source={require("../../../assets/icons/radio.png")}
                style={{ width: 30, height: 30 }}
              />
            </Row>
          </SpaceBetween>
        </View>
      </SpaceStyle>
      <PlayListsVoiceComponent
        navigation={navigation}
        flatList={flatList1}
        playLists={firstList}
      />
      <PlayListsVoiceComponent
        navigation={navigation}
        flatList={flatList2}
        playLists={secondList}
      />
      <PlayListsVoiceComponent
        navigation={navigation}
        flatList={flatList3}
        playLists={thirdList}
      />
    </>
  );
};
export default MergeRadioComponent;
