import { Image, TouchableOpacity } from "react-native";
import SpaceStyle from "../../../style/SpaceStyle";
import { CenterStyled, Row } from "../../../style/uiUtil";

const MainVoiceActionComponent = ({ soundAction, lastVoiceState }) => {
  return (
    <CenterStyled>
      <Row>
        <SpaceStyle left={10} right={10} top={5}>
          <TouchableOpacity
            onPress={() => {
              soundAction("back");
            }}
          >
            <Image
              source={require("../../../../assets/icons/back-10-sec.png")}
              width={30}
              style={{ width: 30, height: 30 }}
              height={30}
            />
          </TouchableOpacity>
        </SpaceStyle>
        {lastVoiceState.isPlaying ? (
          <SpaceStyle left={10} right={10}>
            <TouchableOpacity
              onPress={() => {
                soundAction("pause");
              }}
            >
              <Image
                source={require("../../../../assets/icons/pause-icon.png")}
                width={40}
                style={{ width: 40, height: 40 }}
                height={40}
              />
            </TouchableOpacity>
          </SpaceStyle>
        ) : (
          <SpaceStyle left={10} right={10}>
            <TouchableOpacity
              onPress={() => {
                soundAction("play");
              }}
            >
              <Image
                source={require("../../../../assets/icons/play-icon.png")}
                width={40}
                style={{ width: 40, height: 40 }}
                height={40}
              />
            </TouchableOpacity>
          </SpaceStyle>
        )}
        <SpaceStyle left={10} right={10} top={5}>
          <TouchableOpacity
            onPress={() => {
              soundAction("next");
            }}
          >
            <Image
              source={require("../../../../assets/icons/skip-icon.png")}
              width={30}
              style={{ width: 30, height: 30 }}
              height={30}
            />
          </TouchableOpacity>
        </SpaceStyle>
      </Row>
    </CenterStyled>
  );
};
export default MainVoiceActionComponent;
