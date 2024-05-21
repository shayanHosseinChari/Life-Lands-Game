import { useEffect, useState } from "react";
import { getChannelsPublicService } from "../../service/ChannelService";
import { FlatList, View } from "react-native";
import CustomImage from "../../components/CustomImage/CustomImage";
import SpaceStyle from "../../style/SpaceStyle";
import { CenterStyled, Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../../components/text/CustomText";
import { useTheme } from "@react-navigation/native";
import HeaderComponent from "../../components/layout/HeaderComponent";
import { TouchableOpacity } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import ChannelCategoryPage from "./ChannelCategoryPage";
import CustomInput from "../../components/CustomInput/CustomInput";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import ChannelItemComponent from "../../components/channel/ChannelItemComponent";
import ChannelsListComponent from "../../components/channel/ChannelsListComponent";

const ChannelsPage = ({ navigation }) => {
  const { colors } = useTheme();
  const width = Dimensions.get("screen").width;
  const [category, setCategory] = useState();
  const [isCategory, setIsCategory] = useState(false);
  const [channels, setChannels] = useState([]);
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [searchValue, setSearchValue] = useState();
  let [filter, setFilter] = useState({
    pageId: 1,
    searchValue: "",
  });
  const [type, setType] = useState("both");
  useEffect(() => {
    setIsFinishPages(false);
    setFilter({
      pageId: 1,
      eachPerPage: 10,
    });
    setChannels([]);
    // getChannels();
  }, [category]);
  const onSearch = () => {
    setChannels([]);
    setIsFinishPages(false);

    setTimeout(() => {
      setFilter({
        pageId: 1,
        eachPerPage: 10,
        searchValue,
      });
    }, 1000);
  };

  useEffect(() => {
    getChannels();
  }, [filter]);

  const getChannels = async () => {
    const {
      data: { data: res },
    } = await getChannelsPublicService({
      ...filter,
      categoryId: category?._id,
      type,
    });
    let channelsList = res.channels;
    channelsList.map((element) => {
      element.posts = [...(element.voices || []), ...(element.videos || [])];
    });
    setIsFinishPages(res?.channels?.length === 0);
    let mergeLists = channelsList.concat(channels);
    setChannels(mergeLists);
  };
  return (
    <View>
      {isCategory ? (
        <ChannelCategoryPage
          onChangeCategory={(item) => {
            setIsCategory(false);
            setCategory(item);
          }}
        />
      ) : (
        <>
          <HeaderComponent
            hasBack={true}
            navigation={navigation}
            title={"کانال"}
          />
          <SpaceBetween>
            <SpaceStyle bottom={10} top={10}>
              <CenterStyled>
                <SpaceBetween>
                  <CustomButton onClick={onSearch}>جستجو</CustomButton>
                  <CustomInput
                    minWidth={width - 100}
                    onChangeText={(e) => {
                      setSearchValue(e);
                    }}
                    placeholder={"جستجو کنید..."}
                  />
                </SpaceBetween>
              </CenterStyled>
            </SpaceStyle>
          </SpaceBetween>
          <CustomButton onClick={() => setIsCategory(true)}>
            {category ? category?.title : "انتخاب دسته بندی"}
          </CustomButton>
          <ScrollView>
            <SpaceStyle bottom={300}>
              <ChannelsListComponent
                setChannnelData={setChannels}
                channels={channels}
                navigation={navigation}
              />
              <>
                {isFinishPages ? (
                  <>
                    <CustomText style={{ alignSelf: "center" }}>
                      تموم شد :(
                    </CustomText>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setFilter({
                        ...filter,
                        ...{ pageId: filter.pageId + 1 },
                      });
                    }}
                  >
                    <CustomText style={{ alignSelf: "center" }}>
                      بیشتر نشونم بده...
                    </CustomText>
                  </TouchableOpacity>
                )}
              </>
            </SpaceStyle>
          </ScrollView>
        </>
      )}
    </View>
  );
};
export default ChannelsPage;
