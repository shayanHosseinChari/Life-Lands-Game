import { useEffect, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { paintsService } from "../../service/paintService";
import PageWrapper from "../loading/PageWrapper";
import SpaceStyle from "../../style/SpaceStyle";
import CustomInput from "../CustomInput/CustomInput";
import { TouchableOpacity } from "react-native";
import CustomText from "../text/CustomText";
import PaintItemComponent from "./PaintItemComponent";
import { Row, SpaceAround } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import CustomButton from "../CustomButton/CustomButton";

const PaintRootComponent = ({ navigation }) => {
  const width = Dimensions.get("screen").width;

  let [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 10,
    searchValue: "",
  });
  let [paints, setPaints] = useState([]);
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(true);

  useEffect(() => {
    getData();
  }, [filter]);

  const getData = async (isRefresh = false) => {
    if (isRefresh) {
      setFilter({
        pageId: 1,
        eachPerPage: 10,
        searchValue: "",
      });
      setPaints([]);
      setIsFinishPages(false);
      setIsLoadingState(true);
    }
    const {
      data: { data: response },
    } = await paintsService(filter);

    // let mergeLists = response.paints.concat(paints);
    let mergeLists = [...paints, ...response?.paints];
    setIsFinishPages(response?.paints?.length === 0);
    setPaints(mergeLists);
    setIsLoadingState(false);
  };
  return (
    <PageWrapper
      onRefresh={() => getData(true)}
      isLoadingState={isLoadingState}
    >
      <SpaceStyle top={10}>
        <SpaceAround>
          <CustomButton
            styles={{ width: width / 2.5 }}
            onClick={() => navigation.navigate("Paint Page")}
          >
            افزودن
          </CustomButton>
          <CustomButton
            styles={{ width: width / 2.5 }}
            onClick={() => navigation.navigate("Users Paint Page")}
          >
            نقاشی های من
          </CustomButton>
        </SpaceAround>
      </SpaceStyle>
      <SpaceStyle right={10} left={10} top={20} bottom={10}>
        <CustomInput
          align="right"
          minWidth={width - 35}
          onChangeText={(value) => {
            setPaints([]);
            setFilter({ ...filter, ...{ searchValue: value } });
          }}
          placeholder={"جستجو کنید..."}
        />
      </SpaceStyle>
      <FlatList
          showsHorizontalScrollIndicator={false}

        keyExtractor={(item) => item._id}
        numColumns={3}
        onEndReached={() => {
          if (!isFinishPages)
            setFilter({ ...filter, ...{ pageId: filter.pageId + 1 } });
        }}
        style={{ alignSelf: "center" }}
        data={paints}
        renderItem={({ item }) => (
          <PaintItemComponent item={item} navigation={navigation} />
        )}
      />
    </PageWrapper>
  );
};
export default PaintRootComponent;
