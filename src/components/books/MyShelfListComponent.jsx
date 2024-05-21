import { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getShelfsItemsService,
  insertService,
  insertShelfService,
} from "../../service/ShelfService";
import CustomText from "../text/CustomText";
import CustomCard from "../CustomCard/CustomCard";
import CustomImage from "../CustomImage/CustomImage";
import CustomButton from "../CustomButton/CustomButton";
import { Row, SpaceBetween } from "../../style/uiUtil";
import SpaceStyled from "../../style/SpaceStyle";
import { insertShelfAPI } from "../../service/APIs";
import { OpenToast } from "../share/OpenToast";
import { BottomSheet } from "react-native-btr";
import CustomInput from "../CustomInput/CustomInput";
import { getShelfsBooksService } from "../../service/ShelfsBookService";
import GetBooksListComponent from "../posts/book/GetBooksListComponent";
import { border } from "../../appsetting/styleSetting";
import { useTheme } from "@react-navigation/native";

const MyShelfListComponent = ({ book, navigation }) => {
  const { colors } = useTheme();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [isNewShelfVisible, setIsNewShelfVisible] = useState(false);
  const [shelf, setShelf] = useState({});
  const [shelfs, setShelfs] = useState([]);
  const [shelfTitle, setShelfTitle] = useState("");
  const [isOnShelf, setIsOnShelf] = useState(false);
  const [shelfsBooks, setShelfsBooks] = useState([]);
  useEffect(() => {
    if (isOnShelf && shelf._id) {
      getShelfsBooks();
    }
  }, [isOnShelf, shelf]);
  useEffect(() => {
    getShelfs();
  }, []);
  const getShelfsBooks = async () => {
    const {
      data: { data: booksRes },
    } = await getShelfsBooksService(shelf._id);
    setShelfsBooks(booksRes);
  };
  const getShelfs = async () => {
    const {
      data: { data: shelfsResponse },
    } = await getShelfsItemsService();
    setShelfs(shelfsResponse);
  };
  const insertToShelf = async () => {
    if (shelf?._id) {
      const { data } = await insertShelfService({
        bookId: book._id,
        shelfId: shelf._id,
      });
      if (data.state) {
        OpenToast("ثبت شد", "به قفسه منتقل شد");
        navigation.goBack();
      }
    }
  };
  const insertShelfHandle = async () => {
    if (shelfTitle?.length > 1) {
      await insertService(shelfTitle);
      setShelfTitle("");
      setIsNewShelfVisible(false);
      getShelfs();
    }
  };
  return (
    <SpaceStyled right={20} left={20}>
      {book?._id && (
        <SpaceStyled bottom={20}>
          <CustomCard>
            <SpaceStyled right={20} left={20}>
              <SpaceBetween>
                <View style={{ alignSelf: "center" }}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <CustomText color={"#c95556"}>بازگشت</CustomText>
                  </TouchableOpacity>
                </View>
                <Row>
                  <View style={{ alignSelf: "center" }}>
                    <SpaceStyled right={10}>
                      <CustomText>{book.title}</CustomText>
                      <CustomText>{book?.author}</CustomText>
                    </SpaceStyled>
                  </View>
                  <View>
                    <CustomImage
                      aspect={3 / 4}
                      height={windowHeight / 13}
                      width={windowWidth / 13}
                      image={book?.image}
                      radius={0}
                    />
                  </View>
                </Row>
              </SpaceBetween>
            </SpaceStyled>
          </CustomCard>
        </SpaceStyled>
      )}
      {isOnShelf ? (
        <Fragment>
          <SpaceStyled bottom={20}>
            <TouchableOpacity
              onPress={() => {
                setShelfsBooks([]);
                setIsOnShelf(false);
                setShelf({});
              }}
            >
              <Row>
                <CustomText style={{ alignSelf: "center" }}>بازگشت</CustomText>
                <Image
                  source={require("../../../assets/icons/back.png")}
                  width={10}
                  height={10}
                  style={{
                    width: 10,
                    height: 10,
                    alignSelf: "center",
                    marginHorizontal: 10,
                  }}
                />
              </Row>
            </TouchableOpacity>
          </SpaceStyled>
          <GetBooksListComponent books={shelfsBooks} navigation={navigation} />
        </Fragment>
      ) : (
        <CustomCard
          color="#252429"
          paddingHorizontal={30}
          paddingTop={30}
          paddingBottom={30}
        >
          <FlatList
              showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            inverted={true}
            data={shelfs}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setShelf(item);
                  if (!book?._id) {
                    setIsOnShelf(true);
                  }
                }}
              >
                <SpaceStyled top={7} bottom={7}>
                  <View
                    style={
                      shelf?._id === item._id
                        ? {
                            backgroundColor: "#c79155",
                            padding: 10,
                            borderRadius: border,
                          }
                        : {
                            marginHorizontal: 10,
                          }
                    }
                  >
                    <SpaceBetween>
                      <View>
                        <Row>
                          <SpaceStyled top={7}>
                            <Image
                              source={require("../../../assets/icons/back.png")}
                              style={{
                                width: 10,
                                height: 10,
                                alignSelf: "center",
                                transform: [{ rotate: "181deg" }],
                              }}
                            />
                          </SpaceStyled>
                          <CustomText
                            style={{ marginTop: 2.2, marginHorizontal: 7 }}
                            color={"#737373"}
                          >
                            {item.booksCount}
                          </CustomText>
                        </Row>
                      </View>
                      <View>
                        <CustomText
                          color={
                            shelf?._id === item._id ? "#26252b" : "#737373"
                          }
                        >
                          {item.title}
                        </CustomText>
                      </View>
                    </SpaceBetween>
                  </View>
                </SpaceStyled>
              </TouchableOpacity>
            )}
          />
        </CustomCard>
      )}
      {book?._id && (
        <SpaceStyled top={10}>
          <CustomButton
            onClick={() => {
              insertToShelf();
            }}
            fontColor="#232728"
            icon={
              <Image
                source={require("../../../assets/icons/shelves.png")}
                style={{ width: 30, height: 30 }}
              />
            }
            color={"#c79155"}
          >
            {shelf?._id
              ? `انتقال به قفسه ${shelf.title}`
              : "یک قفسه را انتخاب کنید"}
          </CustomButton>
        </SpaceStyled>
      )}

      {!isOnShelf && (
        <SpaceStyled top={10}>
          <CustomButton
            onClick={() => setIsNewShelfVisible(true)}
            fontColor="#b7b6e0"
            icon={
              <Image
                source={require("../../../assets/icons/shell.png")}
                style={{ width: 25, height: 25 }}
              />
            }
          >
            ساختن قفسه جدید
          </CustomButton>
        </SpaceStyled>
      )}
      <BottomSheet
        onBackdropPress={() => setIsNewShelfVisible(false)}
        onBackButtonPress={() => setIsNewShelfVisible(false)}
        visible={isNewShelfVisible}
      >
        <View>
          <View
            style={{
              height: 200,
              backgroundColor: colors.background,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              borderTopLeftRadius: border,
              borderTopRightRadius: border,
            }}
          >
            <Row style={{ alignSelf: "center" }}>
              <CustomButton
                onClick={insertShelfHandle}
                style={{ alignSelf: "center" }}
                width={windowWidth / 4}
              >
                افزودن
              </CustomButton>
              <SpaceStyled left={10}>
                <CustomInput
                  onChangeText={(text) => setShelfTitle(text)}
                  style={{ alignSelf: "center" }}
                  value={shelfTitle}
                  width={windowWidth / 1.5}
                  placeholder="عنوان قفسه را وارد کنید"
                />
              </SpaceStyled>
            </Row>
          </View>
        </View>
      </BottomSheet>
    </SpaceStyled>
  );
};
export default MyShelfListComponent;
