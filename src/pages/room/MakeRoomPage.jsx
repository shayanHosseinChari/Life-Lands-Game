import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useContext, useEffect, useState } from "react";
import OnlineUsersListComponent from "../../components/onlineUser/OnlineUsersListComponent";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Hr, SpaceAround, SpaceBetween } from "../../style/uiUtil";
import { SocketContext } from "../../context/SocketContext";
import HeaderComponent from "../../components/layout/HeaderComponent";
import CustomText from "../../components/text/CustomText";
import { useTheme } from "@react-navigation/native";
import SpaceStyle from "../../style/SpaceStyle";
import { border } from "../../appsetting/styleSetting";
import { io } from "socket.io-client";
import { getValueFor } from "../../appsetting/storeConfig";
import SocketContextProvider from "../../context/SoketContextProvider";
import { OpenToast } from "../../components/share/OpenToast";

const MakeRoomPage = ({ route,navigation }) => {
  const { setLastRoom ,users} = useContext(SocketContext);
  const {onMakeRoom} = useContext(SocketContext)
  const socket = io('https://lifelands.ir/',{
    extraHeaders:{
      token: getValueFor()
    }
  })
  
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const [roomName, setRoomName] = useState(`lifelands-${Math.floor(Math.random()*100)}`);
  const [time, setTime] = useState("120");
  const [isLoading,setIsLoading] = useState(false)
  const [activeUsers, setActiveUsers] = useState([]);
  const { colors } = useTheme();
  const style = StyleSheet.create({
    input: {
      backgroundColor: colors?.inputBgColor,
      borderColor: colors?.inputBorderColor,
      fontSize: 12,
      borderRadius: border,
      paddingHorizontal: 15,
      paddingVertical: 8,
      textAlign: "right",
      minWidth: width / 2.2,
      color: colors.paragraph,
      direction: "rtl",
      fontFamily: "vaszir",
    },
    inputContainer: {
      backgroundColor: colors?.inputBgColor,
      borderColor: colors?.inputBorderColor,
      borderRadius: border,
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "space-between",
      direction: "rtl",
    },
    image: {
      width: 20,
      height: 20,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginLeft: 30,
    },
  });
  const onOnlineUserPressHandler = (item) => {
    console.log(item)
    // let isFind = false;
    // activeUsers.forEach((user) => {
    //   if (user?.socketId == item?.socketId) isFind = true;
    // });
    // let activeUsersCopy = [...activeUsers];
    // if (isFind) {
    //   activeUsersCopy = activeUsersCopy.filter(
    //     (ele) => ele.socketId != item.socketId
    //   );
    // } else {
    //   // activeUsersCopy.navigate(item);
    // }
    // console.log(activeUsersCopy);
    setActiveUsers((users)=>[...users,item]);
  };
  const onCreateRoom = async()=>{
    

  }
  const createRoom = async()=>{
    if(Number(time)>600 || Number(time) < 60){
      OpenToast("خطا","لطفا دقت کنید که زمان وارد شده کمتر از 60 و بیشتر از 600 نباشد","error")
    }else{

      setIsLoading(true)
      console.log('maked room')
      await socket.emit('makeRoom',roomName,activeUsers,route.params.gameId,Number(time))
      setIsLoading(false)
       
       console.log('end')
   
    }
    
    


  }
  useEffect(()=>{
    socket.on("openNewMultipleRoomChallenge",  (room) => {
      console.log('before navigation')
      setLastRoom(room)
  setIsLoading(false)
  
      navigation.navigate('Start Tournament Page',{roomInfo:room});
    
    
  })
     
  })
  const onMakeRoomHandler = () => {
    onMakeRoom(roomName, activeUsers, route?.params?.gameId, time);
  };

  
 

  return (
    <View style={{ height, width }}>
      <HeaderComponent title={"ساخت اتاق جدید"} hasBack={true} />
      <ScrollView>
        <View>
          <View>
            <CustomButton onClick={createRoom}>
              {
                isLoading ? <ActivityIndicator color={'white'} size={16} />:`ساخت`
              }
            </CustomButton>
        
          </View>
          <SpaceStyle top={10}>
            <SpaceAround>
              <TextInput
                direction={"rtl"}
                keyboardType="number-pad"
                value={time}
                onChangeText={(text) => setTime(Number(text))}
                style={style.input}
                placeholderTextColor={"#ffffff76"}
                placeholder={"مدت بازی"}
              />
              <CustomInput
                minWidth={width / 2.2}
                value={roomName}
                onChangeText={(e) => {
                  setRoomName(e);
                }}
                placeholder={"عنوان اتاق بازی"}
              />
            </SpaceAround>
          </SpaceStyle>
          <Hr />
          <CustomText selfCenter>کاربران انتخاب شده</CustomText>
          {activeUsers?.length == 0 ? (
            <CustomText top={10} selfCenter color={colors.lightTextColor}>
              انتخاب نشده
            </CustomText>
          ) : (
            <OnlineUsersListComponent
              title="حذف"
              onPress={(item) => {
                onOnlineUserPressHandler(item);
              }}
              customUserList={activeUsers}
            />
          )}

          <Hr />
          <CustomText selfCenter>کاربران</CustomText>
          <OnlineUsersListComponent
            title="انتخاب"
            onPress={(item) => {
              onOnlineUserPressHandler(item);
              

            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default MakeRoomPage;
