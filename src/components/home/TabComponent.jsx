import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../../pages/HomePage";
import { Image, View, StyleSheet } from "react-native";

import { useNavigation, useTheme } from "@react-navigation/native";
import { getTheme, getValueFor } from "../../appsetting/storeConfig";
import { useCallback, useContext, useEffect, useState } from "react";
import { RootContext } from "../../context/RootContext";
import MediaPage from "../../pages/media/MediaPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import GalleryPage from "../../pages/gallery/GalleryPage";
import CustomImage from "../CustomImage/CustomImage";
import WGamesPage from "../../pages/WGames/WGamesPage";
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Home from "../../../assets/icons/svg/home.svg";
import Game from "../../../assets/icons/svg/game.svg";
import Gallery from "../../../assets/icons/svg/gallery.svg";
import Share from "../../../assets/icons/svg/share.svg";
import User from "../../../assets/icons/svg/user.svg";
import LifeLandsGamesPage from "../../pages/WGames/LifeLandsGamesPage";
import Theme from "../../Theme/Theme";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { RFPercentage } from "react-native-responsive-fontsize";
import { LOAD_FILE } from "../../service/APIs";
import { getProfileService } from "../../service/UserService";
import { NotifcationStore } from "../../Store/NotifcationSotre";



const Tab = createBottomTabNavigator();
const TabComponent = () => {
  const { colors } = useTheme();
  const { wasChangedTheme } = useContext(RootContext);
  const [option, setOption] = useState({});
  const [current, setCurrent] = useState("");
  const [profile,setProfile] = useState();
  const getInfo = useCallback (async()=>{
    if(getValueFor()){
      const {
        data: { data: profileResponse },
      } = await getProfileService();
      setProfile(profileResponse);
    }
  })

  useEffect(()=>{
    
    getInfo()
  },[])
  const tabImage = (Icon, title) => {
    return <View>{Icon}</View>;
  };

  let screnOption = (title, Icon) => {
    const { user } = useContext(RootContext);
    const style = StyleSheet.create({
      center: {
        alignSelf: "center",
      },
      profile: {
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: current === "Profile" ? colors.primary : colors.titleColor,
      },
    });
    return {
      title: "",
      tabBarIcon: (focused) =>
        title === "Profile" && user?.userName ? (
          <View style={style.center}>
            <CustomImage
              aspect={1 / 1}
              width={30}
              isOPT={false}
              height={30}
              image={user?.profileImage}
              radius={100}
              styles={style.profile}
            />
          </View>
        ) : (
          tabImage(Icon, title)
        ),
    };
  };
  useEffect(() => {
    init();
    getTheme();
  }, [wasChangedTheme]);
  const init = async () => {
    setOption({
      headerShown: false,

      tabBarInActiveTintColor: "#8d4646",
      tabBarStyle: {
        height: 65,
        padding: 0,
        paddingTop: 10,
        position: "absolute",
        marginVertical: 20,
        borderRadius:20,
        backgroundColor: '#D9D4F5',
        marginHorizontal:20,

        tabImage: (
          <Image
            style={{ width: 500, height: 200 }}
            source={require("../../../assets/tabbar.png")}
          />
        ),
      },
    });
  };
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
    
      initialRouteName="Home2"
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:'#4240b6',
        tabBarInactiveTintColor:"#4B4A51",
        tabBarLabel:()=>null,
        tabBarStyle:{
        
         
          borderBlockColor:'transparent',
          borderTopColor:"transparent",
        
          height:RFPercentage(6),
       
          backgroundColor:'black',
          alignItems:"center",
          borderBlockColor: "#606060",
        }
      }}
      
      screenListeners={{
        state: (e) => {
          setCurrent(e.data.state.routes[e.data.state.index].name);
        },
      }}
    >
      <Tab.Screen
        name="Profile"
        lazy={true}
        
        options={{
          tabBarBadgeStyle:{
            backgroundColor: "#ff004c",
            justifyContent:"center",
            alignItems:"center"

          },
          tabBarBadge:NotifcationStore.getState().length>0?NotifcationStore.getState().length:null,
          tabBarIcon:({focused,color,size})=>{
            if(profile){
              if(focused){
                return (
                  <View > 
                    {
                      profile.profileImage?<Image source={{uri: `${LOAD_FILE}${profile.profileImage}`}} style={{width: 36,height:36,borderRadius:100,borderColor: "#4240b6",borderWidth: 1}} resizeMode="cover"/>:<Image source={require("../../../assets/def.jpg")} style={{width: 36,height:36,borderRadius:100,borderColor: "#4240b6",borderWidth: 1}} resizeMode="cover"/>
                    }
                    
                  </View>
                )
               }else{
                return (
                  <View > 
 {
                      profile.profileImage?<Image source={{uri: `${LOAD_FILE}${profile.profileImage}`}} style={{width: 36,height:36,borderRadius:100}} resizeMode="cover"/>:<Image source={require("../../../assets/def.jpg")} style={{width: 36,height:36,borderRadius:100}} resizeMode="cover"/>
                    }
                  </View>
                )
               }
            }else{
              if(focused){
                return (
                  <View > 
                    <Feather name="user" color={color} size={RFPercentage(3.7)}/>
                  </View>
                )
               }else{
                return (
                  <View > 
                    <Feather name="user" color={color} size={RFPercentage(3.7)}/>
                  </View>
                )
               }
            }
         
          }
        }}
        component={ProfilePage}
      />

      <Tab.Screen 
        name="Gallery"
        lazy={true}
        options={{
          tabBarIcon:({focused,color,size})=>{
           if(focused){
            return (
              <View > 
                <AntDesign name="search1" color={color} size={RFPercentage(3.7)}/>
              </View>
            )
           }else{
            return (
              <View> 
                <AntDesign name="search1" color={color} size={RFPercentage(3.7)}/>
              </View>
            )
           }
          }
        }}
        component={GalleryPage}
      />

      <Tab.Screen
        name="WGames"
        lazy={true}
        options={{
          tabBarIcon:({focused,color,size})=>{
           if(focused){
            return (
              <View > 
                <Ionicons name="game-controller" color={color} size={RFPercentage(3.7)}/>
              </View>
            )
           }else{
            return (
              <View> 
                <Ionicons name="game-controller-outline" color={color} size={RFPercentage(3.7)}/>
              </View>
            )
           }
          }
        }}
        // options={
        //   screnOption(
        //   "WGames",
        //   <Game
        //     width={30}
        //     height={30}
        //     fill={current === "WGames" ? colors.primary :  Theme.tabBarInActiveColor}
        //   />
        // ),
         
        
      
        component={LifeLandsGamesPage}
      />
      <Tab.Screen
        name="Media"
        lazy={true}
        options={{
          tabBarIcon:({focused,color,size})=>{
           if(focused){
            return (
              <View > 
             
                <FontAwesome name="th-large" color={color} size={RFPercentage(3.7)}/>
              </View>
            )
           }else{
            return (
              <View>     
              <MaterialIcons name="window" color={color} size={RFPercentage(3.7)}/>

              </View>
            )
           }
          }
        }}
        component={MediaPage}
      />
      <Tab.Screen
        name="Home2"
        lazy={true}
        options={{
          tabBarIcon:({focused,color,size})=>{
           if(focused){
            return (
              <View > 
             
                <Foundation name="home" color={color} size={RFPercentage(3.7)}/>
              </View>
            )
           }else{
            return (
              <View>     
                            <AntDesign name="home" color={color} size={RFPercentage(3.7)}/>

              </View>
            )
           }
          }
        }}
        component={HomePage}
      />
    </Tab.Navigator>
    // <Fragment>
    //   <SplashPage />
    // </Fragment>
  );
};


const TabBarIconStyles = StyleSheet.create({
  wrapper:{
    color:Theme.tabBarActiveIconColor,
    paddingHorizontal:20,
    paddingVertical:8,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    backgroundColor:Theme.tabBarActivebgColor
  }
})
export default TabComponent;
