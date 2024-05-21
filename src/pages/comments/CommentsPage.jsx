import { Fragment, useContext, useEffect, useState } from "react";
import { FlatList, ScrollView, StatusBar, TouchableOpacity, View ,Text,Dimensions,ActivityIndicator,TextInput} from "react-native";
import CommentItem from "../../components/comment/CommentItem";
import HeaderComponent from "../../components/layout/HeaderComponent";
import PageWrapper from "../../components/loading/PageWrapper";
import CustomText from "../../components/text/CustomText";
import { getAllCommentsService } from "../../service/CommentService";
import SpaceStyled from "../../style/SpaceStyle";
import * as Clipboard from 'expo-clipboard'
import NavbarSh from "../../components/NavbarComponent";
import GoBack from "../../components/GoBack";
import NotifcationBell from '../../components/NotifcationBell'
import { RootContext } from "../../context/RootContext";
import { RFPercentage } from "react-native-responsive-fontsize";
import { getValueFor } from "../../appsetting/storeConfig";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { OpenToast } from "../../components/share/OpenToast";
import axios from "axios";
const CommentsPage = ({ navigation, route }) => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [expandeComment, setExpandComment] = useState();
  const [currentComment,setCurrentComment] = useState()
  const [isLoadingAcions,setIsLoadingActions] = useState(false)
  const {user} = useContext(RootContext)
  const [editeText,setEditText] = useState('')
  
  const [showModal,setShowModal] = useState(false)
  const [showEditModal,setShowEditModal] = useState(false
  )
  const [comments, setComments] = useState([]);
  const [isFinishPages, setIsFinishPages] = useState(false);
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

  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue: "",
    department: route?.params?.department || "game",
  });
  useEffect(() => {
    getData();
  }, [filter]);

  const getData = async (isRefresh) => {
    if (isRefresh) {
      setFilter({
        pageId: 1,
        eachPerPage: 12,
        searchValue: "",
        department: route?.params?.department || "game",
      });
      setComments([]);
      setIsFinishPages(false);
      setIsLoadingState(true);
    }
    let {
      data: { data: res },
    } = await getAllCommentsService(filter);
    let mergeLists = res.comments.concat(comments);

    setIsFinishPages(res?.comments?.length === 0);
    setComments(mergeLists);
    setIsLoadingState(false);
  };
 

  return (
    <View style={{ paddingBottom: 100 }}>
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

        <StatusBar hidden={false} />
     <NavbarSh rightChile={<View style={{flexDirection:"row",alignItems:"center"}}>
      <Text style={{color:"white",fontFamily:"vazir",marginHorizontal: 8}}>نظرات</Text>
      <GoBack />
     </View>} />
     <ScrollView>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{ alignSelf: "center" }}
            keyExtractor={(item) => item._id}
            data={comments}
            renderItem={({ item }) =>
          {
            if(item.comment){
              return (
                <TouchableOpacity onLongPress={()=>{
                  console.log(user._id)
                  console.log('========================')
                  console.log(item.creator._id)
                  if(user._id == item.creator.userId._id){
                    setCurrentComment(item)
                    setShowModal(true)
                  }else{
                    Clipboard.setStringAsync(`${item.comment}`)
                  }
                
                  console.log('long is actived')
                 
                 }} style={{width:"100%",zIndex: 10}}>
                   <CommentItem
                    expandeComment={expandeComment}
                    setExpandComment={setExpandComment}
                    item={item}
                  />
                 </TouchableOpacity>
              )
            }else{
              return null
            }
          }
          }
          />
          {isFinishPages ? (
            <>
              <CustomText style={{ alignSelf: "center" }}>
                تموم شد :(
              </CustomText>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setFilter({ ...filter, ...{ pageId: filter.pageId + 1 } });
              }}
            >
              <CustomText style={{ alignSelf: "center" }}>
                {" "}
                بیشتر نشونم بده...
              </CustomText>
            </TouchableOpacity>
          )}
        </ScrollView>
    </View>
  );
};
export default CommentsPage;
