import react, { useState } from 'react'
import { View,Text, Dimensions, SafeAreaView,Image, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList } from 'react-native'
import NavbarSh from '../components/NavbarComponent'
import GoBack from '../components/GoBack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFPercentage } from 'react-native-responsive-fontsize'
import axios from 'axios'
import { getValueFor } from '../appsetting/storeConfig'
import { useNavigation } from '@react-navigation/core'
import { OpenToast } from '../components/share/OpenToast'
import { LOAD_FILE } from '../service/APIs'

const CommentsPost = ({route})=>{
    const [comment,setComment] = useState('')
    const navigation = useNavigation()
    const [comments,setComments] = useState(route.params.post.item.comment)
    const sendComments = ()=>{
        axios
        .post(
          "https://lifelands.ir/api/v1/social/like",
          {
            postId: route.params.post.item.postId._id,
            comment: comment
          },
          {
            headers: {
              token: getValueFor(),
            },
          }
        )
        .then((response) => {
            OpenToast(
                "انجام شد",
                "نظر شما با موفقیت ثبت شد",
                "success"
              );
            navigation.goBack()
         
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
          OpenToast(
            "خطا",
            "متاسفانه مشکلی پیش آمده است لطفا مججد اقدام کنید",
            "error"
          );
        });
    }
    console.log('comments',comments[0])
    return (
        <KeyboardAvoidingView  behavior='padding'  style={{width:"100%",height: Dimensions.get('window').height,position:'relative',paddingBottom: 60}}>
            <NavbarSh rightChile={<View style={{flexDirection:"row"}}>
                <Text style={{color:"white",fontFamily:'vazir',marginRight: 8}}>نظرات</Text>
                <GoBack />
            </View>} />
            {
                comments.length>0?<FlatList 
                
                data={comments}
                renderItem={({item})=>{
                   return (
                       <View style={{width:"100%",borderRadius: 10,padding: 10,marginTop: 10,borderBlockColor:'rgba(12, 12, 12, 0.93)',borderBottomWidth: 1,justifyContent:'flex-end',alignItems:"flex-end"}}> 
                       <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={{justifyContent:'flex-end',alignItems:"flex-end",marginRight: 10}}>
                        <Text style={{color:'white',fontFamily:"vazir",fontSize: 12,opacity: 0.9}}>  

                        { item.userId.firstName }  { item.userId.lastName }

                        </Text>
                        <Text style={{color: 'rgba(102, 102, 102, 0.93)' ,fontFamily:"vazir",fontSize: 10}}>@{item.userId.userName}</Text>


                        </View>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Public Profile Page',{userId : item.userId})
                        }}>
                            <Image source={{uri: `${LOAD_FILE}${item.userId.profileImage}`}} style={{width: 50,height:50,borderRadius: 100}}/>
                        
                        </TouchableOpacity>

                       </View>
                      <View style={{marginTop: 10,paddingHorizontal: RFPercentage(7)}}>
                      <Text style={{color:"white",fontFamily:"vazir"}}>
                        {item.comment}
                       </Text>
   
                      </View>
                       </View>
                   )
                }}
                keyExtractor={(item) => item._id}
               
               
               />:<View style={{width:"100%",height: Dimensions.get('window').height,justifyContent:"center",alignItems:"center"}}>
               <Image source={require('../../assets/negative.png')} style={{width: RFPercentage(3),height:40}} />
                <Text style={{color:"white",fontFamily:"vazir",}}>هیچ نظری وجود ندارد
                :(
                </Text>
                <TouchableOpacity style={{backgroundColor:"#7371f3",marginTop:8,paddingHorizontal:11,paddingVertical:2,borderRadius: 15}} onPress={()=>{
                    navigation.goBack()
                }}>
                    <Text style={{color:"white",fontFamily:"vazir",fontSize: 10}}>خب پس میرم خونه</Text>
                </TouchableOpacity>
              </View>
            }
            <View style={{width:"100%",alignItems:"center",flexDirection:"row",position:'absolute',bottom:0,left:0,height:80,backgroundColor:"rgba(31, 31, 31, 1)",paddingBottom:0}}>
                <TextInput onChangeText={text=>setComment(text)} style={{width:"90%",color:"white",fontFamily:"vazir",paddingHorizontal: 8}} placeholderTextColor={'rgba(71, 71, 71, 1)'} placeholder='متن نظر' multiline={true}/>
               <View>
               {
                    comment?<TouchableOpacity style={{marginLeft: 9}} onPress={()=>{
                        sendComments()
                    }}>
                    <Ionicons name='send' color={'rgba(134, 84, 228, 1)'} size={RFPercentage(2.6)}/>
            </TouchableOpacity>:<TouchableOpacity style={{marginLeft: 9}} >
                        <Ionicons name='send' color={'rgba(71, 71, 71, 1)'} size={RFPercentage(2.6)}/>
                </TouchableOpacity>
                }
               </View>

            </View>
        </KeyboardAvoidingView>
    )
}

export default CommentsPost;