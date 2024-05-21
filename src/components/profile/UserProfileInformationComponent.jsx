import { StyleSheet, TouchableOpacity, View,Image,Text, Dimensions, ActivityIndicator } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { CenterStyled, Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import CustomImage from "../CustomImage/CustomImage";
import { border } from "../../appsetting/styleSetting";
import { LOAD_FILE } from "../../service/APIs";

import { followActionServer } from "../../service/FollowService";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../context/RootContext";
import { RFPercentage } from "react-native-responsive-fontsize";
import axios from "axios";
import { getToken, getValueFor } from "../../appsetting/storeConfig";
import UserPosts from "../../pages/userPosts";
import { OpenToast } from "../share/OpenToast";


const UserProfileInformationComponent = ({
  profile,
  setIsFollowed,
  isFollowed,
  route,
  navigation,
}) => {
  const { user } = useContext(RootContext);
  const { colors } = useTheme();
const [isLoading,setIsLoading] = useState(false)

  console.log('myProf',profile)
  const [usersPosts,setUsersPosts] = useState([])
  useEffect(()=>{
    getPosts()
  },[])
  const style = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      paddingHorizontal: 15,
      paddingLeft:20,
      paddingVertical: 7,
     
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
      marginHorizontal: 20,
      marginBottom: 7,
    },
  });
  const [posts,setPosts] = useState()
  const followAction = async () => {
    const {
      data: { isFollow },
    } = await followActionServer(route?.params?.userId);
    if (setIsFollowed) setIsFollowed(isFollow);
  };
  
  const getPosts = async ()=>{
    setIsLoading(true)
   await axios.post(`https://lifelands.ir/api/v1/social/userpost`,{
      userId : profile._id
    },{
      headers:{
        token: getValueFor()
      }
    }).then(response=>{
      setIsLoading(false)
      setUsersPosts(response.data.data)
      console.log('sadasdsd',response.data)
    })
  }
  useEffect(()=>{
    getPosts()
  },[])
  return (
    <View style={{width: "100%"}}>
      <SpaceBetween styles={{ alignItems: "center" }}>
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Show Follow Users Page", {data:{
                  userId: profile?._id,
                  isFollowers: true,
                  }
                })
              }
            >
              <View style={{marginHorizontal:RFPercentage(2)}}>
                <CustomText style={{ fontSize: 20, alignSelf: "center",fontSize: RFPercentage(3.4) }}>
                  {profile.followingCount}
                </CustomText>
                <CustomText style={{ fontSize: 10, alignSelf: "center" }}>
                  دنبال کنندگان
                </CustomText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>{
                if(profile.userPostCount){
                  if(profile.userPostCount==0){
                    OpenToast('Error','هیچ پستی جهت نمایش یافت نشد','error')
                  }else{
                    navigation.navigate("User Post")
                  }
                }else if(UserPosts.length == 0){
                  OpenToast('Error','هیچ پستی جهت نمایش یافت نشد','error')

                }else{
                
                  navigation.navigate("User Post")
                }
              }
              }
            >
              <View style={{marginHorizontal:RFPercentage(2)}}>
                <CustomText style={{ fontSize: 20, alignSelf: "center",fontSize: RFPercentage(3.4) }}>
                 {
                  profile.userPostCount?profile.userPostCount: UserPosts.length
                 }
                </CustomText>
                <CustomText style={{ fontSize: 10, alignSelf: "center" }}>
                  پست
                </CustomText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Show Follow Users Page", {data:{
                  userId: profile?._id,
                  isFollowers: false,
                  }
                })
              }
            >
              <View style={{marginHorizontal:RFPercentage(2)}}>
                <CustomText style={{ fontSize: 20, alignSelf: "center",fontSize: RFPercentage(3.4) }}>
                  {profile.followersCount}
                </CustomText>
                <CustomText style={{ fontSize: 10, alignSelf: "center" }}>
                  دنبال شوندگان
                </CustomText>
              </View>
            </TouchableOpacity>
            </View>
            <View styles={{ alignItems: "center" }}>
            <Image source={{uri: `${LOAD_FILE}${profile.profileImage}`}} style={{width:RFPercentage(10),height:RFPercentage(10),marginHorizontal:RFPercentage(0),borderRadius:200}}/>
           
              
              {/* <CustomImage
                aspect={1 / 1}
                width={8}
                image={profile.profileImage}
                radius={100}
                styles={{ marginHorizontal: 10 }}
              /> */}
            </View>
          </SpaceBetween>
          <View style={{alignItems:'flex-end',marginTop:10}}>
               
                <CustomText fontSize={12} >
                  {profile?.firstName} {profile?.lastName}
                </CustomText>
              
              </View>
              {
                profile.aboutMe?<Text style={{fontFamily:"vazir",color:"#c9c9c9",fontSize:RFPercentage(1.6)}}>
                {profile?.aboutMe}
                </Text>:<Text style={{color:"white",fontSize:RFPercentage(1.6),fontFamily:"vazir"}}>بدون بیوگرافی</Text>
              }
         
          
      {/* {route && user?._id != profile?._id && (
        <CenterStyled>
          <SpaceStyle top={15}>
            <CustomText style={{ fontSize: 15 }}>
              {profile.firstName} {profile.lastName}
            </CustomText>
            <CustomText
              fontSize={12}
              color={isFollowed ? colors.red : colors.primary}
              selfCenter
              onClick={followAction}
            >
              {isFollowed ? "نمیخواهم دنبال کنم" : "دنبال کنید"}
            </CustomText>
          </SpaceStyle>
        </CenterStyled>
      )}
      <CenterStyled>
        <SpaceStyle top={15} right={40} left={40}>
          <CustomText color={"#b9b9b5"} lines={4}>
            {profile.aboutMe}
          </CustomText>
        </SpaceStyle>
      </CenterStyled> */}
    </View>
  );
};
export default UserProfileInformationComponent;
