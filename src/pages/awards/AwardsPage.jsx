import { StatusBar, View,StyleSheet,Pressable,Text ,Image} from "react-native";
import HeaderComponent from "../../components/layout/HeaderComponent";
import CustomText from "../../components/text/CustomText";
import {AwardsFilter} from "../../components/AwardsFilter/AwardsFilter";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { cardColor, primaryColor } from "../../appsetting/appsettingColor";
import { TouchableOpacity } from "react-native-web";
// import { AwardsBox } from "../../components/awards/AwardsBox";
const AwardsPage = ({ navigation }) => {
  return (
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
      <HeaderComponent
    
        hasBack={true}
        navigation={navigation}
        title={"Awards"}
        isLarge={true}
      />
      <View
        style={{
         flex:1,
        }}
      >
                  {/* <AwardsBox image={require('../../../assets/crown.png')} /> */}

        <AwardsFilter items={['انتخاب بازی ','LifeLands','Cubes','Spiners']} router={navigation}/>
        <SearchBox searcHandler={()=>console.log('hello world')}/>
        <View style={{paddingHorizontal:RFPercentage(2),flexDirection:"row"}}>
        <Pressable style={{width:'30.333336%',borderColor:primaryColor,borderWidth:1,backgroundColor:cardColor,borderRadius:10,marginTop:20,marginHorizontal:5}}>
           <View style={Styles.awardBoxHeader}>
           <View style={{marginVertical:6,width:"100%",justifyContent:"center",alignItems:"center"}}>
           <Image source={require('../../../assets/crown.png')} style={{width:"80%",height:50}}/>
           
           </View>
           <Text style={{fontFamily:"vazir",fontSize:RFPercentage(1.7),color:'white'}}>عنوان</Text>
           

           </View>
     
           <View style={Styles.devider}></View>
           <View style={{width:"100%",flexDirection:"row",padding:10,justifyContent:'space-between',marginTop:5}}>
            <View style={{flex:1,alignItems:"center",flexDirection:"row-reverse"}}>
              <Image source={require('../../../assets/sega.jpg')} style={{width:20,height:20,borderRadius:100}} />
              <View>
                <Text style={{fontFamily:"vazir",fontSize:RFPercentage(1.4),marginRight:5,color:"#cecece"}}>بازی سگا</Text>
               <View style={{
                flexDirection:"row",
                marginHorizontal:5,
                marginTop:5,
                alignItems:"center",
                paddingHorizontal:10,
                justifyContent:"space-around"
               }}>
                   <Pressable style={{backgroundColor:primaryColor,flexDirection:'row',paddingHorizontal:4,paddingTop:2,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontFamily:"vazir",color:"white",fontSize:RFPercentage(1.4)}}>جزِییات</Text>

                </Pressable>
              <View style={{width:"100%",flexDirection:"row-reverse",alignItems:"center"}}>
              <AntDesign name="user" size={RFPercentage(1.3)} color={primaryColor} />
                <Text style={{fontFamily:'vazir',fontSize:RFPercentage(1.3),marginHorizontal:2,color:primaryColor}}>
                  1k
                </Text>
               
              </View>
             
             

               </View>
                
              </View>
            </View>
           </View>
        </Pressable>
        <Pressable style={{width:'30.333336%',borderColor:primaryColor,borderWidth:1,backgroundColor:cardColor,borderRadius:10,marginTop:20,marginHorizontal:5}}>
           <View style={Styles.awardBoxHeader}>
           <View style={{marginVertical:6,width:"100%",justifyContent:"center",alignItems:"center"}}>
           <Image source={require('../../../assets/crown.png')} style={{width:"80%",height:50}}/>
           
           </View>
           <Text style={{fontFamily:"vazir",fontSize:RFPercentage(1.7),color:'white'}}>عنوان</Text>
           

           </View>
     
           <View style={Styles.devider}></View>
           <View style={{width:"100%",flexDirection:"row",padding:10,justifyContent:'space-between',marginTop:5}}>
            <View style={{flex:1,alignItems:"center",flexDirection:"row-reverse"}}>
              <Image source={require('../../../assets/sega.jpg')} style={{width:20,height:20,borderRadius:100}} />
              <View>
                <Text style={{fontFamily:"vazir",fontSize:RFPercentage(1.4),marginRight:5,color:"#cecece"}}>بازی سگا</Text>
               <View style={{
                flexDirection:"row",
                marginHorizontal:5,
                marginTop:5,
                alignItems:"center",
                paddingHorizontal:10,
                justifyContent:"space-around"
               }}>
                   <Pressable style={{backgroundColor:primaryColor,flexDirection:'row',paddingHorizontal:4,paddingTop:2,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontFamily:"vazir",color:"white",fontSize:RFPercentage(1.4)}}>جزِییات</Text>

                </Pressable>
              <View style={{width:"100%",flexDirection:"row-reverse",alignItems:"center"}}>
              <AntDesign name="user" size={RFPercentage(1.3)} color={primaryColor} />
                <Text style={{fontFamily:'vazir',fontSize:RFPercentage(1.3),marginHorizontal:2,color:primaryColor}}>
                  1k
                </Text>
               
              </View>
             
             

               </View>
                
              </View>
            </View>
           </View>
        </Pressable>
        <Pressable style={{width:'30.333336%',borderColor:primaryColor,borderWidth:1,backgroundColor:cardColor,borderRadius:10,marginTop:20,marginHorizontal:5}}>
           <View style={Styles.awardBoxHeader}>
           <View style={{marginVertical:6,width:"100%",justifyContent:"center",alignItems:"center"}}>
           <Image source={require('../../../assets/crown.png')} style={{width:"80%",height:50}}/>
           
           </View>
           <Text style={{fontFamily:"vazir",fontSize:RFPercentage(1.7),color:'white'}}>عنوان</Text>
           

           </View>
     
           <View style={Styles.devider}></View>
           <View style={{width:"100%",flexDirection:"row",padding:10,justifyContent:'space-between',marginTop:5}}>
            <View style={{flex:1,alignItems:"center",flexDirection:"row-reverse"}}>
              <Image source={require('../../../assets/sega.jpg')} style={{width:20,height:20,borderRadius:100}} />
              <View>
                <Text style={{fontFamily:"vazir",fontSize:RFPercentage(1.4),marginRight:5,color:"#cecece"}}>بازی سگا</Text>
               <View style={{
                flexDirection:"row",
                marginHorizontal:5,
                marginTop:5,
                alignItems:"center",
                paddingHorizontal:10,
                justifyContent:"space-around"
               }}>
                   <Pressable style={{backgroundColor:primaryColor,flexDirection:'row',paddingHorizontal:4,paddingTop:2,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontFamily:"vazir",color:"white",fontSize:RFPercentage(1.4)}}>جزِییات</Text>

                </Pressable>
              <View style={{width:"100%",flexDirection:"row-reverse",alignItems:"center"}}>
              <AntDesign name="user" size={RFPercentage(1.3)} color={primaryColor} />
                <Text style={{fontFamily:'vazir',fontSize:RFPercentage(1.3),marginHorizontal:2,color:primaryColor}}>
                  1k
                </Text>
               
              </View>
             
             

               </View>
                
              </View>
            </View>
           </View>
        </Pressable>
        </View>
        
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  awardBoxHeader:{
    width:"100%",
    
      justifyContent:'center',
      alignItems:"center",
      paddingHorizontal:RFPercentage(2)
      ,padding:10
  },
  devider:{
    width:"100%",
    height:1,
    backgroundColor:'gray'
  }
})
export default AwardsPage;
