import React, { useState } from "react";
import {View,Image,TouchableOpacity,StyleSheet,Text} from 'react-native'
import Theme from "../../Theme/Theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomText from "../text/CustomText";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import LinearGradient from "react-native-linear-gradient";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LOAD_FILE } from "../../service/APIs";
const PostItemComponent = (props)=>{
    // const [publisherProfile,setPublisherProfile] = useState('')
    // console.log(props.instance)

    return (
        <View style={Styles.container}>
           {props.hasProfile?   <TouchableOpacity style={Styles.profileWrapper}>
                <AntDesign name="left" size={RFPercentage(2)} color={"white"} />
                <View style={Styles.profileWrapper.ProfileStyle}>
                    {/* <Image source={{uri:`${LOAD_FILE}${props.instance.creator.userId.profileImage}`}} style={Styles.profileWrapper.ProfileStyle.img} /> */}
                    {/* <CustomText fontSize={12}>{props.instance.creator.fullName}</CustomText> */}
                </View>
           </TouchableOpacity>:null}
         
          {
            props.isVideo?  <View style={[Styles.banner,{position:"relative"}]}>
                <View style={{width:"100%",height:"100%",position:"absolute",zIndex:99,top:0,left:0,justifyContent:"center",alignItems:"center"}}>
                    <TouchableOpacity activeOpacity={0.8} style={{width:RFPercentage(6),height:RFPercentage(6),borderRadius:100,backgroundColor:'#612b5c',justifyContent:"center",alignItems:"center"}}>
                            <Ionicons  name="play" size={RFPercentage(2.4)} color={'white'} />
                    </TouchableOpacity>
                </View>
                <Image source={require('../../../assets/wall-banner.jpg')} style={{width:"100%",height:'100%'}} />
        </View> :  <View style={Styles.banner}>
            {
            
            props.hasProfile?<Image source={require('../../../assets/wall-banner.jpg')} style={[Styles.banner.img,{borderTopLeftRadius:0,borderTopRightRadius:0,objectFit:'scale-down'}]}/> :<Image source={require('../../../assets/wall-banner.jpg')} style={Styles.banner.img}/>
            }
           {
            props.hasProfile ? null:  <View style={{width:"100%",position:"absolute",padding:8,flexDirection:"row",justifyContent:"space-between"}}>
                <TouchableOpacity>
                <AntDesign name="left" size={RFPercentage(2)} color={"white"} />

                </TouchableOpacity>
                
            </View>
           }
        </View>
          }
            
            <View style={Styles.postDescription}>
                    <View style={Styles.postAcions}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{flexDirection:"row",alignItems:"center",marginRight:RFPercentage(2)}}>
                                <AntDesign  name="hearto" color={'white'} size={RFPercentage(2.3)} style={{marginRight:RFPercentage(1)}}/>
                                {/* <AntDesign  name="heart" /> */}
                                <CustomText fontSize={14}>0</CustomText>
                                

                            </View>
                            <View style={{flexDirection:"row",alignItems:"center",marginRight:RFPercentage(2)}}>
                                <AntDesign  name="eyeo" color={'white'} size={RFPercentage(2.3)} style={{marginRight:RFPercentage(1)}}/>
                                {/* <AntDesign  name="heart" /> */}
                                <CustomText fontSize={14}>27</CustomText>
                                

                            </View>
                            <View style={{flexDirection:"row",alignItems:"center",marginRight:RFPercentage(1)}}>
                                <AntDesign  name="message1" color={'white'} size={RFPercentage(2.3)} style={{marginRight:RFPercentage(1)}}/>
                                {/* <AntDesign  name="heart" /> */}
                                <CustomText fontSize={14}>11</CustomText>
                                

                            </View>

                        </View>
                        <TouchableOpacity style={Styles.postAcions.save} activeOpacity={0.8}>
                            <MaterialIcons name="bookmark-outline" color={'white'} size={RFPercentage(2.8)}/>
                        </TouchableOpacity> 

                    </View>
                    <View style={{width:"100%",justifyContent:"flex-end"}}>
                    <CustomText  fontSize={RFPercentage(2)} selfCenter={false} >
                        {/* {props.instance.title} */}
                    </CustomText>
                  <View style={{marginTop:5}}>
                  <Text style={{fontFamily:"vazir",color:"#cfcfcf",marginTop:7}}>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                    </Text>
                  </View>
                    </View>
                    <View style={{flexDirection:"row-reverse",alignItems:"center",justifyContent:'flex-start',marginTop:14}}>
                        <AntDesign name="clockcircleo" color={'#c3c0c0'} size={RFPercentage(2)} />
                        <Text style={{fontFamily:"vazir",marginHorizontal:10,color:"#c3c0c0"}}> دو روز پیش </Text>
                    </View>
            </View>


        </View>
    )
}


const Styles = StyleSheet.create({
    container:{
     
        backgroundColor:Theme.ItemBg,
        borderRadius:20,
        marginTop:RFPercentage(2)
    },
    banner:{
        position:"relative",
        height:220,
        img:{
            width:"100%",
            height:'100%',
            objectFit:"contain",
            borderTopLeftRadius:20,
            borderTopRightRadius:20,

        }
    },
    profileWrapper:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:RFPercentage(1),

        ProfileStyle:{
            flexDirection:"row-reverse",
            alignItems:"center",
            img:{
                width:RFPercentage(4.4),
                height:RFPercentage(4.4),
                marginHorizontal:RFPercentage(1.4),
                borderRadius:200,
                objectFit:"contain"
            }

        }

    },
    postAcions:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        save:{

        }
    },
    postDescription:{
        textAlign:"right",
           paddingHorizontal:RFPercentage(2),
           paddingVertical:RFPercentage(3)
    }
})

export default PostItemComponent