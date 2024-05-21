import React, { useCallback, useEffect, useState } from "react";
import {View,Text,FlatList,Image,TouchableOpacity,StyleSheet,Platform} from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { booksAPI } from "../../service/APIs";
import axios from "axios";
import { BASE_URL } from "../../service/APIs";
import { LOAD_FILE } from "../../service/APIs";
import { addRunCountService ,gameLinkMaker} from "../../service/PostService";
import CustomText from "../text/CustomText";

const PostSameItems = (props)=>{
   let count = 0;
   let navigation = props.navigation
   
   let isWorked=false
    const [data,setData] = useState(props.data)
   
    return(
        <View style={{width:"100%",marginTop:RFPercentage(2.3),position:"relative"}}>
            <View style={[{position:"absolute",left:0,top:0,height:'90%',width:10,zIndex:99},Styles.box]}></View>
            <View style={{width:"100%",paddingHorizontal:RFPercentage(2),flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <TouchableOpacity activeOpacity={0.8} style={{flexDirection:"row",alignItems:"center"}} onPress={() => navigation.navigate("Public Page", { data: props.data, mode: props.mode, title:props.subTitle, sort:"_id", cid:""  })}>
                    <AntDesign name="left" color={"white"} size={RFPercentage(2)}/>
                    <Text style={{marginHorizontal:RFPercentage(1.2),fontFamily:"vazir",color:"white"}}>بیشتر</Text>
                </TouchableOpacity>
                <Text style={{fontFamily:"vazir",fontSize:RFPercentage(2),color:"white"}}>{props.Title}</Text>

            </View>
            <FlatList
      
       
        keyExtractor={(item,index) => index}
        data={data}
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
 
       <TouchableOpacity onPress={()=>{
        navigation.navigate("Voice Play List", {
          id: item.playlist?._id,
          voiceId: item._id,
        });
        if(props.mode == "Voice Play List"){
         
        navigation.navigate(props.mode,  {
          id: props.playlist?._id,
          voiceId: item._id,
        })
        }else{

          navigation.navigate(props.mode, { id: item._id,item:item})

        }
       }} style={{width:120,height:150,marginHorizontal:3}}>
        
       {
        props.mediaType == 'voice'?
        <Image source={{uri:`${LOAD_FILE}${item.coverImage}`}} style={{width:"100%",height:"80%",borderRadius:8,marginHorizontal:6,marginBottom:0}}/>
        : <Image source={{uri:`${LOAD_FILE}${item.image}`}} style={{width:"100%",height:"80%",borderRadius:8,marginHorizontal:6,marginBottom:0}}/>

       }
        <View style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
         
        <CustomText color={'white'} style={{color:'white',fontFamily:"vazir",fontSize:RFPercentage(1.3),maxWidth:'50%',textAlign:'center',marginTop:10}}>{item.title}</CustomText>
        </View>
       </TouchableOpacity>
        )}
      />
        </View>
    )
}

const Styles = StyleSheet.create({
    box: {
        ...Platform.select({
          ios: {
            shadowColor: '#ffffff',
            shadowOpacity: 1,
            shadowRadius: 5,
            shadowOffset: {
              height: 5,
              width: 5,
            },
          },
          android: {
            elevation: 5,
            shadowColor: 'rgb(49, 49, 49)',
            shadowOpacity: 1,
            shadowRadius: 5,
            shadowOffset: {
              height: 5,
              width: 5,
            },
        
          },
        }),
      },
})
export default PostSameItems