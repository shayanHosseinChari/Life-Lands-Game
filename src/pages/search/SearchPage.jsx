import { FlatList, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useEffect, useState } from "react";
import { Hr, Row, SpaceBetween } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import { Dimensions } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import {
  getUsersSearchHistoriesServer,
  mobileSearchEngineServer,
} from "../../service/MobileService";
import CustomText from "../../components/text/CustomText";
import CustomImage from "../../components/CustomImage/CustomImage";
import { useTheme } from "@react-navigation/native";
import { searchHistoryClearService } from "../../service/SearchHistoryService";

export const SearchPage = ({ route, navigation }) => {
  const { colors } = useTheme();
  const width = Dimensions.get("screen").width;
  const [searchHistories, setSearchHistories] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchDepartment] = useState(route?.params?.searchDepartment);
  const [isLoading, setIsLoading] = useState(false);
  const [nothingToShow, setNothingToShow] = useState(false);
  const [searchValue, setSearchValue] = useState();
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = async () => {
    const {
      data: { data: res },
    } = await getUsersSearchHistoriesServer({
      department: route?.params?.department,
    });
    setSearchHistories(res);
  };
  const searchHandler = async (text) => {
    if (text) setSearchValue(text);
    setSearch([]);
    setIsLoading(true);
    const {
      data: { data: res },
    } = await mobileSearchEngineServer({
      department: searchDepartment || "all",
      searchValue: text || searchValue,
    });
    setSearch(res);
    setIsLoading(false);
    setNothingToShow(res?.length == 0);
    getHistory();
  };
  const clearSearchHistory = async () => {
    const {
      data: { state },
    } = await searchHistoryClearService({
      department: route?.params?.department,
    });
    if (state) getHistory();
  };
  const navigateToPost = async (item) => {
    switch (item.department) {
      case "video":
        navigation.navigate(item.playList ? "Video Play List" : "Video Post", {
          id: item.playList || item._id,
        });
        break;
      case "voice":
        navigation.navigate("Voice Play List", {
          id: item?.playList,
          voiceId: item._id,
        });
        break;
      case "book":
        navigation.navigate("Book Post", {
          id: item?._id,
        });
        break;
      case "game":
        navigation.navigate("Game Post", {
          id: item?._id,
        });
        break;
    }
  };
  return (
    <View style={{paddingTop: StatusBar.currentHeight}}>
      <SpaceStyle top={10} left={5} right={5}>
        <SpaceBetween styles={{ padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              dark={require("../../../assets/icons/arrow-left.png")}
              light={require("../../../assets/icons/arrow-left.png")}
              style={{
                width: 20,
                height: 20,
                alignSelf: "center",
                marginVertical: 10,
                marginRight: 20,
              }}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", backgroundColor: "#252528", borderRadius: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setSearch([])
                setIsLoading(false)
                setNothingToShow(false)
                setSearchValue("")
              }}
              style={{
                marginHorizontal: 15,
                justifyContent: "center",
              }}
            >
              <Icon
                dark={require("../../../assets/icons/close.png")}
                light={require("../../../assets/icons/close.png")}
                style={{
                  width: 12,
                  height: 12,
                  alignItems: "center",
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
            <CustomInput
              value={searchValue}
              onChangeText={(e) => {
                setSearchValue(e);
              }}
              minWidth={width / 1.9}
              direction={"rtl"}
              placeholder={"عنوان جستجو"}
            />
            <TouchableOpacity
              onPress={() => searchHandler()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                marginTop: 2,
                marginRight: 10,
                justifyContent: "center",
              }}
            >
              <Icon
                dark={require("../../../assets/icons/search.png")}
                light={require("../../../assets/icons/search.png")}
                style={{
                  width: 20,
                  height: 20,
                  alignItems: "center",
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
          </View>
        </SpaceBetween>
      </SpaceStyle>
      <ScrollView style={{ marginBottom: 75 }}>
        {isLoading && <CustomText fontSize={14} style={{ padding: 20 }} selfCenter>در حال جستجو</CustomText>}
        {nothingToShow && (
          <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 50, marginTop: 50 }}>
            <Icon
              dark={require("../../../assets/icons/nodata.png")}
              light={require("../../../assets/icons/nodata.png")}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
              }}
            />
            <CustomText selfCenter fontSize={14}>متاسفم! محتوایی با این عنوان پیدا نشد</CustomText>
          </View>
        )}
        <FlatList
          showsHorizontalScrollIndicator={false}

          style={{ alignSelf: "center" }}
          keyExtractor={(item) => item._id}
          data={search}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToPost(item)}>
              <SpaceStyle left={5} top={5} right={5} bottom={5}>
                <CustomImage
                  image={item?.image}
                  width={3.5}
                  aspect={1 / 1}
                  radius={10}
                />
                <CustomText
                  top={5}
                  width={3.8}
                  fontSize={10}
                  color={colors.lightTextColor}
                  style={{ alignSelf: "center" }}
                >
                  {item?.title}
                </CustomText>
              </SpaceStyle>
            </TouchableOpacity>
          )}
        />
        {/* <SpaceStyle>
              <TouchableOpacity onPress={() => navigateToPost(item)}>
                <Row styles={{ borderBottomWidth: 1, borderBottomColor: "#404040", paddingVertical: 15 }}>
                  <View style={{ justifyContent: "center" }}>
                    <CustomText
                      width={1.3}
                      fontSize={12}
                      right={10}
                      style={{ alignSelf: "center" }}
                    >
                      {item?.title}
                    </CustomText>
                    {/* <CustomText
                      width={1.3}
                      fontSize={7}
                      color={colors.lightTextColor}
                      right={10}
                      style={{ alignSelf: "center" }}
                    >
                      {item?.title}
                    </CustomText>
                  </View>
                  <Icon
                    dark={require("../../../assets/icons/search.png")}
                    light={require("../../../assets/icons/search.png")}
                    style={{
                      width: 25,
                      height: 25,
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  />
                </Row>
              </TouchableOpacity>
            </SpaceStyle> */}
        {!nothingToShow && (
          <>
            <SpaceBetween styles={{ padding: 15 }}>
              <CustomText
                onClick={() => clearSearchHistory()}
                left={10}
                selfCenter
                top={3}
                fontSize={11}
                color={colors.red}
              >
                حذف تاریخچه
              </CustomText>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <CustomText selfCenter fontSize={14}>جستجو های قبلی</CustomText>
                <Icon
                  dark={require("../../../assets/icons/clock.png")}
                  light={require("../../../assets/icons/clock.png")}
                  style={{
                    width: 20,
                    height: 20,
                    alignItems: "center",
                    alignSelf: "center",
                    marginLeft: 5
                  }}
                />
              </View>
            </SpaceBetween>
            <FlatList
              style={{ alignSelf: "center", flexDirection: 'row', flexWrap: 'wrap', width: "100%", padding: 15 }}
              keyExtractor={(item) => item._id}
              data={searchHistories}
              numColumns={4}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{ borderWidth: 1, borderColor: "#404040", width:73, flex: 1, borderRadius: 5, textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex", paddingHorizontal: 15, paddingVertical: 7, margin: 5 }}>
                  <TouchableOpacity
                    onPress={() => {
                      searchHandler(item?.searchText);
                    }}
                  >
                    <CustomText>{item?.searchText.substring(0, 10)}</CustomText>
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};
export default SearchPage;
