import { useTheme } from "@react-navigation/native";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { border } from "../../appsetting/styleSetting";
import { CenterStyled, Row, SpaceAround } from "../../style/uiUtil";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";

const LastCompetitionsComponent = ({ competitions }) => {
  const width = Dimensions.get("screen").width;
  const { colors } = useTheme();
  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      padding: 10,
    },
    text: {
      fontSize: 7,
      color: "#848585",
      marginVertical: 2,
    },
  });
  return (
    <View style={style.container}>
      <FlatList
        keyExtractor={(item) => item._id}
        horizontal
        inverted={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ marginRight: 5 }}
        data={competitions}
        renderItem={({ item }) => (
          <View
            style={{
              width: width / 3.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomImage
              image={item?.gameId?.image}
              width={7}
              styles={{ marginVertical: 5 }}
              aspect={1 / 1}
              height={50}
              radius={100}
            />
            <Row>
              <View>
                <CustomText width={10} style={style.text}>
                  {item?.winnerUserId?.userName}
                </CustomText>
              </View>
              <View>
                <CustomText width={10} style={style.text}>
                  {item?.losserUserId?.userName}
                </CustomText>
              </View>
            </Row>
            <CenterStyled>
              <CustomText style={style.text}>
                تعداد ست {item?.numberOfSet}
              </CustomText>
            </CenterStyled>
            <Row>
              <SpaceStyle right={7} left={7}>
                <CustomText color={"#81e868"}>{item?.winnerScore}</CustomText>
              </SpaceStyle>
              <SpaceStyle right={7} left={7}>
                <CustomText color={"#ff5397"}>{item?.losserScore}</CustomText>
              </SpaceStyle>
            </Row>
          </View>
        )}
      />
    </View>
  );
};
export default LastCompetitionsComponent;
