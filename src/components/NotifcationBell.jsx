import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { NotifcationStore } from "../Store/NotifcationSotre"
import { Text,View } from "react-native"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { RFPercentage } from "react-native-responsive-fontsize"

const NotifcaionBell = ()=>{
    let navigation = useNavigation()
    return (
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
    )
}

export default NotifcaionBell