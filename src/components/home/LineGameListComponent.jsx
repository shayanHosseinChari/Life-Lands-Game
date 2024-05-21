import {
  Dimensions,
  FlatList,
  StyleSheet,
  Touchable,
  TouchableHighlightBase,
  TouchableOpacity,
  View,
} from "react-native";
import { getValueFor } from "../../appsetting/storeConfig";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";

import { useContext, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { border } from "../../appsetting/styleSetting";
import { RootContext } from "../../context/RootContext";

const LineGameListComponent = ({ navigation, games, title }) => {
  const [percent, setPercent] = useState(null);
  const [current, setCurrent] = useState(null);
  const { onDownload } = useContext(RootContext);
  const { colors } = useTheme();

  const windowWidth = Dimensions.get("window").width;
  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      width: windowWidth - 60,
      borderRadius: border,
      alignSelf: "center",
      padding: 10,
    },
    center: {
      alignSelf: "center",
      marginRight: 10,
    },
  });

  const onDownloadClickListener = async (game) => {
    onDownload(game, "game", (e) => {});
  };
  return (
    <>
      {title && (
        <SpaceStyle right={10} bottom={10}>
          <CustomText
            style={{ fontSize: 13, alignSelf: "center" }}
            color={"#7b7d7a"}
          >
            {title}
          </CustomText>
        </SpaceStyle>
      )}
      <FlatList
          showsHorizontalScrollIndicator={false}

        style={{ alignSelf: "center" }}
        keyExtractor={(item) => item._id}
        inverted={true}
        data={games}
        renderItem={({ item }) => (
          <SpaceStyle bottom={10}>
            <View style={style.container}>
              <SpaceBetween>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Game Post", { id: item._id });
                  }}
                >
                  <View>
                    <View style={style.center}>
                      {/* <CustomText>{item.createdAt}</CustomText> */}
                      <CustomText
                        style={{
                          fontSize: 8,
                          marginBottom: 5,
                          alignSelf: "center",
                        }}
                        color={"#6d6d77"}
                      >
                        {item.updatedAt}
                      </CustomText>
                      <CustomButton
                        onClick={() => {
                          onDownloadClickListener(item);
                        }}
                      >
                        دانلود{" "}
                        {percent &&
                          current === item._id &&
                          (percent?.toFixed(2) * 100)
                            ?.toString()
                            ?.substring(0, 3) + "%"}
                      </CustomButton>
                    </View>
                  </View>
                </TouchableOpacity>
                <Row>
                  <View style={style.center}>
                    <CustomText>{item.title}</CustomText>
                    <CustomText style={{ fontSize: 10 }} color={"#9f9eae"}>
                      {item?.category?.categoryId?.title}
                    </CustomText>
                    {/* <CustomText color={"#ae4a54"}>حجم : 63 مگابایت </CustomText> */}
                    <CustomText
                      style={{ fontSize: 10, marginTop: 10 }}
                      color={"#ae4a54"}
                    >
                      {item.gameLastVersionSize}
                    </CustomText>
                  </View>
                  <CustomImage
                    image={item.image}
                    radius={border}
                    width={6}
                    aspect={1 / 1}
                  />
                </Row>
              </SpaceBetween>
            </View>
          </SpaceStyle>
        )}
      />
    </>
  );
};
export default LineGameListComponent;
