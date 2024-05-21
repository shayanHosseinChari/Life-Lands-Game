import { View ,Text} from "react-native";
import CustomImage from "../../CustomImage/CustomImage";
import NavbarSh from "../../NavbarComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

const SingleChannelHeaderComponent = ({ channel }) => {
  const navigation = useNavigation()
  return (
    <View>
    
      <CustomImage
        isOPT={false}
        image={channel?.headerImage}
        width={1}
        height={200}
      />
      <View style={{ alignSelf: "flex-end",flexDirection:"row", paddingHorizontal: RFPercentage(2), marginTop: -20,justifyContent:'space-between',width:"100%",alignItems:"center" }}>
      <TouchableOpacity style={{backgroundColor:"#774ae8",paddingHorizontal:15,paddingVertical:2,borderRadius:8}}>
          <Text style={{color:"white",fontFamily:"vazir"}}>دنبال کردن</Text>
        </TouchableOpacity>
       
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <View style={{marginHorizontal: 7,justifyContent:"flex-end",marginTop:10,alignItems:"flex-end"}}>
          <Text style={{color:"white",fontFamily:"vazir"}}>{channel?.title}</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('Public Profile Page',{userId: channel?.creator?.userId})

          }}>
            <Text style={{color:"white",fontFamily:"vazir",opacity: 0.8}}>{channel?.creator?.fullName}</Text>
          </TouchableOpacity>
        </View>
        <CustomImage
          image={channel?.image}
          width={4.7}
          isOPT={false}
          radius={500}
          aspect={1 / 1}
          styles={{
            borderColor:"black",
            borderWidth: 4
          }}
        />
       
        </View>
       
      </View>
      <Text style={{color:"white",fontFamily:"vazir",marginRight:30,textAlign:'right',fontSize: RFPercentage(1.5),opacity:0.7}}>{channel?.description}</Text>
    </View>
  );
};
export default SingleChannelHeaderComponent;
