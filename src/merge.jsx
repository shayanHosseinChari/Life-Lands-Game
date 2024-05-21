import * as NavigationBar from "expo-navigation-bar";

import {
  NavigationContainer,
  DefaultTheme,
  useTheme,
  useNavigation,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Swipeable } from "react-native-gesture-handler";
import { I18nManager } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TabComponent from "./components/home/TabComponent";
import GamePost from "./pages/posts/GamePost";
import VideoPost from "./pages/posts/VideoPost";
import BookPost from "./pages/posts/BookPost";
import CustomText from "./components/text/CustomText";
import VideosPost from "./pages/posts/VideosPost";
import BooksPost from "./pages/posts/BooksPost";
import GamesPost from "./pages/posts/GamesPost";
import WebFileViewer from "./pages/viewer/WebFileViewer";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import SplashPage from "./pages/splash/SplashPage";
import AlertScreen from "./pages/AlertScreen/AlertScreen";
import ProfilePage from "./pages/profile/ProfilePage";
import CommingSoonComponent from "./components/share/CommingSoonComponent";
import CommentPage from "./pages/comment/CommentPage";
import ScreenOrientationComponent from "./components/share/ScreenOrientationComponent";
import ChannelPage from "./pages/channel/ChannelPage";
import { getTheme, getToken, getValueFor } from "./appsetting/storeConfig";
import AuthRootPage from "./components/auth/AuthRootPage";
import LoginAsGuestPage from "./components/auth/LoginAsGuestPage";
import FirstLoginStepPage from "./components/auth/FirstLoginStepPage";
import EnterVerficationCodePage from "./components/auth/EnterVerficationCodePage";
import FinalLoginPage from "./components/auth/FinalLoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import PlayListVideoRoot from "./pages/playList/video/PlayListVideoRoot";
import PlayListVoiceRoot from "./pages/playList/voice/PlayListVoiceRoot";
import VideoPlayer from "./pages/viewer/VideoPlayer";
// import PdfViewer from "./pages/viewer/PdfViewer";
import { RootContext } from "./context/RootContext";
import PlayListsVoicesRoot from "./pages/playList/voice/PlayListsVoicesRoot";
// import PlayListsVoicePage from "./pages/playList/voice/PlayListsVoicePage";
import Menu from "./pages/menu/Menu";
import DownloadsPageRoot from "./pages/downnload/DownloadsPageRoot";
import EditProfilePage from "./pages/profile/EditProfilePage";
import SecurityPage from "./pages/security/securityPage";
import BooksPage from "./pages/books/BooksPage";
import SingleChannelPage from "./pages/channel/SingleChannelPage";
import CustomizeBookReader from "./pages/viewer/CustomizeBookReader";
import GalleryPage from "./pages/gallery/GalleryPage";
import OnlineUsersPage from "./pages/onlineUsers/OnlineUsersPage";
import StartTournamentPage from "./pages/startTournament/StartTournamentPage";
import SocketContextProvider from "./context/SoketContextProvider";
import SampleGame from "./pages/SampleGame";
import { Luncher } from "./pages/Lunch/Lunch";
import CommentsPage from "./pages/comments/CommentsPage";
import TournamentHistoryPage from "./pages/tournament/TournamentHistoryPage";
import EndTournamentPage from "./pages/endTournament/EndTournamentPage";
import AwardsPage from "./pages/awards/AwardsPage";
import PaintPage from "./pages/paint/PaintPage";
import PaintsPage from "./pages/paint/PaintsPage";
import PaintViewer from "./pages/viewer/PaintViewer";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
// import RadioPage from "./pages/playList/voice/RadioPage";
import RadioPage from "./pages/radio/RadioPage";
import ChancePage from "./pages/chance/ChancePage";
import WStorePage from "./pages/wStore/WStorePage";
import TournamentPage from "./pages/tournament/TournamentPage";
import WGamesPage from "./pages/WGames/WGamesPage";
import GamesPage from "./pages/WGames/GamesPage";
import UsersPaintPage from "./pages/paint/UsersPaintPage";
import TvPage from "./pages/tv/TvPage";
import SearchPage from "./pages/search/SearchPage";
import ChannelsPage from "./pages/channel/ChannelsPage";
import PublicProfilePage from "./pages/profile/PublicProfilePage";
import ShowFollowUsersPage from "./pages/follow/ShowFollowUsersPage";
import UsersChannelFollowsPage from "./pages/channelFollow/UsersChannelFollowsPage";
import MakeRoomPage from "./pages/room/MakeRoomPage";
import RoomPage from "./pages/room/RoomPage";
import ShareRoomDataPage from "./pages/room/ShareRoomDataPage";
import GameSelectionPage from "./pages/game/GameSelectionPage";
import RoomsPage from "./pages/room/RoomsPage";
import GameOne from "./pages/cache/GameOne";
import GameTwo from "./pages/cache/GameTwo";
import GameThree from "./pages/cache/GameThree";
import GameFour from "./pages/cache/GameFour";
import GameFive from "./pages/cache/GameFive";
import PublicPageForAll from "./components/share/PublicPageForAll";
import CategoryPage from "./components/share/CategoryPage";
import DataContextProvider from "./context/DataContext";
import MyButtons from "./pages/myButtons/MyButtons";
import Inventory from "./pages/Inventory/Inventory";
import Wars from "./pages/Wars/Wars";
import ShowConsoleGames from "./pages/ShowConsoleGames/ShowConsoleGames";
import {Provider} from 'react-redux'
import { io } from "socket.io-client";
import { gameLinkMaker } from "./utility/gameLinkMaker";
// import { getValueFor } from "../../appsetting/storeConfig";
import TournamentNotifcation from "./components/notifcations/TournamentNotifcation";
import TournamentContextProvider from "./context/TournamentContextProvier";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SocketContext } from "./context/SocketContext";
import { NotifcationStore } from "./Store/NotifcationSotre";
import NotifcationsPage from "./pages/Notifcations/Notifcations";
import TournamentPublicPage from "./pages/PublicTournamentPage";
import SocialTab from "./pages/SocialTab";
import AddStory from "./pages/AddStory";
import WatchStory from "./pages/WatchStory";
import AddPost from "./pages/AddPost";
import CommentsPost from "./pages/Comments";
import SinglePostPage from "./pages/SinglePost";
import SearchUser from "./pages/SearchUser";
import WhoLikePosts from "./pages/WhoLikePosts";
import UserPosts from "./pages/userPosts";
// import { NotifcationStore } from "./Stores/NotifcationStore";
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
I18nManager.swapLeftAndRightInRTL(false);

