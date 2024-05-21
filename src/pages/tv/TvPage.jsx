import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View ,Text,TouchableOpacity} from "react-native";
import {
  publicGamesService,
  publicVideosService,
} from "../../service/PostService";
import { SpaceBetween } from "../../style/uiUtil";
import CustomText from "../../components/text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import { getChannelsService } from "../../service/channel";
import PageWrapper from "../../components/loading/PageWrapper";
import HeaderComponent from "../../components/layout/HeaderComponent";
import SlidersComponent from "../../components/home/SlidersComponent";
import { Icon } from "../../appsetting/icons";
import { StyleSheet } from "react-native";
import DividerComponent from "../../components/share/DividerComponent";
import TvNewVideoComponent from "../../components/tv/TvNewVideoComponent";
import TvComponent from "../../components/tv/TvComponent";
import PopularChannels from "../../components/tv/PopularChannels";
import PopularPlayList from "../../components/tv/PopularPlayList";
import BannerComponents from "../../components/tv/BannerComponents";
import CommentsSection from "../../components/tv/CommentsSection";
import CategoryComponents from "../../components/tv/CategoryComponents";
import TvActions from "../../components/tv/TvActions";
import LazyVideoList from "../../components/lazyLoading/LazyVideoList";
import AntDesign from 'react-native-vector-icons/AntDesign'
import LazyVideoViewer from "../../components/lazyLoading/LazyVideoViewer";
import LazyPoularChanels from "../../components/lazyLoading/LazyPoularChanels";
import axios from "axios";
import { getValueFor } from "../../appsetting/storeConfig";
const TvPage = ({ navigation, hasHeader = true,route }) => {
  // console.log('category tv',category)
  const [gameCategory,setGameCategory] = useState()

  const [isLoadingState, setIsLoadingState] = useState(true);
  const [videos, setVideos] = useState([]);
  const [topVideos, setTopVideos] = useState([]);
  const [banner, setBanner] = useState({});
  const [channels, setChannels] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [animeVideosState, setAnimeVideosState] = useState([]);
  const [amoozeshiVideosState, setAmoozeshiVideosState] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setIsLoadingState(true);
      await axios.get('https://lifelands.ir/api/v1/allCategories',{
        headers:{
          token: getValueFor()
        }
      }).then(data=>{
        console.log('caaaattttt',data.data.data.book)
        setGameCategory(data.data.data.video)
        // OpenToast('sd',data.data.game,'success')
      }).catch(err=>{
        console.log(err)
      })
      const {
        data: { data: videosResponse },
      } = await publicVideosService({});
      const {
        data: { data: topVideosResponse },
      } = await publicVideosService({
        eachPerPage: 40,
        sortBy: "playCount",
      });
      const {
        data: { data: channelsResponse },
      } = await getChannelsService("video");
      const {
        data: { data: animeVideos },
      } = await publicVideosService({
        pageId: 1,
        eachPerPage: 10,
        categoryId: "65a94c73fd64ad4148364be3"
      });
      const {
        data: { data: amoozeshiVideos },
      } = await publicVideosService({
        pageId: 1,
        eachPerPage: 10,
        categoryId: "64504a467022b06d3178f5bb"
      });
      setAmoozeshiVideosState(amoozeshiVideos);
      setAnimeVideosState(animeVideos);
      setSliders(videosResponse.sliders);
      setVideos(videosResponse.videos);
      setChannels(channelsResponse);
      setTopVideos(topVideosResponse.videos);
      setBanner(videosResponse.banner);
      setIsLoadingState(false);
    } catch (error) {
    }
  };

  return (
    <>
      <HeaderComponent
        navigation={navigation}
        hasBack={true}
        darkIcon={require("../../../assets/icons/navbar-tv-icon.png")}
        lightIcon={require("../../../assets/icons/navbar-tv-icon.png")}
        searchDepartment="video"
        hasRightSearch={true}
      />
      <ScrollView style={{width:Dimensions.get('window').width,height: Dimensions.get('window').height}}>
      <SpaceStyle top={20}>
          <ScrollView nestedScrollEnabled>
            <SlidersComponent
              sliders={[
                { image: require("../../../assets/slider/video/st1.webp") },
                { image: require("../../../assets/slider/video/st2.webp") },
              ]}
            />
            <TvActions navigation={navigation} />
            <View style={{ marginTop: 20 }} />
{
            
            isLoadingState?<>
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
          پر بازدید ترین ویدیو ها
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyVideoList />
            </>:<TvComponent navigation={navigation} title={"پر بازدید ترین ویدیو ها"} videos={topVideos} sort="seenCount" />
}
            
            <DividerComponent title={"آخرین بینندگان"} colors={["#69045F", "#B3258D"]} />
            {
              isLoadingState? <>
              
        <LazyVideoViewer />
            </> :<TvNewVideoComponent videos={videos} />
            }
            
            {
            
            isLoadingState?<>
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
جدید ترین ویدیو ها         
 </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyVideoList />
            </>: <TvComponent navigation={navigation} title={"جدید ترین ویدیو ها"} videos={topVideos} />
}
           {

           }
             
             {
            
            isLoadingState?<>
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
محبوب ترین کانال ها </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyPoularChanels />
            </>:  <PopularChannels navigation={navigation} title={"محبوب ترین کانال ها"} videos={channels} />
}
           
            <TvComponent navigation={navigation} title={"محبوب ترین انیمه ها"} videos={animeVideosState} cid="65a94c73fd64ad4148364be3" />
            {/* <PopularPlayList navigation={navigation} title={"محبوب ترین پلی لیست ها"} videos={videos} /> */}
            <View style={{ marginTop: 20 }} />
            <SlidersComponent
              sliders={[
                { image: require("../../../assets/slider/video/st1.webp") },
                { image: require("../../../assets/slider/video/st2.webp") },
              ]}
            />
            {
            
            isLoadingState?<>
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
        محبوب ترین سریال ها
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        
        <LazyVideoList />
            </>: <PopularPlayList navigation={navigation} title={"محبوب ترین سریال ها"} videos={videos} />
}
         
            <TvComponent navigation={navigation} title={"برترین های آموزشی"} videos={amoozeshiVideosState} cid="64504a467022b06d3178f5bb" />
            <BannerComponents navigation={navigation}
              video={
                videos[
                Math.floor(Math.random() * (videos.length - 1 - 0 + 1) + 0)
                ]
              }
            />
            {/* <CommentsSection comments={videos} /> */}
            {
            gameCategory?<View style={{width:"100%",flexDirection:"row",marginBottom:20,alignItems:'center',justifyContent:"center",flexWrap:'wrap',marginTop: 20}}>

              {
                gameCategory.map(item=>{
                  return(
                    <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Video Post", title: item.title, cid: item._id })} style={{marginHorizontal:4,backgroundColor:'#1f1f1f',opacity:0.7,marginTop:3,justifyContent:'center',alignItems:'center',paddingHorizontal:6,paddingVertical:2.5,borderRadius:4}}>
                      <Text style={{color:"white",fontFamily:"vazir"}}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>:null
          }
            {/* <CategoryComponents navigation={navigation} title={"دسته بندی"} categories={route.params.category}/> */}
          </ScrollView>
        </SpaceStyle>

      </ScrollView>
    </>
  );
};
export default TvPage;
