import { useIsFocused, useTheme } from "@react-navigation/native";
import moment from "jalali-moment";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { grayColor, lightTextColor } from "../../appsetting/appsettingColor";
import { getToken, getValueFor } from "../../appsetting/storeConfig";
import { border } from "../../appsetting/styleSetting";
import CustomText from "../../components/text/CustomText";
import { getAllGames, getAllVideos } from "../../database/openDatabase";
import useForceUpdate from "../../database/useForceUpdate";
import SpaceStyle from "../../style/SpaceStyle";
import { Row } from "../../style/uiUtil";

const DownloadGameTab = ({ navigation }) => {
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;
  const [games, setGames] = useState([]);
  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const isFocused = useIsFocused();
  const style = StyleSheet.create({
    playStyle: {
      flex: 1,
      width: 30,
      height: 30,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    container: {
      width: width - 20,
      justifyContent: "space-between",
      alignContent: "center",
      alignSelf: "center",
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 25,
      paddingVertical: 15,
      marginHorizontal: 25,
      marginVertical: 5,
      backgroundColor: colors.card,
      borderRadius: border,
    },
    centerVertical: {
      alignContent: "center",
      alignSelf: "center",
    },
    boldText: {
      fontWeight: "bold",
    },
  });

  useEffect(() => {
    getAllGames(forceUpdate, async (v) => {
      setGames(v);
      await Linking.openURL(v[0].file);
    });
  }, [isFocused]);
  const getFile = async (item) => {
    navigation.navigate("Game Post", { id: item._id });
  };
  return (
    <ScrollView>
      <SpaceStyle bottom={180} top={10}>
        <FlatList
            showsHorizontalScrollIndicator={false}

          keyExtractor={(item) => item._id}
          data={games}
          renderItem={({ item }) => (
            <View style={style.container}>
              <Row>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      `${item.packageName}://send?token=${getValueFor()}`
                    );
                  }}
                >
                  <SpaceStyle top={10}>
                    <CustomText style={{ fontSize: 7 }}>اجرا</CustomText>
                  </SpaceStyle>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`${item.file}`);
                  }}
                >
                  <SpaceStyle top={10}>
                    <CustomText style={{ fontSize: 7 }}>نصب</CustomText>
                  </SpaceStyle>
                </TouchableOpacity>
              </Row>
              <Row>
                <View style={style.centerVertical}>
                  <SpaceStyle right={15}>
                    <CustomText style={{ fontSize: 14 }}>
                      {item.title}
                    </CustomText>
                    <CustomText color={grayColor}>
                      ایجاد{" "}
                      <CustomText color={grayColor}>
                        {item.createdAt &&
                          moment(item?.createdAt, "YYYY/MM/DD")
                            .locale("fa")
                            .format(" HH:mm YYYY/MM/DD")}
                      </CustomText>
                    </CustomText>
                    <CustomText color={grayColor}>
                      فرمت {item?.fileEx}
                    </CustomText>
                  </SpaceStyle>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    getFile(item);
                  }}
                >
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    width={80}
                    height={80}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: border,
                    }}
                  />
                </TouchableOpacity>
              </Row>
            </View>
          )}
        />
      </SpaceStyle>
    </ScrollView>
  );
};
export default DownloadGameTab;
