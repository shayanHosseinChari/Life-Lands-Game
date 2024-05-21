import React, { useState } from "react";
import {View,Text ,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const LazyPoularChanels = ()=>{
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
      
         
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
     style={{marginVertical:10,paddingHorizontal: 20}}
      renderItem={({ item }) => (
      // //  <Text>
      // //   {
      // //     `${item.image}`
      // //   } 
      //  </Text>

     <TouchableOpacity  style={{width:100,height:100,paddingVertical:3,marginHorizontal:15,display:"flex",justifyContent:"center",alignItems:"center"}}>
      <View style={{width:80,height:80,borderRadius:180,backgroundColor:"#131212",position:"relative",justifyContent:"center",alignItems:"center"}}>
        <EvilIcons name="image" color={'#272727'} size={36}/>
     
      </View>
      <View style={{width:'60%',height:5,borderRadius:10,backgroundColor:"#232323",marginHorizontal:5,marginTop:6,alignSelf:'center'}}></View>
        {/* <View style={{width:'40%',height:5,borderRadius:10,backgroundColor:"#232323",marginHorizontal:5,marginTop:3,alignSelf:'center'}}></View> */}
        
        

      {/* </View> */}
      
      <View style={{flexDirection:"row-reverse",alignItems:'center',marginTop:5}}>
       
     
      {/* <View style={{width:'30%',height:5,borderRadius:10,backgroundColor:"#232323",marginHorizontal:5,marginTop:6,alignSelf:'center'}}></View> */}

       </View>
     
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

export default LazyPoularChanels