import { createRef, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import CustomText from "../../components/text/CustomText";
import { getBookAPIService } from "../../service/PostService";
import SpaceStyle from "../../style/SpaceStyle";
import BooksComponent from "../../components/home/BooksComponent";
import BasicBookInformationComponent from "../../components/posts/book/BasicBookInformationComponent";
import MoreInformationComponent from "../../components/posts/book/MoreInformationComponent";
import { getValueFor } from "../../appsetting/storeConfig";
import LoadingDialog from "../../components/share/LoadingDialog";
import PageWrapper from "../../components/loading/PageWrapper";
import HeaderComponent from "../../components/layout/HeaderComponent";
import PeronalBookPostComment from "../../components/books/PeronalBookPostComment";

const BookPost = (navigation) => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const { id } = navigation.route.params;
  const [book, setBook] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    if (!getValueFor()) {
      navigation.navigation.navigate("AlertScreen");
    }
    setIsLoadingState(true);
    const {
      data: { data: bookResponse },
    } = await getBookAPIService(id, { pageId: 1, eachPerPage: 12 });
    setBook(bookResponse);
    console.log('jindaBooolllllk',bookResponse)
    setIsLoadingState(false);
  };
  const flatList1 = createRef();
  let ind1 = 0;
  const _goToNextPage = () => {
    try {
      flatList1.current.scrollToIndex({
        index: ++ind1,
        animated: true,
      });
    } catch (error) {
      ind1 = -1;
    }
  };
  const _goToBackPage = () => {
    try {
      flatList1.current.scrollToIndex({
        index: --ind1,
        animated: true,
      });
    } catch (error) {
      ind1 = -1;
    }
  };
  return (
    <>
      <HeaderComponent
        hasBack={true}
        darkIcon={require("../../../assets/icons/library-icon.png")}
        lightIcon={require("../../../assets/icons/library-icon.png")}
        navigation={navigation.navigation}
      />
      <PageWrapper
        onRefresh={async () => {
          setIsLoadingState(true);
          const {
            data: { data: bookResponse },
          } = await getBookAPIService(id, { pageId: 1, eachPerPage: 12 });
          setBook(bookResponse);
          setIsLoadingState(false);
        }}
        isLoadingState={isLoadingState}
      >
        <ScrollView nestedScrollEnabled>
          <LoadingDialog visibleValue={isDownloading} />
          <View>
            {book && (
              <View>
                <SpaceStyle top={20}>
                  <BasicBookInformationComponent
                    onDownloadAction={(e) => {
                      setIsDownloading(!e);
                    }}
                    book={book}
                    navigation={navigation?.navigation}
                  />

                  <SpaceStyle right={10} left={10} top={30}>
                    <MoreInformationComponent book={book} />
                  </SpaceStyle>
                  <SpaceStyle right={10} left={10} top={20}>
                    <PeronalBookPostComment id={id} comments={book?.commentsData} postId={book?.book?._id} department={'book'} />
                    {/* <SpaceBetween>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigation.navigate("Posts Comments", {
                            id,
                            department: "book",
                          })
                        }
                      >
                        <CustomText color={lightTextColor}>
                          نمایش همه
                        </CustomText>
                      </TouchableOpacity>
                      <CustomText>نظرات اخیر</CustomText>
                    </SpaceBetween> */}
                  </SpaceStyle>
                  {/* <CommentsComponent
                    navigation={navigation.navigation}
                    id={id}
                    commentsData={book?.commentsData}
                  /> */}
                  <SpaceStyle right={10} left={10} top={20}>
                    <SpaceStyle bottom={15}>
                      {/* <SpaceBetween> */}
                      {/* <View style={{ alignSelf: "center" }}>
                          <Row>
                            <View style={{ marginRight: 40 }}>
                              <TouchableOpacity onPress={() => _goToNextPage()}>
                                <Image
                                  source={require("../../../assets/icons/back.png")}
                                  style={{
                                    width: 13,
                                    height: 13,
                                    transform: [{ rotate: "180deg" }],
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => _goToBackPage()}>
                              <Image
                                source={require("../../../assets/icons/back.png")}
                                style={{ width: 13, height: 13 }}
                              />
                            </TouchableOpacity>
                          </Row>
                        </View> */}
                      {/* </SpaceBetween> */}
                      <CustomText fontSize={14}>پیشنهاد اختصاصی برای شما</CustomText>
                    </SpaceStyle>
                    <BooksComponent
                      flatList={flatList1}
                      books={book?.suggestion}
                      navigation={navigation.navigation}
                    />
                  </SpaceStyle>
                </SpaceStyle>
              </View>
            )}
          </View>
        </ScrollView>
      </PageWrapper>
    </>
  );
};
export default BookPost;