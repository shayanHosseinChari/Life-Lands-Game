
// import { Icon } from "@rneui/themed"
import { View,Text,Image } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"
const NavbarSh = ({rightChile,hasborder=true})=>{
    return(
    <View
    style={{
      width: "100%",
      alignItems:"center",
      flexDirection: "row",
      justifyContent:"space-between",
      borderBottomColor: hasborder?"#262626":"transparent",
      alignItems:"center",
      borderWidth: hasborder?1:0,
      
      paddingBottom: 8,
      paddingTop:7,
      paddingHorizontal: RFPercentage(1.7),
    }}
  >
    <View style={{flexDirection:'row',alignItems:"center"}}>
    <Text style={{fontFamily:"candy",color:"white",fontSize: RFPercentage(2.6)}}>Life</Text>
    <Text style={{fontFamily:"candy",color:"#4B4AAF",fontSize: RFPercentage(2.6)}}>Lands</Text>
    </View>
   {
    rightChile
   }
  </View>
  )
}
export default NavbarSh