import { useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import HeaderComponent from "../../components/layout/HeaderComponent";
import CustomText from "../../components/text/CustomText";
import { roomsService } from "../../service/RoomService";
import CustomCard from "../../components/CustomCard/CustomCard";
import CustomImage from "../../components/CustomImage/CustomImage";
import { Row, SpaceBetween } from "../../style/uiUtil";

const RoomsPage = ({ navigation }) => {
  const width = Dimensions.get("screen").width;
  const [rooms, setRooms] = useState([]);
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue: "",
  });

  useEffect(() => {
    getData();
  }, [filter]);

  const getData = async () => {
    let {
      data: { data: res },
    } = await roomsService(filter);

    let mergeLists = res.rooms.concat(rooms);

    setIsFinishPages(res?.rooms?.length === 0);
    setRooms(mergeLists);
    // setIsLoadingState(false);
  };
  return (
    <View>
      <HeaderComponent hasBack={true} title={"اتاق ها"} />
      <FlatList
          showsHorizontalScrollIndicator={false}

        style={{ alignSelf: "flex-end" }}
        keyExtractor={(item) => item._id}
        data={rooms}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              width,
              marginVertical: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room Page", { roomData: item });
              }}
            >
              <CustomCard
                styles={{
                  width: width / 1 - 40,
                }}
              >
                <SpaceBetween>
                  <Row>
                    <View style={{ alignSelf: "center" }}>
                      <View>
                        <CustomText>
                          تعداد کاربران : {item?.usersReceivers?.length || 0}
                        </CustomText>
                        <CustomText>
                          تعداد وارد شده ها : {item?.usersJoined?.length || 0}
                        </CustomText>
                        <CustomText>
                          تعداد بدون عملیات : {item?.waitingUsers?.length || 0}
                        </CustomText>
                      </View>
                    </View>
                    <CustomImage
                      image={item.gameId.image}
                      selfCenter
                      left={10}
                      aspect={1 / 1}
                      height={50}
                      width={10}
                      radius={100}
                    />
                  </Row>
                  <View>
                    <CustomText selfCenter width={10}>
                      {item.roomName}
                    </CustomText>
                    <CustomImage
                      image={item.creator.profileImage}
                      aspect={1 / 1}
                      height={50}
                      width={10}
                      radius={100}
                    />
                  </View>
                </SpaceBetween>
              </CustomCard>
            </TouchableOpacity>
          </View>
        )}
      />
      {isFinishPages ? (
        <>
          <CustomText style={{ alignSelf: "center" }}>تموم شد :(</CustomText>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setFilter({ ...filter, ...{ pageId: filter.pageId + 1 } });
          }}
        >
          <CustomText style={{ alignSelf: "center" }}>
            {" "}
            بیشتر نشونم بده...
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default RoomsPage;
