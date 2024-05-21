import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import {
  cardColor,
  lightTextColor,
  yellowColor,
} from "../../appsetting/appsettingColor";
import { getValueFor } from "../../appsetting/storeConfig";
import { border } from "../../appsetting/styleSetting";
import CommentItem from "../../components/comment/CommentItem";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomColorfulButton, {
  BTN_COLORS,
} from "../../components/CustomButton/CustomColorfulButton";
import CustomCard from "../../components/CustomCard/CustomCard";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomInput from "../../components/CustomInput/CustomInput";
import HeaderComponent from "../../components/layout/HeaderComponent";
import PageWrapper from "../../components/loading/PageWrapper";
import { OpenToast } from "../../components/share/OpenToast";
import CustomText from "../../components/text/CustomText";
import { getPostsCommentsService } from "../../service/CommentService";
import { insertCommentService } from "../../service/PostService";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";

const CommentPage = ({ route, navigation }) => {
  const [expandeComment, setExpandComment] = useState();

  const [isLoadingState, setIsLoadingState] = useState(true);
  const windowWidth = Dimensions.get("window").width;
  const postId = route?.params?.id;
  const [pageId, setPageId] = useState(1);
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState();
  const [score, setScore] = useState(3);
  const insertComment = async () => {
    if (!getValueFor()) {
      navigation.navigate("AlertScreen");
      return;
    }
    const { data } = await insertCommentService({
      postId,
      department: route?.params?.department,
      comment,
      score,
    });
    if (data.state) {
      setComment("");
      setScore(0);
      OpenToast("ثبت شد", "نظر شما با موفقیت ثبت شد");
    }
  };

  useEffect(() => {
    if (postId) getData();
  }, [pageId]);

  const getData = async () => {
    setIsLoadingState(true);
    const {
      data: { data: commentsResponse },
    } = await getPostsCommentsService(postId, {
      pageId,
      eachPerPage: 12,
    });
    if (pageId > 1) {
      //console.log("page");
      let commentsCopy = comments;
      let commentsContated = commentsCopy.concat(commentsResponse.comments);
      setComments(commentsContated);
    } else {
      //console.log("else");
      setComments(commentsResponse.comments);
    }
    setIsLoadingState(false);
  };
  return (
    <>
      <HeaderComponent
        hasBack={true}
        darkIcon={require("../../../assets/icons/comments.png")}
        lightIcon={require("../../../assets/icons/Light/commentslight.png")}
        navigation={navigation}
        title={"دیدگاه"}
      />
      <PageWrapper
        onRefresh={() => {
          getData();
        }}
        isLoadingState={isLoadingState}
      >
        <ScrollView>
          <SpaceStyle>
            <View>
              <SpaceStyle right={20} left={20}>
                <Rating
                  value={score}
                  ratingColor={yellowColor}
                  ratingBackgroundColor="#ffffff"
                  tintColor="#0E0D0C"
                  defaultRating={2}
                  onFinishRating={(score) => {
                    setScore(score);
                  }}
                  imageSize={35}
                  style={{ paddingVertical: 10 }}
                />

                <SpaceStyle top={10}>
                  <CustomInput
                    multiline
                    darkIcon={require("../../../assets/icons/comments.png")}
                    lightIcon={require("../../../assets/icons/Light/commentslight.png")}
                    minWidth={windowWidth - 90}
                    numberOfLines={5}
                    value={comment}
                    placeholder={"توضیحات"}
                    onChangeText={(value) => {
                      setComment(value);
                    }}
                  />
                </SpaceStyle>
              </SpaceStyle>
              <SpaceStyle top={10}>
                <Row>
                  <View
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      width: windowWidth,
                    }}
                  >
                    <CustomColorfulButton
                      color={BTN_COLORS.GREEN}
                      isWide={true}
                      onClick={insertComment}
                      darkIcon={require("../../../assets/icons/comments.png")}
                      lightIcon={require("../../../assets/icons/Light/commentslight.png")}
                    >
                      نظر خود را ثبت کنید
                    </CustomColorfulButton>
                  </View>
                </Row>
              </SpaceStyle>
              {/* <FlatList
                  showsHorizontalScrollIndicator={false}

                keyExtractor={(item) => item._id}
                data={comments}
                inverted={true}
                renderItem={({ item }) => (
                  <CommentItem
                    expandeComment={expandeComment}
                    setExpandComment={setExpandComment}
                    item={item}
                  />
                )}
              /> */}
              <TouchableOpacity onPress={() => setPageId(pageId + 1)}>
                <CustomText style={{ alignSelf: "center" }}>بیشتر</CustomText>
              </TouchableOpacity>
            </View>
          </SpaceStyle>
        </ScrollView>
      </PageWrapper>
    </>
  );
};
export default CommentPage;
