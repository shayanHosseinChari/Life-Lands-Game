import {useState,useEffect} from 'react'

import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavbarSh from "../components/NavbarComponent";
import GoBack from "../components/GoBack";
import * as FileSystem from 'expo-file-system'
import { RFPercentage } from "react-native-responsive-fontsize";
import { getValueFor } from '../appsetting/storeConfig';
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { OpenToast } from '../components/share/OpenToast';
import { TextInput } from 'react-native-gesture-handler';

export default function WatchStoru({route}){
    console.log( route.params.data.department)
    const [isUploadLoading,setIsUploadLoading] = useState(false)
    const [file,setFile] = useState()
    const [typeOfFile,setTypeOfFile] = useState(route.params.data.type)
    const [loading,setLoading] = useState(false)
    const [title,setTitle] = useState('')
    const [caption,setCaption] = useState('')

    const navigation = useNavigation()
    const UploadFile = async ()=>{
        setIsUploadLoading(true)
        
       

        await FileSystem.uploadAsync("https://lifelands.ir/api/v1/file",route.params.data.uri,{
            httpMethod: 'POST',
            parameters:{
              department: route.params.data.department
            },
            headers:{
              token: getValueFor()
            },
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',

          }).then(data=>{
            var s = JSON.parse(data.body)
            console.log(data)
            setIsUploadLoading(false)
            setFile(s.data.fileName)
            //   setImage(s.data.fileName)
          }).catch(err=>{
            console.log(err)
           setIsUploadLoading(false)

          })

    }
    useEffect(()=>{
        UploadFile()
    },[])
    let dataToSend = typeOfFile=="image"?{
        postImage: file
    }:{
        postVideo: file
    }

    const onPublishStory =  async ()=>{
        if(route.params.data.department == "social_story"){
            setLoading(true)

            await axios.post("https://lifelands.ir/api/v1/insert/story",dataToSend,{
                headers:{
                    token: getValueFor()
                }
            }).then(response=>{
                OpenToast('انجام شد','استوری شما با موفقیت ثبت شد ','success')
                setLoading(false)
                navigation.navigate('Home')
                console.log(response.data)
            }).catch(err=>{
            setLoading(false)
    
                console.log(err)
            })
    
        }else{
            setLoading(true)
            let s = typeOfFile=="image"?{
                postImage: file,description: caption
            }:{
                postVideo: file,description: caption
            }

            await axios.post("https://lifelands.ir/api/v1/insert/post",s,{
                headers:{
                    token: getValueFor()
                }
            }).then(response=>{
                OpenToast('انجام شد','پست شما با موفقیت ثبت شد ','success')
            setLoading(false)
                navigation.navigate('Home')
    
                console.log(response.data)
            }).catch(err=>{
            setLoading(false)
    
                console.log(err)
            })
    
        }
       
    }
    return (
        <View >
            <NavbarSh rightChile={<View>
                <GoBack />
            </View>} />
           <ScrollView scrollEnabled style={{width:Dimensions.get('window').width, height: Dimensions.get('window').height}}>
           <View style={{width:"100%",height: Dimensions.get('window').height,marginTop: 20,paddingHorizontal: RFPercentage(2)}}>
           {
            route.params.data.type == "image"?<View style={{width:"100%",height:"70%",position:"relative"}}>
            {
             isUploadLoading? <View style={{width:"100%",height:"100%",borderRadius: 8,zIndex: 9,backgroundColor:"rgba(0, 0, 0, 0.8)",position:"absolute",justifyContent:"center",alignItems:"center"}}>
             <ActivityIndicator color="white" size={RFPercentage(3)} />
             <Text style={{color:"white",fontFamily:"vazir"}}>درحال اپلود تصویر</Text>
         </View>:null
            }
            <Image source={{uri: route.params.data.uri}} style={{width: '100%',height: '100%',borderRadius: 8}} resizeMode="contain"/>
 
            </View>:<View style={{width:"100%",height:"70%",position:"relative"}}>
           {
            isUploadLoading? <View style={{width:"100%",height:"100%",borderRadius: 8,zIndex: 9,backgroundColor:"rgba(0, 0, 0, 0.8)",position:"absolute",justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator color="white" size={RFPercentage(3)} />
            <Text style={{color:"white",fontFamily:"vazir"}}>درحال اپلود ویدیو</Text>
        </View>:null
           }
          <VideoPlayer
          
          
  videoProps={{
    shouldPlay: true,
    style:{
        borderRadius: 10,
        width:"100%",
        height:"70%"
      },
    resizeMode: ResizeMode.COVER,
    useNativeControls:true,
    // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
    source: {
      uri: route.params.data.uri,
    },
  }}
/>

           </View>
           }
           {
            route.params.data.department=="social_post"?<View style={{width:"100%",marginTop: 10}}>
                <TextInput placeholder='کپشن پست' onChangeText={text=>setCaption(text)}  placeholderTextColor={'gray'} style={{width:"100%",height: 80,backgroundColor:"rgba(18, 18, 18, 1)",paddingHorizontal: 7,borderRadius: 4,fontFamily:"vazir",marginTop: 8,color:'white'}} multiline/>

            </View>:null
           }
            <TouchableOpacity style={{width:"100%",backgroundColor:"#7d38d1",justifyContent:'center',alignItems:"center",borderRadius: 10,paddingVertical: 9,marginTop:8,paddingHorizontal: 10.45}} onPress={onPublishStory}>
                
                {
                    loading?<ActivityIndicator color="white" size={RFPercentage(3)} />:<Text style={{color:"white",fontFamily:"vazir"}}>
                        {
                            route.params.data.department == "social_story"?"ثبت استوری":"ثبت پست"
                        }
                    </Text>
                }

            </TouchableOpacity>
            </View>

           </ScrollView>
        </View>
    )
}

