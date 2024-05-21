import { useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import {
  getCategoriesService,
  publicGamesService,
} from "../../service/PostService";
import { CenterStyled } from "../../style/uiUtil";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomText from "../../components/text/CustomText";
import CustomInput from "../../components/CustomInput/CustomInput";
import CategoryFilterItem from "../../components/share/CategoryFilterItem";
import DepartmentFilterComponent from "../../components/share/DepartmentsFilterComponent";
import GamesListComponent from "../../components/games/GamesListComponent";
import SlidersComponent from "../../components/home/SlidersComponent";
import PageWrapper from "../../components/loading/PageWrapper";
import HeaderComponent from "../../components/layout/HeaderComponent";
const GamesPost = ({ navigation }) => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [categories, setCategories] = useState();
  const [pageId, setPageId] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [games, setGames] = useState();
  useEffect(() => {
    getData();
  }, [pageId, searchValue, categoryId]);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const {
      data: { data: categoriesResponse },
    } = await getCategoriesService({
      department: "game",
      searchValue: "",
    });
    setCategories(categoriesResponse);
  };
  const getData = async () => {
    setIsLoadingState(true);
    const {
      data: { data: gameData },
    } = await publicGamesService({
      pageId,
      eachPerPage: 50,
      categoryId,
      searchValue,
    });
    setGames(gameData);
    setIsLoadingState(false);
  };

  return (
    <>
      <HeaderComponent
        hasBack={true}
        darkIcon={require("../../../assets/icons/GAMES.png")}
        lightIcon={require("../../../assets/icons/Light/joysticklight2.png")}
        navigation={navigation}
        title={"بازی"}
      />
      <PageWrapper
        onRefresh={async () => {
          getData();
        }}
        isLoadingState={isLoadingState}
      >
        <ScrollView>
          <SlidersComponent sliders={games?.sliders} />
          <DepartmentFilterComponent
            categoryId={categoryId}
            categories={categories}
            setCategoryId={setCategoryId}
            setSearchValue={setSearchValue}
          />
          {games?.games && (
            <SpaceStyle top={20}>
              <CenterStyled>
                <View>
                  <GamesListComponent
                    games={games.games}
                    navigation={navigation}
                  />
                </View>
              </CenterStyled>
            </SpaceStyle>
          )}
        </ScrollView>
      </PageWrapper>
    </>
  );
};
export default GamesPost;
