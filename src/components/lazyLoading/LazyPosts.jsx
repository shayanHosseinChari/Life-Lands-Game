import react from "react";
import { View ,StyleSheet,Text} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'



export const LazyPosts = ()=>{
    return(
    <View >
            <View style={Styles.postLazy}>
            <View style={Styles.title}>
                <View style={Styles.profile}></View>
                <View style={Styles.username}>
                    <View style={{width:38,height:6,borderRadius:10,backgroundColor:"#1e1e1e"}}></View>
                    <View style={{width:RFPercentage(10),marginTop:6,height:6,borderRadius:10,backgroundColor:"#1e1e1e"}}></View>

                </View>
            </View>
            <View style={Styles.banner}>
                <EvilIcons name="image" color={'#2e2e2e'} size={RFPercentage(10)}/>
            </View>
            <View style={Styles.acions}>
            
                <View style={{width:40,height:8,borderRadius:5,backgroundColor:"#1e1e1e"}}></View>

                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Text style={{width:20,height:20,borderRadius:10,backgroundColor:"#1e1e1e",marginHorizontal:3}}></Text>
                    <Text style={{width:20,height:20,borderRadius:10,backgroundColor:"#1e1e1e",marginHorizontal:3}}></Text>
                    <Text style={{width:20,height:20,borderRadius:10,backgroundColor:"#1e1e1e",marginHorizontal:3}}></Text>
                </View>


            </View>
            <View style={Styles.description}> 
           <View style={{width:"100%",flexDirection:"row-reverse"}}>
           <Text style={{width:RFPercentage(41),height:8,borderRadius:5,backgroundColor:"#1e1e1e"}}>
            </Text>
            
           </View>
           <View style={{width:"100%",flexDirection:"row-reverse",marginTop:3}}>
           <Text style={{width:RFPercentage(36),height:8,borderRadius:5,backgroundColor:"#1e1e1e"}}>
            </Text>
            
           </View>
           <View style={{width:"100%",flexDirection:"row-reverse",marginTop:3}}>
           <Text style={{width:RFPercentage(42),height:8,borderRadius:5,backgroundColor:"#1e1e1e"}}>
            </Text>
            
           </View>
           <View style={{width:"100%",flexDirection:"row-reverse",marginTop:3}}>
           <Text style={{width:RFPercentage(26),height:8,borderRadius:5,backgroundColor:"#1e1e1e"}}>
            </Text>
            
           </View>

            </View>
            <View style={Styles.time}>
                <View style={{flexDirection:"row-reverse",alignItems:'center'}}>
                <AntDesign name="clockcircleo" color={'#1e1e1e'} size={RFPercentage(2)} />
                    <View style={{width:25,height:5,borderRadius:10,backgroundColor:"#1e1e1e",marginHorizontal:5}}></View>
                </View>
            </View>

        </View>
    </View>
    )
}

const Styles = StyleSheet.create({
    time:{
        width:"100%",
        alignItems:"center",
        flexDirection:"row-reverse",
        paddingHorizontal: RFPercentage(1),
        marginTop: RFPercentage(3),
        marginBottom: RFPercentage(1),
        borderTopColor:'#1e1e1e',
        borderTopWidth:1,
        paddingVertical:10,
        alignItems:"center"


        
    },
    description:{
        width:"100%",
        paddingHorizontal: RFPercentage(1),
        direction:'rtl',
        marginVertical: RFPercentage(1)
    },
    acions:{
        width:"100%",
        paddingHorizontal: RFPercentage(1) ,
        marginVertical:10   ,
        flexDirection:"row-reverse",
        justifyContent:"space-between",
        alignItems:'center'
    },
    banner:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        height:440,
        backgroundColor:"#1a1a1a"

    },  
    username:{
        marginHorizontal: RFPercentage(1),
        justifyContent:"flex-start",
        alignItems:"flex-end"
    },  
    profile:{
        width: RFPercentage(3.8),
        height: RFPercentage(3.8),
        borderRadius:100,
        backgroundColor:"#1e1e1e"
    },
    title:{
        width:"100%",
        padding:4,
        flexDirection:"row-reverse",
        alignItems:"center",
        padding: RFPercentage(1.2),
        
    },
    postLazy:{
        width:'100%',
        direction:"rtl",
       
   
      
        marginTop:7,
        
    }
})