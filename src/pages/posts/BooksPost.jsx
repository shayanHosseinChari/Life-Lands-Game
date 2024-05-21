import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getCategoriesService,
  publicBooksService,
} from "../../service/PostService";
import SpaceStyle from "../../style/SpaceStyle";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/text/CustomText";
import {
  CenterStyled,
  Hr,
  Row,
  SpaceBetween,
  SpaceVerticalBetween,
} from "../../style/uiUtil";
import CustomInput from "../../components/CustomInput/CustomInput";
import CategoryFilterItem from "../../components/share/CategoryFilterItem";
import DepartmentFilterComponent from "../../components/share/DepartmentsFilterComponent";
import BooksListComponent from "../../components/books/BooksListComponent";
import PagingComponent from "../../components/share/PagingComponent";
import { getShelfsItemsService } from "../../service/ShelfService";
import CustomImage from "../../components/CustomImage/CustomImage";
import {
  inputBorderColor,
  menuColor,
  primaryColor,
  secondDarkColor,
} from "../../appsetting/appsettingColor";
import MyShelfListComponent from "../../components/books/MyShelfListComponent";
import SlidersComponent from "../../components/home/SlidersComponent";
import GetBooksListComponent from "../../components/posts/book/GetBooksListComponent";
import PageWrapper from "../../components/loading/PageWrapper";
import HeaderComponent from "../../components/layout/HeaderComponent";
const BooksPost = ({ navigation, route }) => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const windowWidth = Dimensions.get("window").width;

  const [isShelf, setIsShelf] = useState(route?.params?.isShelf);
  const [singleBook] = useState(route?.params?.singleBook);
  const [pageId, setPageId] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [books, setBooks] = useState();
  const [shelfsItems, setShelfsItems] = useState();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getData();
  }, [pageId, searchValue, categoryId]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    let {
      data: { data: categoriesResponse },
    } = await getCategoriesService({
      department: "book",
      searchValue: "",
    });
    categoriesResponse = [
      ...[
        {
          title: "همه",
        },
      ],
      ...categoriesResponse,
    ];
    setCategories(categoriesResponse);
  };
  const getData = async () => {
    // setIsLoadingState(true);
    const {
      data: { data: booksData },
    } = await publicBooksService({
      pageId,
      searchValue,
      categoryId,
      eachPerPage: 20,
    });
    if (pageId > 1) {
      setBooks([...books, ...booksData?.books]);
    } else {
      setBooks(booksData?.books);
    }
    setIsLoadingState(false);
  };
  return (
    <>
      <HeaderComponent
        hasBack={true}
        darkIcon={require("../../../assets/icons/two_book.png")}
        lightIcon={require("../../../assets/icons/Light/two_book2light.png")}
        navigation={navigation}
      />
      <PageWrapper
        onRefresh={async () => {
          getData();
        }}
        isLoadingState={isLoadingState}
      >
        <ScrollView>
          {/* <SlidersComponent sliders={books?.sliders} /> */}
          <SpaceStyle top={20}>
            <View>
              <CenterStyled>
                <Row>
                  <View width={windowWidth / 2}>
                    <SpaceStyle left={20} right={10}>
                      <CustomButton
                        icon={
                          <Image
                            width={25}
                            style={{ width: 25, height: 25 }}
                            height={25}
                            source={require("../../../assets/icons/library2.png")}
                          />
                        }
                        onClick={() => {
                          setIsShelf(true);
                        }}
                        fontColor="#a9a9a7"
                        color={isShelf ? undefined : "#252528"}
                      >
                        قفسه من
                      </CustomButton>
                    </SpaceStyle>
                  </View>
                  <View width={windowWidth / 2}>
                    <SpaceStyle left={10} right={20}>
                      <CustomButton
                        icon={
                          <Image
                            width={25}
                            style={{ width: 25, height: 25 }}
                            height={25}
                            source={require("../../../assets/icons/openbook.png")}
                          />
                        }
                        fontColor="#a9a9a7"
                        onClick={() => {
                          setIsShelf(false);
                        }}
                        color={isShelf ? "#252528" : undefined}
                      >
                        کتاب
                      </CustomButton>
                    </SpaceStyle>
                  </View>
                </Row>
              </CenterStyled>
            </View>
          </SpaceStyle>
          <Hr />
          {isShelf ? (
            <>
              <MyShelfListComponent navigation={navigation} book={singleBook} />
            </>
          ) : (
            <>
              <DepartmentFilterComponent
                categoryId={categoryId}
                categories={categories}
                setSearchValue={setSearchValue}
                setCategoryId={setCategoryId}
              />
              {books && (
                <SpaceStyle top={20}>
                  <View>
                    <GetBooksListComponent
                      books={books}
                      navigation={navigation}
                    />
                  </View>
                  <PagingComponent pageId={pageId} setPageId={setPageId} />
                </SpaceStyle>
              )}
            </>
          )}
        </ScrollView>
      </PageWrapper>
    </>
  );
};
export default BooksPost;
