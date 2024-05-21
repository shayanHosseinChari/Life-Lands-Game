import React, { useState } from "react";
import {View,Text ,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
const LazyBookItem = ()=>{
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
    return (
        <View >
            
 <FlatList
      
       
      keyExtractor={(item,index) => index}
      data={loadingSkeleton}
      nestedScrollEnabled={true}
     
     
     
      horizontal={true}
      inverted={true}
      // onEndReached={getMor}
      contentContainerStyle={{
      
         height:170,
         
         justifyContent:"center",
         alignItems:"center"
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
     style={{marginVertical:10,paddingHorizontal: 20,height:170}}
      renderItem={({ item }) => (
      // //  <Text>
      // //   {
      // //     `${item.image}`
      // //   } 
      //  </Text>

     <TouchableOpacity  style={{width:250,height:120,paddingVertical:3,marginHorizontal:8,display:"flex",flexDirection:'row-reverse',backgroundColor:"#131212",borderRadius:10}}>
      <View style={{width:"40%",height:'100%',borderRadius:8,backgroundColor:"#1a1a1a",position:"relative",marginHorizontal:14,marginTop:-24,zIndex:99}}>
        
       

      </View>
      <View style={{width:"46%",height:'80%',paddingVertical:4,alignItems:"flex-end",justifyContent:"center"}}>
       <View style={{width:'100%',alignItems:"flex-end"}}>
       <View style={{width:'70%',height:8,borderRadius:10,backgroundColor:"#1b1b1bf4"}}>
            

            </View>
            <View style={{width:'30%',height:8,marginTop:5,borderRadius:10,backgroundColor:"#1b1b1bf4"}}>
                
    
                </View>
       </View>
       <View style={{width:"100%",height:20,borderRadius:6,backgroundColor:"#1b1b1bf4",marginTop:20}}></View>
      

      </View>
    


      {/* </View> */}
      
     
     
     </TouchableOpacity>
      )}
    />
        </View>
    )
}


const Styles = StyleSheet.create({
    profile:{

        width: 60,
        height: 60,
        borderRadius:100,
        backgroundColor:"#202020",
   
       
        position:"absolute",
        bottom: -3, left: -13, borderWidth: 2, borderColor: "#3E4148",
        zIndex:99,
        justifyContent:"center",
        alignItems:"center"

    }
    
})

export default LazyBookItem