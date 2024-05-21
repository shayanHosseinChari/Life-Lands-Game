import { useIsFocused, useTheme } from "@react-navigation/native";
import moment from "jalali-moment";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { grayColor, lightTextColor } from "../../appsetting/appsettingColor";
import { border } from "../../appsetting/styleSetting";
import CustomText from "../../components/text/CustomText";
import { getAllBooks, getAllVideos } from "../../database/openDatabase";
import useForceUpdate from "../../database/useForceUpdate";
import SpaceStyle from "../../style/SpaceStyle";
import { Row } from "../../style/uiUtil";

const DownloadBookTab = ({ navigation }) => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  useEffect(() => {
    getAllBooks(forceUpdate, (v) => {
      //console.log(v);
      setBooks(v);
    });
  }, [isFocused]);
  const width = Dimensions.get("window").width;
  const [books, setBooks] = useState([]);
  const [forceUpdate, setForceUpdate] = useForceUpdate();
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

  const getFile = async (item) => {
    navigation.navigate("PDF Viewer", { item });
  };
  return (
    <ScrollView>
      <SpaceStyle bottom={180} top={10}>
        <FlatList
            showsHorizontalScrollIndicator={false}

          keyExtractor={(item) => item._id}
          data={books}
          renderItem={({ item }) => (
            <View style={style.container}>
              <View style={style.centerVertical}>
                <TouchableOpacity
                  onPress={() => {
                    getFile(item);
                  }}
                >
                  <Image
                    source={require("../../../assets/icons/Copy.png")}
                    width={35}
                    height={35}
                    style={{ width: 35, height: 35 }}
                  />
                </TouchableOpacity>
                <SpaceStyle top={10}>
                  <CustomText style={{ fontSize: 7 }}>نمایش کتاب</CustomText>
                </SpaceStyle>
              </View>
              <Row>
                <View style={style.centerVertical}>
                  <SpaceStyle right={15}>
                    <CustomText style={{ fontSize: 14 }} width={2.4}>
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
                    <CustomText color={grayColor}>
                      نویسنده : {item?.author}
                    </CustomText>
                  </SpaceStyle>
                </View>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  width={55}
                  height={80}
                  style={{
                    width: 55,
                    height: 80,
                    borderRadius: border,
                  }}
                />
              </Row>
            </View>
          )}
        />
      </SpaceStyle>
    </ScrollView>
  );
};
export default DownloadBookTab;
