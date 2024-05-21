import { useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, View, VirtualizedList,TouchableOpacity,Text,ActivityIndicator,TextInput } from "react-native";
import { Rating } from "react-native-ratings";
import {
  cardColor,
  lightTextColor,
  yellowColor,
} from "../../../appsetting/appsettingColor";
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import { getValueFor } from "../../../appsetting/storeConfig";
import { border } from "../../../appsetting/styleSetting";
import { insertCommentService } from "../../../service/PostService";
import SpaceStyle from "../../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../../style/uiUtil";
import CustomButton from "../../CustomButton/CustomButton";
import CustomCard from "../../CustomCard/CustomCard";
import CustomImage from "../../CustomImage/CustomImage";
import CustomInput from "../../CustomInput/CustomInput";
import { OpenToast } from "../../share/OpenToast";
import CustomText from "../../text/CustomText";
import { Dimensions } from "react-native";
import * as Clipboard from 'expo-clipboard'
import { RootContext } from "../../../context/RootContext";
import { getProfileService } from "../../../service/UserService";
import IsVisible from "../../../Store/IsVisibleStore";
import CurrentCommentStore from "../../../Store/CommentItemStore";
import AntDesign from 'react-native-vector-icons/AntDesign'

import { RFPercentage } from "react-native-responsive-fontsize";
import axios from "axios";

