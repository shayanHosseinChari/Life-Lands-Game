import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView ,StyleSheet,Image,Text,TouchableOpacity} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import { RootContext } from "../../context/RootContext";
import SpaceStyle from "../../style/SpaceStyle";

import SlidersComponent from "../../components/home/SlidersComponent";
import TournamentAction from "../../components/tournament/TournamentAction";
import DividerComponent from "../../components/share/DividerComponent";
import DoubleSlider from "../../components/tournament/DoubleSlider";
import LazyPoularChanels from '../../components/lazyLoading/LazyPoularChanels'
import {LazyList} from '../../components/lazyLoading/LazyList'
import axios from 'axios'
import { getValueFor } from "../../appsetting/storeConfig";
import { LOAD_FILE } from "../../service/APIs";
import CustomText from "../../components/text/CustomText";
import CustomImage from "../../components/CustomImage/CustomImage";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { StatusBar } from "expo-status-bar";
import NavbarSh from "../../components/NavbarComponent";
import GoBack from "../../components/GoBack";
// import { Icon } from "@rneui/themed";
const TournamentPage = ({ navigation }) => {
  const { user } = useContext(RootContext);
  const [isLoading, setIsLoading] = useState(true);
  const [mostPlayedPlayers,setMostPlayedPlayers] = useState([])
  const [dataT, setData] = useState([]);
  let count = 0;
    let isWorked = false;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log('tokennn ',getValueFor())
    setIsLoading(true);
    console.log(getValueFor())
    await axios.get('https://lifelands.ir/api/v1/mobile/wars',{
      headers:{
        token : `${getValueFor()}`
      }
    }).then(res=>{ 
      console.log('dataaaaaaaaa',res.data.data.lastGameYouPlayed)
      setMostPlayedPlayers(res.data.mostPlayedPlayers)
      setData(res.data)

    })
    setIsLoading(false);
  };

  return (
    <View isLoadingState={isLoading} style={{paddingTop: 30,width: Dimensions.get('window').width,height: Dimensions.get('window').height}}>
     <StatusBar hidden={false} backgroundColor="black"/>
     <NavbarSh rightChile={<View style={{flexDirection:"row"}}>
      <Text style={{color:"white",fontFamily:"vazir",marginHorizontal:8}}>رقابت ها</Text>
      <GoBack />
     </View>} />
      <ScrollView>
        <View>
          <View style={{ height: 10 }} />
          <SlidersComponent
            sliders={[
              { image: require("../../../assets/slider/game/sg1.webp") },
              { image: require("../../../assets/slider/game/sg2.webp") },
            ]}
          />
          <TournamentAction />
          <DividerComponent title={"بیشترین رقابت کننده ها"} colors={["#B539E1", "#39BECD"]} />
          {
            isLoading? <LazyPoularChanels />: <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            inverted={true}
            keyExtractor={(item) => item.userId._id}
            data={dataT.data.mostPlayedPlayers}
            renderItem={({ item }) =>  <TouchableOpacity activeOpacity={0.8} onPress={()=>{
              console.log(item)
              // navigation.navigate('Public Profile Page',{userId : item.userId._id})
            }} style={[style.container, { backgroundColor: "transparent" }]}>
            <View style={{width:65,height:65,position:'relative'}}>
            <Image
            source={{uri: `${LOAD_FILE}${item?.userId.profileImage}`}}
            style={{width:65,height:65,borderRadius:100}}
                
            />
            {
            
            item.userId.isActive?<View style={{ position: "absolute", bottom: 0, left: 5, width: 15, height: 15, borderRadius: 4554, borderWidth: 2, borderColor: "#17181A", backgroundColor: "#00B7AC" }} />:null
            }
            </View>
                        
            <View style={{flexDirection:'row',alignItems:"center"}}>
            <Text style={{color:"white",fontFamily:"vazir",fontSize: RFPercentage(1.1),marginHorizontal: 5}}>
                 {item.userId.lastName}
                </Text>
                <Text style={{color:"white",fontFamily:"vazir",fontSize: RFPercentage(1.1),}}>
                    {item.userId.firstName} 
                </Text>
                
            </View>
            <Text style={{color:"white",opacity: 0.7,fontSize: RFPercentage(1.5)}}>@{item.userId.userName}</Text>
        </TouchableOpacity >}
          />
          }
        </View>
        {
          isLoading?<LazyList/>:<DoubleSlider
          title="رقابت های انجام شده"
          items={dataT.data.lastGames} />
        }
        
        {/* {
          isLoading?<LazyBookReaders />:<DoubleSlider
          title="رقابت های انجام شده"
          items={dataT.lastGames} />
        } */}
      
       {
        isLoading ? <LazyList />:  <SpaceStyle top={20}>
         <SpaceBetween>
            <SpaceStyle left={10} bottom={10}>
              <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}} onPress={()=>{
                navigation.navigate('Tournament Public Page',{data:{title:"بازی های رقابتی",isGame:true,data: dataT.data.competitionsGame}})
              }}>
              <AntDesign name="arrowleft" color={'white'} size={RFPercentage(1.5)} />

                <Text style={{color:"white",fontFamily:"vazir",marginHorizontal:4}}>بیشتر</Text>
              </TouchableOpacity>
            </SpaceStyle>
            <SpaceStyle right={10} bottom={0}>
                <CustomText fontSize={14}>
                بازی های رقابتی
                </CustomText>
            </SpaceStyle>
        </SpaceBetween>
        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            inverted={true}
            keyExtractor={(item) => item._id}
            data={dataT.data.competitionsGame}
            renderItem={({ item }) =>  <TouchableOpacity
            onPress={() => {
           navigation.navigate("Make Room Page", { gameId: item?._id });
                
            }}
        >
            <View style={{ width: 120, height: 150, marginLeft: 5, marginRight: 5, position: "relative" ,justifyContent:"center",alignItems:"center"}}>
            
                <CustomImage
                    aspect={1 / 1}
                    width={120}
                    height={110}
                    radius={8}
                    image={item.image}
                    resizeMode={"cover"}
                    styles={{ position: "absolute", top: 0, zIndex: 20 }}
                />
                <CustomText style={{marginTop: 120}}>
                    {item.title}
                    
                </CustomText>
                
            </View>
        </TouchableOpacity>}
        />
    </SpaceStyle>
       }
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
      backgroundColor: "#3E4148",
      borderRadius: 8,
      height: 120,
      marginHorizontal: 10,
      width: 70,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
  },
});
export default TournamentPage;
