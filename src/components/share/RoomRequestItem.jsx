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
import { useTheme } from "@react-navigation/native";
const RoomRequestItem = ({
  lastRoom,
  setIsShowLastRoomRequest,
  socket,
  setLastRoom,
}) => {
  let [item] = useState(lastRoom);
  const { colors } = useTheme();
  const [timer, setTimer] = useState(20);
  useEffect(() => {
    setTimer(20);
  }, [lastRoom, item]);
  return (
    <View
      style={{
        backgroundColor: "#222121",
        position: "absolute",
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
                    socket.emit("joinRoom", lastRoom?.id);
                    setLastRoom({});
                    setIsShowLastRoomRequest(false);
                  }}
                >
                  پذیرش
                </CustomButton>
              </SpaceStyle>
              <SpaceStyle right={5} left={5}>
                <CustomButton
                  color={redColor}
                  onClick={() => {
                    setLastRoom({});
                    setIsShowLastRoomRequest(false);
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
                <CustomText fontSize={9} color={"white"}>
                  {item?.roomName}
                </CustomText>
                <CustomText
                  width={5}
                  fontSize={7}
                  color={colors.lightTextColor}
                >
                  بازی : {item?.game?.title}
                </CustomText>
                <CustomText
                  width={5}
                  fontSize={7}
                  color={colors.lightTextColor}
                >
                  {item?.creator?.fullName}
                </CustomText>
              </SpaceStyle>
              <CustomImage
                image={item?.game?.image}
                radius={500}
                width={9}
                height={50}
                aspect={1 / 1}
              />
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
                    setIsShowLastRoomRequest(false);
                    setLastRoom({});
                  }}
                  size={35}
                  strokeWidth={3}
                  duration={timer}
                  colors={["#1d9534", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[20, 10, 5, 0]}
                >
                  {({ remainingTime }) => (
                    <TouchableOpacity
                      onPress={() => setIsShowLastRoomRequest(false)}
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
            </Row>
          </SpaceStyle>
        </View>
      </SpaceBetween>
    </View>
  );
};
export default RoomRequestItem;
