import { StyleSheet, View ,Text} from "react-native";
import CustomText from "../text/CustomText";
import CustomImage from "../CustomImage/CustomImage";
import { useTheme } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Image } from "react-native";
import { LOAD_FILE } from "../../service/APIs";

const MaxPlayerItems = ({ item }) => {
    console.log(item)
    const { colors } = useTheme();
    return (
        <View style={[style.container, { backgroundColor: "transparent" }]}>
            <View style={{width:65,height:65,position:'relative'}}>
            <Image
            source={{uri: `${LOAD_FILE}${item?.profileImage}`}}
            style={{width:65,height:65,borderRadius:100}}
                
            />
            {
            
            item.isActive?<View style={{ position: "absolute", bottom: 0, left: 5, width: 15, height: 15, borderRadius: 4554, borderWidth: 2, borderColor: "#17181A", backgroundColor: "#00B7AC" }} />:null
            }
            </View>
                        
            <View style={{flexDirection:'row',alignItems:"center"}}>
                <Text style={{color:"white",fontFamily:"vazir",fontSize: RFPercentage(1.6),}}>
                    {item.firstName} 
                </Text>
                <Text style={{color:"white",fontFamily:"vazir",fontSize: RFPercentage(1.6),marginHorizontal: 5}}>
                 {item.lastName}
                </Text>
            </View>
            <Text style={{color:"white",opacity: 0.7,fontSize: RFPercentage(1.5)}}>@{item.userName}</Text>
        </View >
    );
};
export default MaxPlayerItems;

const style = StyleSheet.create({
    container: {
        backgroundColor: "#3E4148",
        borderRadius: 8,
        height: 120,
        marginHorizontal: 10,
        width: 70,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
});