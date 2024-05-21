import { useContext, useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity,Image,FlatList,Text, Dimensions } from "react-native";
// import { Icon } from "@rneui/themed";
import { Row } from "../../style/uiUtil";
import SpaceStyle from "../../style/SpaceStyle";
import NavbarComponent from "../../components/layout/NavbarComponent";
import DividerComponent from "../../components/share/DividerComponent";
import PlayersComponent from "../../components/wgames/PlayersComponent";
import WGamesDashboardomponent from "../../components/wgames/WGamesDashboardomponent";
import WGamesGamesComponent from "../../components/wgames/WGamesGamesComponent";
import WGamesAwardsComponent from "../../components/wgames/WGamesAwardsComponent";
import WGamesStoresomponent from "../../components/wgames/WGamesStoresomponent";
import SlidersComponent from "../../components/home/SlidersComponent";
import WGamesCommentsComponent from "../../components/wgames/WGamesCommentsComponent";
import WGameGameBannerComponent from "../../components/wgames/WGameGameBannerComponent";
import WGamesCategoryComponent from "../../components/wgames/WGamesCategoryComponent";
import { LOAD_FILE } from "../../service/APIs";
import {
  allCommentService,
  gamesCategoriesService,
  getLastGamesDownloadedService,
  publicGamesService,
  consoleGameService,
} from "../../service/PostService";
import { SocketContext } from "../../context/SocketContext";
import PageWrapper from "../../components/loading/PageWrapper";
import CustomText from "../../components/text/CustomText";
import { RFPercentage } from "react-native-responsive-fontsize";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { LazyList } from "../../components/lazyLoading/LazyList";
import { getValueFor } from "../../appsetting/storeConfig";
import { OpenToast } from "../../components/share/OpenToast";
import axios from "axios";
const LifeLandsGamesPage = ({ navigation }) => {
  const [comments, setComments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gameCategory,setGameCategory] = useState()
  const [topPlayGames, setTopPlayGames] = useState([]);
  const [newestGames, setNewestGames] = useState([]);
  const [lastUpdateGames, setLastUpdateGames] = useState([]);
  const [topRateGames, setTopRateGames] = useState([]);
  const [lastRunGames, setLastRunGames] = useState([]);
  const [lazyLoading,setLazyLoading] = useState(true)
  const [consoleGames, setConsoleGames] = useState([]);
  const [isLoadingState, setIsLoadingState] = useState(true);
  const { users } = useContext(SocketContext);
  const [sliders, setSliders] = useState([]);
  let count = 0;
  let isWorked = false;
  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    setIsLoadingState(true);
    setLazyLoading(true)
    await axios.get('https://lifelands.ir/api/v1/allCategories',{
      headers:{
        token: getValueFor()
      }
    }).then(data=>{
      console.log('caaaattttt',data.data.data.book)
      setGameCategory(data.data.data.game)
      // OpenToast('sd',data.data.game,'success')
    }).catch(err=>{
      console.log(err)
    })
    const lastRunGamesRes = await getLastGamesDownloadedService({
      pageId: 1,
      eachPerPage: 30,
    });
    console.log(lastRunGames)
    setLastRunGames(lastRunGamesRes?.data?.data?.games);

    const getConsoleGameAPI = await consoleGameService({
      pageId: 1,
      eachPerPage: 30,
    });
    setConsoleGames(getConsoleGameAPI?.data?.data?.games);

    const getSliders = await publicGamesService({});
    setSliders(getSliders?.data?.data?.sliders);

    const topPlayGamesRes = await publicGamesService({
      pageId: 1,
      eachPerPage: 30,
      sort: "runCount",
    });
    setTopPlayGames(topPlayGamesRes?.data?.data?.games);

    const newestGamesRes = await publicGamesService({
      pageId: 1,
      eachPerPage: 30,
      sort: "createdAt",
    });
    setNewestGames(newestGamesRes?.data?.data?.games);

    const lastUpdateGamesRes = await publicGamesService({
      pageId: 1,
      eachPerPage: 30,
      sort: "updatedAt",
    });
    setLastUpdateGames(lastUpdateGamesRes?.data?.data?.games);

    const topRateGamesRes = await publicGamesService({
      pageId: 1,
      eachPerPage: 30,
      sort: "score",
    });
    setTopRateGames(topRateGamesRes?.data?.data?.games);

    const {
      data: { data: res },
    } = await gamesCategoriesService({
      pageId: 1,
      eachPerPage: 30,
      searchValue: "",
    });
    if (res.categories?.length > 0)
      setCategories([...categories, ...res.categories]);

    const {
      data: { data: resC },
    } = await allCommentService({
      pageId: 1,
      eachPerPage: 30,
    });
    setComments(resC.comments);
    setIsLoadingState(false);
    setLazyLoading(false)

  };

  return (
    <>
      <NavbarComponent />
      <View style={{flex:1,width:Dimensions.get('window').width,height:Dimensions.get('window').width}}>
      <ScrollView nestedScrollEnabled>
          <WGamesDashboardomponent navigation={navigation} />
          {/* <DividerComponent title={"آخرین بازیکن ها"} colors={["#B539E1", "#39BECD"]} /> */}
          {/* <PlayersComponent players={users} /> */}
          {
            lazyLoading?<>
             <SpaceStyle left={5} right={5} bottom={10}>
             <TouchableOpacity >
        <View style={{width:"100%",justifyContent:"space-between",alignItems:"center",flexDirection:"row"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
     
     <AntDesign name="left" size={RFPercentage(2)} color={'white'} style={{marginHorizontal:8}}/>
     <CustomText fontSize={14} selfCenter>
       بیشتر
     </CustomText>
  </View>
         <CustomText>بازی های جدید</CustomText>
         
        </View>
      </TouchableOpacity>
        </SpaceStyle>
        <LazyList />
        </>:<WGamesGamesComponent navigation={navigation} title={"بازی های جدید"} games={newestGames} sort="_id"/>
          }
          {/* <WGamesAwardsComponent title={"جوایز"} awards={[{}, {}, {}, {}]} /> */}
          {
            lazyLoading?<>
             <SpaceStyle left={5} right={5} bottom={10}>
             <TouchableOpacity >
        <View style={{width:"100%",justifyContent:"space-between",alignItems:"center",flexDirection:"row"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
     
          <AntDesign name="left" size={RFPercentage(2)} color={'white'} style={{marginHorizontal:8}}/>
          <CustomText fontSize={14} selfCenter>
            بیشتر
          </CustomText>
       </View>
         <CustomText>بازی های اخیر من</CustomText>
          
        </View>
      </TouchableOpacity>
        </SpaceStyle>
        <LazyList />
        </>: <WGamesGamesComponent navigation={navigation} title={"بازی های اخیر من"} games={lastRunGames} />
          }
         
          {/* <WGamesStoresomponent stores={[{}, {}, {}, {}]} title={"فروشگاه"} /> */}
          {
            lazyLoading?<>
             <SpaceStyle left={5} right={5} bottom={10}>
             <TouchableOpacity >
        <View style={{width:"100%",justifyContent:"space-between",alignItems:"center",flexDirection:"row"}}>
       <View style={{flexDirection:"row",alignItems:"center"}}>
     
          <AntDesign name="left" size={RFPercentage(2)} color={'white'} style={{marginHorizontal:8}}/>
          <CustomText fontSize={14} selfCenter>
            بیشتر
          </CustomText>
       </View>
         <CustomText> بازی های محبوب </CustomText>
          
        </View>
      </TouchableOpacity>
        </SpaceStyle>
        <LazyList />
        </>:   <WGamesGamesComponent navigation={navigation} title={"محبوب ترین ها"} games={topPlayGames} sort="seenCount"/>
          }
        
          <View style={{ height: 50 }} />
          <SlidersComponent
            sliders={[
              { image: require("../../../assets/slider/game/sg1.webp") },
              {image: require("../../../assets/slider/game/sg2.webp") },
            ]}
          />
         {
          lazyLoading?<>
          <SpaceStyle left={5} right={5} bottom={10}>
          <TouchableOpacity >
     <View style={{width:"100%",justifyContent:"space-between",alignItems:"center",flexDirection:"row"}}>
    <View style={{flexDirection:"row",alignItems:"center"}}>
  
       <AntDesign name="left" size={RFPercentage(2)} color={'white'} style={{marginHorizontal:8}}/>
       <CustomText fontSize={14} selfCenter>
         بیشتر
       </CustomText>
    </View>
      <CustomText> بازی های کنسول </CustomText>
       
     </View>
   </TouchableOpacity>
     </SpaceStyle>
     <LazyList />
     </>: <View style={{width:"100%",paddingHorizontal:RFPercentage(1)}}>
          <View style={{width:"100%",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
           
            <TouchableOpacity onPress={()=>{
        navigation.navigate('Console Games',{data:{title:"بازی های کنسول" }})
       }} style={{flexDirection:"row",alignItems:"center"}}>
              <AntDesign name="left" color={'white'} size={RFPercentage(2)} style={{marginRight:5}}/>
              <CustomText fontSize={13}>بیشتر</CustomText>
            </TouchableOpacity>
            <CustomText fontSize={13}>
              بازی های کنسول
            </CustomText>

          </View>
          <FlatList
      horizontal={true}
      inverted={true}
      keyExtractor={(item,index) => index}
      data={consoleGames}
      showsHorizontalScrollIndicator={false}
     style={{marginTop:6}}
      renderItem={({ item }) => (
      //  <Text>
      //   {
      //     `${BASE_URL}${item.image}`
      //   }
      //  </Text>
       <TouchableOpacity onPress={() => {
        count++;
        setTimeout(async () => {
          if (count > 1 && !isWorked) {
            await addRunCountService(item?._id);
            await gameLinkMaker(item, navigation);

            isWorked = true;
          } else if (count <= 1 && !isWorked) {
            navigation.navigate("Game Post", { id: item._id });
            isWorked = true;
          }
        }, 300);
        setTimeout(() => {
          isWorked = false;
          count = 0;
        }, 500);
      }}>
       <View style={{justifyContent:'center',alignItems:"center"}}> 
       <Image source={{uri:`${LOAD_FILE}${item.image}`}} style={{width:120,height:120,borderRadius:8,marginHorizontal:6}}/>
        {/* <CustomText>
          {item.title}
        </CustomText> */}
       </View>
       </TouchableOpacity>
      )}
    />

        </View>
         }
          {lazyLoading?<>
             <SpaceStyle left={5} right={5} bottom={10}>
             <TouchableOpacity >
        <View style={{width:"100%",justifyContent:"space-between",alignItems:"center",flexDirection:"row"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
     
          <AntDesign name="left" size={RFPercentage(2)} color={'white'} style={{marginHorizontal:8}}/>
          <CustomText fontSize={14} selfCenter>
            بیشتر
          </CustomText>
       </View>
         <CustomText>   برترین های بقا</CustomText>
          
        </View>
      </TouchableOpacity>
        </SpaceStyle>
        <LazyList />
        </>: <WGamesGamesComponent navigation={navigation} title={"برترین های بقا"} games={topRateGames.filter(item => item.category.title.includes("بقا")).slice(0, 10)} cid="645eb72d0a3ba9170a53ee3e"/>
          }
          <WGameGameBannerComponent
            navigation={navigation}
            game={
              newestGames[
              Math.floor(Math.random() * (newestGames.length - 1 - 0 + 1) + 0)
              ]
            }
          />
          {
            lazyLoading?<>
            <SpaceStyle left={5} right={5} bottom={10}>
            <TouchableOpacity >
       <View style={{width:"100%",justifyContent:"space-between",alignItems:"center",flexDirection:"row"}}>
      <View style={{flexDirection:"row",alignItems:"center"}}>
    
         <AntDesign name="left" size={RFPercentage(2)} color={'white'} style={{marginHorizontal:8}}/>
         <CustomText fontSize={14} selfCenter>
           بیشتر
         </CustomText>
      </View>
        <CustomText>   برترین های معمایی </CustomText>
         
       </View>
     </TouchableOpacity>
       </SpaceStyle>
       <LazyList />
       </>: <WGamesGamesComponent navigation={navigation} title={"برترین های معمایی"} games={topRateGames} cid="645eb6fc0a3ba9170a53ee34"/>
          }
         
          {/* <WGamesCommentsComponent comments={comments} /> */}
          <View style={{ height: 60 }} />
          
          {
            gameCategory?<View style={{width:"100%",flexDirection:"row",marginBottom:20,alignItems:'center',justifyContent:"center",flexWrap:'wrap'}}>

              {
                gameCategory.map(item=>{
                  return(
                    <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Game Post", title: item.title, cid: item._id })} style={{marginHorizontal:4,backgroundColor:'#1f1f1f',opacity:0.7,marginTop:3,justifyContent:'center',alignItems:'center',paddingHorizontal:6,paddingVertical:2.5,borderRadius:4}}>
                      <Text style={{color:"white",fontFamily:"vazir"}}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>:null
          }
        </ScrollView> 

      </View>
    </>
  );
};

export default LifeLandsGamesPage;
