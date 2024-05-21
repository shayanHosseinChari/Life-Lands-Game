import {WebView} from 'react-native-webview'
import react, { useContext } from 'react'
import { View } from 'react-native'
import { BASE_URL, LOAD_FILE } from '../../service/APIs'
import { getValueFor } from '../../appsetting/storeConfig'
import { SocketContext } from '../../context/SocketContext'


export const Luncher = ({route})=>{
  const { lastRoom,setLastRoom } = useContext(SocketContext);

    
    return(
        <WebView 
        style={{flex:1}}
        source={{
            uri: `https://lifelands.ir/api/upload/${lastRoom.gameId}/index.html?token=${getValueFor()}&gameId=${lastRoom.gameId}&competitionId=${lastRoom.id}`
        }}
        />  
    )

}
// https://lifelands.ir/wgames/luncher?id=65a584d6cd208381ba2691cc&competitionId=b641d6e6-b459-4b7f-b8b9-2c1b60e935f6