import { useEffect, useState } from "react";
import { View } from "react-native";
import { getCategoriesService } from "../../service/PostService";
import CustomText from "../../components/text/CustomText";
import { FlatList, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { Row } from "../../style/uiUtil";
import { Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
const ChannelCategoryPage = ({ onChangeCategory }) => {
  const width = Dimensions.get("screen").width;
  const { colors } = useTheme();
  const [voiceCategories, setVoiceCategories] = useState([]);
  const [videoCategories, setVideoCategories] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const {
      data: { data: videoRes },
    } = await getCategoriesService({
      department: "video",
      searchValue: "",
    });
    const {
      data: { data: voiceRes },
    } = await getCategoriesService({
      department: "voice",
      searchValue: "",
    });
    setVideoCategories(videoRes);
    setVoiceCategories(voiceRes);
  };
  return (
    <ScrollView>
      <View>
        <Row>
          <View style={{ width: width / 2 }}>
            <CustomText fontSize={13} right={15} top={10}>
              ویدیو
            </CustomText>
            <FlatList
                showsHorizontalScrollIndicator={false}

              keyExtractor={(item) => item._id}
              data={videoCategories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChangeCategory(item);
                  }}
                >
                  <CustomText
                    color={colors.lightTextColor}
                    right={20}
                    bottom={8}
                    top={8}
                  >
                    • {item.title}
                  </CustomText>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{ width: width / 2 }}>
            <CustomText fontSize={13} right={15} top={10}>
              صدا
            </CustomText>
            <FlatList
                showsHorizontalScrollIndicator={false}

              keyExtractor={(item) => item._id}
              data={voiceCategories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChangeCategory(item);
                  }}
                >
                  <CustomText
                    color={colors.lightTextColor}
                    right={20}
                    bottom={8}
                    top={8}
                  >
                    • {item.title}
                  </CustomText>
                </TouchableOpacity>
              )}
            />
          </View>
        </Row>
      </View>
    </ScrollView>
  );
};
export default ChannelCategoryPage;
