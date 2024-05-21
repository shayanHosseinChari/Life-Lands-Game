import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import SlidersComponent from "../../components/home/SlidersComponent";
import HeaderComponent from "../../components/layout/HeaderComponent";
import PageWrapper from "../../components/loading/PageWrapper";
import VideosListComponent from "../../components/posts/game/VideosListComponent";
import CategoryFilterItem from "../../components/share/CategoryFilterItem";
import DepartmentFilterComponent from "../../components/share/DepartmentsFilterComponent";
import PagingComponent from "../../components/share/PagingComponent";
import CustomText from "../../components/text/CustomText";
import {
  getCategoriesService,
  publicVideosService,
} from "../../service/PostService";
import SpaceStyle from "../../style/SpaceStyle";
import { CenterStyled } from "../../style/uiUtil";

const VideosPost = ({ navigation }) => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [videos, setVideos] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue,
    categoryId,
  });

  useEffect(() => {
    getData();
  }, [filter]);
  useEffect(() => {
    setVideos([]);
    setFilter({
      pageId: 1,
      eachPerPage: 12,
      searchValue,
      categoryId,
    });
  }, [categoryId, searchValue]);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const {
      data: { data: categoriesResponse },
    } = await getCategoriesService({
      department: "video",
      searchValue: "",
    });
    setCategories(categoriesResponse);
  };

  const getData = async (isRefresh) => {
    if (isRefresh) {
      setFilter({
        pageId,
        eachPerPage: 12,
        searchValue,
        categoryId,
      });
      setVideos([]);
      setIsFinishPages(false);
      setIsLoadingState(true);
    }
    const {
      data: { data: responseVideos },
    } = await publicVideosService(filter);

    let mergeLists = responseVideos?.videos?.concat(videos);
    setIsFinishPages(responseVideos?.videos?.length === 0);
    setVideos(mergeLists);
    setIsLoadingState(false);
  };
  return (
    <>
      <HeaderComponent
        hasBack={true}
        darkIcon={require("../../../assets/icons/youtube.png")}
        lightIcon={require("../../../assets/icons/Light/youtubelight.png")}
        navigation={navigation}
        title={"ویدیو ها"}
      />
      <PageWrapper
        onRefresh={async () => {
          getData();
        }}
        isLoadingState={isLoadingState}
      >
        <ScrollView>
          <DepartmentFilterComponent
            categoryId={categoryId}
            categories={categories}
            setCategoryId={setCategoryId}
            setSearchValue={setSearchValue}
          />
          {videos && (
            <CenterStyled>
              <SlidersComponent sliders={videos?.sliders} />
              <SpaceStyle top={20} right={20}>
                {videos && (
                  <VideosListComponent
                    navigation={navigation}
                    videos={videos}
                  />
                )}
                {isFinishPages ? (
                  <>
                    <CustomText style={{ alignSelf: "center" }}>
                      تموم شد :(
                    </CustomText>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setFilter({
                        ...filter,
                        ...{ pageId: filter.pageId + 1 },
                      });
                    }}
                  >
                    <CustomText style={{ alignSelf: "center" }}>
                      {" "}
                      بیشتر نشونم بده...
                    </CustomText>
                  </TouchableOpacity>
                )}
              </SpaceStyle>
            </CenterStyled>
          )}
        </ScrollView>
      </PageWrapper>
    </>
  );
};
export default VideosPost;
