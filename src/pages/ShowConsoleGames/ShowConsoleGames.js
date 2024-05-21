import React, { useState , useCallback,useEffect} from "react";
import {View,FlatList,Image,Text,TouchableOpacity, Dimensions,ToastAndroid} from 'react-native'
import ConsoleGames from "../../components/ConsoleGames/ConsoleGames";
import { LOAD_FILE } from "../../service/APIs";
import { consoleGameAPI } from "../../service/APIs"
import axios from "axios"
import CustomText from "../../components/text/CustomText";
import PublicPageHeader from "../../components/share/PublicPageHeader";

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
import { RFPercentage } from "react-native-responsive-fontsize";
import { useTheme } from "react-navigation";
  
const ShowConsoleGames = ({route,navigation})=>{
  
    const showToast = () => {
        ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
      };
    const [consoleGames,setConsole] = useState([])
    const [isRefresh,setIsRefresh] = useState(false)
    const [fillters, setFillters] = useState({
      pageId: 1,
      eachPerPage: 20,
      categoryId: route.params.cid ? route.params.cid : "",
      sort: route.params.sort ? route.params.sort : "_id",
  });
  const filterData = useCallback((input) => {
    const filtered = consoleGames.filter(item => item.title.includes(input));
    // setShowData(filtered);
}, [consoleGames]);
    const [isLoading,setIsLoading] = useState(false)
    let count = 0;
    let isWorked = false;
    const getConsoleGames = useCallback(async()=>{
        setIsLoading(true)

        await axios.get(consoleGameAPI).then(response=>{
            if(response.data.data.games.length>0){
                setConsole(response.data.data.games)

            }
            setIsLoading(false)
            
            
        }).catch((err)=>{
            showToast('مشکلی پیش آمده لطفا دوباره سعی کنید')

        })
    })
    useEffect(()=>{
        getConsoleGames()
    },[]) 
    return(
        <View style={{flex:1}}>
        {/* <ConsoleGames navigation={navigation} title={route.params.data.title} depertment="Games" filterData={''} /> */}
        <PublicPageHeader title={'بازی های کنسول'} department={'Game'}  filterData={filterData}/>

      {
        isLoading? <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

            <PacmanIndicator color="white" size={RFPercentage(8)} />
           
        </View>:  <FlatList
      
       
        keyExtractor={(item,index) => index}
        data={consoleGames}
        nestedScrollEnabled={true}
        numColumns={3}
        key={3}
        onRefresh={getConsoleGames}
        refreshing={isRefresh}
        // onEndReached={getMor}
    
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
       style={{flex:1}}
        renderItem={({ item }) => (
        // //  <Text>
        // //   {
        // //     `${item.image}`
        // //   } 
        //  </Text>
         <TouchableOpacity style={{width:"33%",padding:5,marginTop:10,justifyContent:"center",alignItems:"center"}} activeOpacity={0.8} onPress={() => {
            count++;
            setTimeout(async () => {
              if (count > 1 && !isWorked) {
                await addRunCountService(item?._id);
                await gameLinkMaker(item, navigation);
    
                isWorked = true;
              } else if (count <= 1 && !isWorked) {
                navigation.navigate("Game Post", { id: item._id });
                isWorked = true;
              }
            }, 300);
            setTimeout(() => {
              isWorked = false;
              count = 0;
            }, 500);
          }}>
            
           <Image source={{uri:`${LOAD_FILE}${item.image}`}} style={{width:"100%",height:150,borderRadius:8,marginHorizontal:6}}/>
           <CustomText style={{color: 'white',marginTop:4}}>
            {item.title}
           </CustomText>
         </TouchableOpacity>
        )}
      />
      }
        </View>
    )
}

export default ShowConsoleGames