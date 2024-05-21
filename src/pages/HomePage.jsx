import {
  GestureHandlerRootView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Linking,
  ToastAndroid,
  Share,
  RefreshControl,
  Pressable
} from "react-native";
import Autolink from "react-native-autolink";
import { createStore } from "redux";
import { getTheme, getToken, getValueFor } from "../appsetting/storeConfig";
import { RootContext } from "../context/RootContext";

import Dialog from "react-native-dialog";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import axios from "axios";
import { LOAD_WEBGL, MobileHomeAPI } from "../service/APIs";
import { lastMedia } from "../service/APIs";
import PostItemComponent from "../components/PostItemComponent/PostItemComponent";
import { RFPercentage } from "react-native-responsive-fontsize";
import PostSameItems from "../components/PostSameItems/PostSameItems";
import { LazyPosts } from "../components/lazyLoading/LazyPosts";
import { getAllCategoires } from "../service/APIs";
import { LazyList } from "../components/lazyLoading/LazyList";
import LastBook from "../components/lastBook/LastBook";
import { token } from "../service/axiosConfig";
import LastVideo from "../components/lastVideo/LastVideo";
import LastPaint from "../components/lastPaint/LastPaint";
import LastVoice from "../components/lastVoice/LastVoice";
import LastGame from "../components/lastGame/LastGame";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LOAD_FILE } from "../service/APIs";

import BottomSheet from "@gorhom/bottom-sheet";
import { color } from "react-native-reanimated";
import { getProfileService } from "../service/UserService";
import Entypo from "react-native-vector-icons/Entypo";
import { OpenToast } from "../components/share/OpenToast";
import { NotifcationStore } from "../Store/NotifcationSotre";
import NavbarSh from "../components/NavbarComponent";
import Story from "../components/Stories/Story";
import typeFinder from "../../Composables/typeFinder";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import DoubleClick from "react-native-double-tap";
import * as FileSystem from "expo-file-system";
import { StoriesStore } from "../Store/StoriesStore";

const reducer =
  ((state = 0),
  (action) => {
    switch (action?.type) {
      case "ADD":
        return state++;
      default:
        return state;
    }
  });
const store = createStore(reducer);

