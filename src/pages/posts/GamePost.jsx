import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import Swiper from 'react-native-swiper'

import CustomImage from "../../components/CustomImage/CustomImage";
import { CustomText } from "../../components/text/CustomText";
import { getGameAPIService } from "../../service/PostService";
import SpaceStyle from "../../style/SpaceStyle";
import CustomCard from "../../components/CustomCard/CustomCard";
import CommentsComponent from "../../components/posts/share/CommentsComponent";
import TournamentAndLeaderboardsSwitchComponent from "../../components/posts/game/TournamentAndLeaderboardsSwitchComponent";
import BasicInformationGameComponent from "../../components/posts/game/BasicInformationGameComponent";
import GamesImagesListComponent from "../../components/posts/game/GamesImagesListComponent";
import { getValueFor } from "../../appsetting/storeConfig";
import SlidersComponent from "../../components/home/SlidersComponent";
import PageWrapper from "../../components/loading/PageWrapper";
import HeaderComponent from "../../components/layout/HeaderComponent";
import { Hr, SpaceBetween } from "../../style/uiUtil";
import { lightTextColor } from "../../appsetting/appsettingColor";
import { Icon } from "../../appsetting/icons";
import { LOAD_FILE } from "../../service/APIs";
import UserGameListComponent from "../../components/userGame/UserGameListComponent";
import HeaderGameComponent from "../../components/game/HeaderGameComponent";
import GameStatisticsComponent from "../../components/game/GameStatisticsComponent";
import GameDescriptionComponent from "../../components/game/GameDescriptionComponent";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useTheme } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import EvillIcons from 'react-native-vector-icons/EvilIcons'
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";

const GamePost = (navigation) => {
  const { colors } = useTheme();
  const [isLoadingState, setIsLoadingState] = useState(true);
  const windowHeight = Dimensions.get("window").height;
  const [statusBarBg,setStatusBarBg] = useState('transparent')
  const windowWidth = Dimensions.get("window").width;
  const { id } = navigation.route.params;
  const [game, setGame] = useState();
  const [singleImage, setSingleImage] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    if (!getValueFor()) navigation.navigation.navigate("AlertScreen");
    setIsLoadingState(true);
    const {
      data: { data: gameResponse },
    } = await getGameAPIService(id, { pageId: 1, eachPerPage: 12 });

    setGame(gameResponse);
    setIsLoadingState(false);
  };
  return (
    <View>
      <StatusBar hidden={false}/>
      {isLoadingState?<View style={{width: Dimensions.get('window').width,height:Dimensions.get('window').height,justifyContent:"center",alignItems:"center",}}>
        <ActivityIndicator color={'white'} size={RFPercentage(4)} />
        <Text style={{color:"white",fontFamily:"vazir",marginTop:8}}>در حال بارگیری</Text>
      </View>:<>
      <StatusBar backgroundColor={statusBarBg} />
      {singleImage && (
        <View style={{width:"100%",height:"100%",position:"absolute",zIndex:9,backgroundColor:"black"}}>
          <View style={{width:"100%",justifyContent:"flex-start",alignItems:"flex-start",position:"absolute",top:RFPercentage(2),left:RFPercentage(1),zIndex:10}}>
            <TouchableOpacity style={{width:RFPercentage(4),height:RFPercentage(4),borderRadius:200,backgroundColor:"purple",justifyContent:"center",alignItems:'center'}} activeOpacity={0.8} onPress={()=>{
              setSingleImage(false)
            }}>
                <EvillIcons name="close" color={'white'} size={RFPercentage(3.4)} />
            </TouchableOpacity>
          </View>
          <Swiper style={{}} showsButtons={false} automaticallyAdjustContentInsets showsHorizontalScrollIndicator={false}  activeDotColor="purple">
           {
            game.game.images.map((i)=>{
             return(
              <Image source={{uri: `${LOAD_FILE}${i}`}} style={{width:"100%",height:'100%',objectFit:"contain"}} />
        
             )

            })
           }
       
      </Swiper>

        </View>
      )}
      {!singleImage && (
      <ScrollView nestedScrollEnabled onScroll={(e)=>{
        if (e.nativeEvent.contentOffset.y === 0) {
          // کاربر به بالای صفحه رسیده است
        setStatusBarBg('transparent')

        }else{
        setStatusBarBg('black')
          
        }
      }}>
      {game && (
        <View>
          <SlidersComponent sliders={game?.sliders} />
          <HeaderGameComponent
            navigation={navigation.navigation}
            game={game?.game}
          />
          <UserGameListComponent
            isShowGame={false}
            userGame={game.recentlyUserGame}
          />
          <GameStatisticsComponent game={game?.game} />
          
          <GameDescriptionComponent game={game?.game} />
          <GamesImagesListComponent
            singleImage={singleImage}
            setSingleImage={setSingleImage}
            images={game?.game?.images}
          />
          <SpaceStyle styles={{ spadding: 10 }} left={10} right={10} top={20}>
            <CustomText right={5}>نظرات</CustomText>
            <Hr width={"100%"} padding={10}/>
            <CommentsComponent
              navigation={navigation.navigation}
              commentsData={game?.commentsData}
              id={id}
            />
          </SpaceStyle>
          <CustomButton
            styles={{
              width: 100,
              alignSelf: "flex-end",
              marginBottom: 10,
              marginRight: 15,
              marginTop: 2,
              backgroundColor: "#B9EEFF1A",
            }}
            textStyle={{ color: "#FFF" }}
            borderRadius={5}
            color={colors.darkOpacityColor}
            fontColor={colors.lightTextColor}
            onClick={() => {
              navigation.navigation.navigate("Posts Comments", {
                id,
                department: "game",
              });
            }}
          >
            ثبت نظر
          </CustomButton>
        </View>
      )}
    </ScrollView>
      )}

      </>}
    </View>
  );
};
export default GamePost;
