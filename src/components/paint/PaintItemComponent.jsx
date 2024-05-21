import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import CustomImage from "../CustomImage/CustomImage";
import { Icon } from "../../appsetting/icons";
import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { PaintContext } from "../../context/PaintContext";
import { border } from "../../appsetting/styleSetting";
import { LOAD_FILE } from "../../service/APIs";
import CustomButton from "../CustomButton/CustomButton";
import { deletePaintService } from "../../service/paintService";

const PaintItemComponent = ({
  item,
  navigation,
  isUserSide = false,
  onDeletePaint,
}) => {
  const { colors } = useTheme();

  const width = Dimensions.get("screen").width;
  const styles = StyleSheet.create({
    itemContainer: {
      width: width / 3.5,
      margin: 5,
    },
  });
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          if (isUserSide) {
            navigation.navigate("Paint Page", { paint: item });
          } else {
            navigation.navigate("Paint Viewer", { id: item?._id });
          }
        }}
      >
        <View>
          {item?.voice && (
            <View
              style={{
                alignSelf: "center",
                backgroundColor: colors.card,
                padding: 5,
                borderRadius: 10,
                position: "absolute",
                zIndex: 100,
                right: 5,
                top: 5,
              }}
            >
              <Icon
                dark={require("../../../assets/icons/voice-icon.png")}
                light={require("../../../assets/icons/voice-icon.png")}
                style={{ width: 15, height: 15 }}
              />
            </View>
          )}

          <Image
            source={{ uri: LOAD_FILE + item.image }}
            width={"100%"}
            height={100}
            resizeMode="contain"
            style={{
              width: "100%",
              height: 100,
            }}
          />
        </View>
      </TouchableOpacity>
      {isUserSide && (
        <CustomButton
          color={colors.red}
          onClick={async () => {
            onDeletePaint(item?._id);
          }}
        >
          حذف
        </CustomButton>
      )}
    </View>
  );
};
export default PaintItemComponent;
