import react, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-navigation";
import Theme from "../../Theme/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons'

import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from "@react-navigation/native";
import { LOAD_FILE } from "../../service/APIs";
import { RootContext } from "../../context/RootContext";
import { io } from "socket.io-client";
import { getValueFor } from "../../appsetting/storeConfig";
import {CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { ImageBackground } from "react-native";
import { NotifcationStore } from "../../Store/NotifcationSotre";
const TournamentNotifcation = ({ data, isGroup, position }) => {
  let navigation = useNavigation()
  // console.log('tournoment data :',data)
  const [tournamentData, setTournamentData] = useState(data);
  const [isGroupeRendring, setIsGroupRendring] = useState(isGroup);
  const {notifcations} = useContext(RootContext)
  const [duration,setDuration] = useState(60)
  const  [filteredNotifcations,setFilteredNotifcations] = useState([])
  const {user,setIsSowNotifcation,setNotifcations,notifications} = useContext(RootContext)
  const socket = io('https://lifelands.ir/',{
    extraHeaders:{
      token: getValueFor()
    }
  })
  const acceptMultipleRoomHandler = (userId, roomId,room) => {
    socket?.emit("actionRequestMulti", {
      userId,
      roomId,
      status: "accepted"
    })
    // setTournamentData([])
    // setNotifcations([])
    NotifcationStore.dispatch({
      type:"CLEAR_NOTIF",
      payload: []
    })
   
    setIsSowNotifcation(false)

    navigation.navigate('Start Tournament Page',{roomInfo:room})
    // setReloadComponentState(Date.now());
    console.log('accepted request')
  }
  const rejectMultipleRoomHandler = (userId, roomId,item) => {
    socket?.emit("actionRequestMulti", {
      userId,
      roomId,
      status: "rejected"
    })
    // setTournamentData([])
    let deleteItems = notifcations.map(notif=>{
      return notif.createdAt != item.createdAt
    })
    var s = notifcations.map(i=>{
      return i._id != item._id
    })
    NotifcationStore.dispatch({
      type:"REMOVE_NOTIF",
      payload: item
    })
   
    setIsSowNotifcation(false)
    // setNotifcations(s)


  }
  return (
    <View
      style={{
   
        paddingTop: StatusBar.currentHeight,
        paddingBottom:RFPercentage(5),
        paddingHorizontal: RFPercentage(1),
        alignItems:"center",
      
        position: "absolute",
        top: 0,
        left: undefined,

       
        right:0,
        zIndex: 50001,
        width: "100%",
      }}
    >
     

      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        style={{width:"100%",height: 'auto',paddingBottom:RFPercentage(5)}}
        keyExtractor={(item) => item.id}
        nestedScrollEnabled
        renderItem={({ item }) => <View blurRadius={20} style={{width:"auto",marginTop: 3,paddingHorizontal:RFPercentage(1),paddingVertical:10,borderRadius:10,backgroundColor:"rgba(20, 20, 20, 1)",position:"relative"}}>
          <View style={{position:"absolute",top:5,left:5}}>
            <CountdownCircleTimer duration={duration}     isPlaying
    size={25}
    strokeWidth={3}
    isGrowing={true}
    
    isSmoothColorTransition={true}
    onComplete={()=>{
      console.log('comptelet')
      NotifcationStore.dispatch({
        type:"REMOVE_NOTIF",
        payload: item
      })
     
      // setFilteredNotifcations(s)
      setIsSowNotifcation(false)

      // setNotifcations(filteredNotifcations)
    }}
    children={()=><TouchableOpacity onPress={()=>{
      NotifcationStore.dispatch({
        type:"REMOVE_NOTIF",
        payload: item
      })
     
      // setFilteredNotifcations(s)
      // setNotifcations(filteredNotifcations)
      setIsSowNotifcation(false)
    }}><AntDesign name="close" color={'white'} /></TouchableOpacity>}
    colors={["#1d9534", "#F7B801", "#A30000", "#A30000"]}
    colorsTime={[20, 10, 5, 0]}
>
            </CountdownCircleTimer>
            </View>
           <View style={{width:"100%",flexDirection:'row',alignItems:"flex-start",justifyContent:'space-around'}}>
            
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{justifyContent:"flex-end",alignItems:"flex-end"}}>
           <View>
             <Text style={{fontFamily:'vazir',color:'white',marginHorizontal:6}}>  {item?.creator?.fullName} </Text>
           </View>
            <Text style={{width:"80%",fontFamily:'vazir',color:'#a60277',marginHorizontal:6,fontSize:9,flexWrap:'wrap'}}  lineBreakMode="head">{item?.creator?.fullName} برای رقابت در بازی {item?.game?.title} به شما درخواست داده است.
            
            </Text>
            </View>
            
            {
              item?.creator?.profile?
              <Image source={{uri: `${LOAD_FILE}${item?.creator?.profile}`}} style={{width:RFPercentage(6),height:RFPercentage(6),borderRadius:300,marginRight:10}} />
               :
               <Image source={require('../../../assets/def.jpg')} style={{width:RFPercentage(6),height:RFPercentage(6),borderRadius:300,marginRight:10}} />
                    
            }
              

            </View>

           </View>
           <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:7}}>

            <View style={{flexDirection:"row"}}>
            <TouchableOpacity activeOpacity={0.5} style={{flexDirection:'row',marginHorizontal: 4,alignItems:"center",backgroundColor:"#012e18",paddingHorizontal:7,paddingVertical:1,borderRadius:12}} onPress={()=>acceptMultipleRoomHandler(user._id,item.id,item)}>
              <Text style={{fontFamily:'vazir',marginHorizontal:4,color:"#05f581",fontSize:10}}>پذیرش</Text>
              <AntDesign name="like1"  color={'#05f581'} size={RFPercentage(1.8)}/>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} onPress={()=>rejectMultipleRoomHandler(user._id,item.id,item)} style={{flexDirection:'row',alignItems:"center",backgroundColor:"#38010d",paddingHorizontal:7,paddingVertical:0,borderRadius:12}}>
              <Text style={{fontFamily:'vazir',marginHorizontal:4,color:"#fc0037",fontSize:10}}>رد کردن</Text>
              <AntDesign name="dislike1"  color={'#fc0037'} size={RFPercentage(1.8)}/>

            </TouchableOpacity>
            </View>
            
            


           </View>

        </View>}
      />
    </View>
  );
};

export default TournamentNotifcation;
