import { Image, TouchableOpacity } from "react-native";
import SpaceStyle from "../../../style/SpaceStyle";
import { CenterStyled, Row } from "../../../style/uiUtil";
import CustomText from "../../text/CustomText";

const VoiceActionComponent = ({
  soundAction,
  lastVoiceState,
  moveVoice,
  item,
}) => {
  return (
    <CenterStyled>
      <Row>
        <SpaceStyle left={20} right={20} top={5}>
          <TouchableOpacity
            style={{ width: 30, height: 30 }}
            onPress={() => {
              soundAction("mute");
            }}
          >
            {lastVoiceState?.isMuted ? (
              <Image
                source={require("../../../../assets/icons/voice-icon-mute.png")}
                width={20}
                style={{ width: 20, height: 20 }}
                height={20}
              />
            ) : (
              <Image
                source={require("../../../../assets/icons/voice-icon.png")}
                width={20}
                style={{ width: 20, height: 20 }}
                height={20}
              />
            )}
          </TouchableOpacity>
        </SpaceStyle>
        {!item?._id && (
          <>
            <SpaceStyle left={20} right={20}>
              <TouchableOpacity
                onPress={() => {
                  moveVoice(false);
                }}
              >
                <Image
                  source={require("../../../../assets/icons/back-control.png")}
                  width={30}
                  style={{ width: 30, height: 30 }}
                  height={30}
                />
              </TouchableOpacity>
            </SpaceStyle>
            <SpaceStyle left={20} right={20}>
              <TouchableOpacity
                onPress={() => {
                  moveVoice(true);
                }}
              >
                <Image
                  source={require("../../../../assets/icons/skip-control.png")}
                  width={30}
                  style={{ width: 30, height: 30 }}
                  height={30}
                />
              </TouchableOpacity>
            </SpaceStyle>
          </>
        )}

        <SpaceStyle left={20} right={20} top={5}>
          <TouchableOpacity
            style={{ width: 30, height: 30 }}
            onPress={() => {
              soundAction("rate");
            }}
          >
            <CustomText style={{ fontSize: 13 }} color={"#abafd1"}>
              {lastVoiceState.rate} X
            </CustomText>
          </TouchableOpacity>
        </SpaceStyle>
      </Row>
    </CenterStyled>
  );
};
export default VoiceActionComponent;
