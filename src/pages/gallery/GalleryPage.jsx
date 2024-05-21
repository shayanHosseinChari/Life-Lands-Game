/** @format */

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Share,
  ImageBackground
} from "react-native";
// import Api from "../../api/Api";
import { getProfileService } from "../../service/UserService";
import axios from "axios";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as FileSystem from 'expo-file-system'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Clipboard from 'expo-clipboard'
import { RFPercentage } from "react-native-responsive-fontsize";
import {UIActivityIndicator} from 'react-native-indicators'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { LOAD_FILE, lastMedia } from "../../service/APIs";
import { getToken, getValueFor } from "../../appsetting/storeConfig";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import ToLocaleString from "../../../Composables/ToLocaleString";
import CustomText from "../../components/text/CustomText";
import VideoPlayer from "expo-video-player";
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ResizeMode } from "expo-av";
import DoubleClick from "react-native-double-tap";
import { OpenToast } from "../../components/share/OpenToast";
import Autolink from "react-native-autolink";

const GalleryPage = () => {
  const [ExploreContent, setExploreContent] = useState([]);
  // const ExploreApi = Api.ExploreApi;
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [item,setItem] = useState(null)
  // const navigation = useNavigation()
  const [addContentLoading,setAddContentLoading] = useState(false)
  const [refresingLoader,setRefreshingLoader] = useState(false)
  const [counter,setCounter] = useState(10)
  const [showRefreshMain,setShowRefreshMain] = useState(false)
  const [lastVideo,setLastVideo] = useState([])
  const [isShowScale,setIsShowScale] = useState(false)
  const [profile,setProfile] = useState()

  const [loadingSkeleton, setLoadingSkeleton] = useState([
    {
      id: 1,
      text: "SkeletonContent",
      
    },
    {
      id: 2,
      text: "SkeletonContent",
    },
    {
      id: 3,
      text: "SkeletonContent",
    },
    {
      id: 4,
      text: "SkeletonContent",
    },
    {
      id: 5,
      text: "SkeletonContent",
    },
    {
      id: 6,
      text: "SkeletonContent",
    },
    {
      id: 7,
      text: "SkeletonContent",
    },
    {
      id: 8,
      text: "SkeletonContent",
    },
    {
      id: 9,
      text: "SkeletonContent",
    },
    {
      id: 445,
      text: "SkeletonContent",
    },
    {
      id: 10,
      text: "SkeletonContent",
    },
    {
      id: 11,
      text: "SkeletonContent",
    },
    {
      id: 12,
      text: "SkeletonContent",
    },
    {
      id: 13,
      text: "SkeletonContent",
    },
    {
      id: 14,
      text: "SkeletonContent",
    },
    {
      id: 15,
      text: "SkeletonContent",
    },
    {
      id: 16,
      text: "SkeletonContent",
    },
    {
      id: 17,
      text: "SkeletonContent",
    },
    {
      id: 18,
      text: "SkeletonContent",
    },

    {
      id: 19,
      text: "SkeletonContent",
    },
  ]);
  const getProfile = async ()=>{
    const {
        data: { data: profileResponse },
      } = await getProfileService();
      setProfile(profileResponse);
  }
  useEffect(()=>{
    getProfile()
  },[])
  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  const checkIsExits = (TargetArray) => {
    let flag = TargetArray.find((post) => {
      return post.userId == profile._id;
    });
    return flag;
  };
  const getDepartment = (url)=>{
   if(url){
    if(url?.split('/')[0] == "voice"){

      return "playlist"
    }else{
      if(url) return url.split('/')[0] == "youtube"?"video": url.split('/')[0]

    }
    
    
   }
  }
  const updatePosts = async()=>{
    let tokenOfUser = await getToken()

    setIsLoading(true)
    await axios.get("https://lifelands.ir/api/v1/social/explore",{
      headers:{
        token: tokenOfUser
      }
    }).then(res=>{
      setIsLoading(false)

      setLastVideo(res.data.data)
    })
    setIsLoading(false)


  }
  const getData = useCallback(async()=>{
    setIsLoading(true)
    console.log('gallery is actived')
    let tokenOfUser = await getToken()
    
    await axios.get("https://lifelands.ir/api/v1/social/explore",{
      headers:{
        token: tokenOfUser
      }
    }).then(res=>{
      console.log(res.data)
    setIsLoading(false)
      
      setLastVideo(res.data.data)
    })
    setIsLoading(false)

  })
  useEffect(()=>{
    getData()
  },[])
  return (
    
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      //  paddingTop:StatusBar.currentHeight
        height:Dimensions.get('window').height
      }}
    >
      <StatusBar hidden={false} />
     {
      isShowScale? <ScrollView style={{position:"absolute",top:0,left:0,width: Dimensions.get('window').width,height: Dimensions.get('window').height,backgroundColor:"rgba(6, 6, 6, 0.44)",zIndex: 99,paddingHorizontal: RFPercentage(2)}}>

      <Pressable >
      <View style={[Styles.container,{backgroundColor:"#121212",paddingVertical: 6}]}>
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
                            userId: item.userId._id,
                          });
                        }}
                        style={{paddingVertical: 5}}
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
                              {item.userId?.firstName} {item.userId?.lastName}
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
                              @{item.userId.userName}
                            </Text>
                          </View>

                          <Image
                            source={{
                              uri: `${LOAD_FILE}${item.userId.profileImage}`,
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
                              postId: item.postId._id,
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
                      <View>
                        {item?.postId ? (
                          <>
                            {item.postId.postImage ? (
                              <Image
                                source={{
                                  uri: `${LOAD_FILE}${item.postId.postImage}`,
                                }}
                                style={{
                                  width: "100%",
                                  height: 270,
                                  objectFit: "cover",
                                  marginTop: 8,
                                }}
                                resizeMethod="resize"
                                resizeMode="cover"
                              />
                            ) : (
                              <VideoPlayer
                              style={{
                                height: 370,marginTop: 10
                              }}
                                videoProps={{
                                  
                                  shouldPlay: false,
                                  style: {
                                    marginBottom:10,
                                    width: "100%",
                                    height: 370,marginTop: 10
                                  },

                                  resizeMode: ResizeMode.CONTAIN,
                                  useNativeControls: false,
                                  // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                                  source: {
                                    uri: `${LOAD_FILE}${item.postId.postVideo}`,
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
                                    postId: item.postId._id,
                                  },
                                  {
                                    headers: {
                                      token: getValueFor(),
                                    },
                                  }
                                )
                                .then((response) => {
                                  setIsShowScale(false)
                                  getData()
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
                            <Image source={require('../../../assets/comment.png')} style={{width: RFPercentage(3.4),height: RFPercentage(3.4)}} />
                            
                          </TouchableOpacity>
                          <TouchableOpacity
                          style={{ marginLeft: 15 }}
                          onPress={() => {
                            showToastWithGravityAndOffset(
                              "دانلود شروع شد  . . ."
                            );
                            if (item.postId.postImage) {
                              FileSystem.downloadAsync(
                                `${LOAD_FILE}${item.postId.postImage}`,
                                FileSystem.documentDirectory + "download.jpg"
                              )
                                .then(({ uri }) => {
                                  OpenToast(
                                    "دانلود شد",
                                    "پست مورد نظر با موفقیت دانلود شد"
                                  );
                                  // Linking.openURL(`${LOAD_FILE}${item.postId.postImage}`)
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
                                `${LOAD_FILE}${item.postId.postVideo}`,
                                FileSystem.documentDirectory + "download.mp4"
                              )
                                .then(({ uri }) => {
                                  OpenToast(
                                    "دانلود شد",
                                    "پست مورد نظر با موفقیت دانلود شد"
                                  );
                                  // Linking.openURL(`${LOAD_FILE}${item.postId.postVideo}`)
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
                            title:`اشتراک گذاری پست ${item.userId.firstName}`,
                            url: `${LOAD_FILE}${item.postId.postVideo}`,
                            message:`${
                              LOAD_FILE
                            }${item.postId.postVideo}\n    
                            
                            image File : ${LOAD_FILE}${item.postId?.postImage}
                            ==================================================
                            video File : ${LOAD_FILE}${item.postId.postVideo}

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
                           <ImageBackground source={{
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
                        @{item.userId.userName}
                      </Text>
                      {item.comment.length > 0 ? (
                        <TouchableOpacity onPress={()=>{
                          navigation.navigate('Comments Post Page',{post: {item: item,comment: item.comment}})
                        }}>
                          <Text
                          style={{
                            color: "#3b3b3b",
                            fontFamily: "vazir",
                            marginTop: 7,
                          }}
                        >
                          مشاهده ی هر {item.comment.length} نظر
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
                        
                      <Text style={{ color: "#2a2a2a", fontFamily: "vazir" ,fontSize: RFPercentage(1.3)}}>
                        {item.createdAt}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={()=>{
                    setIsShowScale(false)
                    setItem(null)
                  }} style={{justifyContent:'center',alignItems:'center',height: 45,borderRadius: 10,width:"100%"}}>
                    <Text style={{fontFamily:"vazir",color:"white"}}>بستن</Text>
                  </TouchableOpacity>
         
          </Pressable>
      </ScrollView>:null
     }

<View style={{paddingHorizontal: RFPercentage(1.3),marginTop: 10,marginBottom: 8}}>
<TouchableOpacity onPress={()=>{
  navigation.navigate('Search Users')
}} style={{width:"100%",height:40,backgroundColor:"#2d2d2d",borderRadius: 10,flexDirection:'row',alignItems:'center',paddingHorizontal: 10}}>
  <AntDesign name="search1" color={"white"} size={RFPercentage(3)} />
  <Text style={{color:"white",fontFamily:"vazir",marginHorizontal: RFPercentage(2)}}> Search</Text>
</TouchableOpacity>

</View>
      {isLoading ? (
        <FlatList
          // onEndReached={addContents}
          data={loadingSkeleton}
          scrollEnabled
          contentContainerStyle={{ alignSelf: "stretch" }}
          nestedScrollEnabled={true}
          numColumns={3}
          key={3}
          showsVerticalScrollIndicator={false}
          style={{
            height: Dimensions.get("screen").height,
            marginTop: RFPercentage(0.9),
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={{
                  width: item.id % 2 == 0? "43.333336%":"33.333336%" ,
                  position: "relative",
                  backgroundColor: "#151515",
                  borderColor: "black",
                  borderWidth: 1,
                  height: 150,
                }}
              ></Pressable>
            );
          }}
          // onRefresh={updatePosts}
          // refreshing={isRefresh}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          // onEndReached={addContents}
          data={lastVideo.reverse()}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignSelf: "stretch" }}
          nestedScrollEnabled={true}
          numColumns={3}
          key={3}
          style={{ height: Dimensions.get("screen").height, }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
          if(item.postId){
            return (
              <TouchableOpacity
              activeOpacity={0.7}
                onLongPress={() => {
                  console.log('longed Press',item)
                  setItem(item)
                  setIsShowScale(true)
                 
                }}
                style={{
                  width: "33.333333%",
                  position: "relative",
                  backgroundColor: "#303030",
                  borderColor: "black",
                  flex:1,
                  borderWidth: 1,
                  zIndex:99,
                  position:"relative"
                }}
                onPress={() => {
                  console.log('deppp',item)
                  navigation.navigate('Single Post',{post: item})
                 
                }}
              >
                { item.postId.postImage ? <Image
                  blurRadius={1}
                  source={{
                    uri: `${LOAD_FILE}${item?.postId?.postImage}`,
                  }}
                  style={{
                    width: "100%",
                    height: RFPercentage(19),
                    borderColor: "black",
                    borderWidth: 1,
                    objectFit: "cover",
                  }}
                  resizeMode="contain"
                />:
                <>
                {
                  item.postId.postVideo?<View style={{position:"relative"}}>
                  <TouchableOpacity onLongPress={() => {
                  console.log(item)
                  setItem(item)
                  setIsShowScale(true)
                 
                }} onPress={()=>{
                    navigation.navigate('Single Post',{post: item})

                  }}  style={{position:"absolute",top:0,width:'100%',height:150,backgroundColor:"#ff00000",zIndex:99}}></TouchableOpacity>
                  <VideoPlayer
                style={{
                  height: 150,
                  position:"absolute",
                  zIndex:-1
                }}
                debug={true}

                videoProps={{
                  shouldPlay: false,
                  
                  onPlaybackStatusUpdate:()=>{
                    console.log('play shodom')
                  },
                  isMuted:true,
               
                  
                  
                  onTouchMove:()=>{
                    navigation.navigate('Single Post',{postId: item.postId._id})

                  },
                  
                  style: {
                    
                    width: "100%",
                    height: 150,
                    zIndex:-1,
                    position:"absolute"
                  },
                  resizeMode: ResizeMode.COVER,
                  useNativeControls:false,
                  
                  // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                  source: {
                    uri: `${LOAD_FILE}${item?.postId?.postVideo}`,
                  },
                }}
              /></View>:null
                }
                </>}
                {
                  item.postId.postVideo?<Ionicons name="play" color={'white'} size={RFPercentage(2.6)} style={{position:"absolute",bottom: 6,left:6}}/>:null
                }
               
                
              </TouchableOpacity>
            );
          }else{
            return null
          }
          }}
          onRefresh={getData}
          
          refreshing={isRefresh}
          keyExtractor={(item, index) => index}
        />
      )}
    {addContentLoading? <View style={{width:"100%",justifyContent:"center",alignItems:"center",backgroundColor:"black",height:RFPercentage(4)}}>
     <UIActivityIndicator color="#d8d8d8" size={RFPercentage(2.4)} count={8} />
     </View>:null}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: "100%",
   
    borderRadius:9,
    

    marginTop: 20,
  },
  justifyCenter:{
    justifyContent:'center'
  },
  col:{
    flexDirection:"col"
  },
  row:{
    flexDirection:'row'
  },
  rowReverse:{
    flexDirection:'row-reverse'
  }
  ,
  between:{
    justifyContent:"space-between"
  },
  alignCenter:{
    alignItems:"center"
  },

  radius100:{
    borderRadius:200
  }
  ,
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
    borderTopWidth:1,
    padding: 8,
  },
});

export default GalleryPage;