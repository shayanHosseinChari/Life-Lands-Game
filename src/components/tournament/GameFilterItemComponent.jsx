import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import CustomCard from "../CustomCard/CustomCard";
import { useTheme } from "@react-navigation/native";
import { border } from "../../appsetting/styleSetting";
import { Row } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import CustomImage from "../CustomImage/CustomImage";
import { Icon } from "../../appsetting/icons";

const GameFilterItemComponent = ({ item, setGameId, gameId }) => {
  const styles = StyleSheet.create({
    logoIconStyle: {
      width: 30,
      height: 30,
      resizeMode: "contain",
    },
  });
  const { colors } = useTheme();
  return (
    <SpaceStyle left={5}>
      <TouchableOpacity
        onPress={() => {
          setGameId(item._id);
        }}
      >
        <View>
          <SpaceStyle left={3}>
            <CustomCard
              color={item._id === gameId ? "#8472F833" : "#282828"}
              borderRadius={7}
              paddingBottom={7}
              paddingTop={7}
              paddingHorizontal={20}
            >
              <CustomText
                style={{
                  alignSelf: "center",
                  fontSize: 11,
                  color: item.title === "LifeLands" ? "#B539E1" : "#fff",
                }}
              >
                {item.title}
              </CustomText>
            </CustomCard>
          </SpaceStyle>
        </View>
      </TouchableOpacity>
    </SpaceStyle>
  );
};
export default GameFilterItemComponent;
