import { useContext, useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import HeaderComponent from "../../components/layout/HeaderComponent";
import PageWrapper from "../../components/loading/PageWrapper";
import RequestItem from "../../components/share/RequestItem";
import SmallTabItem from "../../components/share/SmallTabItem";
import TabItem from "../../components/share/TabItem";
import CustomText from "../../components/text/CustomText";
import { SocketContext } from "../../context/SocketContext";
import { usersCompetitionsServer } from "../../service/Competition";
import SpaceStyle from "../../style/SpaceStyle";
import { Hr, Row, SpaceAround, SpaceBetween } from "../../style/uiUtil";
import TournamentItem from "./TournamentItem";

const TournamentHistoryPage = ({ navigation }) => {
  const { lastReq, setIsShowLastRequest, setLastReq, socket } =
    useContext(SocketContext);

  let [isLoading, setIsLoading] = useState(false);
  const [actionner, setActionner] = useState();
  const [status, setStatus] = useState("accepted");
  const [type, setType] = useState();
  const [competitions, setCompetitions] = useState([]);
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
  });
  useEffect(() => {
    getData();
  }, [filter]);
  useEffect(() => {
    setFilter({
      pageId: 1,
      eachPerPage: 12,
      type,
      actionner,
      status,
    });
  }, [type, actionner, status]);
  const getData = async () => {
    const {
      data: { data: res },
    } = await usersCompetitionsServer({
      ...filter,
    });

    let mergeLists = res.competitions.concat(competitions);

    setIsFinishPages(res?.competitions?.length === 0);
    setCompetitions(mergeLists);
  };
  const onTabChange = (target, value) => {
    setCompetitions([]);
    setIsFinishPages(false);
    setTimeout(() => {
      switch (target) {
        case "status":
          setStatus(value);

        case "type":
          setType(value);

        case "actionner":
          setActionner(value);
      }
    }, 500);
  };
  return (
    <View>
      <HeaderComponent
        darkIcon={require("../../../assets/icons/tournament-history.png")}
        lightIcon={require("../../../assets/icons/Light/tournament-history.png")}
        hasBack={true}
        navigation={navigation}
        title="درخواست ها"
      />
      <ScrollView>
        <SpaceStyle top={10}>
          <View style={{ paddingBottom: 100 }}>
            <View>
              <SpaceAround>
                <TabItem
                  isSelected={actionner === "sender"}
                  darkIcon={require("../../../assets/icons/cups.png")}
                  lightIcon={require("../../../assets/icons/Light/cups.png")}
                  text={"دریافتی"}
                  width={"30%"}
                  onClick={() => onTabChange("actionner", "sender")}
                />
                <TabItem
                  isSelected={actionner === "reciever"}
                  darkIcon={require("../../../assets/icons/cups.png")}
                  lightIcon={require("../../../assets/icons/Light/cups.png")}
                  text={"ارسالی"}
                  width={"30%"}
                  onClick={() => onTabChange("actionner", "reciever")}
                />
                <TabItem
                  isSelected={actionner == null}
                  darkIcon={require("../../../assets/icons/cups.png")}
                  lightIcon={require("../../../assets/icons/Light/cups.png")}
                  text={"همه"}
                  width={"30%"}
                  onClick={() => onTabChange("actionner", null)}
                />
              </SpaceAround>
              <Hr />
              <Row>
                {/* <SmallTabItem
                  onClick={() => onTabChange("type", "win")}
                  isSelected={type === "win"}
                  text={"فقط باخت ها"}
                />
                <SmallTabItem
                  onClick={() => onTabChange("type", "lose")}
                  isSelected={type === "lose"}
                  text={"فقط برد ها"}
                /> */}
                <SmallTabItem
                  onClick={() => onTabChange("status", "waiting")}
                  isSelected={status === "waiting"}
                  text={"در انتظار"}
                />
                <SmallTabItem
                  onClick={() => onTabChange("status", "rejected")}
                  isSelected={status === "rejected"}
                  text={"رد شده"}
                />
                <SmallTabItem
                  onClick={() => {
                    onTabChange("type", null);
                    onTabChange("status", null);
                  }}
                  isSelected={type == null}
                  text={"همه"}
                />
              </Row>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}

              keyExtractor={(item) => item._id}
              data={competitions}
              renderItem={({ item }) => (
                <>
                  {item.status === "waiting" ? (
                    <RequestItem
                      isBottomBar={false}
                      lastReq={lastReq}
                      setIsShowLastRequest={setIsShowLastRequest}
                      setLastReq={setLastReq}
                      socket={socket}
                      navigation={navigation}
                      competition={item}
                    />
                  ) : (
                    <>
                      <TournamentItem navigation={navigation} item={item} />
                    </>
                  )}
                </>
              )}
            />
            {isFinishPages ? (
              <>
                <CustomText style={{ alignSelf: "center" }}>
                  تموم شد :(
                </CustomText>
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
        </SpaceStyle>
      </ScrollView>
    </View>
  );
};
export default TournamentHistoryPage;
