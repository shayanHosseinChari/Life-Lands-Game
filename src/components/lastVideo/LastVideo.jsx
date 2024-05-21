import react, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
// import { AntDesign, Entypo } from "react-native-vector-icons";
import Theme from "../../Theme/Theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LOAD_FILE, LOAD_WEBGL } from "../../service/APIs";
import CustomText from "../text/CustomText";
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import ToLocaleString from "../../../Composables/ToLocaleString";



const LastVideo = (props) => {
    let mode = props.mode
    const [counter,setCounter] = useState(10)

    let checkIsWebp = (name)=>{
        if(name.split('.')[1] == 'webp'){
            return true
        }else{
            return false
        }}

  // const [data, setData] = useState(props.books);
  const [data,setData] = useState([
    {
    _id:1,
    
  }
])

  let createArray = (count) => {
    let couner = Math.ceil(count);
    let arrayForReturn = [];
    for (var i = 0; i < couner; i++) {
      arrayForReturn.push(i);
    }
    
    return arrayForReturn;
  };
  
  return (
    <FlatList
      style={{
        // width:Dimensions.get('screen').width,
        paddingHorizontal: RFPercentage(0),
        marginHorizontal: "auto",
        height:Dimensions.get('window').height,
        marginTop: 10,
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
      data={props.books}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <View style={Styles.container}>
            <View style={[Styles.rowReverse,Styles.between,{paddingHorizontal:6,alignItems:"center"}]}>
              <View style={[Styles.row,Styles.alignCenter]}>
             <View>
             <Text style={{color:"white",fontFamily:'vazir',marginHorizontal:6}}>مولود مکوند</Text>
             <Text style={{color:"white",fontFamily:'vazir',marginHorizontal:6,fontSize:10,opacity:0.6}}> @molud.makvand</Text>
             </View>

                <Image source={require('../../../assets/sega.jpg')} style={[Styles.radius100,{width:40,height:40}]} />
              </View>
              <TouchableOpacity style={[Styles.justifyCenter,{width:65,borderRadius:7,justifyContent:"center",alignItems:"center",height:25,backgroundColor: Theme.tabBarActiveIconColor}]}>
                <Text style={{color:'white'}}>Follow</Text>
              </TouchableOpacity>
            </View>
            <Image source={{uri: `${LOAD_FILE}${item.image}`}} style={{width:'100%',
          height:240,objectFit:"cover",marginTop:8}} />
          <View style={[Styles.row,Styles.between]}>
            <View style={[Styles.row,{alignItems:"center",paddingHorizontal:6,marginTop:7}]}>
              {
                item.isLike.length > 0 ?<TouchableOpacity>
                <AntDesign name="heart" color={'red'}  size={20}/>
            </TouchableOpacity>:<TouchableOpacity>
                  <AntDesign name="hearto" color={'white'}  size={20}/>
              </TouchableOpacity>
              }
              <TouchableOpacity style={{marginHorizontal:16}}>
                <Fontisto name="comment" color={'white'} size={17} />
              </TouchableOpacity>
            
            </View>
            <TouchableOpacity style={[Styles.row,{alignItems:"center",paddingHorizontal:6,marginTop:7}]}>
                <FontAwesome name="bookmark" color={'white'} size={20} />
              </TouchableOpacity>
          </View>
          <View style={{marginTop:4,paddingHorizontal:6}}>
            {
              item.like?<Text style={{color:"white",fontFamily:"vazir"}}>{ToLocaleString(Number(item.like))} پسند</Text>:null
            }
            <View style={{flexDirection:"row",flexWrap:"wrap"}}>
              <Text style={{color:'white',fontWeight:"900",marginLeft:8}}>@Molud.makvand</Text>
              <View>
              <Text style={{color:'white',fontFamily:"vazir"}}>{item.title}</Text>

              <CustomText style={{alignItems:'center',justifyContent:"center",display:"flex",color:'white',fontFamily:"vazir",fontSize:11}}>

                {
                  item.department == 'book'? item.summary : item.description
                }
          
     
</CustomText>

         </View>
              
              
            </View>
           {
            item.comments.length > 0? <TouchableOpacity >
            <Text style={{color:"#4b4b4b",fontFamily:"vazir",fontSize:12,marginTop:5}}>مشاهده ی همه {ToLocaleString(item.comments.length)} نظر</Text>
          </TouchableOpacity>: null
           }
            {
          item.tags?<View style={{width:'100%',marginTop:8,flexDirection:"row",justifyCenter:"center", flexWrap: "wrap",justifyContent:"flex-end"}}>
          {
             item.tags.map(item=>{
               return (
                 <Text style={{color:"white",opacity: 0.4,fontSize: 11,marginHorizontal: 4,fontFamily:'vazir'}}>#{item}</Text>
               )
             })
           }
          </View>:null
         }
            <Text style={{color:"#4b4b4b",fontFamily:"vazir",fontSize:10,marginTop:1}}> {item.createdAt}</Text>
          </View>
        
          
         
          </View>
        );
      }}
    />
  );
};

const Styles = StyleSheet.create({
  container: {
    width: "100%",
   
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,

    marginTop: 20,
  },
  justifyCenter:{
    justifyContent:'center'
  },
  col:{
    flexDirection:"col"
  },
  row:{
    flexDirection:'row'
  },
  rowReverse:{
    flexDirection:'row-reverse'
  }
  ,
  between:{
    justifyContent:"space-between"
  },
  alignCenter:{
    alignItems:"center"
  },

  radius100:{
    borderRadius:200
  }
  ,
  description: {
    paddingHorizontal: RFPercentage(1),
    paddingVertical: 8,
  },
  footer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: "#5d5d5d",
    borderTopWidth:1,
    padding: 8,
  },
});
export default LastVideo;
