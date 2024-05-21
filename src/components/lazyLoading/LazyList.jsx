import react ,{useState}from "react";
import { View ,StyleSheet,Text,FlatList,TouchableOpacity} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'



export const LazyList = ()=>{
    const [loadingSkeleton, setLoadingSkeleton] = useState([
        {
          id: 1,
          text: "SkeletonContent",
        },
        {
          id: 2,
          text: "SkeletonContent",
        },
        {
          id: 3,
          text: "SkeletonContent",
        },
        {
          id: 4,
          text: "SkeletonContent",
        },
        {
          id: 5,
          text: "SkeletonContent",
        },
        {
          id: 6,
          text: "SkeletonContent",
        },
        {
          id: 7,
          text: "SkeletonContent",
        },
        {
          id: 8,
          text: "SkeletonContent",
        },
        {
          id: 9,
          text: "SkeletonContent",
        },
        {
          id: 9,
          text: "SkeletonContent",
        },
        {
          id: 10,
          text: "SkeletonContent",
        },
        {
          id: 11,
          text: "SkeletonContent",
        },
        {
          id: 12,
          text: "SkeletonContent",
        },
        {
          id: 13,
          text: "SkeletonContent",
        },
        {
          id: 14,
          text: "SkeletonContent",
        },
        {
          id: 15,
          text: "SkeletonContent",
        },
        {
          id: 16,
          text: "SkeletonContent",
        },
        {
          id: 17,
          text: "SkeletonContent",
        },
        {
          id: 18,
          text: "SkeletonContent",
        },
    
        {
          id: 19,
          text: "SkeletonContent",
        },
      ]);
    return(
        <FlatList
      
       
        keyExtractor={(item,index) => index}
        data={loadingSkeleton}
        nestedScrollEnabled={true}
       
       
       
        horizontal={true}
        inverted={false}
        // onEndReached={getMor}
        contentContainerStyle={{
        
           
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
       style={{marginVertical:10,direction:"rtl"}}
        renderItem={({ item }) => (
        // //  <Text>
        // //   {
        // //     `${item.image}`
        // //   } 
        //  </Text>
 
       <TouchableOpacity  style={{width:120,height:150,marginHorizontal:3,display:"flex",}}>
        <View style={{width:"100%",height:'80%',borderRadius:8,backgroundColor:"#131212"}}></View>
        
       
        <View style={{width:'50%',height:5,borderRadius:10,backgroundColor:"#232323",marginHorizontal:5,marginTop:6,alignSelf:'center'}}></View>
        <View style={{width:'60%',height:5,borderRadius:10,backgroundColor:"#232323",marginHorizontal:5,marginTop:3,alignSelf:'center'}}></View>
       </TouchableOpacity>
        )}
      />
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
        height:180,
        backgroundColor:"#1d1d1d"

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
       
        borderRadius:10,
        backgroundColor:"#131212",
        marginTop:7,
        
    }
})