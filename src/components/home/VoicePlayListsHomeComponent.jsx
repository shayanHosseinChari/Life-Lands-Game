import { Image, TouchableOpacity } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import PlayListsVoiceComponent from "../playList/voice/PlayListsVoiceComponent";
import CustomText from "../text/CustomText";

const VoicePlayListsHomeComponent = ({ playLists, navigation }) => {
  return (
    <>
      <SpaceStyle right={20} left={20} bottom={15} top={20}>
        <SpaceBetween>
          <SpaceStyle top={10}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Play Lists Voice Page", { hasBack: true });
              }}
            >
              <CustomText>مشاهده همه</CustomText>
            </TouchableOpacity>
          </SpaceStyle>
          <Row>
            <CustomText style={{ marginRight: 10, marginBottom: 4 }}>
              رادیو
            </CustomText>
            <Image
              source={require("../../../assets/icons/radio.png")}
              style={{ width: 30, height: 30 }}
            />
          </Row>
        </SpaceBetween>
      </SpaceStyle>

      <PlayListsVoiceComponent navigation={navigation} playLists={playLists} />
    </>
  );
};
export default VoicePlayListsHomeComponent;
