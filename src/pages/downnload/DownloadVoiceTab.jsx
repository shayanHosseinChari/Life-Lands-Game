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
import { grayColor } from "../../appsetting/appsettingColor";
import { border } from "../../appsetting/styleSetting";
import CustomText from "../../components/text/CustomText";
import { getAllVoices } from "../../database/openDatabase";
import useForceUpdate from "../../database/useForceUpdate";
import SpaceStyle from "../../style/SpaceStyle";
import { Row } from "../../style/uiUtil";

const DownloadVoiceTab = ({ navigation }) => {
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;

  const [voices, setVoices] = useState([]);
  const [forceUpdate, setForceUpdate] = useForceUpdate();

  const isFocused = useIsFocused();
  useEffect(() => {
    getAllVoices(forceUpdate, (v) => {
      setVoices(v);
    });
  }, [isFocused]);
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
    navigation.navigate("Voice Play List", { item });
  };
  return (
    <View>
      <ScrollView>
        <SpaceStyle bottom={180} top={10}>
          <FlatList
              showsHorizontalScrollIndicator={false}

            keyExtractor={(item) => item._id}
            data={voices}
            renderItem={({ item }) => (
              <View style={style.container}>
                <View style={style.centerVertical}>
                  <TouchableOpacity
                    onPress={() => {
                      getFile(item);
                    }}
                  >
                    <Image
                      source={require("../../../assets/icons/play-icon.png")}
                      width={35}
                      height={35}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>
                  <SpaceStyle top={10}>
                    <CustomText style={{ fontSize: 7 }}>پخش آفلاین</CustomText>
                  </SpaceStyle>
                </View>
                <Row>
                  <View style={style.centerVertical}>
                    <SpaceStyle right={15}>
                      <CustomText width={2.4} style={{ fontSize: 12 }}>
                        {item.title} - {item.playlistTitle}
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
                </Row>
              </View>
            )}
          />
        </SpaceStyle>
      </ScrollView>
    </View>
  );
};
export default DownloadVoiceTab;
