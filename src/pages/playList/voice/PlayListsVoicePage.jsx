import { Fragment, useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import HeaderComponent from "../../../components/layout/HeaderComponent";
import PageWrapper from "../../../components/loading/PageWrapper";
import PlayListItem from "../../../components/playList/voice/PlayListItem";
import CustomText from "../../../components/text/CustomText";
import { getVoicePlayListsService } from "../../../service/PlayListService";
import SpaceStyled from "../../../style/SpaceStyle";

const PlayListsVoicePage = ({ navigation }) => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 40,
    searchValue: "",
  });
  const [isFinishPages, setIsFinishPages] = useState(false);
  useEffect(() => {
    getData();
  }, [filter]);
  const getData = async (isRefresh) => {
    if (isRefresh) {
      setFilter({
        pageId: 1,
        eachPerPage: 40,
        searchValue: "",
      });
      setPlaylists([]);
      setIsFinishPages(false);
    }
    setIsLoadingState(true);
    let {
      data: { data: res },
    } = await getVoicePlayListsService(filter);
    let mergeLists = res.playlists.concat(playlists);

    setIsFinishPages(res?.playlists?.length === 0);
    setPlaylists(mergeLists);
    setIsLoadingState(false);
  };
  return (
    <Fragment>
      <HeaderComponent
        darkIcon={require("../../../../assets/icons/radio.png")}
        lightIcon={require("../../../../assets/icons/Light/radiolight.png")}
        navigation={navigation}
        title={"رادیو"}
      />
      <PageWrapper
        onRefresh={() => {
          getData(true);
        }}
        isLoadingState={isLoadingState}
      >
        <ScrollView>
          <SpaceStyled>
            <FlatList
                showsHorizontalScrollIndicator={false}

              style={{ alignSelf: "center" }}
              keyExtractor={(item) => item._id}
              numColumns={4}
              data={playlists}
              renderItem={({ item }) => (
                <PlayListItem width={5.7} item={item} navigation={navigation} />
              )}
            />
          </SpaceStyled>
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
        </ScrollView>
      </PageWrapper>
    </Fragment>
  );
};
export default PlayListsVoicePage;
