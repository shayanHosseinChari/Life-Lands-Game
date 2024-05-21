import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { LOAD_FILE } from "../../../service/APIs";
import { useTheme } from "@react-navigation/native";

const PaintItemHomePageComponent = ({ item, navigation }) => {
  const { colors } = useTheme();
  const width = Dimensions.get("screen").width;
  return (
    <View style={{ width: 75, marginRight: 10, marginBottom: 10 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Paint Viewer", { id: item?._id });
        }}
      >
        <Image
          source={{ uri: LOAD_FILE + item.image }}
          width={75}
          style={{
            width: 75,
            aspectRatio: 1 / 1,
            borderRadius: 0,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default PaintItemHomePageComponent;