const Stack = createStackNavigator();

let darkMode = {
  ...DefaultTheme.colors,
  primary: "#6664f4",
  background: "#000000",

  text: "rgb(0, 0, 0)",
  paragraph: "#d4d5eb",
  border: "rgb(199, 199, 204)",
  notification: "#ae4a54",
  innerColor: "#000",

  //text
  titleColor: "#dbd7d8",
  lightTextColor: "#9c9798",
  hoverTextColor: "rgba(0,0,0,0.7)",
  darkOpacityColor: "rgba(0,0,0,0.4)",

  card: "#252538",
  darkCard: "#222121",
  white: "#fff",
  bottomTabBar: "#171414",
  //input
  inputBgColor: "#252528",
  inputBorderColor: "rgb(40,40,40)",
  placeholderTextColor: "#ffffff76",
  hr: "#ffffff1a",
  yellow: "#efc42e",
  orange: "#ff9800",
  green: "#2eef49",
  darkGreen: "#7c931f",
  red: "#960014",
  borderCard: "#292a2e",
};
let lightMode = {
  ...DefaultTheme.colors,
  primary: "#7371f3",
  background: "#e0e1eb",
  text: "rgb(0, 0, 0)",
  paragraph: "rgb(0, 0, 0)",
  border: "rgb(199, 199, 204)",
  notification: "#ae4a54",
  innerColor: "#fff",
  //text
  titleColor: "#121211",
  lightTextColor: "#262625",
  hoverTextColor: "#e0e1eb",

  card: "#bfc1d8",
  darkCard: "#abadc2",

  //input
  inputBgColor: "#cfc6ca",
  inputBorderColor: "#a19c9e",
  placeholderTextColor: "#7d7a7b",
  bottomTabBar: "#c8c8ce",
  white: "#fff",
  hr: "#0000001a",
  yellow: "#efc42e",
  orange: "#ff9800",
  green: "#2eef49",
  darkGreen: "#7c931f",
  red: "#960014",
  borderCard: "#292a2e",
};
// const MyTheme = ;

