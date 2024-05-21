import { createRef, useState, useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "../text/CustomText";
import BooksComponent from "./BooksComponent";
import { Row, SpaceBetween } from "../../style/uiUtil";
import SpaceStyle from "../../style/SpaceStyle";
import NavigateActionComponent from "./NavigateActionComponent";

const MergeHomeBook = ({ books, navigation, categoryBlock }) => {
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [thirdList, setThirdList] = useState([]);
  const flatList1 = createRef();
  const flatList2 = createRef();

  useEffect(() => {
    if (books) {
      if (books?.length >= 24) {
        setFirstList(books.slice(0, 7));
        setSecondList(books.slice(7, 15));
        setThirdList(books.slice(15, 23));
      } else if (books?.length >= 16) {
        setFirstList(books.slice(0, 7));
        setSecondList(books.slice(7, 15));
      } else {
        setFirstList(books.slice(0, 7));
      }
    }
  }, [books]);
  return (
    <>
      <SpaceStyle right={30} left={30} bottom={0} top={5}>
        <SpaceBetween>
          <View style={{ alignSelf: "center" }}>
            <NavigateActionComponent target={"Books Page"}>
              صفحه اصلی
            </NavigateActionComponent>
          </View>
          <Row>
            <CustomText style={{ marginRight: 10, marginBottom: 4 }}>
              کتاب
            </CustomText>
            <Image
              source={require("../../../assets/icons/openbook.png")}
              style={{ width: 30, height: 30 }}
            />
          </Row>
        </SpaceBetween>
      </SpaceStyle>

      {categoryBlock}
      <BooksComponent
        flatList={flatList1}
        books={firstList}
        navigation={navigation}
      />
      <BooksComponent
        flatList={flatList2}
        books={secondList}
        navigation={navigation}
      />
    </>
  );
};
export default MergeHomeBook;
