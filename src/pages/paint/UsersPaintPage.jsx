import { useEffect, useState } from "react";
import {
  deletePaintService,
  usersPaintService,
} from "../../service/paintService";
import PageWrapper from "../../components/loading/PageWrapper";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import PaintItemComponent from "../../components/paint/PaintItemComponent";
import SpaceStyle from "../../style/SpaceStyle";
import CustomText from "../../components/text/CustomText";
import HeaderComponent from "../../components/layout/HeaderComponent";

const UsersPaintPage = ({ navigation }) => {
  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue: "",
  });
  const [paints, setPaints] = useState([]);
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [isFinishPages, setIsFinishPages] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async (isRefresh = false) => {
    if (isRefresh) {
      setPaints([]);
      setFilter({
        pageId: 1,
        eachPerPage: 12,
        searchValue: "",
      });
      setIsFinishPages(false);
    }
    const {
      data: { data: res },
    } = await usersPaintService(filter);
    let mergeLists = res.paints.concat(paints);
    setIsFinishPages(res?.paints?.length === 0);
    setPaints(mergeLists);
    setIsLoadingState(false);
  };
  const onDeletePaint = async (id) => {
    Alert.alert("", "مطمئنی میخوای پاکش کنی؟", [
      {
        text: "نه دستم خورد",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "آره ",
        onPress: async () => {
          await deletePaintService(id);
          let paintsCopy = paints;
          paintsCopy = paintsCopy.filter((item) => item?._id != id);
          setPaints(paintsCopy);
        },
      },
    ]);
  };
  return (
    <>
      <HeaderComponent
        navigation={navigation}
        title={"Paints"}
        hasBack={true}
      />
      <PageWrapper
        isLoadingState={isLoadingState}
        onRefresh={() => getData(true)}
      >
        <FlatList
            showsHorizontalScrollIndicator={false}

          keyExtractor={(item) => item._id}
          numColumns={3}
          style={{ alignSelf: "center" }}
          data={paints}
          renderItem={({ item }) => (
            <PaintItemComponent
              item={item}
              navigation={navigation}
              onDeletePaint={onDeletePaint}
              isUserSide={true}
            />
          )}
        />
        <SpaceStyle>
          {isFinishPages ? (
            <View>
              <CustomText style={{ alignSelf: "center" }}>
                تموم شد :(
              </CustomText>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setFilter({ ...filter, ...{ pageId: filter.pageId + 1 } });
                }}
              >
                <CustomText style={{ alignSelf: "center" }}>
                  بیشتر نشونم بده...
                </CustomText>
              </TouchableOpacity>
            </View>
          )}
        </SpaceStyle>
      </PageWrapper>
    </>
  );
};
export default UsersPaintPage;