const style = StyleSheet.create({
  headerTitleStyle: { width: 30, height: 30, marginHorizontal: 20 },
  headerBackIconStyle: { width: 15, height: 15, marginHorizontal: 20 },
});


const MergePage = () => {
  // let navigation = useNavigation()
  const socket = io('https://lifelands.ir/',{
    extraHeaders:{
      token: getValueFor()
    }
  })
  const navigaitonReef = useRef(null)
  // console.log('start listenening')

  // console.log('end listenening')
  const { user } = useContext(RootContext);


  const {notifcations} = useContext(RootContext)
  // useEffect(()=>{
  //   console.log('store of notifcations: ',NotifcationStore.getState())
  // },[])
  const { reload, isLoading, setIsLoading } = useContext(RootContext);
  const [tokenState, setTokenState] = useState();
  const { wasChangedTheme } = useContext(RootContext);
  const {isShowNotifcation} = useContext(RootContext)
        
  const {setNotifcations,setIsSowNotifcation,navigationRoute} = useContext(RootContext)
  // console.log(isShowNotifcation)
  const [option, setOption] = useState({});
  const [isShowLastRequest, setIsShowLastRequest] = useState(false);
  const [isShowLastRoomRequest, setIsShowLastRoomRequest] = useState(false);
  const [notifdata,setNotifData] = useState(NotifcationStore.getState())

  useEffect(() => {
    setDataStorage();
    init();
    getToken();
    getTheme();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);

NotifcationStore.subscribe(()=>{
  setNotifData(NotifcationStore.getState())
})
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#000000");

    setDataStorage();
  }, [reload]);
  const setDataStorage = async () => {
    if (!tokenState) setTokenState(await getToken());
  };

  useEffect(() => {
    init();
    
  }, [wasChangedTheme]);


  const init = async () => {
    setOption({
      ...DefaultTheme,
      colors: (await getTheme()) === "dark" ? darkMode : lightMode,
    });
  };
  return (
    <>
            <NavigationContainer theme={option}>

      {isLoading ? (
        <Fragment>
          <SplashPage />
        </Fragment>
      ) : (
        <>
         <SocketContextProvider>
            <Stack.Navigator
                screenOptions={() => ({
                  headerTitle: () => null,
                  headerBackImage: () => null,
                  headerShown: false,
                })}
              >
                <Fragment>
                  {!tokenState && (
                    <>
                      <Stack.Screen name="Auth" component={AuthRootPage} />
                      <Stack.Screen name="Guest" component={LoginAsGuestPage} />
                      <Stack.Screen
                        name="Login First Step"
                        component={FirstLoginStepPage}
                      />
                      <Stack.Screen
                        name="Enter Verfication Code Page"
                        component={EnterVerficationCodePage}
                      />
                      <Stack.Screen
                        name="Login Page"
                        component={FinalLoginPage}
                      />
                      <Stack.Screen
                        name="Register Page"
                        component={RegisterPage}
                      />
                    </>
                  )}
                  <Stack.Screen name="Home" component={TabComponent} />
                  <Stack.Screen name="Add Story" component={AddStory} />
                  <Stack.Screen name="Add Post" component={AddPost} />

                  
                  <Stack.Screen name="GameOne" component={GameOne} />
                  
                  <Stack.Screen name="GameTwo" component={GameTwo} />
                  
                  <Stack.Screen name="GameThree" component={GameThree} />
                  
                  <Stack.Screen name="GameFour" component={GameFour} />
                  
                  <Stack.Screen name="GameFive" component={GameFive} />
                  <Stack.Screen name="Who Like" component={WhoLikePosts} />
                  <Stack.Screen name="My Buttons" component={MyButtons} />
                  
                  <Stack.Screen
                    name="Web File Viewer"
                    component={WebFileViewer}
                  />

                  <Stack.Screen name="Game Post" component={GamePost} />
                  
                  <Stack.Screen
                    name="Tournament Page"
                    component={TournamentPage}
                  />
                  <Stack.Screen name="See Story" component={WatchStory} />
                  
                  <Stack.Screen name="Video Post" component={VideoPost} />
                  
                  <Stack.Screen name="Gallery" component={GalleryPage} />
                  <Stack.Screen name="Single Post" component={SinglePostPage} />
                  <Stack.Screen name="User Post" component={UserPosts} />


                  
                  <Stack.Screen
                    name="Video Play List"
                    component={PlayListVideoRoot}
                  />
                  
                  <Stack.Screen
                    name="Voice Play List"
                    component={PlayListVoiceRoot}
                  />
                  <Stack.Screen name="Book Post" component={BookPost} />
                  
                

                  <Stack.Screen name="Videos Post" component={VideosPost} />
                  <Stack.Screen name="Search Users" component={SearchUser} />

                  <Stack.Screen name="Console Games" component={ShowConsoleGames} />
                  
                  <Stack.Screen name="Books Post" component={BooksPost} />

                  <Stack.Screen name="Games Post" component={GamesPost} />

                  <Stack.Screen name="AlertScreen" component={AlertScreen} />
                  <Stack.Screen name="Luncher" component={Luncher} />

                  <Stack.Screen name="Public Page" component={PublicPageForAll} />
                  
                  <Stack.Screen name="Category Page" component={CategoryPage} />
                  <Stack.Screen
                    name="Users Channel Follows Page"
                    component={UsersChannelFollowsPage}
                  />
                  <Stack.Screen
                    name="Show Follow Users Page"
                    component={ShowFollowUsersPage}
                  />
                  <Stack.Screen
                    name="Public Profile Page"
                    component={PublicProfilePage}
                  />
                  <Stack.Screen
                    name="Profile"
                    options={{
                      title: null,
                    }}
                    component={ProfilePage}
                  />
                  <Stack.Screen
                    name="Comming"
                    options={{
                      title: null,
                    }}
                    component={CommingSoonComponent}
                  />
                  <Stack.Screen name="Posts Comments" component={CommentPage} />
                  <Stack.Screen name="Users Channel" component={ChannelPage} />
                  <Stack.Screen name="Video Player" component={VideoPlayer} />
                  <Stack.Screen name="Comments Post Page" component={CommentsPost} />

                  <Stack.Screen
                    name="Voice PlayList"
                    component={PlayListsVoicesRoot}
                  />
                  {/* <Stack.Screen name="PDF Viewer" component={PdfViewer} /> */}
                  <Stack.Screen
                    name="Play Lists Voice Page"
                    component={RadioPage}
                  />
                  <Stack.Screen name="Menu" component={Menu} />
                  <Stack.Screen
                    name="Download Archive"
                    component={DownloadsPageRoot}
                  />
                  <Stack.Screen
                    name="Edit Profile"
                    component={EditProfilePage}
                  />
                  <Stack.Screen name="Security Page" component={SecurityPage} />
                  <Stack.Screen name="Books Page" component={BooksPage} />
                  <Stack.Screen name="Search Page" component={SearchPage} />
                  <Stack.Screen
                    name="Single Channel"
                    component={SingleChannelPage}
                  />
                  <Stack.Screen
                    name="Customize Book Reader"
                    component={CustomizeBookReader}
                  />
                  <Stack.Screen
                    name="Online Users"
                    component={OnlineUsersPage}
                  />
                  <Stack.Screen
                    name="Start Tournament Page"
                    component={StartTournamentPage}
                  />
                  <Stack.Screen
                    name="End Tournament Page"
                    component={EndTournamentPage}
                  />
                  <Stack.Screen name="Sample Game" component={SampleGame} />
                  <Stack.Screen name="Comments Page" component={CommentsPage} />
                  <Stack.Screen name="Awards Page" component={AwardsPage} />
                  <Stack.Screen name="Wars Page" component={Wars} />

                  <Stack.Screen name="Paint Page" component={PaintPage} />
                  <Stack.Screen name="Paints Page" component={PaintsPage} />
                  <Stack.Screen name="Paint Viewer" component={PaintViewer} />
                  <Stack.Screen name="Chance Page" component={ChancePage} />
                  <Stack.Screen name="wStore Page" component={WStorePage} />
                  <Stack.Screen name="WGame" component={WGamesPage} />
                  <Stack.Screen name="TV" component={TvPage} />
                  <Stack.Screen name="Room Page" component={RoomPage} />
                  <Stack.Screen name="Rooms Page" component={RoomsPage} />
                  <Stack.Screen
                    name="Game Selection Page"
                    component={GameSelectionPage}
                  />
                   <Stack.Screen
                    name="Tournament Public Page"
                    component={TournamentPublicPage}
                  />
                  <Stack.Screen
                    name="Share Room Data Page"
                    component={ShareRoomDataPage}
                  />
                  <Stack.Screen
                    name="Make Room Page"
                    component={MakeRoomPage}
                  />
                  <Stack.Screen name="Social" component={SocialTab} />
                  <Stack.Screen
                    name="wGames Single Page"
                    component={GamesPage}
                  />
                  <Stack.Screen
                    name="Tournament History Page"
                    component={TournamentHistoryPage}
                  />
                  <Stack.Screen
                    name="Leaderboard Page"
                    component={LeaderboardPage}
                  />
                   <Stack.Screen
                    name="Inventory"
                    component={Inventory}
                  />
                 <Stack.Screen 
                 name="Notifcations Page"
                 component={NotifcationsPage}
                 />
                  <Stack.Screen
                    name="Users Paint Page"
                    component={UsersPaintPage}
                  />
                  <Stack.Screen name="Channels Page" component={ChannelsPage} />
                </Fragment>
              </Stack.Navigator>
              
            
              <Toast position="bottom" style={{ zIndex: 2 }} />
              {/* <View style={{position:"absolute",top: 0,right: 10,zIndex: 90,width:"90%",alignSelf: 'center',margin:'auto',backgroundColor:"#272727f9",borderRadius:8,padding: 10,justifyContent:'flex-end',alignItems:'flex-end'}}>
               <View style={{flexDirection:"row",alignItems:'center'}}>
               <View style={{justifyContent:"flex-end",alignItems:"flex-end",marginHorizontal: 5}}>
                  <Text style={{color:"white",fontFamily:'vazir'}}> شایان حسین چاری</Text>
                  <Text style={{color:"#828282",fontFamily:'vazir',fontSize: 10}}>  @Shayanchr </Text>

                </View>
               <Image source={require('../assets/def.jpg')} style={{width: 40,height:40,borderRadius:100}} />
                
               </View>
              </View> */}
            
          
            </SocketContextProvider>
           
        </>
      )}
            </NavigationContainer>

    </>
  );
};
export default MergePage;