const CommentsComponent = ({ id, commentsData, navigation }) => {
  const { colors } = useTheme();
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [expandeComment, setExpandComment] = useState();
  const [editeText,setEditText] = useState('')

  const [currentComment,setCurrentComment] = useState()
  const [isLoadingAcions,setIsLoadingActions] = useState(false)
  const [Data,setData] = useState(commentsData.comments)
  const [user,setUser] = useState()
  
  const [showModal,setShowModal] = useState(false)
  const [showEditModal,setShowEditModal] = useState(false)
  const width = Dimensions.get("screen").width;
  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: colors.card,
      paddingHorizontal: 10,
      paddingVertical: 10,
      alignSelf: "center",
      borderRadius: 5,
      marginBottom:50
    },
  });
  const getprof = async ()=>{
    const {
      data: { data: userRes },
    } = await getProfileService();
    setUser(userRes);
  }
 
  useState(()=>{
    getprof()
  })
  const deleteMsgFunc = ()=>{
    console.log('tokennnnn ',getValueFor())
    console.log('current comment is : ',currentComment._id)
    setIsLoadingActions(true)
    fetch(`https://lifelands.ir/api/v1/comment/delete`,{
      method:"post",
      body:{
      commentId: currentComment._id
        
      },
      headers:{token:  getValueFor() }
    
    }).then(response=>{
      setIsLoadingActions(false)
      OpenToast("انجام شد","نظر شما با موفقیت حذف شد","success")

      console.log(response.data)
      getData()
    }).catch(err=>{
    setIsLoadingActions(false)
    OpenToast('خطا','متاسفانه مشکلی پیش آمده لطفا مجددا تلاش کنید',"error")

      console.log(err)
    })

  }
  const EditComment = async()=>{
    setIsLoadingActions(true)
    fetch(`https://lifelands.ir/api/v1/comment/edit`,{
      method:"post",
      body:{
        commentId: currentComment.creator.userId._id,
        comment: editeText
      },
      headers:{
        token:  getValueFor(),
        
      }

    
    },{
     
    }).then(response=>{
      setIsLoadingActions(false)
      OpenToast("انجام شد","نظر شما با موفقیت ویرایش شد","success")
      getData()
      console.log(response.data)
    }).catch(err=>{
    setIsLoadingActions(false)
    OpenToast('خطا','متاسفانه مشکلی پیش آمده لطفا مجددا تلاش کنید',"error")

      console.log(err)
    })

  }
  // console.log(commentsData)
  const [comment, setComment] = useState();
  const [score, setScore] = useState(3);
  const insertComment = async () => {
    if (!getValueFor()) {
      navigation.navigate("AlertScreen");
      return;
    }
    const { data } = await insertCommentService({
      postId: id,
      department: "video",
      comment,
      score,
    });
    if (data.state) {
      setComment("");
      setScore(0);
     
    
      OpenToast("ثبت شد", "نظر شما با موفقیت ثبت شد");
    }
  };
 
  return (
    <>
      {commentsData?.comments?.length > 0 ? (
        <ScrollView nestedScrollEnabled style={{ maxHeight: 400 }}>
        {
        showModal && showEditModal == false ?<View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0, 0, 0, 0.67)",position:"absolute",top: 0,left:0,zIndex: 999,paddingHorizontal: RFPercentage(2)}}>
        <View style={{width: "100%",padding:10,backgroundColor:"rgba(34, 34, 34, 1)",borderRadius: 8}}>
          <TouchableOpacity onPress={()=>{
            setShowEditModal(true)
            setShowModal(false)
          }} style={{width:"100%",marginTop: 8,backgroundColor:"rgba(54, 54, 54, 1)",padding: 10,borderRadius: 10}}>
             <View style={{flexDirection:"row",width:"100%",justifyContent:'flex-end',alignItems:'center'}}>
             <Text style={{color:"white",fontFamily:'vazir',marginHorizontal:6}}>ویرایش</Text>

             <EvilIcons name="pencil" color={'white'} size={RFPercentage(2.5)}/>
             </View>
          </TouchableOpacity>  
          <TouchableOpacity onPress={deleteMsgFunc} style={{width:"100%",marginTop: 8,backgroundColor:"rgba(229, 40, 85, 1)",padding: 10,borderRadius: 10}}>
            
            {
              isLoadingAcions?<ActivityIndicator color={'white'} size={18} />: <View style={{flexDirection:"row",width:"100%",justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={{color:"white",fontFamily:'vazir',marginHorizontal:8}}>حذف</Text>
 
              <AntDesign name="delete" color={'white'} size={RFPercentage(2.5)}/>
              </View>

            }
            
                        </TouchableOpacity>  

          <TouchableOpacity onPress={()=>{
            setShowModal(false)
          }} style={{width:"100%",marginTop: 50,backgroundColor:"rgba(149, 97, 226, 1)",padding: 10,borderRadius: 10,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"white",fontFamily:'vazir'}}> انصراف </Text>
          </TouchableOpacity>  
          
        </View>
      </View>:null
      }

{
        showModal==false && showEditModal  ?<View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0, 0, 0, 0.67)",position:"absolute",top: 0,left:0,zIndex: 999,paddingHorizontal: RFPercentage(2)}}>
          <View style={{justifyContent:"flex-end",width:"100%",flexDirection:"row"}}>
            <TouchableOpacity onPress={()=>{
              setShowEditModal(false)
              setShowModal(true)

            }} style={{flexDirection:'row',alignItems:'center',marginBottom:15}}>
            <Text style={{color:"white",fontFamily:"vazir"}}>منو</Text>

            <AntDesign name="arrowright" size={RFPercentage(2)} color={'white'} style={{marginHorizontal:4}}/>
            </TouchableOpacity> 
          
          </View>
        <View style={{width: "100%",padding:10,backgroundColor:"rgba(34, 34, 34, 1)",borderRadius: 8}}>
         <TextInput onChangeText={text=> setEditText(text)} style={{width:"100%",backgroundColor:"#171717",borderRadius:7,fontFamily:"vazir",color:"white",paddingHorizontal:7}} editable  multiline numberOfLines={5} placeholder="متن نظر" placeholderTextColor={'gray'}/>

          <TouchableOpacity onPress={EditComment} style={{width:"100%",marginTop: 50,backgroundColor:"rgba(149, 97, 226, 1)",padding: 10,borderRadius: 10,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"white",fontFamily:'vazir'}}> ویرایش </Text>
          </TouchableOpacity>  
          
        </View>
      </View>:null
      }

          <FlatList
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            data={Data}
            renderItem={({ item }) => (
             <Pressable onLongPress={async ()=>{
              console.log(user._id)
              console.log('========================')
              console.log(item.creator._id)
              
              if(user._id == item.creator.userId._id){
                setCurrentComment(item)
                setShowModal(true)
              }else{
                Clipboard.setStringAsync(`${item.comment}`)
              }
             

             
             }}>
               <SpaceStyle bottom={10} >
                <CustomCard styles={{ borderRadius: 20,backgroundColor:"black",borderBottomColor:"#121212",borderBottomWidth:0.8 }}>
                  <View style={{ width: width - 35 }}>
                    <SpaceStyle>
                      <CustomCard styles={{backgroundColor:"black"}}>
                        <SpaceBetween>
                          <CustomText color={lightTextColor}>
                            {item?.createdAt}
                          </CustomText>
                          <View>
                            <Row>
                              <View style={{ marginRight: 5 }}>
                                <CustomText>{item?.creator?.fullName}</CustomText>
                                <Rating
                                  ratingCount={5}
                                  ratingColor={yellowColor}
                                  ratingBackgroundColor="#ffffff"
                                  readonly
                                  startingValue={item?.score}
                                  tintColor={cardColor}
                                  imageSize={15}
                                  style={{ paddingVertical: 10 }}
                                />
                              </View>
                              <CustomImage
                                aspect={1 / 1}
                                width={8}
                                radius={80}
                                image={item?.creator?.userId?.profileImage}
                                linkUserId={item?.creator?.userId?._id}
                              />
                            </Row>
                          </View>
                        </SpaceBetween>
                        <SpaceStyle top={10}>
                          <CustomText color={colors.lightTextColor} lines={100}>
                            {item?.comment}
                          </CustomText>
                        </SpaceStyle>
                      </CustomCard>
                    </SpaceStyle>
                  </View>
                </CustomCard>
              </SpaceStyle>
             </Pressable>
            )}
          />
        </ScrollView>
      ) : (
        <View style={styles.cardContainer}>
          <CustomText>نظری وجود ندارد</CustomText>
        </View>
      )}
    </>
  );
};
export default CommentsComponent;
