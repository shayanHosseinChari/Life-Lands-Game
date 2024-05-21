import { Fragment, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import CustomButton from "../components/CustomButton/CustomButton";
import CustomInput from "../components/CustomInput/CustomInput";
import CustomText from "../components/text/CustomText";
import { RootContext } from "../context/RootContext";
import { SocketContext } from "../context/SocketContext";
import SpaceStyle from "../style/SpaceStyle";
import { Row } from "../style/uiUtil";

const SampleGame = ({
  route: {
    params: { userId },
  },
}) => {
  const [shareValue, setShareValue] = useState(0);
  const {
    shareDataHandler,
    lastValueRecieve,
    setLastValueRecieve,
    isConnected,
    onFinishCompetitionHandler,
    competition,
  } = useContext(SocketContext);
  const { user } = useContext(RootContext);
  const changeValueHandler = (isIncrease) => {
    let lastValue = shareValue;
    if (isIncrease) {
      lastValue = shareValue + 1;
      setShareValue(lastValue);
    } else {
      lastValue = shareValue - 1;
      setShareValue(lastValue);
    }
    shareDataHandler(userId, lastValue);
  };
  useEffect(() => {
    setLastValueRecieve(0);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Row>
        <CustomButton onClick={() => changeValueHandler(true)}>+</CustomButton>
        <CustomInput
          editable={false}
          placeholder={"شماره تماس"}
          value={shareValue + ""}
        />
        <CustomButton onClick={() => changeValueHandler(false)}>-</CustomButton>
      </Row>
      <CustomText>{lastValueRecieve}</CustomText>
      {/* <CustomText color={isConnected ? "green" : "red"}>
        وضعیفت اتصال : {isConnected ? "متصل" : "فطع شده"}
      </CustomText> */}

      <SpaceStyle top={20}>
        <CustomButton
          onClick={() => {
            onFinishCompetitionHandler({
              competitionId: competition.competitionId,
              winnerUserId: lastValueRecieve > shareValue ? userId : user._id,
              losserUserId: lastValueRecieve > shareValue ? user._id : userId,
              winnerScore:
                lastValueRecieve > shareValue ? lastValueRecieve : shareValue,
              losserScore:
                lastValueRecieve > shareValue ? shareValue : lastValueRecieve,
            });
          }}
        >
          پایان بازی
        </CustomButton>
      </SpaceStyle>
    </View>
  );
};
export default SampleGame;
