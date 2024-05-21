import HeaderComponent from "../../components/layout/HeaderComponent";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PageWrapper from "../../components/loading/PageWrapper";
import SpaceStyle from "../../style/SpaceStyle";
import { Dimensions, ScrollView, Text, TouchableOpacity } from "react-native";
import SlidersComponent from "../../components/home/SlidersComponent";
import NoTitleSliderComponent from "../../components/paint/NoTitleSliderComponent";
import { mobileRadioPageServer } from "../../service/MobileService";
import PaintsActionComponents from "../../components/paint/PaintsActionComponents";
import { View } from "react-native";
import PaintsPopularChannels from "../../components/paint/PaintsPopularChannels";
import MainSliderComponents from "../../components/paint/MainSliderComponents";
import PaintPlayListComponents from "../../components/paint/PaintPlayListComponents";
import PaintBannerComponent from "../../components/paint/PaintBannerComponent";
import PaintCommentsSection from "../../components/paint/PaintCommentsSection";
import PaintCategoryComponents from "../../components/paint/PaintCategoryComponents";
import { publicPaintsService } from "../../service/PostService";
import { paintsService } from "../../service/paintService";
import LazyPaint from "../../components/lazyLoading/LazyPaint";
import CustomText from "../../components/text/CustomText";
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from "axios";
import { getValueFor } from "../../appsetting/storeConfig";
const PaintsPage = ({ navigation, isMedia = false }) => {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [paints, setPaints] = useState([]);
  const [slider, setSlider] = useState([]);
  const [popularPaints, setPopularPaints] = useState([]);
  const [gameCategory,setGameCategory] = useState()

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setIsLoading(true);
    await axios.get('https://lifelands.ir/api/v1/allCategories',{
        headers:{
          token: getValueFor()
        }
      }).then(data=>{
        console.log('caaaattttt',data.data.data.book)
        setGameCategory(data.data.data.paint)
        // OpenToast('sd',data.data.game,'success')
      }).catch(err=>{
        console.log(err)
      })
    const newestPaintRes = await publicPaintsService({
      pageId: 1,
      eachPerPage: 50,
      sort: "createdAt",
    });

    const popPaintRes = await paintsService({
      pageId: 1,
      eachPerPage: 50,
      sort: "_id",
    });

    setPopularPaints(popPaintRes?.data?.data?.paints);
    setPaints(newestPaintRes?.data?.data?.paints);
    setSlider(newestPaintRes?.data?.data?.sliders);
    setIsLoading(false);
  };
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  return (
    <>
      <HeaderComponent
        darkIcon={require("../../../assets/icons/paint-icon.png")}
        lightIcon={require("../../../assets/icons/paint-icon.png")}
        hasBack={true}
        searchDepartment="paint"
        navigation={navigation}
        hasRightSearch={true}
      />
      <ScrollView
       
       style={{width: Dimensions.get('window').width,height: Dimensions.get('window').height}}
      >
        <SpaceStyle top={20}>
          <ScrollView nestedScrollEnabled>
            {/* <LazyPaint /> */}
            <SlidersComponent
              sliders={[
                { image: require("../../../assets/slider/paint/sp1.webp") },
                { image: require("../../../assets/slider/paint/sp2.webp") },
              ]}
            />
            
            <PaintsActionComponents navigation={navigation} />
            <View style={{ marginTop: 20 }} />

            {
            
            isLoading?<>
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
          جدید ترین نقاشی ها
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
       <LazyPaint />
            </>: <NoTitleSliderComponent navigation={navigation} title={"جدید ترین نقاشی ها"} paints={paints} sort="_id"/>
}
           



{
            
            isLoading?<>
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
          محبوب ترین نقاشی ها
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyPaint />
            </>:             <NoTitleSliderComponent navigation={navigation} title={"محبوب ترین نقاشی ها"} paints={shuffleArray(popularPaints)} sort="seenCount" />

}

            {/* <PaintsPopularChannels navigation={navigation} title={"محبوب ترین کانال ها"} paints={paints} /> */}
            {/* <MainSliderComponents navigation={navigation} title={"ویدیوهای نقاشی"} paints={shuffleArray(popularPaints)} /> */}

            {
            
            isLoading?<>
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
          پربازدید ترین نقاشی ها
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyPaint />
            </>:             
            <NoTitleSliderComponent navigation={navigation} title={"پربازدید ترین نقاشی ها"} paints={popularPaints} sort="downloadCount"/>

}
            <View style={{ marginTop: 20 }} />
            <SlidersComponent
              sliders={[
                { image: require("../../../assets/slider/paint/sp1.webp") },
                { image: require("../../../assets/slider/paint/sp2.webp") },
              ]}
            />
            {/* <NoTitleSliderComponent navigation={navigation} title={"نقاشی های دیجیتال"} paints={paints} /> */}
            {/* <PaintPlayListComponents navigation={navigation} title={"دوره های آموزشی"} paints={paints} /> */}
            {/* <MainSliderComponents navigation={navigation} title={"اوریگامی"} paints={paints} /> */}
            {/* <MainSliderComponents navigation={navigation} title={"کاردستی"} paints={paints} /> */}
            {popularPaints.length > 0 && (
              <PaintBannerComponent navigation={navigation}
                paint={paints[2]}
              />
            )}
            {/* <PaintCommentsSection comments={paints} /> */}
            {
            gameCategory?<View style={{width:"100%",flexDirection:"row",marginBottom:20,alignItems:'center',justifyContent:"center",flexWrap:'wrap',marginTop: 20}}>

              {
                gameCategory.map(item=>{
                  return(
                    <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Paint Viewer", title: item.title, cid: item._id })} style={{marginHorizontal:4,backgroundColor:'#1f1f1f',opacity:0.7,marginTop:3,justifyContent:'center',alignItems:'center',paddingHorizontal:6,paddingVertical:2.5,borderRadius:4}}>
                      <Text style={{color:"white",fontFamily:"vazir"}}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>:null
          }
            {/* <PaintCategoryComponents navigation={navigation} title={"دسته بندی"} /> */}
          </ScrollView>
        </SpaceStyle>
      </ScrollView>
    </>
  );
};
export default PaintsPage;
