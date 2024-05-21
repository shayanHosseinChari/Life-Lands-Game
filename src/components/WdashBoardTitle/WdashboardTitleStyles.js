import { StatusBar,StyleSheet } from "react-native";
import Theme from "../../Theme/Theme";
import { RFPercentage } from "react-native-responsive-fontsize";

const WdashboardTitleStyles = StyleSheet.create({
    container:{
        paddingVertical:StatusBar.currentHeight,
        backgroundColor:Theme.boxBgColor,
        paddingHorizontal:RFPercentage(2),
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',


    }
})

export default WdashboardTitleStyles