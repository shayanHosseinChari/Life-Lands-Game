import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import CustomText from "../../components/text/CustomText";
import { View } from "react-native";
import CustomImage from "../../components/CustomImage/CustomImage";
import { CenterStyled, Hr, Row } from "../../style/uiUtil";
import { useTheme } from "@react-navigation/native";
import HeaderComponent from "../../components/layout/HeaderComponent";
import { FlatList, Dimensions, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { RootContext } from "../../context/RootContext";
import RoomStatusComponent from "../../components/room/RoomStatusComponent";
import SpaceStyle from "../../style/SpaceStyle";
import HorizontalRoomUserShowComponent from "../../components/room/HorizontalRoomUserShowComponent";

const RoomPage = ({ route }) => {
  const [room, setRoom] = useState(route?.params?.roomData);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const { lastRoom, onStartRoomChallenge, onAddViewer, onExitViewer, socket } =
    useContext(SocketContext);
  const { user } = useContext(RootContext);
  const { colors } = useTheme();

  useEffect(() => {
    if (room?.id) connectRoom();
  }, []);

  useEffect(() => {
    return () => {
      if (room?.id) onExitViewer(room.id);
    };
  }, []);

  const connectRoom = async () => {
    onAddViewer(room.id);
    socket?.on("viewerData", (roomViewer) => {
      setRoom(roomViewer);
    });
  };
  return (
    <View style={{ height, width }}>
      <HeaderComponent
        hasBack={true}
        title={`اتاق بازی ${(room || lastRoom)?.roomName}`}
      />

      <ScrollView>
        {room?.status && <RoomStatusComponent status={room?.status} />}
        {room?.viewers && (
          <FlatList
          showsHorizontalScrollIndicator={false}

            keyExtractor={(item) => item?.data}
            data={room?.viewers}
            horizontal
            inverted={true}
            renderItem={({ item, index }) => (
              <SpaceStyle left={10}>
                <CustomText width={8} selfCenter right={10}>
                  {item?.fullName}
                </CustomText>
                <CustomImage
                  styles={{
                    borderColor: item.isViewing ? colors.green : undefined,
                    borderWidth: 2,
                  }}
                  image={item?.profile}
                  width={12}
                  height={50}
                  aspect={1 / 1}
                  radius={100}
                />
              </SpaceStyle>
            )}
          />
        )}
        <View>
          <CenterStyled>
            <View>
              <CustomText
                selfCenter
                fontSize={15}
                top={5}
                color={colors.primary}
                bottom={10}
              >
                رهبر اتاق
              </CustomText>
              <CustomImage
                image={(room || lastRoom)?.creator?.profile}
                width={8}
                aspect={1 / 1}
                radius={100}
                selfCenter
                styles={{ borderColor: colors.primary, borderWidth: 2 }}
                height={50}
              />
              <CustomText selfCenter>
                {(room || lastRoom)?.creator?.fullName}
              </CustomText>
            </View>
          </CenterStyled>
          <Hr />
          <HorizontalRoomUserShowComponent
            list={(room || lastRoom)?.usersJoined}
            title={"کاربران اضاف شده"}
          />

          <HorizontalRoomUserShowComponent
            list={(room || lastRoom)?.waitingUsers}
            title={"کاربران در انتظار پذیرش"}
          />
          <HorizontalRoomUserShowComponent
            list={(room || lastRoom)?.usersReceivers}
            title={"کاربران دعوت شده به اتاق"}
          />

          {room?.data && (
            <FlatList
            showsHorizontalScrollIndicator={false}

              keyExtractor={(item) => item?.data}
              data={room?.data}
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
                  <CustomText top={5}>{item.data}</CustomText>
                  <Hr padding={5} />
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
      {lastRoom?.creator?.userId == user?._id && (
        <CustomButton
          onClick={() => {
            onStartRoomChallenge((room || lastRoom)?.id);
          }}
          styles={{
            position: "absolute",
            bottom: 0,
            width,
          }}
        >
          شروع بازی
        </CustomButton>
      )}
    </View>
  );
};
export default RoomPage;
