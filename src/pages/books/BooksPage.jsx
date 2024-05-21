import { Fragment, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import CustomImage from "../../components/CustomImage/CustomImage";
import BooksComponent from "../../components/home/BooksComponent";
import HeaderComponent from "../../components/layout/HeaderComponent";
import PageWrapper from "../../components/loading/PageWrapper";
import CustomText from "../../components/text/CustomText";
import { mobileBookPageServer } from "../../service/MobileService";
import SpaceStyle from "../../style/SpaceStyle";
import { SpaceBetween } from "../../style/uiUtil";
import { TouchableOpacity } from "react-native";
import SlidersComponent from "../../components/home/SlidersComponent";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "../../appsetting/icons";
import DividerComponent from "../../components/share/DividerComponent";
import LastUserReadBook from "../../components/books/LastUserReadBook";
import NewBookComponents from "../../components/books/NewBookComponents";
import BooksComponents from "../../components/books/BooksComponents";
import PopularBookComponents from "../../components/books/PopularBookComponents";
import BannerComponents from "../../components/books/BannerComponents";
import CommentsSection from "../../components/books/CommentsSection";
import CategoryComponents from "../../components/books/CategoryComponents";
import BooksAction from "../../components/books/BooksAction";
import { publicBooksService } from "../../service/PostService";
import LazySliderTitle from "../../components/lazyLoading/LazySliderTitle";
import { LazyList } from "../../components/lazyLoading/LazyList";
import AntDesign from "react-native-vector-icons/AntDesign";
import LazyBookReaders from "../../components/lazyLoading/LazyBookReaders";
import LazyBookItem from "../../components/lazyLoading/LazyBookItem";
import axios from "axios";
import { getValueFor } from "../../appsetting/storeConfig";

const BooksPage = ({ navigation, hasHeader = true }) => {
  const [data, setData] = useState({});
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [slider, setSlider] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [gameCategory,setGameCategory] = useState()

  const [takhauliBooks, setTakhauliBooks] = useState([]);
  const [maharatZendegiBooks, setMaharatZendegiBooks] = useState([]);
  const [khalagiatBooks, setKhalagiatBooks] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await axios.get('https://lifelands.ir/api/v1/allCategories',{
      headers:{
        token: getValueFor()
      }
    }).then(data=>{
      console.log('caaaattttt',data.data.data.book)
      setGameCategory(data.data.data.book)
      // OpenToast('sd',data.data.game,'success')
    }).catch(err=>{
      console.log(err)
    })
    const newestBooksRes = await publicBooksService({
      pageId: 1,
      eachPerPage: 50,
      sort: "createdAt",
    });
    const khalagiatBooksRes = await publicBooksService({
      pageId: 1,
      eachPerPage: 10,
      sort: "_id",
      categoryId: "645228ec7022b06d3179070c",
    });
    const maharatZendegiBooksRes = await publicBooksService({
      pageId: 1,
      eachPerPage: 10,
      sort: "_id",
      categoryId: "645228b67022b06d31790704",
    });
    const takhauliBooksRes = await publicBooksService({
      pageId: 1,
      eachPerPage: 10,
      sort: "_id",
      categoryId: "645228f97022b06d31790710",
    });
    setKhalagiatBooks(khalagiatBooksRes?.data?.data?.books);
    setMaharatZendegiBooks(maharatZendegiBooksRes?.data?.data?.books);
    setTakhauliBooks(takhauliBooksRes?.data?.data?.books);
    setAllBooks(newestBooksRes?.data?.data?.books);
    setSlider(newestBooksRes?.data?.data?.sliders);

    const {
      data: { data: res },
    } = await mobileBookPageServer();
    setData(res);
    setIsLoadingState(false);
  };

  return (
    <>
      {hasHeader && (
        <HeaderComponent
          hasBack={true}
          searchDepartment="book"
          navigation={navigation}
          darkIcon={require("../../../assets/icons/library-icon.png")}
          lightIcon={require("../../../assets/icons/library-icon.png")}
          hasRightSearch={true}
        />
      )}
      <SpaceStyle top={20}>
        <ScrollView nestedScrollEnabled>
         
          <SlidersComponent
            sliders={[
              { image: require("../../../assets/slider/book/sb1.webp") },
              { image: require("../../../assets/slider/book/sb2.webp") },
              { image: require("../../../assets/slider/book/sb3.webp") },
            ]}
          />
         
          {/* <LazyBookReaders /> */}
          <BooksAction navigation={navigation} />
          <View style={{ width: "100%" }}>
            <LazySliderTitle RightTitle={"محبوب ترین کتاب ها"} />
          </View>
          <DividerComponent
            title={"آخرین کتاب خوان ها"}
            colors={["#12FFF7", "#B3FFAB"]}
          />
          {
            isLoadingState ?  <LazyBookReaders />:<LastUserReadBook books={data.newestBooks} navigation={navigation} />
          }
          {
            isLoadingState? <>
            <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            flexDirection: "row-reverse",
          }}
        >
          <CustomText
            style={{ color: "white", fontFamily: "vazir", fontSize: 12 }}
          >
           محبوب ترین کتاب ها
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyBookItem />
      </>: <NewBookComponents
            navigation={navigation}
            title={"جدید ترین کتاب ها"}
            books={data.newestBooks}
            sort="_id"
          />
          }
         

          {isLoadingState ? (
            <>
                  <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 8,
                  flexDirection: "row-reverse",
                }}
              >
                <CustomText
                  style={{ color: "white", fontFamily: "vazir", fontSize: 12 }}
                >
                 محبوب ترین کتاب ها
                </CustomText>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="left" color={"white"} size={12} />
                </View>
              </View>
              <LazyList />
            </>
          ) : (
            <BooksComponents
              navigation={navigation}
              title={"محبوب ترین کتاب ها"}
              books={data.topDownloadBooks}
              sort="seenCount"
            />
          )}
          {/* <PopularBookComponents navigation={navigation} title={"محبوب ترین کتاب ها"} books={data.newestBooks} /> */}
          <View style={{ marginTop: 20 }} />
          <SlidersComponent
            sliders={[
              { image: require("../../../assets/slider/book/sb1.webp") },
              { image: require("../../../assets/slider/book/sb2.webp") },
              { image: require("../../../assets/slider/book/sb3.webp") },
            ]}
          />
          {isLoadingState ? (
            <>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 8,
                  flexDirection: "row-reverse",
                }}
              >
                <CustomText
                  style={{ color: "white", fontFamily: "vazir", fontSize: 12 }}
                >
                 تازه های خلاقیت
                </CustomText>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="left" color={"white"} size={12} />
                </View>
              </View>
              
              <LazyList />
            </>
          ) : (
            <BooksComponents
              navigation={navigation}
              title={"تازه های خلاقیت"}
              books={khalagiatBooks}
              cid="645228ec7022b06d3179070c"
            />
          )}
          {isLoadingState ? (
            <>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 8,
                  flexDirection: "row-reverse",
                }}
              >
                <CustomText
                  style={{ color: "white", fontFamily: "vazir", fontSize: 12 }}
                >
                 مهارت های زندگی
                </CustomText>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="left" color={"white"} size={12} />
                </View>
              </View>
           
              <LazyList />
            </>
          ) : (
            <BooksComponents
              navigation={navigation}
              title={"مهارت های زندگی"}
              books={maharatZendegiBooks}
              cid="645228b67022b06d31790704"
            />
          )}

          {isLoadingState ? (
            <View style={{ width: "100%" }}>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 8,
                  flexDirection: "row-reverse",
                }}
              >
                <CustomText
                  style={{ color: "white", fontFamily: "vazir", fontSize: 12 }}
                >
                  تازه های تخیلی
                </CustomText>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="left" color={"white"} size={12} />
                </View>
              </View>
              <LazyList />
            </View>
          ) : (
            <BooksComponents
              navigation={navigation}
              title={"تازه های تخیلی"}
              books={takhauliBooks}
              cid="645228f97022b06d31790710"
            />
          )}

          {data?.newestBooks && (
            <BannerComponents
              navigation={navigation}
              books={data.newestBooks[0]}
            />
          )}
          {/* <CommentsSection comments={[{ profileImage: "slider/slider-file-1702149722665.webp" }, { profileImage: "slider/slider-file-1702149722665.webp" }, { profileImage: "slider/slider-file-1702149722665.webp" }, { profileImage: "slider/slider-file-1702149722665.webp" }]} /> */}
          {
            gameCategory?<View style={{width:"100%",flexDirection:"row",marginBottom:100,alignItems:'center',justifyContent:"center",flexWrap:'wrap',marginTop:4}}>

              {
                gameCategory.map(item=>{
                  return(
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Public Page', { mode: "Book Post", title: item.title, cid: item._id })}
                    style={{marginHorizontal:4,backgroundColor:'#1f1f1f',opacity:0.7,marginTop:3,justifyContent:'center',alignItems:'center',paddingHorizontal:6,paddingVertical:2.5,borderRadius:4}}>
                      <Text style={{color:"white",fontFamily:"vazir"}}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>:null
          }
        </ScrollView>
      </SpaceStyle>
    </>
  );
};
export default BooksPage;

const styles = StyleSheet.create({
  itemContainer: {
    width: 65,
    heigh5: 80,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
