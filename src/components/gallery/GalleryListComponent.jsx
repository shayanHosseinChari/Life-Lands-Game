import { FlatList, TouchableOpacity } from "react-native";
import { border } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";

const GalleryListComponent = ({ gallery, navigationHandle }) => {
  return (
    <FlatList
    showsHorizontalScrollIndicator={false}

      
      numColumns={3}
      style={{ alignSelf: "center" }}
      data={gallery}
      renderItem={({ item,index }) => (
        <TouchableOpacity
      
          onPress={() => {
            navigationHandle(item?.department, item?._id);
          }}
        >
          <SpaceStyle right={5} left={5} top={5} bottom={5}>
            <CustomImage
              aspect={1 / 1}
              width={3.7}
              image={item?.image}
              radius={border}
            />
          </SpaceStyle>
        </TouchableOpacity>
      )}
      keyExtractor={(item,index) => index}
    />
  );
};
export default GalleryListComponent;
