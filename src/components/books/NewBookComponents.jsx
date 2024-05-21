import { FlatList, TouchableOpacity, View } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import SpaceStyle from "../../style/SpaceStyle";
import NewBookComponentsItem from "./NewBookComponentsItem";

const NewBookComponents = ({ title, books, navigation }) => {
  return (
    <SpaceStyle top={20}>
      <SpaceBetween>
        <SpaceStyle left={10} bottom={10}>
          <TouchableOpacity onPress={() => navigation.navigate("Public Page", { data: books, mode: "Book Post", title })}>
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
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        inverted={true}
        keyExtractor={(item) => item._id}
        data={books}
        renderItem={({ item }) => <NewBookComponentsItem item={item} navigation={navigation} />}
      />
    </SpaceStyle>
  );
};
export default NewBookComponents;
