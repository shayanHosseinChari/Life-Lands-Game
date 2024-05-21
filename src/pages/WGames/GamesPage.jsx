import { useEffect, useState } from "react";
import {
  consoleGameService,
  getCategoriesService,
  mainGameService,
  miniGameService,
} from "../../service/PostService";
import PageWrapper from "../../components/loading/PageWrapper";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MainGamesComponent from "../../components/wgames/MainGamesComponent";
import ConsoleGamesComponent from "../../components/wgames/ConsoleGamesComponent";
import MiniGameComponent from "../../components/wgames/MiniGameComponent";
import SpaceStyle from "../../style/SpaceStyle";
import CustomText from "../../components/text/CustomText";
import CustomInput from "../../components/CustomInput/CustomInput";
import { LinearGradient } from "expo-linear-gradient";
import HeaderComponent from "../../components/layout/HeaderComponent";
import { useTheme } from "@react-navigation/native";
import { CenterStyled, SpaceBetween } from "../../style/uiUtil";
import New from "../../../assets/icons/svg/new.svg";
import Good from "../../../assets/icons/svg/good.svg";
import Hardnes from "../../../assets/icons/svg/hardnes.svg";
import { FlatList } from "react-native";
import CategoryFilterItem from "../../components/share/CategoryFilterItem";
import Compare from "../../../assets/icons/svg/compare.svg";
const GamesPage = ({ route, navigation }) => {
  const { colors } = useTheme();
  const width = Dimensions.get("screen").width;
  const style = StyleSheet.create({
    card: {
      flexDirection: "row",
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 7,
      width: width / 3.5,
      alignSelf: "center",
      justifyContent: "center",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue: "",
    categoryId,
  });
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    getData();
  }, [filter]);
  useEffect(() => {
    if (!isLoading) {
      setGames([]);

      setFilter({
        pageId: 1,
        eachPerPage: 12,
        searchValue: "",
        categoryId,
      });
    }
  }, [categoryId]);
  const getData = async () => {
    setIsLoading(true);
    let res = {};
    switch (route?.params?.type) {
      case "Mini":
        const {
          data: { data: miniResponse },
        } = await miniGameService(filter);
        res = miniResponse;
        break;
      case "Main":
        const {
          data: { data: mainResponse },
        } = await mainGameService(filter);
        res = mainResponse;
        break;
      case "Console":
        const {
          data: { data: consoleResponse },
        } = await consoleGameService(filter);
        res = consoleResponse;
        break;
    }
    let mergeLists = [...games, ...res?.games];
    setIsFinishPages(res?.games?.length === 0);
    setGames(mergeLists);

    setIsLoading(false);
  };
  const getCategories = async () => {
    const {
      data: { data: categoriesResponse },
    } = await getCategoriesService({
      department: "game",
      searchValue: "",
    });
    setCategories(categoriesResponse);
  };

  return (
    <>
      <HeaderComponent
        rightSide={<Compare width={23} height={23} fill={"#000"} />}
        navigation={navigation}
        hasBack={true}
        title={`${route?.params?.type} Games`}
      />
      <PageWrapper>
        <ScrollView>
          <View
            style={{ width: width - 35, alignSelf: "center", marginTop: 10 }}
          >
            <CustomInput
              align="right"
              minWidth={width - 35}
              onChangeText={(value) => {
                setGames([]);
                setFilter({
                  ...filter,
                  ...{ searchValue: value, pageId: 1, eachPerPage: 12 },
                });
              }}
              placeholder={"جستجو کنید..."}
            />
          </View>
          {/* <View
            style={{ width: width - 35, alignSelf: "center", marginTop: 10 }}
          >
            <SpaceBetween>
              <View style={style.card}>
                <CustomText right={5} selfCenter>
                  محبوب ترین
                </CustomText>
                <Good width={23} height={23} fill={"#fff"} />
              </View>
              <View style={style.card}>
                <CustomText right={5} selfCenter>
                  جدید ترین
                </CustomText>
                <New width={23} height={23} fill={"#fff"} />
              </View>
              <View style={style.card}>
                <CustomText right={5} selfCenter>
                  سخت ترین
                </CustomText>
                <Hardnes width={23} height={23} fill={"#fff"} />
              </View>
            </SpaceBetween>
          </View> */}
          <SpaceStyle top={10}>
            <FlatList
              showsHorizontalScrollIndicator={false}

              horizontal
              keyExtractor={(item) => item?._id}
              inverted
              data={categories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setCategoryId(item?._id);
                  }}
                >
                  <CategoryFilterItem isActive={categoryId === item?._id}>
                    {item?.title || item}
                  </CategoryFilterItem>
                </TouchableOpacity>
              )}
            />
          </SpaceStyle>
          {route?.params?.type === "Main" && (
            <MainGamesComponent
              hasDivider={false}
              navigation={navigation}
              games={games}
            />
          )}
          {route?.params?.type === "Mini" && (
            <MiniGameComponent
              hasDivider={false}
              navigation={navigation}
              games={games}
            />
          )}
          {route?.params?.type === "Console" && (
            <ConsoleGamesComponent
              hasDivider={false}
              navigation={navigation}
              games={games}
            />
          )}
          <SpaceStyle>
            {isFinishPages ? (
              <View>
                <CustomText style={{ alignSelf: "center" }}>
                  تموم شد :(
                </CustomText>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setFilter({ ...filter, ...{ pageId: filter.pageId + 1 } });
                  }}
                >
                  <CustomText style={{ alignSelf: "center" }}>
                    بیشتر نشونم بده...
                  </CustomText>
                </TouchableOpacity>
              </View>
            )}
          </SpaceStyle>
        </ScrollView>
      </PageWrapper>
    </>
  );
};
export default GamesPage;
