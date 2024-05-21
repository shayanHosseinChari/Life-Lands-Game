import {
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomText from "../../components/text/CustomText";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { CenterStyled, Hr, Row, SpaceBetween } from "../../style/uiUtil";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomImage from "../../components/CustomImage/CustomImage";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import SpaceStyle from "../../style/SpaceStyle";
import { useTheme } from "@react-navigation/native";
const ShareRoomDataPage = ({ navigation }) => {
  const width = Dimensions.get("window").width;
  const { onSendData, socket, currentRoom, setCurrentRoom, setLastRoom } =
    useContext(SocketContext);
  const [roomsData, setRoomsData] = useState([]);
  const { colors } = useTheme();
  const [message, setMessage] = useState("");
  useEffect(() => {
    return () => {
      socket?.emit("finishRoomChallange", currentRoom?.id);
      setCurrentRoom({});
    };
  }, []);
  socket?.on("dataTransport", (payload) => {
    setRoomsData([...roomsData, ...[payload]]);
  });
  socket?.on("leftUserRoom", (roomData, user) => {
    setRoomsData([
      ...roomsData,
      ...[
        {
          ...user,
          ...{ data: "خارج شد" },
        },
      ],
    ]);
  });

  return (
    <ScrollView>
      <View>
        <SpaceStyle top={10} bottom={10}>
          <CenterStyled>
            <CountdownCircleTimer
              isPlaying={true}
              size={80}
              strokeWidth={8}
              duration={currentRoom?.time}
              colors={["#1d9534", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[20, 10, 5, 0]}
            >
              {({ remainingTime }) => (
                <CustomText fontSize={20} selfCenter>
                  {remainingTime}
                </CustomText>
              )}
            </CountdownCircleTimer>
          </CenterStyled>
        </SpaceStyle>
        <CustomButton
          styles={{ marginBottom: 10 }}
          onClick={() => {
            socket?.emit("finishRoomChallange", currentRoom?.id);
            setCurrentRoom({});
            setLastRoom({});
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }, { name: "Online Users" }],
            });
          }}
        >
          پایان رقابت
        </CustomButton>
        <SpaceBetween>
          <CustomButton
            onClick={() => {
              onSendData(message);
              setMessage("");
            }}
          >
            ارسال
          </CustomButton>
          <CustomInput
            minWidth={width / 1.4}
            value={message}
            onChangeText={(e) => {
              setMessage(e);
            }}
            placeholder={"پیام..."}
          />
        </SpaceBetween>
        <FlatList
            showsHorizontalScrollIndicator={false}

          keyExtractor={(item) => item?.data}
          data={roomsData}
          inverted
          renderItem={({ item, index }) => (
            <View>
              <Row>
                <CustomText selfCenter right={10}>
                  {item?.user?.fullName}
                </CustomText>
                <CustomImage
                  image={item?.user?.profile}
                  width={12}
                  height={80}
                  aspect={1 / 1}
                  radius={100}
                />
              </Row>
              <CustomText
                color={item.data == "خارج شد" ? colors.red : colors.white}
                top={5}
                bottom={10}
              >
                {item.data}
              </CustomText>
              <Hr />
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};
export default ShareRoomDataPage;
