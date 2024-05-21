
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity,TouchableHighlight, View,Text,Share,Image, Linking, Pressable, TextInput } from "react-native";
import { primaryColor } from "../../appsetting/appsettingColor";
import {
  getToken,
  getValueFor,
  save,
  setToken,
} from "../../appsetting/storeConfig";

import CustomButton from "../../components/CustomButton/CustomButton";
import CustomCard from "../../components/CustomCard/CustomCard";
import CustomImage from "../../components/CustomImage/CustomImage";
import Feather from 'react-native-vector-icons/Feather'
import CustomInput from "../../components/CustomInput/CustomInput";
import CategoryItem from "../../components/home/CategoryItem";
import { OpenToast } from "../../components/share/OpenToast";
import CustomText from "../../components/text/CustomText";
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  getProfileService,
  getUsersDownloadDepartmentService,
  loginService,
  registerService,
  updateProfileService,
} from "../../service/UserService";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import SpaceStyle from "../../style/SpaceStyle";
import { CenterStyled, Hr, Row, SpaceBetween } from "../../style/uiUtil";
import { RootContext } from "../../context/RootContext";
import PageWrapper from "../../components/loading/PageWrapper";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { border } from "../../appsetting/styleSetting";
import HeaderComponent from "../../components/layout/HeaderComponent";
import { Icon } from "../../appsetting/icons";
import EvillIcons from 'react-native-vector-icons/EvilIcons'
import { FlatList } from "react-native";
import UserProfileInformationComponent from "../../components/profile/UserProfileInformationComponent";
import UsersProfilePostsComponent from "../../components/profile/UsersProfilePostsComponent";
import { RFPercentage } from "react-native-responsive-fontsize";
import { StatusBar } from "expo-status-bar";
import { LOAD_FILE } from "../../service/APIs";
import { NotifcationStore } from "../../Store/NotifcationSotre";
import { LinearGradient } from "expo-linear-gradient";
import * as FileSystem from 'expo-file-system'

