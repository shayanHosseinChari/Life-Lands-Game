import { useEffect } from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { Icon } from "../../appsetting/icons";
import { lightBackground } from "../../style/globalStyle";
import SpaceStyle from "../../style/SpaceStyle";
import { Row } from "../../style/uiUtil";
import CustomInput from "../CustomInput/CustomInput";
import CategoryFilterItem from "./CategoryFilterItem";

const DepartmentFilterComponent = ({
  setSearchValue,
  categories,
  setCategoryId,
  categoryId,
  color,
}) => {
  const width = Dimensions.get("window").width;
  return (
    <View>
      {setSearchValue && (
        <SpaceStyle top={10} right={15} left={15}>
          <Row>
            <Icon
              style={{
                marginRight: -35,
                alignSelf: "center",
                zIndex: 20,
                width: 25,
                height: 25,
              }}
              dark={require("../../../assets/icons/search.png")}
              light={require("../../../assets/icons/Light/searchlight2.png")}
            />
            <View style={{ width: "100%" }}>
              <CustomInput
                align="right"
                minWidth={width - 35}
                onChangeText={(value) => {
                  setSearchValue(value);
                }}
                placeholder={"جستجو کنید..."}
              />
            </View>
          </Row>
        </SpaceStyle>
      )}
      <SpaceStyle top={10}>
        <FlatList
            showsHorizontalScrollIndicator={false}

          horizontal
          keyExtractor={(item) => item?._id}
          inverted
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setCategoryId(item?._id);
              }}
            >
              <CategoryFilterItem isActive={categoryId === item?._id}>
                {item?.title || item}
              </CategoryFilterItem>
            </TouchableOpacity>
          )}
        />
      </SpaceStyle>
    </View>
  );
};
export default DepartmentFilterComponent;
