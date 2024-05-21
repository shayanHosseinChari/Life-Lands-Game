import { Audio } from "expo-av";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { getValueFor } from "../appsetting/storeConfig";
import { OpenToast } from "../components/share/OpenToast";
import CustomText from "../components/text/CustomText";
import useForceUpdate from "../database/useForceUpdate";
import { getProfileService } from "../service/UserService";
import SpaceStyle from "../style/SpaceStyle";
import { CenterStyled } from "../style/uiUtil";
import TournamentContext from './TournamentContext'
import { io } from "socket.io-client";
import { RootContext } from "./RootContext";


const TournamentContextProvider = ({ children }) => {
   let  socketTournament = io("https://lifelands.ir", {
        // socket = io("http://localhost:4440", {
        extraHeaders: {
          token: getValueFor(),
        },
       
      });
      let notifications2 = []
        const {setNotifcations,setIsSowNotifcation,notifcations} = useContext(RootContext)

      socketTournament?.on("openNewMultipleRoomChallenge",async (room) => {
  
        console.log('created room :)) ',room)
        setLastRoom(room);
        setIsShowLastRoomRequest(room?.creator?.userId != user?._id);
        if (room?.creator?.userId == user?._id){
          setLastRoom(room)
          navigation.navigate('Start Tournament Page',{roomInfo:room});
        
        }else{
          notifications2.push(room)
          setIsSowNotifcation(true)
          setNotifcations(notifications2)
          console.log(notifications2)

        }
      });
      const print = (value)=>{
        console.log(value)
      }
  return (

    <TournamentContext.Provider
      value={{
        notifications2,
        print

        
      }}
    >
      {children}
      
    </TournamentContext.Provider>
  );
};
export default TournamentContextProvider;
