import React, { useEffect, useState } from "react";
import { View,Text, StyleSheet,Image,TouchableOpacity, Dimensions, ToastAndroid, ActivityIndicator, Share, Pressable } from "react-native";
import NavbarSh from "../components/NavbarComponent";
import GoBack from "../components/GoBack";

import { RFPercentage } from "react-native-responsive-fontsize";
import DoubleClick from "react-native-double-tap";
import VideoPlayer from "expo-video-player";
import {Video, ResizeMode } from "expo-av";
import { LOAD_FILE } from "../service/APIs";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useNavigation } from "@react-navigation/core";
import { LazyPosts } from "../components/lazyLoading/LazyPosts";
import { getProfileService } from "../service/UserService";
import axios from "axios";
import { getValueFor } from "../appsetting/storeConfig";
import { ScrollView } from "react-native-gesture-handler";
import { OpenToast } from "../components/share/OpenToast";
import Autolink from "react-native-autolink";
 
const SinglePostPage = ({route})=>{
    const navigation = useNavigation()

    const [postId,setPostId] = useState(route.params.post.postId._id)
    const [post,setPost]  = useState({})
    const [profile,setProfile] = useState()
    const showToastWithGravityAndOffset = (message) => {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    };
    const getPost = ()=>{
      axios.post('https://lifelands.ir/api/v1/social/singlePost',{
        postId,
        
      },{
        headers:{
          token: getValueFor()
        }
      }).then(response=>{
    console.log(postId)
          setPost(response.data.data)
        console.log('single post ',response.data.data)
      }).catch(err=>{
        OpenToast('حظا','متاسفانه خطایی پیش آمده است','error')
        console.log(err)
      })
    }
    useEffect(()=>{
      getPost()
    },[])
    const checkIsExits = (TargetArray) => {
        let flag = TargetArray.find((post) => {
          return post.userId._id == profile._id;
        });
        return flag;
      };
      const getProfile = async ()=>{
        const {
            data: { data: profileResponse },
          } = await getProfileService();
          setProfile(profileResponse);
      }
      useEffect(()=>{
        getProfile()
      },[])
    return (
        <View>
            <NavbarSh rightChile={<View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{marginRight: 8,color:"white",fontFamily:"vazir"}}>پست</Text>
                <GoBack />
            </View>} />
       {
        post && profile? <ScrollView style={{width:Dimensions.get('window').width,height: Dimensions.get('window').height}}>
        {
            profile? <View style={Styles.container}>
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
                    userId: post.userId._id,
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
                      {post.userId?.firstName} {post.userId?.lastName}
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
                      @{post.userId.userName}
                    </Text>
                  </View>

                  <Image
                    source={{
                      uri: `${LOAD_FILE}${post.userId.profileImage}`,
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
                      postId: post.postId._id,
                    },
                    {
                      headers: {
                        token: getValueFor(),
                      },
                    }
                  )
                  .then((response) => {
                    getPost();
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
                {post?.postId ? (
                  <>
                    {post.postId.postImage ? (
                      <Image
                        source={{
                          uri: `${LOAD_FILE}${post.postId.postImage}`,
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
                        
                        
                        resizeMode: ResizeMode.CONTAIN,
                        useNativeControls: true,
                        // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                        source: {
                          uri: `${LOAD_FILE}${post.postId.postVideo}`,
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
                marginTop: 25,
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
                                    postId: post.postId._id,
                                  },
                                  {
                                    headers: {
                                      token: getValueFor(),
                                    },
                                  }
                                )
                                .then((response) => {
                                  getPost();
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
                            {checkIsExits(post.like) ? (
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
                            navigation.navigate('Comments Post Page',{post:{item: post,comment: post.comment}})
                          }}>
                            <Image source={require('../../assets/comment.png')} style={{width: RFPercentage(3.4),height: RFPercentage(3.4)}} />
                            
                          </TouchableOpacity>
                          <TouchableOpacity
                          onLongPress={()=>{
                            if(post.postId.postImage){
                              Linking.openURL(`${LOAD_FILE}${post.postId.postImage}`)

                            }else{
                            Linking.openURL(`${LOAD_FILE}${post.postId.postVideo}`)

                            }
                          }}
                          onPress={() => {
                            showToastWithGravityAndOffset(
                              "دانلود شروع شد  . . ."
                            );
                            if (post.postId.postImage) {
                              FileSystem.downloadAsync(
                                `${LOAD_FILE}${post.postId.postImage}`,
                                FileSystem.documentDirectory + "download.jpg"
                              )
                                .then(({ uri }) => {
                                  OpenToast(
                                    "دانلود شد",
                                    "پست مورد نظر با موفقیت دانلود شد"
                                  );
                                  // Linking.openURL(`${LOAD_FILE}${post.postId.postImage}`)
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
                                `${LOAD_FILE}${post.postId.postVideo}`,
                                FileSystem.documentDirectory + "download.mp4"
                              )
                                .then(({ uri }) => {
                                  OpenToast(
                                    "دانلود شد",
                                    "پست مورد نظر با موفقیت دانلود شد"
                                  );
                                  // Linking.openURL(`${LOAD_FILE}${post.postId.postVideo}`)
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
                            title:`اشتراک گذاری پست ${post.userId.firstName} در لایف لندز`,
                            url: `${LOAD_FILE}${post.postId.postVideo}`,
                            message:`${
                              LOAD_FILE
                            }${post.postId.postVideo}\n    
                            
                            image File : ${LOAD_FILE}${post.postId?.postImage}
                            
                            video File : ${LOAD_FILE}${post.postId.postVideo}
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
                        post?.like?.length>=4?<Pressable onPress={()=>{
                          navigation.navigate('Who Like',{users: post?.like})
                        }} style={{flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"flex-end",marginTop: 5}}>
<Text style={{color:"white",fontFamily:'vazir',marginHorizontal: 4,opacity:0.68,fontSize: 12}}>
                            لایک شده توسط {post.like[2].userId.userName} و {post.like.length - 1} نفر دیگر
                            
                         
                          </Text>
                          <Image source={{
                            uri: `${LOAD_FILE}${post.like[0].userId.profileImage}`
                          }} style={{width:30,height:30,borderRadius: 100,marginRight:-12,borderColor:"black",borderWidth: 3}}/>
                           <Image source={{
                            uri: `${LOAD_FILE}${post.like[1].userId.profileImage}`
                          }} style={{width:30,height:30,borderRadius: 100,marginRight:-12,borderColor:"black",borderWidth: 3}}/>
                           <Image source={{
                            uri: `${LOAD_FILE}${post.like[2].userId.profileImage}`
                          }} style={{width:30,height:30,borderRadius: 100,marginRight:-12,borderColor:"black",borderWidth: 3}}/>

                          

                        </Pressable>:null
                      }
                      {post?.like.length > 0 && post.like.length<4 ? (
                      <Pressable  onPress={()=>{
                        navigation.navigate('Who Like',{users: post?.like})
                      }} >
                          <Text
                          style={{
                            color: "white",
                            fontFamily: "vazir",
                            marginTop: 1,
                          }}
                        >
                          {post?.like.length} پسند
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
                @{post.userId.userName}
              </Text>
              {post.comment.length > 0 ? (
                <TouchableOpacity onPress={()=>{
                  navigation.navigate('Comments Post Page',{post: {item: post,comment: post.comment}})
                }}>
                  <Text
                  style={{
                    color: "#3b3b3b",
                    fontFamily: "vazir",
                    marginTop: 7,
                  }}
                >
                  مشاهده ی هر {post.comment.length} نظر
                </Text>
                </TouchableOpacity>
              ) : null}
             
              <Autolink text={`${post.postId.description}`} linkStyle={{
                color:"#00a6ff"
              }} style={{ color: "white", fontFamily: "vazir" }} hashtag="instagram" mention='instagram'/>
                
              
              <Text style={{ color: "#2a2a2a", fontFamily: "vazir" ,fontSize: RFPercentage(1.3)}}>
                {post.createdAt}
              </Text>
            </View>
          </View>:<LazyPosts />
           }
        </ScrollView>:<ActivityIndicator color={'white'} size={RFPercentage(3)} />
       }
        </View>
    )
}

export default SinglePostPage

const Styles = StyleSheet.create({
    container: {
      width: "100%",
      marginTop: 20,
  
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