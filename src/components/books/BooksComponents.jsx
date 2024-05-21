import { FlatList, View } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import BooksComponentsItem from "./BooksComponentsItem";
import { TouchableOpacity } from "react-native";

const BooksComponents = ({ title, books, navigation, sort = "_id", cid="" }) => {
  console.log(sort);
  return (
    <SpaceStyle top={20}>
      <SpaceBetween>
        <SpaceStyle left={10} bottom={10}>
          <TouchableOpacity onPress={() => navigation.navigate("Public Page", { data: books, mode: "Book Post", title, sort, cid })}>
            <Row>
              <Icon
                dark={require("../../../assets/icons/arrow-left.png")}
                light={require("../../../assets/icons/arrow-left.png")}
                style={{ width: 16, height: 16, marginTop: 5 }}
              />
              <CustomText fontSize={14} selfCenter>
                بیشتر
              </CustomText>
            </Row>
          </TouchableOpacity>
        </SpaceStyle>
        <SpaceStyle right={10} bottom={10}>
          <CustomText fontSize={14}>{title}</CustomText>
        </SpaceStyle>
      </SpaceBetween>
      <FlatList
        horizontal={true}
        inverted={true}
        keyExtractor={(item) => item._id}
        data={books}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <BooksComponentsItem item={item} navigation={navigation} />}
      />
    </SpaceStyle>
  );
};
export default BooksComponents;
