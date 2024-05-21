import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import io from "socket.io-client";
import { getValueFor } from "../appsetting/storeConfig";
import { useNavigation } from "@react-navigation/native";
import { RootContext } from "./RootContext";
import RequestItem from "../components/share/RequestItem";
import { Alert } from "react-native";
import CustomButton from "../components/CustomButton/CustomButton";
import RoomRequestItem from "../components/share/RoomRequestItem";
import RootContextProvider from "./RootContextProvider";
import { getProfileService } from "../service/UserService";
import TournamentNotifcation from "../components/notifcations/TournamentNotifcation";
import { NotifcationStore } from "../Store/NotifcationSotre";
export let socket;
import {Audio} from 'expo-av'
let list = [];
const SocketContextProvider = ({ children }) => {
  let isConnected = false
  const navigation = useNavigation();
  const { user } = useContext(RootContext);
  const [users, setUsers] = useState([]);
  const [lastReq, setLastReq] = useState({});
  const [lastRoom, setLastRoom] = useState({});
  const [currentRoom, setCurrentRoom] = useState({});
  const [competition, setCompetition] = useState({});
  const [lastValueRecieve, setLastValueRecieve] = useState();
  const [isShowLastRequest, setIsShowLastRequest] = useState(false);
  const [isShowLastRoomRequest, setIsShowLastRoomRequest] = useState(false);
  const {setNotifcations,setIsSowNotifcation,notifcations} = useContext(RootContext)
  const [sound, setSound] = useState();


  const buildVoice = async()=>{
    const { sound } = await Audio.Sound.createAsync( require('../../assets/notif.wav'))
    setSound(sound)

  }

  useEffect(() => {
    if (!socket && !isConnected) {
      setSocketFunctions();
      isConnected = true;
    }
  }, [user?._id, getValueFor()]);
  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, []);
 

  

  const setSocketFunctions = async () => {
    setTimeout(async () => {
      if (socket) return;
      socket = await connetSocket();
      socket?.on("connect", () => {
        console.log('connect shodom')
        isConnected = true;
      });

      socket?.on("allUsers", (e) => {
        setUsers(e);
      });
      socket?.on("requestChallenge", (reqData) => {
        setLastReq(reqData);
        setIsShowLastRequest(true);
      });
      socket?.on("requestChallangeStatus", (reqData) => {
        setCompetition(reqData);
      });
      socket?.on("navigateReceiverToCompetitionPage", (reqData) => {
        setCompetition(reqData);
      });
      socket?.on("recieveShareData", (socketData) => {
        setLastValueRecieve(socketData);
      });
      socket?.on("finishCompetition", (competitionFinished) => {
        navigation.navigate("End Tournament Page", {
          id: competitionFinished._id,
        });
      });

      //mulitple rooms game challange
      const notifcation2 = []
      socket?.on("openNewMultipleRoomChallenge",async (room) => {
        const {
          data: { data: res },
        } = await getProfileService();
        
        console.log("openNewMultipleRoomChallenge")
        setLastRoom(room);
        setIsShowLastRoomRequest(room.creator.userId != res?._id);
        console.log(room, " room")
        if (room.creator.userId == res?._id) {
          console.log("first")
         
        } else {
          
          notifcation2.push(room)

         
          NotifcationStore.dispatch({
            type:"ADD_NOTIF",
            payload: room
          })
          setIsSowNotifcation(true)
          const { sound } = await Audio.Sound.createAsync( require('../../assets/notif.wav'))
          await sound.playAsync()

       
        }
      });
      socket?.on('multiPlayerUrl',(url)=>{
        console.log('baziiiiiiiiiii',url)
        navigation.navigate('Luncher',{gameUrl: url.url})
    
      })
      socket?.on("startRoomGameChallange", (room) => {
        setCurrentRoom(room);
        navigation.navigate("Share Room Data Page");
        // setRoomsData([]);
      });
      socket?.on("joinUserRoom", (room) => {
        if (lastRoom?.id == room?.id) return;
        setLastRoom(room);
        navigation.navigate("Room Page");
      });
      socket?.on("finishRoom", () => {
        setCurrentRoom({});
        setLastRoom({});
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }, { name: "Online Users" }],
        });
      });

     
      socket?.on("disconnect", () => {
        
        isConnected = false;
        setSocketFunctions();
      });
    }, 10000);
  };

  const connetSocket = async () => {
    if (isConnected) {
      socket;
    }

    return io("https://lifelands.ir/", {
      extraHeaders: {
        token: `${getValueFor()}`,
      },
      query: {
        flag: "Home Web Site Page",
      },
      autoConnect: true,
    });
  };
  const addChallenge = (userId, setNumber, gameId) => {
    socket?.emit("addChallenge", userId, setNumber, gameId);
  };
  const shareDataHandler = (userId, data) => {
    socket?.emit("shareData", userId, data);
  };
  const onFinishCompetitionHandler = (data) => {
    socket?.emit("finishCompetition", data);
  };
  //mulitple rooms game challange
  const onMakeRoom = (roomName, usersReceivers, gameId, time) => {
    socket?.emit("makeRoom", roomName, usersReceivers, gameId, time);
  };
  const onStartRoomChallenge = (roomId) => {
    console.log("ddddddddddddd");
    // console.log(roomId);
    socket?.emit("startRoomChallenge", roomId);
  };
  const onSendData = (data) => {
    socket?.emit("roomDataTransport", currentRoom?.id, data);
  };
  const onFinishRoom = () => {
    socket?.emit("finishRoomChallange", currentRoom?.id);
  };
  const onAddViewer = (roomId) => {
    socket?.emit("addViewer", roomId);
  };
  const onExitViewer = (roomId) => {
    socket?.emit("exitViewer", roomId);
  };
  return (
    <SocketContext.Provider
      value={{
        users,
        setCurrentRoom,
        competition,
        lastValueRecieve,
        setLastValueRecieve,
        setCompetition,
        addChallenge,
        setLastRoom,
        shareDataHandler,
        isConnected,
        lastReq,
        setIsShowLastRequest,
        setLastReq,
        socket,
        onFinishCompetitionHandler,
        onMakeRoom,
        lastRoom,
        onStartRoomChallenge,
        currentRoom,
        onSendData,
        onFinishRoom,
        onAddViewer,
        onExitViewer,
        user
      }}
    >
      {children}
    
    </SocketContext.Provider>
  );
};
export default SocketContextProvider;
