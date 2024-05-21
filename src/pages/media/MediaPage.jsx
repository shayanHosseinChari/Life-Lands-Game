import { Dimensions, ScrollView, View } from "react-native";
import NavbarComponent from "../../components/share/NavbarComponent";
import DividerComponent from "../../components/share/DividerComponent";
import MediaLastPlayers from "../../components/media/MediaLastPlayers";
import MediaCircleMode from "../../components/media/MediaCircleMode";
import MediaCubeMode from "../../components/media/MediaCubeMode";
import PageWrapper from "../../components/loading/PageWrapper";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect, useState } from "react";
import { publicBooksService, publicPaintsService, publicVideosService } from "../../service/PostService";
import { mobileRadioPageServer } from "../../service/MobileService";
import { RFPercentage } from "react-native-responsive-fontsize";
import { createStackNavigator } from "@react-navigation/stack";
import PaintPage from "../paint/PaintPage";
// import {ImageEditor} from 'expo-image-editor'
import axios from "axios";
import { categoriesApi, getAllCategoires } from "../../service/APIs";
import { getToken } from "../../appsetting/storeConfig";
const Stack = createStackNavigator()


const MediaMain = ({navigation})=>{
  const { users } = useContext(SocketContext);
  const [newestVideo, setNewestVideo] = useState([]);
  const [newestBooks, setNewestBooks] = useState([]);
  const [newestRadio, setNewestRadio] = useState([]);
  const [newestPaint, setNewestPaint] = useState([]);
  const [lazyLoading,setLazyLoading] = useState(false)
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [gameCategorie,setGameCategorie] = useState([])
  const [videoCategories,setVideoCategories] = useState([])
  const [bookCategories,setBookCategories] = useState([])
  const [voiceCategories,setVoiceCategories] = useState([])
  const [paintCategory,setPaintCategorie]  = useState([])
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoadingState(true);
    let tokenOfUser = await getToken()
    console.log(tokenOfUser)
    console.log('token',tokenOfUser)
    setIsLoadingState(true);
    
    await axios.get(categoriesApi,{
      headers:{
        token: tokenOfUser
      }
    }).then(res=>{
      console.log(res)
     setGameCategorie(res.data.data.paint)
     setVideoCategories(res.data.data.game)
     setBookCategories(res.data.data.lastBook)
     setVoiceCategories(res.data.data.lastVoice)
     setPaintCategorie(res.data.data.lastPaint)


     console.log('last video',videoCategories)
    })


  //  await axios.get('https://lifelands.ir/v1/allcategories').then(response=>{
  //   console.log(response)
  //  })
  setLazyLoading(true)
    const newestVideoRes = await publicVideosService({
      pageId: 1,
      eachPerPage: 5,
      sort: "createdAt",
    });
    setNewestVideo(newestVideoRes?.data?.data?.videos);

    const newestBooksRes = await publicBooksService({
      pageId: 1,
      eachPerPage: 5,
      sort: "createdAt",
    });
    setNewestBooks(newestBooksRes?.data?.data?.books);

    const newestRadioRes = await mobileRadioPageServer({
      pageId: 1,
      eachPerPage: 5,
      sort: "createdAt",
    });
    setNewestRadio(newestRadioRes?.data?.data?.newestRadio.slice(0, 5));

    const newestPaintRes = await publicPaintsService({
      pageId: 1,
      eachPerPage: 5,
      sort: "createdAt",
    });
    setNewestPaint(newestPaintRes?.data?.data?.paints);
    setIsLoadingState(false)
    setIsLoadingState(false);
  }
  return(
    <>
      <NavbarComponent logoSrc={require("../../../assets/icons/share.png")} width={40} height={30} routing={navigation}/>
      <ScrollView style={{flex:1,width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
      <View style={{ flex: 1, marginBottom: 60,marginHorizontal:RFPercentage(2) }}>
          <ScrollView>

            {/* <DividerComponent title="آخرین کاربران" colors={["#7A1C9B", "#B539E1"]} /> */}
            {/* <MediaLastPlayers players={users} /> */}
            <View style={{ marginVertical: 10 }} />
            <MediaCubeMode
              title="دنیای کتاب "
              icon={require("../../../assets/icons/Media-Book-Icon.png")}
              data={newestBooks}
              isLazy={lazyLoading}
              categories={bookCategories}

              desc="کتاب های جذاب با دسته بندی متنوع موضوعی , کتاب های روز دنیا ترجمه شده و همچنین انگلیسی با طبقه بندی سنی ,  یک خبر خوب اینکه میتونی کتاب خودت رو اینجا به راحتی بسازی و ثبت کنی. , کتاب های دیدنی و شنیدنی متنوع با شخصیت‌های محبوب و دوست داشتنی, • لذّت کتاب خواندن با کتاب های صوتی و تصویری برای کودکان"
              navigate="Books Page"
              colors={['#21baaf', '#76b986']}
            />
            <View style={{ marginVertical: 10 }} />

            <MediaCubeMode
              title="دنیای ویدیو‌ "
              icon={require("../../../assets/icons/Media-tv-icon.png")}
              data={newestVideo}
              desc="انیمیشن های جذاب، انیمه ها و کلی ویدئو باحال و سرگرم کننده , آرشیوی از انیمیشن و انیمه های دوست داشتنی
 ,    -محتوای آموزشی و سرگرم کننده -
 , دنیای هیجان انگیزی از انواع ویدیوهای جذاب در کانال های دسته بندی شده
 ,  ویدئوهای جذاب و باحال رو با دوستانتون به اشتراک بگذارید.
 "
              navigate="TV"
              categories={videoCategories}

              // isLazy={lazyLoading}
              colors={['#712e6a', '#952378']}
            />
          
            <View style={{ marginVertical: 10 }} />

            <MediaCubeMode
              title="دنیای هنر"
              icon={require("../../../assets/icons/Media-Paint_icon.png")}
              data={newestPaint}
              isLazy={lazyLoading}
              categories={paintCategory}

              desc="ویترینی از نقاشی ها و کاردستی های فوق العاده ی هنرمندان , کلکسیون نقاشی ها و کاردستی هایی که هم برای کودکان و هم بزرگسالان لذت بخش است , -جدیدترین تکنیک های نقاشی و کاردستی های کاربردی برای همه سنین-
 ,   • در اینجا نقاشی ببینید، نقاشی بکشید و با دیگران به اشتراک بگذارید-•
 ,   گردش در دنیای جذاب هنر
 "
              navigate="Paints Page"
              colors={['#d0ae20', '#d08a20']}
            />

            <View style={{ marginVertical: 10 }} />

            <MediaCircleMode
              title="دنیای صدا "
              icon={require("../../../assets/icons/Media-Radio_icon.png")}
              data={newestRadio}
              isLazy={lazyLoading}

              categories={voiceCategories}

              desc="صداهای آشنا، داستان های هیجان انگیز و خاطرات شنیدنی ,• انواع داستان های شنیدنی به همراه دانستنی های شگفت انگیز
,     گلچینی از ترانه های زیبا برای کودکان
 , -دنیای آرامش بخش لالایی ها
 , -صداهای خودتون رو اینجا به گوش دوستانتون برسونید.
 "
              navigate="Play Lists Voice Page"
              colors={['#327a8a', '#64bdd0']}
            />

                </ScrollView>
        </View>
      </ScrollView>
      </>
  )
}
const MediaPage = () => {
  const { users } = useContext(SocketContext);
  const [newestVideo, setNewestVideo] = useState([]);
  const [newestBooks, setNewestBooks] = useState([]);
  const [newestRadio, setNewestRadio] = useState([]);
  const [newestPaint, setNewestPaint] = useState([]);
  const [isLoadingState, setIsLoadingState] = useState(true);


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoadingState(true);

    const newestVideoRes = await publicVideosService({
      pageId: 1,
      eachPerPage: 5,
      sort: "createdAt",
    });
    setNewestVideo(newestVideoRes?.data?.data?.videos);

    const newestBooksRes = await publicBooksService({
      pageId: 1,
      eachPerPage: 5,
      sort: "createdAt",
    });
    setNewestBooks(newestBooksRes?.data?.data?.books);

    const newestRadioRes = await mobileRadioPageServer({
      pageId: 1,
      eachPerPage: 5,
      sort: "createdAt",
    });
    setNewestRadio(newestRadioRes?.data?.data?.newestRadio.slice(0, 5));

    const newestPaintRes = await publicPaintsService({
      pageId: 1,
      eachPerPage: 5,
      sort: "createdAt",
    });
    setNewestPaint(newestPaintRes?.data?.data?.paints);

    setIsLoadingState(false);
  }

  return (

    <>
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="Main" component={MediaMain} />
      <Stack.Screen name="MyPain" component={PaintPage} />

    </Stack.Navigator>
    
    </>
  );
};
export default MediaPage;
