import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import {View,Text, StatusBar,Image, TouchableOpacity, Pressable,TextInput, Keyboard, FlatList, Dimensions, ToastAndroid} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getToken, getValueFor } from '../appsetting/storeConfig'
import { OpenToast } from '../components/share/OpenToast'
import { LOAD_FILE } from '../service/APIs'


const SearchUser = ()=>{
    const navigation = useNavigation()
    const [usersSearch,setUsers] = useState()
    
    const getUsers = async(userId)=>{
        if(userId.length){
           
            console.log(JSON.stringify(userId))
            axios.post('https://lifelands.ir/api/v1/social/search',{
                search: userId
            },{
                headers:{
                    token: getValueFor()
                }
            }).then(res=>{
                if(res.data.data.length == 0){
                    ToastAndroid.show('کاربری یافت نشد',3000)
                }else{
                    setUsers(res.data.data)
                }
                
            })
            
        
        }else{
            setUsers([])
        }

    }
    
    return(
        <View style={{flex:1}}>
            <View style={{paddingHorizontal: RFPercentage(1.3),marginTop: 10,marginBottom: 8,flexDirection:'row',alignItems:"center"}}>
                <Pressable style={{marginRight: RFPercentage(1)}} onPress={()=>{
                    Keyboard.dismiss()
                    navigation.goBack()
                }}>
                        <AntDesign name='arrowleft' color={'white'} size={RFPercentage(3)} />
                </Pressable>
<View 
style={{flex:1,height:40,backgroundColor:"#2d2d2d",borderRadius: 10,flexDirection:'row',alignItems:'center',paddingHorizontal: 10}}>
  <AntDesign  name="search1" color={"white"} size={RFPercentage(3)} />
  <TextInput placeholder='Search' onChangeText={text=> getUsers(text)} placeholderTextColor={'gray'} style={{width:"90%",color:"white",height:'100%',marginHorizontal: RFPercentage(1),fontFamily: 'vazir',paddingHorizontal: 6}} autoFocus/>
  
</View>


</View>
<View style={{marginTop: 3,paddingHorizontal: RFPercentage(2)}}>
    {
        usersSearch?<FlatList 
        style={{
         width:Dimensions.get('screen').width,
         paddingHorizontal: RFPercentage(0),
         marginHorizontal: "auto",
         height: Dimensions.get("window").height,
         marginTop: 8,
       }}
       initialNumToRender={10}
       maxToRenderPerBatch={10}
       renderToHardwareTextureAndroid
       removeClippedSubviews
       pinchGestureEnabled
       // pagingEnabled
 
       shouldRasterizeIOS
      
       
       nestedScrollEnabled
       showsVerticalScrollIndicator={false}
       data={usersSearch}
       renderItem={({item})=>{
         return (
             <Pressable onPress={()=>{
                navigation.navigate('Public Profile Page',{userId : item._id})
             }} style={{width:"100%",flexDirection:"row",alignItems:"center",marginTop: 10}}>
                 <Image source={{uri: `${LOAD_FILE}${item.profileImage}`}} style={{width: 60,height: 60,borderRadius: 100,objectFit:"cover"}} resizeMode='cover'/>
                 
                 <View style={{flex:1,marginLeft: 8,justifyContent:'flex-start',alignItems:"flex-start",borderBottomColor:'rgba(23, 23, 23, 0.8)',borderBottomWidth:1,paddingBottom: 8}}>
                    <Text style={{color:"white",fontFamily:"vazir"}}>
                        {item.firstName} {item.lastName}
                         
                    </Text>
                    <Text style={{color:"gray",fontSize: RFPercentage(1.4),marginTop: 4}}>
                        @{item.userName} 
                         
                    </Text>
                 </View>
             </Pressable>
         )
       }}
       keyExtractor={(item) => item._id}
     />:  null
    }

</View>
        </View>
    )
}

export default SearchUser