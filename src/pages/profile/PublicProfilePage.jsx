import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions, ScrollView, StyleSheet,TouchableHighlight, View,Text,Share,Image, Linking, Pressable
  ,
  
  TouchableOpacity,
  
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomText from "../../components/text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import { CenterStyled, Row } from "../../style/uiUtil";
import HeaderComponent from "../../components/layout/HeaderComponent";
import { useTheme } from "@react-navigation/native";
import {
  followService,
  getPublicProfileService,
  getUsersPostsService,
} from "../../service/UserService";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'


import { border } from "../../appsetting/styleSetting";
import PageWrapper from "../../components/loading/PageWrapper";
import { followActionServer } from "../../service/FollowService";
import CategoryItem from "../../components/home/CategoryItem";
import UserProfileInformationComponent from "../../components/profile/UserProfileInformationComponent";
import UsersProfilePostsComponent from "../../components/profile/UsersProfilePostsComponent";
import Entypo from 'react-native-vector-icons/Entypo'
import Theme from "../../Theme/Theme";

import { StatusBar } from "react-native";
import { RootContext } from "../../context/RootContext";
import { LOAD_FILE } from "../../service/APIs";
import { LinearGradient } from "expo-linear-gradient";

const PublicProfilePage = ({ route, navigation }) => {
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [profile, setProfile] = useState({});
  const { user } = useContext(RootContext);
  const [showProfileModal,setShowProfileModal]  = useState(false)

  const [isLoadingState, setIsLoadingState] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeItem, setActiveItem] = useState("book");
  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 24,
    department: "book",
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getPosts();
  }, [filter]);

  useEffect(() => {
    getPosts();
  }, [activeItem]);

  const getPosts = async () => {
    let userId = route?.params?.userId;
    const { data } = await getUsersPostsService(
      { ...filter, ...{ department: activeItem } },
      userId
    );
    setIsFinishPages(data?.data?.length === 0);
    let mergeLists = [...posts, ...data?.data];
    setPosts(mergeLists);
  };
  const followHandling = async(userId)=>{
    
   let {data} = await followService(userId)
   console.log('follow data: ',data)
   getData()
  }
  const getData = async () => {
    const {
      data: { data: profileResponse },
    } = await getPublicProfileService(route.params.userId);
    setProfile(profileResponse);
    console.log(profileResponse)
    setIsLoadingState(false);
    setIsFollowed(profileResponse.isFollowed);
  };

  return (
    <View style={{width: Dimensions.get('window').width,height: Dimensions.get('window').height,position:'relative'}}>
       {
        showProfileModal?<View style={{position:"absolute",width:'100%',height:'100%',zIndex:99,backgroundColor:"black",paddingHorizontal: RFPercentage(2)}}>
        <TouchableOpacity style={{marginBottom:8}} onPress={()=>{
         setShowProfileModal(false)
        }}>
         <AntDesign name="close" color={'white'} size={RFPercentage(2.3)} />
        </TouchableOpacity>
         <Image  
         style={{width:"100%",height:'80%',borderRadius: 15}}
         source={{
           uri: `${LOAD_FILE}${profile.profileImage}`,
           
         }}
         />
         <LinearGradient colors={['black','transparent']} style={{flexDirection:'row',marginTop: 10}}>
           <TouchableOpacity style={{flex:1,backgroundColor:"rgba(17, 17, 17, 1)",justifyContent:"center",alignItems:"center",height:46,borderRadius: 10,flexDirection:"row",alignItems:"center"}} onPress={()=>{
            Linking.openURL(`${LOAD_FILE}${profile.profileImage}`)
           
           }}>
             <Text style={{color:"white",fontFamily:"vazir",marginRight:10}}>دانلود عکس پروفایل</Text>
             <Feather name="download" color={'white'} size={RFPercentage(2)} />
 
           </TouchableOpacity>
           <TouchableOpacity style={{flex:1,backgroundColor:"rgba(17, 17, 17, 1)",justifyContent:"center",marginHorizontal:10,alignItems:"center",height:46,borderRadius: 10,flexDirection:"row",alignItems:"center"}} onPress={()=>{
             const shareAppOptions = {
               title: `پروفایل ${profile.firstName}`,
               message: `لینک پروفایل ${profile.firstName}: \n ${LOAD_FILE}${profile.profileImage}`, 
               url: `${LOAD_FILE}${profile.profileImage}`
             };
             Share.share(shareAppOptions)
           }}>
             <Text style={{color:"white",fontFamily:"vazir",marginRight:10}}>اشتراک گزاری </Text>
             <AntDesign name="sharealt" color={'white'} size={RFPercentage(2)} />
 
           </TouchableOpacity>
         </LinearGradient>
       </View>:null
      }
      <TouchableHighlight activeOpacity={0.9} 
    onPress={()=>{
      navigation.goBack()
    }}
  underlayColor="rgba(8, 8, 8, 1)" style={{flexDirection:"row",alignItems:"center",borderBottomColor:'rgba(23, 23, 23, 0.8)',borderRadius:8,borderBottomWidth:0,paddingHorizontal: RFPercentage(2),paddingVertical: RFPercentage(1),marginTop:6}} >
        <>
        <Entypo name='chevron-left' size={RFPercentage(3)} color={'white'}/>
        <Text style={{color:"white",marginHorizontal:7,fontSize:RFPercentage(2)}}>{profile.userName}</Text></>
      </TouchableHighlight>

      <ScrollView  style={{width:Dimensions.get('window').width,paddingHorizontal:RFPercentage(2)}} isLoadingState={isLoadingState} onRefresh={getData}>
        <SpaceStyle bottom={100} top={20}>
          <View style={{ alignSelf: "center",width:"100%" }}>
            <Pressable onLongPress={()=>{
              setShowProfileModal(true)
            }}>
            <UserProfileInformationComponent
              profile={profile}
              route={route}
              isFollowed={isFollowed}
              setIsFollowed={setIsFollowed}
              navigation={navigation}
              showMoreInfo={false}
            />
            </Pressable>
          {
            profile._id != user._id?  <View style={{width:"100%",justifyContent:"center",alignItems:"center",paddingHorizontal:RFPercentage(3)}}> 
            {
              profile.isFollowed?<TouchableOpacity onPress={()=> followHandling(profile._id)} style={{backgroundColor:"#474747",width:"100%",marginTop:RFPercentage(2),paddingVertical:RFPercentage(1.2),borderRadius:7,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"white",fontFamily:"vazir"}}>دنبال میکنید</Text>
            </TouchableOpacity >:<TouchableOpacity onPress={()=> followHandling(profile._id)} style={{backgroundColor:"#4B4AAF",width:"100%",marginTop:RFPercentage(2),paddingVertical:RFPercentage(1.2),borderRadius:7,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"white",fontFamily:"vazir"}}>دنبال کردن</Text>
              </TouchableOpacity>
            }  
            </View>:null
          }
            <CenterStyled>
              <SpaceStyle top={20}>
                <CenterStyled>
                  <CategoryItem
                    darkIcon={require("../../../assets/icons/radio.png")}
                    lightIcon={require("../../../assets/icons/Light/PaintGallery.png")}
                    isActive={activeItem === "voice"}
                    onPress={() => {
                      setPosts([]);
                      setActiveItem("voice");
                    }}
                  >
                    رادیو
                  </CategoryItem>
                  <CategoryItem
                    darkIcon={require("../../../assets/icons/tv-video.png")}
                    lightIcon={require("../../../assets/icons/Light/tv_screenlight2.png")}
                    isActive={activeItem === "video"}
                    onPress={() => {
                      setPosts([]);
                      setActiveItem("video");
                    }}
                  >
                    ویدیو ها
                  </CategoryItem>
                  <CategoryItem
                    isActive={activeItem === "book"}
                    onPress={() => {
                      setPosts([]);
                      setActiveItem("book");
                    }}
                    darkIcon={require("../../../assets/icons/openbook.png")}
                    lightIcon={require("../../../assets/icons/Light/openbooklight2.png")}
                  >
                    کتاب
                  </CategoryItem>
                  <CategoryItem
                    darkIcon={require("../../../assets/icons/game.png")}
                    lightIcon={require("../../../assets/icons/Light/joysticklight2.png")}
                    isActive={activeItem === "game"}
                    onPress={() => {
                      setPosts([]);
                      setActiveItem("game");
                    }}
                  >
                    بازی ها
                  </CategoryItem>
                  <CategoryItem
                    darkIcon={require("../../../assets/icons/PaintGallery.png")}
                    lightIcon={require("../../../assets/icons/Light/PaintGallery.png")}
                    isActive={activeItem === "paint"}
                    onPress={() => {
                      setPosts([]);
                      setActiveItem("paint");
                    }}
                  >
                    نقاشی
                  </CategoryItem>
                </CenterStyled>
              </SpaceStyle>
            </CenterStyled>
            <UsersProfilePostsComponent
              filter={filter}
              isFinishPages={isFinishPages}
              posts={posts}
              setFilter={setFilter}
            />
          </View>
        </SpaceStyle>
      </ScrollView>
    </View>
  );
};
export default PublicProfilePage;