const ProfilePage = ({ navigation, hasBack = true }) => {
  const { setReload } = useContext(RootContext);
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const ShareProfile = async()=>{
    
    let result = await Share.share({
      title: 'App link',
      message: `
      سلام من ${profile.firstName} ${profile.lastName} و کاربر lifelands.ir هستم
        
        این لینک پروفایل منه اگه خواستی ی سر بزن : ${LOAD_FILE}${profile.profileImage}
      `, 
      url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
        
    })
  }
  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: border,
      paddingHorizontal: 15,
      paddingVertical: 7,
      margin: 5,
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginTop: "auto",
      marginBottom: "auto",
    },
    cardOption: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: "#252528",
      borderRadius: border,
    },
    headerBackIconStyle: {
      width: 25,
      height: 25,
      marginRight: -150,
    },
    rightBackIconStyle: {
      width: 25,
      height: 25,
      marginLeft: 30,
    },
  });
  const [isLoadingState, setIsLoadingState] = useState(true);
  let [data, setData] = useState([]);
  const [activeItem, setActiveItem] = useState("book");
  const { setWasChangedTheme } = useContext(RootContext);
  const [profile, setProfile] = useState();
  const [isLogin, setIsLogin] = useState(true);

  const [hasProfile, setHasProfile] = useState(getValueFor() ? true : false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [showProfileModal,setShowProfileModal]  = useState(false)
  const [email, setEmail] = useState();

  const [formData, setFormData] = useState({
    email: profile?.email,
    userName: profile?.userName,
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    aboutMe: profile?.aboutMe,
  });
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (profile) getUsersDepartmentsPosts();
  }, [activeItem, profile]);
  const getData = async () => {
    if (!getValueFor()) {
      setIsLoadingState(false);
      return;
    }
    setIsLoadingState(true);
    const {
      data: { data: profileResponse },
    } = await getProfileService();
    setProfile(profileResponse);
    console.log(profile.aboutMe)
    setFormData(profileResponse);
    setIsLoadingState(false);
  };
  const sendData = async () => {
    const { data } = await updateProfileService(formData);
    //console.log(data);
  };
  const login = async () => {
    const { data } = await loginService({
      userName,
      password,
    });

    if (data.state) {
      setHasProfile(true);
      save(data.data.token);
      await setToken(data.data.token);
      await getToken();
      OpenToast("وارد شدید", "شما با موفقیت وارد حساب کاربری خود شده اید");
      // save("sessionId", data.data.sessionId);
      getData();
      setReload(Date.now());
    }
  };
  const register = async () => {
    const { data } = await registerService({
      userName,
      password,
      firstName,
      lastName,
      email,
    });
    if (data.state) {
      setIsLogin(true);
    }
  };
  useEffect(() => {
    getData();
  }, [isFocused, navigation]);
  const getUsersDepartmentsPosts = async () => {
    const { data: res } = await getUsersDownloadDepartmentService({
      department: activeItem,
    });

    setData(res.data);
    console.log(res.data )
  };
  const { reload } = useContext(RootContext);
  const [tokenState, setTokenState] = useState();
  useEffect(() => {
    setDataStorage();
  }, [reload]);
  const setDataStorage = async () => {
    setTokenState(await getToken());
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
       <View activeOpacity={0.9} 
    style={{flexDirection:"row",width:'100%',justifyContent:"space-between",alignItems:"center",borderBottomColor:'#302f300',borderBottomWidth:1,paddingHorizontal: RFPercentage(1)}}>
      
        <View style={{flexDirection:"row",alignItems:"center"}}>
        
       <TouchableHighlight  onPress={()=>{
      navigation.goBack()
      // console.log(12)
    }}
  underlayColor="#3d3d3d00" style={{flexDirection:"row",alignItems:"center",justifyContent:"center",paddingHorizontal:10,paddingVertical:10,borderRadius:7}}>
      <>
      <Entypo name='chevron-left' size={RFPercentage(3)} color={'white'}/>
        {
          profile && hasProfile? <Text style={{color:"white",marginHorizontal:7,fontSize:RFPercentage(2)}}>{profile.userName}</Text>:null
        }
      </>
       </TouchableHighlight>
       </View>
       <View style={{flexDirection:"row",alignItems:"center"}}>
       <TouchableOpacity onPress={()=>{
        navigation.navigate("Menu");
       }} style={{marginHorizontal:8}}>
            <AntDesign name="setting" color={'white'} size={RFPercentage(2.7)} />
          </TouchableOpacity>
       <TouchableOpacity onPress={()=>{
      navigation.navigate('Notifcations Page')
    }} style={{position:"relative"}} activeOpacity={0.4}>
      {
        NotifcationStore.getState().length>0?<View style={{position:"absolute",top:0,right:0,borderColor:'black',borderWidth:2,justifyContent:"center",alignItems:"center",width: RFPercentage(2.3),height: RFPercentage(2.3),borderRadius: 100,backgroundColor:"#ff0037",zIndex:9999,opacity:1}}>
        <Text style={{color:"white",fontSize:9}}>{NotifcationStore.getState().length}</Text>
      </View>:null
      }
      <EvilIcons name="bell" color={'white'} size={RFPercentage(4)}/>
    </TouchableOpacity>
    
       </View>
      
      </View>
<ScrollView
        onRefresh={async () => {
          getData();
        }}
        isLoadingState={isLoadingState}
        style={{width:Dimensions.get('window').width,paddingHorizontal:RFPercentage(1)}}
      >
     <View bottom={100} top={20} style={{width:"100%",paddingBottom:100}}>
            {profile && hasProfile ? (
              <View style={{ alignSelf: "center",width:"100%" }}>
                <Pressable onLongPress={()=>{
                  setShowProfileModal(true)
                }}>
                <UserProfileInformationComponent
                  navigation={navigation}
                  profile={profile}
                  showMoreInfo={true}
                />
                </Pressable>
                <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:RFPercentage(2)}}>
                <TouchableOpacity onPress={()=> 
                  navigation.navigate('Edit Profile')} style={{backgroundColor:"#2e2e2e",width:"50%",marginHorizontal:4,marginTop:RFPercentage(2),paddingVertical:RFPercentage(1.2),borderRadius:7,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"white",fontFamily:"vazir"}}> ویرایش پروفایل</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={ShareProfile} style={{backgroundColor:"#2e2e2e",width:"50%",marginTop:RFPercentage(2),paddingVertical:RFPercentage(1.2),borderRadius:7,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"white",fontFamily:"vazir"}}> اشتراک گذاری پروفایل</Text>
            </TouchableOpacity >
                </View>
                <CenterStyled>
                  <SpaceStyle top={20}>
                    <CenterStyled>
                      <CategoryItem
                        darkIcon={require("../../../assets/icons/paint-icon.png")}
                        lightIcon={require("../../../assets/icons/paint-icon.png")}
                        isActive={activeItem === "paint"}
                        onPress={() => {
                          setActiveItem("paint");
                        }}
                      >
                      </CategoryItem>
                      <CategoryItem
                        darkIcon={require("../../../assets/icons/radioIcon.png")}
                        lightIcon={require("../../../assets/icons/radioIcon.png")}
                        isActive={activeItem === "voice"}
                        onPress={() => {
                          setActiveItem("voice");
                        }}
                      >
                      </CategoryItem>
                      <CategoryItem
                        isActive={activeItem === "book"}
                        onPress={() => {
                          setActiveItem("book");
                        }}
                        darkIcon={require("../../../assets/icons/library-icon.png")}
                        lightIcon={require("../../../assets/icons/library-icon.png")}
                      >
                      </CategoryItem>
                      <CategoryItem
                        darkIcon={require("../../../assets/icons/navbar-tv-icon.png")}
                        lightIcon={require("../../../assets/icons/navbar-tv-icon.png")}
                        isActive={activeItem === "video"}
                        onPress={() => {
                          setActiveItem("video");
                        }}
                      >
                      </CategoryItem>
                      <CategoryItem
                        darkIcon={require("../../../assets/icons/profile-game-icon.png")}
                        lightIcon={require("../../../assets/icons/profile-game-icon.png")}
                        isActive={activeItem === "game"}
                        onPress={() => {
                          setActiveItem("game");
                        }}
                      >
                      </CategoryItem>
                    </CenterStyled>
                  </SpaceStyle>
                </CenterStyled>
                <UsersProfilePostsComponent
                  posts={data}
                  filter={{ pageId: 1, eachPerPage: 12 }}
                />
              </View>
            ) : (
              <View>
                <SpaceStyle top={30} left={30} right={30} bottom={10}>
                  <CustomCard>
                    <SpaceStyle bottom={30}>
                      <CustomText style={{ fontSize: 20 }}>
                        {isLogin ? "ورود به حساب" : "ثبت نام "}
                      </CustomText>
                    </SpaceStyle>
                    <TextInput
                    placeholderTextColor={'gray'}
                    placeholder="نام کاربری یا شماره تلفن"
                    direction={"rtl"}
                    style={{
                      with:"80%",
                      backgroundColor:"rgba(16, 16, 16, 1)",
                      height:50,
                      borderRadius: 8,
                      marginTop: 10,
                      color:"white",
                      paddingHorizontal: 10
                      

                    }}
                    onChangeText={(e)=>{
                      console.log(e)
                      setUserName(e)
                    }}
                  />
        <TextInput
                    placeholderTextColor={'gray'}
                    placeholder="رمز عبور"
                    direction={"rtl"}
                    style={{
                      with:"80%",
                      backgroundColor:"rgba(16, 16, 16, 1)",
                      height:50,
                      borderRadius: 8,
                      marginTop: 10,
                      color:"white",
                      paddingHorizontal: 10
                      

                    }}
                    onChangeText={(e)=>{
                      console.log(e)
                      setPassword(e)
                    }}
                  />
       
                   
                    {isLogin ? (
                      <>
                        <SpaceStyle top={20}>
                          <SpaceBetween>
                            <CustomButton onClick={login}>ورود</CustomButton>
                            <SpaceStyle top={10} right={10}>
                              <TouchableOpacity
                                onPress={() => setIsLogin(false)}
                              >
                                <CustomText style={{ color: primaryColor }}>
                                  ثبت نام کاربر جدید
                                </CustomText>
                              </TouchableOpacity>
                            </SpaceStyle>
                          </SpaceBetween>
                        </SpaceStyle>
                      </>
                    ) : (
                      <>
                        <SpaceStyle bottom={15}>
                          <CustomInput
                            onChangeText={(value) => setFirstName(value)}
                            lable={"نام"}
                            placeholder={"نام را وارد کنید"}
                          />
                        </SpaceStyle>
                        <SpaceStyle bottom={15}>
                          <CustomInput
                            onChangeText={(value) => setLastName(value)}
                            lable={"نام خانوادگی"}
                            placeholder={"نام خانوادگی را وارد کنید"}
                          />
                        </SpaceStyle>
                        <SpaceStyle bottom={15}>
                          <CustomInput
                            onChangeText={(value) => setEmail(value)}
                            lable={"ایمیل"}
                            placeholder={"ایمیل را وارد کنید"}
                          />
                        </SpaceStyle>
                        <SpaceStyle top={20}>
                          <SpaceBetween>
                            <CustomButton onClick={register}>
                              ثبت نام
                            </CustomButton>

                            <SpaceStyle top={10} right={10}>
                              <TouchableOpacity
                                onPress={() => setIsLogin(true)}
                              >
                                <CustomText style={{ color: primaryColor }}>
                                  حساب کاربری دارم ، ورود
                                </CustomText>
                              </TouchableOpacity>
                            </SpaceStyle>
                          </SpaceBetween>
                        </SpaceStyle>
                      </>
                    )}
                  </CustomCard>
                </SpaceStyle>
              </View>
            )}
          </View>
      </ScrollView>
    </View>
  );
};
export default ProfilePage;