console.log(store.getState());
const HomePage = ({ navigation, route }) => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [exitDialog, setExitDialog] = useState(false);
  const BottomSheetRef = useRef();
  const { setIsLoading } = useContext(RootContext);
  const snapPoints = useMemo(() => ["38%"], []);
  const [isLike, setIsLike] = useState(false);
  const [newestVideo, setNewestVideo] = useState([]);
  const [newestBooks, setNewestBooks] = useState([]);
  const [newestRadio, setNewestRadio] = useState([]);
  const [newestPaint, setNewestPaint] = useState([]);
  const [newestGame, setNewestGame] = useState([]);
  const [lastBooks, setLastBook] = useState(undefined);
  const [firstBook, setFirstBook] = useState({});
  const [lastVideo, setLastVideo] = useState([]);
  const [lastPaint, setLastPaint] = useState([]);
  const [lastVoice, setLastVoice] = useState([]);
  const [lastGame, setLastGame] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [currentPost, setCurrenPost] = useState();
  const [showBottomSheet, setShowBottomSheet] = useState(-1);
  const [commentText, setCommentText] = useState("");
  const [commentsPost, setCommentsPost] = useState([]);
  const [isMute,setIsMute] = useState(false)
  const [refreshState, setRefreshState] = useState(false);
  const { setIsSowNotifcation, setNotifcations, notifications } =
    useContext(RootContext);

  const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(-1);
  const [sendBtnColor, setSendBtnColor] = useState("#3d3d3d");
  const { user } = useContext(RootContext);
  const handleSetComments = (text) => {
    setCommentText(text);
    if (text) {
      setSendBtnColor("#00a2ff");
    } else {
      setSendBtnColor("#3d3d3d");
    }
  };

  useEffect(() => {
    getData();
  }, []);

 
  const getPosts = async () => {
    let tokenOfUser = await getToken();
    // console.log('token',tokenOfUser)
    axios
      .get("https://lifelands.ir/api/v1/social/post", {
        headers: {
          token: tokenOfUser,
        },
      })
      .then((response) => {
        setLastVideo(response.data.data.reverse());

        console.log("data of posts ", response.data.data);
      });
  };
  
  const handleRefresh = async () => {
    console.log('refresh shomod')
   
    getData();
    
  };
  const getData = async () => {
    await axios.get('https://lifelands.ir/api/v1/social/story',{
          headers:{
            token: getValueFor()
          }
        }).then(response=>{
          
          console.log('users stories ',response.data.data.myStories[0])
          // let s = []
          // s.push(response.data.data.myStories[0])

          // response.data.data.stories.map(story=>{
          //   s.push(story)
          // })
          
         if(response.data.data.myStories[0]){
          console.log('story hast ')
          StoriesStore.dispatch({
            type:"ADD_STORY",
            payload:[response.data.data.myStories[0],...response.data.data.stories]
          })
        

         }else{
          StoriesStore.dispatch({
            type:"ADD_STORY",
            payload:[...response.data.data.stories]
          })

         }
          console.log('redux story',StoriesStore.getState())

        })
    let tokenOfUser = await getToken();
    // console.log('token',tokenOfUser)
    setIsLoadingState(true)
   await axios
      .get("https://lifelands.ir/api/v1/social/post", {
        headers: {
          token: tokenOfUser,
        },
      })
      .then((response) => {
        setLastVideo(response.data.data.reverse());

       
      });
    const {
      data: { data: profileResponse },
    } = await getProfileService();
    setProfile(profileResponse);

    setIsLoadingState(false);
  };

  useEffect(() => {
    checkToken();
    getToken();
    getTheme();
  }, [route]);

  const checkToken = async () => {
    if (getToken() == null) {
      navigation.navigate("Profile");
    }
  };
  const Footer = () => {
    return (
      <View
        style={{ width: "100%", height: 40, backgroundColor: "red" }}
      ></View>
    );
  };

  const showDialog = () => {
    setExitDialog(true);
  };

  const handleCancel = () => {
    setExitDialog(false);
  };
  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  const handleExit = () => {
    BackHandler.exitApp();
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  };
  const getDepartment = (url) => {
    if (url) {
      return url.split("/")[0] == "youtube" ? "video" : url.split("/")[0];
    }
  };
  var postType = "";

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        showDialog();
      } else {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, []);
  let flag = false
  const checkIsExits = (TargetArray) => {
    let flag = TargetArray.filter((item) => {
      return item?.userId._id == profile._id;
    });
    
    return Boolean(flag.length);
  };
  return (
    <ScrollView
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
    >
      <NavbarSh
        hasborder={false}
        rightChile={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginHorizontal: 5 }}
              onPress={() => {
                setShowBottomSheet(0);
              }}
            >
              <Image
                source={require("../../assets/add-post.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Notifcations Page");
              }}
              style={{ position: "relative" }}
              activeOpacity={0.4}
            >
              {NotifcationStore.getState().length > 0 ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderColor: "black",
                    borderWidth: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    width: RFPercentage(2.3),
                    height: RFPercentage(2.3),
                    borderRadius: 100,
                    backgroundColor: "#ff0037",
                    zIndex: 9999,
                    opacity: 1,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 9 }}>
                    {NotifcationStore.getState().length}
                  </Text>
                </View>
              ) : null}
              <EvilIcons name="bell" color={"white"} size={RFPercentage(4)} />
            </TouchableOpacity>
          </View>
        }
      />
      <Story />

      {/* <LastVideo books={{}}  mode="Video Player"  navigation={navigation}/> */}

      {isLoadingState ? (
        <ScrollView
        
        refreshControl={
          <RefreshControl refreshing={refreshState}
          onRefresh={handleRefresh} />
        }
              
          style={{ width: "100%", height: Dimensions.get("window").height }}
        >
          {/* <NavbarComponent icons={false} /> */}
          {/* <StatusBar hidden={true} /> */}
          <StatusBar hidden={false} />

          <LazyPosts />
          <View style={{ marginTop: 4 }}></View>
          <LazyPosts />

          <View style={{ marginTop: 4 }}></View>
          <LazyPosts />
          <View style={{ marginTop: 4 }}></View>
          <LazyPosts />
          <View style={{ marginTop: 4 }}></View>
          <LazyPosts />
          <View style={{ marginTop: 4 }}></View>
          <LazyPosts />
          <View style={{ marginTop: 4 }}></View>
          <LazyPosts />
          <View style={{ marginTop: 4 }}></View>
          <LazyPosts />
        </ScrollView>
      ) : (
        <View
          style={{
            width: "100%",
            height: Dimensions.get("window").height * 0.84,
          }}
        >
          <StatusBar hidden={false} />

          <Dialog.Container
            visible={exitDialog}
            contentStyle={{ backgroundColor: "#282828", borderRadius: 30 }}
          >
            <Dialog.Title style={{ color: "#EA7F83", fontFamily: "vaszir" }}>
              خروج از برنامه
            </Dialog.Title>
            <Dialog.Description
              style={{ color: "#cccccc", fontFamily: "vaszir" }}
            >
              مطمئنی میخوای از برنامه خارج بشی؟
            </Dialog.Description>
            <Dialog.Button
              label="خروج"
              onPress={handleExit}
              color={"#EA7F83"}
              style={{ fontFamily: "vaszir" }}
            />
            <Dialog.Button
              label="نه میمونم"
              onPress={handleCancel}
              color={"#CCCCCC"}
              style={{ fontFamily: "vaszir" }}
            />
          </Dialog.Container>
          {/* <NavbarComponent icons={false} /> */}
          {lastVideo.length == 0 ? (
            <View
              style={{
                width: "100%",
                height: Dimensions.get("window").height,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/negative.png")}
                style={{ width: RFPercentage(3), height: 40 }}
              />
              <Text style={{ color: "white", fontFamily: "vazir" }}>
                هنوز دنبال شوندگان شما پستی را منتشر نکرده اند :(
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#7371f3",
                  marginTop: 8,
                  paddingHorizontal: 11,
                  paddingVertical: 2,
                  borderRadius: 15,
                }}
                onPress={() => {
                  navigation.navigate("Add Post");
                }}
              >
                <Text
                  style={{ color: "white", fontFamily: "vazir", fontSize: 10 }}
                >
                  خب پس اولیشو من میزارم
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
            {
              lastVideo.length>0?  <FlatList
              style={{
                // width:Dimensions.get('screen').width,
                paddingHorizontal: RFPercentage(0),
                marginHorizontal: "auto",
                height: Dimensions.get("window").height,
                marginTop: 8,
              }}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              renderToHardwareTextureAndroid
              removeClippedSubviews
              pinchGestureEnabled
              // pagingEnabled

              shouldRasterizeIOS
              refreshing={refreshState}
              onRefresh={handleRefresh}
              
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              data={lastVideo}
              keyExtractor={(item) => item?._id}
              renderItem={({ item }) => {
                return item?.postId ? (
                  <View style={Styles.container}>
                    <View
                      style={[
                        Styles.rowReverse,
                        Styles.between,
                        { paddingHorizontal: 6, alignItems: "center" },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Public Profile Page", {
                            userId: item?.userId._id,
                          });
                        }}
                      >
                        <View style={[Styles.row, Styles.alignCenter]}>
                          <View
                            style={{
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontFamily: "vazir",
                                marginHorizontal: 6,
                              }}
                            >
                              {item?.userId?.firstName} {item?.userId?.lastName}
                            </Text>
                            <Text
                              style={{
                                color: "white",
                                fontFamily: "vazir",
                                marginHorizontal: 6,
                                fontSize: 10,
                                opacity: 0.6,
                              }}
                            >
                              {" "}
                              @{item?.userId.userName}
                            </Text>
                          </View>

                          <Image
                            source={{
                              uri: `${LOAD_FILE}${item?.userId.profileImage}`,
                            }}
                            style={[
                              Styles.radius100,
                              { width: 40, height: 40 },
                            ]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <DoubleClick
                      doubleTap={() => {
                        console.log("clicked for like action");
                        axios
                          .post(
                            "https://lifelands.ir/api/v1/social/like",
                            {
                              postId: item?.postId._id,
                            },
                            {
                              headers: {
                                token: getValueFor(),
                              },
                            }
                          )
                          .then((response) => {
                            getPosts();
                            console.log(response.data);
                          })
                          .catch((err) => {
                            console.log(err);
                            OpenToast(
                              "خطا",
                              "متاسفانه مشکلی پیش آمده است لطفا مججد اقدام کنید",
                              "error"
                            );
                          });
                      }}
                    >
                      <View style={{position:"relative"}}>
                        {
                          item?.postId.postImage?null:<TouchableOpacity onPress={()=>{
                            setIsMute(state=> !state)
                          }} style={{position:"absolute",zIndex: 99,bottom: "5%",left: 5,backgroundColor:"transparent",width:30,height:30,justifyContent:"center",alignItems:"center",borderRadius: 10}}>
                          {
                            isMute?<Ionicons name="volume-mute-outline" color={'white'} size={RFPercentage(2.4)} />:<AntDesign name="sound" color={'white'} size={RFPercentage(2)} />
                          }
                        </TouchableOpacity>
                        }
                        {item?.postId ? (
                          <>
                            {item?.postId.postImage ? (
                              <Image
                                source={{
                                  uri: `${LOAD_FILE}${item?.postId.postImage}`,
                                }}
                                style={{
                                  width: "100%",
                                  height: 370,
                                  objectFit: "cover",
                                  marginTop: 8,
                                }}
                                resizeMethod="resize"
                                resizeMode="cover"
                              />
                            ) : (
                              <VideoPlayer
                              
                              
                                debug={true}
                              style={{
                                height: 570,marginTop: 10
                              }}
                                defaultControlsVisible

                                videoProps={{
                                  shouldPlay: false,
                                  isLooping:false,
                                  videoStyle:{
                                    borderRadius: 10,
                                  },
                                  
                                  
                                  style: {
                                    marginBottom:10,
                                    width: "100%",
                                    height: 570,marginTop: 10
                                  },
                                  isMuted: isMute,
                                  
                                  resizeMode: ResizeMode.CONTAIN,
                                  useNativeControls: true,
                                  // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                                  source: {
                                    uri: `${LOAD_FILE}${item?.postId.postVideo}`,
                                  },
                                }}
                              />
                            )}
                          </>
                        ) : null}
                      </View>
                    </DoubleClick>
                    <View
                      style={{
                        width: "100%",
                        paddingHorizontal: RFPercentage(2),
                        marginTop: 20,
                      }}
                    >
                       <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingBottom: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              console.log("clicked for like action");
                              axios
                                .post(
                                  "https://lifelands.ir/api/v1/social/like",
                                  {
                                    postId: item?.postId._id,
                                  },
                                  {
                                    headers: {
                                      token: getValueFor(),
                                    },
                                  }
                                )
                                .then((response) => {
                                  getPosts();
                                  console.log(response.data);
                                })
                                .catch((err) => {
                                  console.log(err);
                                  OpenToast(
                                    "خطا",
                                    "متاسفانه مشکلی پیش آمده است لطفا مججد اقدام کنید",
                                    "error"
                                  );
                                });
                            }}
                          >
                            {checkIsExits(item.like) ? (
                              <AntDesign
                                name="heart"
                                color={"#ff0037"}
                                size={RFPercentage(3)}
                              />
                            ) : (
                              <AntDesign
                                name="hearto"
                                color={"white"}
                                size={RFPercentage(3)}
                              />
                            )}
                          </TouchableOpacity>
                          <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={()=>{
                            navigation.navigate('Comments Post Page',{post:{item: item,comment: item?.comment}})
                          }}>
                            <Image source={require('../../assets/comment.png')} style={{width: RFPercentage(3.4),height: RFPercentage(3.4)}} />
                            
                          </TouchableOpacity>
                          <TouchableOpacity
                          onLongPress={()=>{
                            if(item?.postId.postImage){
                              Linking.openURL(`${LOAD_FILE}${item?.postId.postImage}`)

                            }else{
                            Linking.openURL(`${LOAD_FILE}${item?.postId.postVideo}`)

                            }
                          }}
                          onPress={() => {
                            showToastWithGravityAndOffset(
                              "دانلود شروع شد  . . ."
                            );
                            if (item?.postId.postImage) {
                              FileSystem.downloadAsync(
                                `${LOAD_FILE}${item?.postId.postImage}`,
                                FileSystem.documentDirectory + "download.jpg"
                              )
                                .then(({ uri }) => {
                                  OpenToast(
                                    "دانلود شد",
                                    "پست مورد نظر با موفقیت دانلود شد"
                                  );
                                  // Linking.openURL(`${LOAD_FILE}${item?.postId.postImage}`)
                                  console.log(
                                    "Finished downloading to ",
                                    uri
                                  );
                                })
                                .catch((error) => {
                                  console.error(error);
                                });
                            } else {
                              FileSystem.downloadAsync(
                                `${LOAD_FILE}${item?.postId.postVideo}`,
                                FileSystem.documentDirectory + "download.mp4"
                              )
                                .then(({ uri }) => {
                                  OpenToast(
                                    "دانلود شد",
                                    "پست مورد نظر با موفقیت دانلود شد"
                                  );
                                  // Linking.openURL(`${LOAD_FILE}${item?.postId.postVideo}`)
                                  console.log(
                                    "Finished downloading to ",
                                    uri
                                  );
                                })
                                .catch((error) => {
                                  console.error(error);
                                });
                            }
                          }}
                        >
                          <AntDesign
                            name="download"
                            color={"white"}
                            size={RFPercentage(3)}
                          />
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          style={{ marginLeft: 15 }}
                          onPress={() => {

                           Share.share({
                            title:`اشتراک گذاری پست ${item?.userId.firstName} در لایف لندز`,
                            url: `${LOAD_FILE}${item?.postId.postVideo}`,
                            message:`${
                              LOAD_FILE
                            }${item?.postId.postVideo}\n    
                            
                            image File : ${LOAD_FILE}${item?.postId?.postImage}
                            
                            video File : ${LOAD_FILE}${item?.postId.postVideo}
                            `
                           })
                          }}
                        >
                          <AntDesign
                            name="sharealt"
                            color={"white"}
                            size={RFPercentage(3)}
                          />
                        </TouchableOpacity>
                      </View>
                      {
                        item?.like.length> 0?<View style={{flexDirection:'row',alignItems:"center"}}>

                        </View>:null
                      }
                      {
                        item?.like?.length>=4?<Pressable onPress={()=>{
                          navigation.navigate('Who Like',{users: item?.like})
                        }} style={{flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"flex-end",marginTop: 5}}>
<Text style={{color:"white",fontFamily:'vazir',marginHorizontal: 4,opacity:0.68,fontSize: 12}}>
                            لایک شده توسط {item.like[2].userId.userName} و {item.like.length - 1} نفر دیگر
                            
                         
                          </Text>
                          <Image source={{
                            uri: `${LOAD_FILE}${item.like[0].userId.profileImage}`
                          }} style={{width:30,height:30,borderRadius: 100,marginRight:-12,borderColor:"black",borderWidth: 3}}/>
                           <Image source={{
                            uri: `${LOAD_FILE}${item.like[1].userId.profileImage}`
                          }} style={{width:30,height:30,borderRadius: 100,marginRight:-12,borderColor:"black",borderWidth: 3}}/>
                           <Image source={{
                            uri: `${LOAD_FILE}${item.like[2].userId.profileImage}`
                          }} style={{width:30,height:30,borderRadius: 100,marginRight:-12,borderColor:"black",borderWidth: 3}}/>

                          

                        </Pressable>:null
                      }
                      {item?.like.length > 0 && item.like.length<4 ? (
                      <Pressable  onPress={()=>{
                        navigation.navigate('Who Like',{users: item?.like})
                      }} >
                          <Text
                          style={{
                            color: "white",
                            fontFamily: "vazir",
                            marginTop: 1,
                          }}
                        >
                          {item?.like.length} پسند
                        </Text>
                      </Pressable>
                      ) : null}
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "vazir",
                          marginTop: 8,
                        }}
                      >
                        @{item?.userId.userName}
                      </Text>
                      {item?.comment.length > 0 ? (
                        <TouchableOpacity onPress={()=>{
                          navigation.navigate('Comments Post Page',{post: {item: item,comment: item?.comment}})
                        }}>
                          <Text
                          style={{
                            color: "#3b3b3b",
                            fontFamily: "vazir",
                            marginTop: 7,
                          }}
                        >
                          مشاهده ی هر {item?.comment.length} نظر
                        </Text>
                        </TouchableOpacity>
                      ) : null}
                     
                      <Autolink   text={`${item?.postId.description}`} linkProps={{
                        selectable:true,
                        selectionColor:"white",
                        lineBreakMode:'middle',
                        
                      }} linkStyle={{
                        color:"#3dadf3"
                      }} style={{ color: "white", fontFamily: "vazir" }} email phone mention='instagram' hashtag="instagram"/>
                        
                      
                      <Text style={{ color: "#3b3b3b", fontFamily: "vazir" ,fontSize: RFPercentage(1.4),marginTop: 15}}>
                        {item?.createdAt}
                      </Text>
                    </View>
                  </View>
                ) : null;
              }}
            />:<View style={{width:"100%",height: Dimensions.get('window').height,backgroundColor:"red",justifyContent:"center",alignItems:"center"}}>
            <Image source={require('../../assets/negative.png')} style={{width: RFPercentage(3),height:40}} />
             <Text style={{color:"white",fontFamily:"vazir",}}>هیچ پستی وجود ندارد
             :(
             </Text>
             <TouchableOpacity style={{backgroundColor:"#7371f3",marginTop:8,paddingHorizontal:11,paddingVertical:2,borderRadius: 15}} onPress={()=>{
                 navigation.navigate("Add Post")
             }}>
                 <Text style={{color:"white",fontFamily:"vazir",fontSize: 10}}>خب پس اولیشو من میزارم</Text>
             </TouchableOpacity>
           </View>
            }
            </View>
          )}
        </View>
      )}
      <BottomSheet
        zIndex={999}
        ref={BottomSheetRef}
        snapPoints={snapPoints}
        index={showBottomSheet}
        onClose={() => {
          setShowBottomSheet(-1);
        }}
        enablePanDownToClose
        style={{
          backgroundColor: "#0b0b0b",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
        handleStyle={{
          backgroundColor: "#1b1b1b",
          overflow: "hidden",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,

          // borderTopRightRadius: 100,
          // borderTopLeftRadius: 100,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#383838",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#151515",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setShowBottomSheet(-1);
              navigation.navigate("Add Post");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 7,
              backgroundColor: "#222222",
              padding: 10,
              borderRadius: 9,
            }}
          >
            <EvilIcons name="camera" color={"white"} size={RFPercentage(5)} />
            <Text style={{ marginTop: 3, color: "white", fontFamily: "vazir" }}>
              افزودن پست
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowBottomSheet(-1);

              navigation.navigate("Social");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 7,
              backgroundColor: "#222222",
              padding: 10,
              borderRadius: 9,
            }}
          >
            <Entypo name="images" color={"white"} size={RFPercentage(3)} />
            <Text style={{ marginTop: 3, color: "white", fontFamily: "vazir" }}>
              افزودن محتوا
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: "100%",

    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,

    marginBottom: 40,
  },
  justifyCenter: {
    justifyContent: "center",
  },
  col: {
    flexDirection: "col",
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  between: {
    justifyContent: "space-between",
  },
  alignCenter: {
    alignItems: "center",
  },

  radius100: {
    borderRadius: 200,
  },
  description: {
    paddingHorizontal: RFPercentage(1),
    paddingVertical: 8,
  },
  footer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: "#5d5d5d",
    borderTopWidth: 1,
    padding: 8,
  },
});
export default HomePage;
