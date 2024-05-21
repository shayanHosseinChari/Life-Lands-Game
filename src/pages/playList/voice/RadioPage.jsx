import { useEffect, useState } from "react";
import PageWrapper from "../../../components/loading/PageWrapper";
import { mobileRadioPageServer } from "../../../service/MobileService";
import HeaderComponent from "../../../components/layout/HeaderComponent";
import SlidersComponent from "../../../components/home/SlidersComponent";
import SpaceStyle from "../../../style/SpaceStyle";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Row, SpaceBetween } from "../../../style/uiUtil";
import { Icon } from "../../../appsetting/icons";
import CustomText from "../../../components/text/CustomText";
import { useTheme } from "@react-navigation/native";
import PlayListItem from "../../../components/playList/voice/PlayListItem";
import CustomImage from "../../../components/CustomImage/CustomImage";
import TwoRowPlayListItemComponent from "../../../components/playList/voice/TwoRowPlayListItemComponent";
import ChannelItem from "../../../components/channel/ChannelItem";

const RadioPage = ({ navigation, route, hasHeader = true }) => {
  const width = Dimensions.get("screen").width;
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setIsLoading(true);
    const {
      data: { data: res },
    } = await mobileRadioPageServer({
      limitChannel: 20,
    });
    setData(res);
    setIsLoading(false);
  };
  return (
    <View>
      {hasHeader && (
        <HeaderComponent
          darkIcon={require("../../../../assets/icons/radio.png")}
          lightIcon={require("../../../../assets/icons/Light/radiolight.png")}
          navigation={navigation}
          hasBack={true}
          searchDepartment="voice"
          hasRightSearch={true}
        />
      )}
      <View>
        <ScrollView>
          <PageWrapper isLoadingState={isLoading} onRefresh={getData}>
            <SpaceStyle bottom={150}>
              <SpaceStyle top={10}>
                <SlidersComponent sliders={data?.slider} />
              </SpaceStyle>
              <SpaceStyle bottom={10}>
                {/* {data?.dailyRadioSuggestion?.length > 0 && (
                  <View>
                    <SpaceBetween>
                      <CustomText
                        onClick={() => {}}
                        color={colors.lightTextColor}
                        selfCenter={true}
                      ></CustomText>
                      <Row>
                        <CustomText
                          selfCenter={true}
                          right={10}
                          color={colors.yellow}
                        >
                          پیشنهاد روز
                        </CustomText>
                        <Icon
                          dark={require("../../../../assets/icons/daily.png")}
                          light={require("../../../../assets/icons/Light/daily.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      </Row>
                    </SpaceBetween>
                    <FlatList
                      style={{ alignSelf: "center" }}
                      keyExtractor={(item) => item._id}
                      numColumns={4}
                      data={data?.dailyRadioSuggestion}
                      renderItem={({ item }) => (
                        <PlayListItem
                          width={5.7}
                          item={item}
                          navigation={navigation}
                        />
                      )}
                    />
                  </View>
                )} */}

                {/* {data?.newestRadio?.length > 0 && (
                  <View>
                    <SpaceBetween>
                      <CustomText
                        onClick={() => {}}
                        color={colors.lightTextColor}
                        selfCenter={true}
                      ></CustomText>
                      <Row>
                        <CustomText
                          selfCenter={true}
                          right={10}
                          color={colors.yellow}
                        >
                          جدید ترین
                        </CustomText>
                        <Icon
                          dark={require("../../../../assets/icons/daily.png")}
                          light={require("../../../../assets/icons/Light/daily.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      </Row>
                    </SpaceBetween>
                    <FlatList
                      style={{ alignSelf: "center" }}
                      keyExtractor={(item) => item._id}
                      numColumns={4}
                      data={data?.newestRadio}
                      renderItem={({ item }) => (
                        <PlayListItem
                          width={5.7}
                          item={item}
                          navigation={navigation}
                        />
                      )}
                    />
                  </View>
                )} */}

                {/* {data?.topPlayRadio?.image && (
                  <View>
                    <SpaceBetween>
                      <CustomText
                        onClick={() => {}}
                        color={colors.lightTextColor}
                        selfCenter={true}
                      ></CustomText>
                      <Row>
                        <CustomText
                          selfCenter={true}
                          right={10}
                          color={colors.yellow}
                        >
                          جدید ترین
                        </CustomText>
                        <Icon
                          dark={require("../../../../assets/icons/daily.png")}
                          light={require("../../../../assets/icons/Light/daily.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      </Row>
                    </SpaceBetween>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Voice Play List", {
                          id: data?.topPlayRadio?.playList,
                          voiceId: data?.topPlayRadio?._id,
                        });
                      }}
                    >
                      <CustomImage
                        image={data?.topPlayRadio?.image}
                        width={1.2}
                        height={120}
                        top={10}
                        selfCenter
                      />
                      <SpaceStyle right={10} top={10} bottom={30}>
                        <Row>
                          <View>
                            <CustomText right={10}>
                              {data?.topPlayRadio?.title}
                            </CustomText>
                            <CustomText
                              right={10}
                              color={colors.lightTextColor}
                            >
                              {data?.topPlayRadio?.category?.categoryId?.title}
                            </CustomText>
                          </View>
                          <CustomImage
                            aspect={1 / 1}
                            image={
                              data?.topPlayRadio?.creator?.userId?.profileImage
                            }
                            width={15}
                            height={50}
                            radius={100}
                          />
                        </Row>
                      </SpaceStyle>
                    </TouchableOpacity>
                  </View>
                )} */}

                {/* {data?.topRadioChildren?.length > 0 && (
                  <View>
                    <SpaceBetween>
                      <CustomText
                        onClick={() => {}}
                        color={colors.lightTextColor}
                        selfCenter={true}
                      ></CustomText>
                      <Row>
                        <CustomText
                          selfCenter={true}
                          right={10}
                          bottom={10}
                          color={colors.yellow}
                        >
                          بیشترین تعداد
                        </CustomText>
                        <Icon
                          dark={require("../../../../assets/icons/daily.png")}
                          light={require("../../../../assets/icons/Light/daily.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      </Row>
                    </SpaceBetween>
                    <FlatList
                      style={{ alignSelf: "center" }}
                      keyExtractor={(item) => item._id}
                      numColumns={2}
                      data={data?.topRadioChildren}
                      renderItem={({ item }) => (
                        <TwoRowPlayListItemComponent
                          item={item}
                          navigation={navigation}
                        />
                      )}
                    />
                  </View>
                )} */}
              </SpaceStyle>
              <SpaceStyle bottom={100}>
                {data?.newestRadioChannel?.length > 0 && (
                  <>
                    <SpaceStyle bottom={10}>
                      <SpaceBetween>
                        <CustomText
                          onClick={() => {}}
                          color={colors.lightTextColor}
                          selfCenter={true}
                        ></CustomText>
                        <Row>
                          <CustomText
                            selfCenter={true}
                            right={10}
                            color={colors.yellow}
                          >
                            کانال ها تازه تاسیس
                          </CustomText>
                          <Icon
                            dark={require("../../../../assets/icons/daily.png")}
                            light={require("../../../../assets/icons/Light/daily.png")}
                            style={{ width: 20, height: 20 }}
                          />
                        </Row>
                      </SpaceBetween>
                    </SpaceStyle>
                    <FlatList
                        showsHorizontalScrollIndicator={false}

                      style={{ alignSelf: "flex-end" }}
                      keyExtractor={(item) => item._id}
                      inverted={true}
                      data={data?.newestRadioChannel}
                      renderItem={({ item }) => (
                        <ChannelItem
                          item={item}
                          navigation={navigation}
                          justVoice={true}
                        />
                      )}
                    />
                  </>
                )}
                {data?.lastUpdatedRadioChannel?.length > 0 && (
                  <>
                    <SpaceStyle bottom={10}>
                      <SpaceBetween>
                        <CustomText
                          onClick={() => {}}
                          color={colors.lightTextColor}
                          selfCenter={true}
                        ></CustomText>
                        <Row>
                          <CustomText
                            selfCenter={true}
                            right={10}
                            color={colors.yellow}
                          >
                            کانال ها بروزشده
                          </CustomText>
                          <Icon
                            dark={require("../../../../assets/icons/daily.png")}
                            light={require("../../../../assets/icons/Light/daily.png")}
                            style={{ width: 20, height: 20 }}
                          />
                        </Row>
                      </SpaceBetween>
                    </SpaceStyle>
                    <FlatList
                        showsHorizontalScrollIndicator={false}

                      style={{ alignSelf: "flex-end" }}
                      keyExtractor={(item) => item._id}
                      inverted={true}
                      data={data?.lastUpdatedRadioChannel}
                      renderItem={({ item }) => (
                        <ChannelItem
                          item={item}
                          navigation={navigation}
                          justVoice={true}
                        />
                      )}
                    />
                  </>
                )}
              </SpaceStyle>
            </SpaceStyle>
          </PageWrapper>
        </ScrollView>
      </View>
    </View>
  );
};
export default RadioPage;
