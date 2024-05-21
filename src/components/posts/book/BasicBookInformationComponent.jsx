import { useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Rating } from "react-native-ratings";
import {
  lightTextColor,
  pinkColor,
  primaryColor,
  redColor,
  yellowColor,
} from "../../../appsetting/appsettingColor";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getValueFor } from "../../../appsetting/storeConfig";
import { border, postBorder } from "../../../appsetting/styleSetting";
import { RootContext } from "../../../context/RootContext";
import { singleBook } from "../../../database/openDatabase";
import useForceUpdate from "../../../database/useForceUpdate";
import {
  deleteShelfService,
  insertShelfService,
} from "../../../service/ShelfService";
import SpaceStyle from "../../../style/SpaceStyle";
import { CenterStyled, Row, SpaceBetween } from "../../../style/uiUtil";
import CustomButton from "../../CustomButton/CustomButton";
import CustomCard from "../../CustomCard/CustomCard";
import CustomImage from "../../CustomImage/CustomImage";
import CustomText from "../../text/CustomText";
import { likePostService } from "../../../service/PostService";
import { LOAD_FILE } from "../../../service/APIs";
import { LinearGradient } from "expo-linear-gradient";
import { RFPercentage } from "react-native-responsive-fontsize";

const BasicBookInformationComponent = ({
  book,
  navigation,
  onDownloadAction,
}) => {
  console.log('boooook ',book)
  const { onDownload } = useContext(RootContext);
  const { colors } = useTheme();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [inShelf, setInShelf] = useState(book.book.inShelf);
  const [bookActionBTN, setBookActionBTN] = useState("...");
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [isLikeState, setIsLikeState] = useState(book?.book?.isLiked || false);
  const [like,setLike] = useState(book.book.like)

  const addToShelf = async (bookId) => {
    if (!getValueFor()) {
      navigation.navigate("AlertScreen");
      return;
    }
    if (inShelf) {
      const { data } = await deleteShelfService(bookId);
      if (data.state) {
        setInShelf(false);
      }
    } else {
      const { data } = await insertShelfService({ bookId });
      if (data.state) {
        setInShelf(true);
      }
    }
  };
  const onDownloadHandler = async () => {
    if (!getValueFor()) {
      navigation.navigate("AlertScreen");
      return;
    } else {
      onDownload(book?.book, "book", (e) => {
        // onDownloadAction(e);
      });
    }
  };
  useEffect(() => {
    singleBook(forceUpdate, book?.book?._id, (isFind) => {
      if (isFind) {
        setBookActionBTN("خواندن کتاب");
      } else {
        setBookActionBTN("خواندن کتاب");
      }
    });
  }, []);
  const onLikeAction = async () => {
    const {
      data: { state },
    } = await likePostService({ postId: book?.book?._id, department: "book" });
    if (state) {
      if(isLikeState){
        setLike(like=>like -1)
      }else{
        setLike(like=>like +1)

      }
      setIsLikeState(!isLikeState);
    }
  };
  return (
    <View>
      <CenterStyled>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: windowWidth,
            marginTop: 20,
          }}
        >
          {/* <CustomImage
            aspect={3 / 4}
            height={windowHeight / 4}
            width={windowWidth / 4}
            image={book?.book?.image}
            radius={postBorder}
          /> */}
          <Image
            style={{
              width: windowWidth - 190,
              minHeight: 230,
              borderRadius: 10,
              resizeMode: "contain",
            }}
            width={100}
            source={{
              uri: `${LOAD_FILE}${book?.book?.image}`,
            }}
          />
          <SpaceStyle top={15}>
            <CustomText fontSize={17} style={{ alignSelf: "center" }}>
              {book?.book?.title}
            </CustomText>
          </SpaceStyle>
          <SpaceStyle top={5}>
            <CustomText fontSize={11} color={"#fff"} style={{ alignSelf: "center" }}>
              {book.book.author}
            </CustomText>
          </SpaceStyle>
          <SpaceStyle top={15}>
            <CustomText color={"#fff"} style={{ alignSelf: "center", backgroundColor: "#166A654D", padding: 5, paddingHorizontal: 10, borderRadius: 5 }}>
              دسته {book.book.category.title}
            </CustomText>
          </SpaceStyle>
          <SpaceStyle top={10}>
            <Rating
              value={book?.book?.score}
              ratingColor={yellowColor}
              ratingBackgroundColor="#ffffff"
              tintColor={colors.background}
              defaultRating={book?.book?.score}
              imageSize={40}
              readonly
              style={{ paddingVertical: 5 }}
            />
            {/* <CustomText
              color={colors.lightTextColor}
              style={{ alignSelf: "center" }}
            >
              از مجموع {book?.book?.scoreStatistic?.totalScore} رای
            </CustomText> */}
          </SpaceStyle>

          <CenterStyled>
            <SpaceStyle top={10}>
              <SpaceBetween>
                <Row>
                <View style={{justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity
                    onPress={onLikeAction}
                    style={{ alignSelf: "center" }}
                  >
                    {isLikeState ? (
                      <View style={{ backgroundColor: "#282828", padding: 10, borderRadius: 555 }}>
                        <AntDesign name="heart" color={'red'} size={RFPercentage(2)}/>
                      </View>
                    ) : (
                      <View style={{ backgroundColor: "#282828", padding: 10, borderRadius: 555 }}>
                        <AntDesign name="hearto" color={'gray'} size={RFPercentage(2)} />
                      </View>
                    )}
                  </TouchableOpacity>
          <Text style={{color:"white"}}>{like}</Text>
                </View>

                  <SpaceStyle left={10} right={10}>
                    {/* <TouchableOpacity
                      onPress={onLikeAction}
                      style={{ alignSelf: "center" }}
                    >
                      {isLikeState ? (
                        <View style={{ backgroundColor: "#282828", padding: 10, borderRadius: 555 }}>
                          <Image
                            source={require("../../../../assets/icons/archive-tick-fill.png")}
                            style={{
                              width: 30,
                              height: 30,
                              alignSelf: "center",
                            }}
                          />
                        </View>
                      ) : (
                        <View style={{ backgroundColor: "#282828", padding: 10, borderRadius: 555 }}>
                          <Image
                            source={require("../../../../assets/icons/archive-tick-solid.png")}
                            style={{
                              width: 30,
                              height: 30,
                              alignSelf: "center",
                              opacity: 0.5,
                            }}
                          />
                        </View>
                      )}
                    </TouchableOpacity> */}
                    <CustomButton
                      color={pinkColor}
                      width={windowWidth / 3}
                      onClick={() => {
                        if (!getValueFor()) {
                          navigation.navigate("AlertScreen");
                          return;
                        }
                        navigation.navigate("Books Post", {
                          isShelf: true,
                          singleBook: book.book,
                        });
                      }}
                      borderRadius={5555}
                      padding={100}
                      style={{
                        alignSelf: "center",
                        marginTop: 10,
                        height:45,
                        padding: 50,
                      }}
                      textStyle={{ padding: 2 }}
                    >
                      افزودن به قفسه
                    </CustomButton>
                  </SpaceStyle>
                </Row>
                <LinearGradient
                  colors={["#8472F8", "#5FBDFF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 555, overflow: "hidden", width: windowWidth / 2.5 , height:45}}
                >
                  <CustomButton
                    onClick={() => {
                      if (!getValueFor()) {
                        navigation.navigate("AlertScreen");
                        return;
                      }
                      // navigation.navigate("Web File Viewer", {
                      //   postId: book?.book?._id,
                      //   department: "book",
                      // });
                      // singleBook(
                      //   forceUpdate,
                      //   book?.book?._id,
                      //   (isFind, singleBookDB) => {
                      //     if (isFind) {
                      //       navigation.navigate("PDF Viewer", { item: singleBookDB });
                      //     } else {
                      //       onDownloadHandler();
                      //     }
                      //   }
                      // );
                      navigation?.navigate("Customize Book Reader", {
                        customizeBookId: book?.book?._id,
                      });
                    }}
                    style={{ alignSelf: "center" }}
                    textStyle={{ padding: 2 }}
                    styles={{ borderRadius: 555, flex: 1, backgroundColor: "transparent" }}
                  >
                    {bookActionBTN}
                  </CustomButton>
                </LinearGradient>
              </SpaceBetween>
            </SpaceStyle>
          </CenterStyled>
          {/* <SpaceStyle top={10}>
             <CustomButton
              onClick={onDownloadHandler}
              icon={
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    transform: [{ rotate: "90deg" }],
                  }}
                  source={require("../../../../assets/icons/back.png")}
                />
              }
              width={windowWidth / 1.05}
              style={{ alignSelf: "center" }}
            >
              خواندن کتاب
            </CustomButton> 
          </SpaceStyle> */}
          <SpaceStyle top={20} right={15} left={15}>
            <CustomText fontSize={14}>
              معرفی کتاب
            </CustomText>
            <CustomText style={{ alignSelf: "center" }} lines={1000}>
              {book?.book?.summary}
            </CustomText>
          </SpaceStyle>
        </View>
      </CenterStyled>
    </View>
  );
};
export default BasicBookInformationComponent;
