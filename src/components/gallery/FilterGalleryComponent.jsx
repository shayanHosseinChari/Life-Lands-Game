import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "../../appsetting/icons";
import { lightBackground } from "../../style/globalStyle";
import SpaceStyle from "../../style/SpaceStyle";
import { Row } from "../../style/uiUtil";
import CustomInput from "../CustomInput/CustomInput";
import CategoryFilterItem from "../share/CategoryFilterItem";

const FilterGalleryComponent = ({
  setSearchValue,
  departments,
  setDepartment,
  categories,
  setCategoryId,
  department,
  categoryId,
}) => {
  return (
    <View style={lightBackground}>
      <View>
        <SpaceStyle right={10} left={10} top={5} bottom={20}>
          <Row>
            <Icon
              style={{
                marginRight: -35,
                alignSelf: "center",
                zIndex: 20,
                width: 17,
                height: 17,
              }}
              dark={require("../../../assets/icons/search2.png")}
              light={require("../../../assets/icons/Light/searchlight2.png")}
            />
            <View style={{ width: "100%" }}>
              <CustomInput
                align={"center"}
                placeholder={"جستجو کنید"}
                onChangeText={(value) => {
                  setSearchValue(value);
                }}
              />
            </View>
          </Row>
        </SpaceStyle>
      </View>
      <View>
        <SpaceStyle>
          <FlatList
              showsHorizontalScrollIndicator={false}

            keyExtractor={(item) => item._id}
            horizontal
            inverted={true}
            style={{ marginRight: 5 }}
            data={departments}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setDepartment(item?.department);
                }}
              >
                <CategoryFilterItem isActive={department === item?.department}>
                  {item?.title}
                </CategoryFilterItem>
              </TouchableOpacity>
            )}
          />
        </SpaceStyle>
        <SpaceStyle right={10} bottom={20}>
          <FlatList
              showsHorizontalScrollIndicator={false}

            horizontal
            keyExtractor={(item) => item._id}
            inverted={true}
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCategoryId(item?._id);
                }}
              >
                <CategoryFilterItem isActive={categoryId === item?._id}>
                  {item?.title}
                </CategoryFilterItem>
              </TouchableOpacity>
            )}
          />
        </SpaceStyle>
      </View>
    </View>
  );
};
export default FilterGalleryComponent;
