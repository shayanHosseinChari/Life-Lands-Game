import { Text, TouchableOpacity, View } from "react-native";
import { greenColor, redColor } from "../../appsetting/appsettingColor";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useEffect, useState } from "react";

const RequestItem = ({
  lastReq,
  isBottomBar,
  setIsShowLastRequest,
  socket,
  setLastReq,
  navigation,
  competition,
  setCompetition,
}) => {
  let [item] = useState(isBottomBar ? lastReq : competition);
  console.log("lasssssssssssssssssssssst");
  console.log(lastReq);
  const [timer, setTimer] = useState(20);
  useEffect(() => {
    setTimer(20);
  }, [lastReq, competition]);
  return (
    <View
      style={{
        backgroundColor: "#222121",
        position: isBottomBar ? "absolute" : undefined,
        bottom: 0,
        width: "100%",
      }}
    >
      <SpaceBetween>
        <View>
          <SpaceStyle>
            <View
              style={{
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 15,
                marginLeft: 20,
                flexDirection: "row",
              }}
            >
              <SpaceStyle right={5} left={5}>
                <CustomButton
                  color={greenColor}
                  onClick={() => {
                    socket.emit(
                      "actionRequest",
                      item?.sender?.userId || item?.sender?._id,
                      "accepted"
                    );
                    setIsShowLastRequest(false);
                    setTimeout(() => {
                      if (isBottomBar) {
                        console.log("4211111111111111111");
                        console.log({
                          sender: lastReq.sender,
                          reciever: lastReq.reciever,
                          game: lastReq.game || lastReq.gameId,
                          item: lastReq,
                        });
                        console.log("4211111111111111111");
                        lastReq = { ...lastReq, ...{ status: "accepted" } };
                        setLastReq(lastReq);
                        setCompetition(lastReq);

                        navigation.navigate("Start Tournament Page", {
                          sender: lastReq.sender,
                          reciever: lastReq.reciever,
                          game: lastReq.game || lastReq.gameId,
                          item: lastReq,
                        });
                      } else {
                        item.reciever.userId = item.reciever._id;
                        item.sender.userId = item.sender._id;

                        navigation.navigate("Start Tournament Page", {
                          sender: item.sender,
                          reciever: item.reciever,
                          game: item.game || item.gameId,
                          item,
                        });
                      }
                    }, 1000);
                  }}
                >
                  پذیرش
                </CustomButton>
              </SpaceStyle>
              <SpaceStyle right={5} left={5}>
                <CustomButton
                  color={redColor}
                  onClick={() => {
                    socket.emit(
                      "actionRequest",
                      item?.sender?.userId || item?.sender?._id,
                      "rejected"
                    );
                    setLastReq({});
                  }}
                >
                  رد کردن
                </CustomButton>
              </SpaceStyle>
            </View>
          </SpaceStyle>
        </View>
        <View>
          <SpaceStyle top={10} bottom={10}>
            <Row>
              <SpaceStyle top={5} right={5}>
                <CustomText color={"white"}>
                  {item?.game?.title || item?.gameId?.title}
                </CustomText>
                <CustomText color={"white"}>
                  امتیاز {item?.game?.score || item?.gameId?.score}
                </CustomText>
              </SpaceStyle>
              <CustomImage
                image={item?.game?.image || item?.gameId?.image}
                radius={500}
                width={9}
                height={50}
                aspect={1 / 1}
              />
              {isBottomBar && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                    marginRight: 5,
                  }}
                >
                  <CountdownCircleTimer
                    isPlaying={true}
                    onComplete={() => {
                      setIsShowLastRequest(false);
                    }}
                    size={35}
                    strokeWidth={3}
                    duration={timer}
                    colors={["#1d9534", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[20, 10, 5, 0]}
                  >
                    {({ remainingTime }) => (
                      <TouchableOpacity
                        onPress={() => setIsShowLastRequest(false)}
                        style={{
                          justifyContent: "center",
                          padding: 10,
                        }}
                      >
                        <Icon
                          dark={require("../../../assets/icons/close.png")}
                          light={require("../../../assets/icons/Light/tournament.png")}
                          style={{
                            width: 10,
                            height: 10,
                            alignSelf: "center",
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </CountdownCircleTimer>
                </View>
              )}
            </Row>
          </SpaceStyle>
        </View>
      </SpaceBetween>
    </View>
  );
};
export default RequestItem;
