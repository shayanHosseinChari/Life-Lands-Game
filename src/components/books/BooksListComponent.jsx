import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";

const BooksListComponent = ({ books, navigation }) => {
  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        numColumns={5}
        data={books}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <SpaceStyle bottom={15}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Book Post", { id: item?._id });
              }}
            >
              <SpaceStyle left={10} right={10}>
                <CustomImage image={item?.image} width={7} height={80} />
                <CustomText width={7}>{item?.title}</CustomText>
              </SpaceStyle>
            </TouchableOpacity>
          </SpaceStyle>
        )}
      />
    </>
  );
};
export default BooksListComponent;
