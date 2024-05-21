import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { mobileRadioPageServer } from '../../service/MobileService';
import HeaderComponent from '../../components/layout/HeaderComponent';
import { ScrollView } from 'react-native';
import PageWrapper from '../../components/loading/PageWrapper';
import SlidersComponent from '../../components/home/SlidersComponent';
import SpaceStyle from '../../style/SpaceStyle';
import { SpaceBetween } from '../../style/uiUtil';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '../../appsetting/icons';
import CustomText from '../../components/text/CustomText';
import RadioComponents from '../../components/radio/RadioComponents';
import DividerComponent from '../../components/share/DividerComponent';
import RadioLastListeners from '../../components/radio/RadioLastListeners';
import RadioPopularChannels from '../../components/radio/RadioPopularChannels';
import RadioPopularPlayLists from '../../components/radio/RadioPopularPlayLists';
import RadioBannerComponent from '../../components/radio/RadioBannerComponent';
import RadioComments from '../../components/radio/RadioComments'
import RadioCategoryComponent from '../../components/radio/RadioCategoryComponent';
import RadioActionComponent from '../../components/radio/RadioActionComponent';
import LazyVideoList from '../../components/lazyLoading/LazyVideoList';
import LazyRadio from '../../components/lazyLoading/LazyRadio';
import AntDesign from 'react-native-vector-icons/AntDesign'
import LazyVideoViewer from '../../components/lazyLoading/LazyVideoViewer';
import LazyRadioViewer from '../../components/lazyLoading/LazyRadioView';
import LazyPoularChanels from '../../components/lazyLoading/LazyPoularChanels';
import axios from 'axios';
import { getValueFor } from '../../appsetting/storeConfig';
const RadioPage = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [newestRadio, setNewestRadio] = useState([])
    const [topRadioChildren, setTopRadioChildren] = useState([])
    const [topPlayRadio, setTopPlayRadio] = useState([])
    const [lastUpdatedRadioChannel, setLastUpdatedRadioChannel] = useState([])
    const [newestRadioChannel, setNewestRadioChannel] = useState([])
    const [slider, setSlider] = useState([])
    const [gameCategory,setGameCategory] = useState()

    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        setIsLoading(true);
        await axios.get('https://lifelands.ir/api/v1/allCategories',{
        headers:{
          token: getValueFor()
        }
      }).then(data=>{
        console.log('caaaattttt',data.data.data.book)
        setGameCategory(data.data.data.voice)
        // OpenToast('sd',data.data.game,'success')
      }).catch(err=>{
        console.log(err)
      })
        const {
            data: { data: res },
        } = await mobileRadioPageServer({
            limitChannel: 30,
        });

        setSlider(res?.slider)
        setNewestRadio(res?.newestRadio)
        setTopRadioChildren(res?.topRadioChildren)
        setTopPlayRadio(res?.topPlayRadio)
        setLastUpdatedRadioChannel(res?.lastUpdatedRadioChannel)
        setNewestRadioChannel(res?.newestRadioChannel)
        setData(res);
        setIsLoading(false);
    };

    return (
        <>
            <HeaderComponent
                navigation={navigation}
                hasBack={true}
                darkIcon={require("../../../assets/icons/radioIcon.png")}
                lightIcon={require("../../../assets/icons/radioIcon.png")}
                searchDepartment="radio"
                hasRightSearch={true}
            />
            <ScrollView style={{width:Dimensions.get('window').width,height: Dimensions.get('window').height}}>
                <SpaceStyle top={20}>
                    <ScrollView nestedScrollEnabled>
                        <SlidersComponent
                            sliders={[
                                { image: require("../../../assets/slider/radio/sr1.webp") },
                                { image: require("../../../assets/slider/radio/sr2.webp") },
                            ]}
                        />
                        
                        <RadioActionComponent navigation={navigation} />
                        <View style={{ marginTop: 20 }} />
                        {/* <RadioComponents navigation={navigation} title={"جدید ترین ها"} radios={newestRadio} /> */}
                        {
            
            isLoading?<>
              <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            flexDirection: "row-reverse",
          }}
        >
          <CustomText
            style={{ color: "white", fontFamily: "vazir", fontSize: 12 }}
          >
       جدید ترین ها
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyRadio />
            </>:              <RadioPopularPlayLists navigation={navigation} title={"جدید ترین ها"} radios={newestRadio} sort="_id"/>

}
                       
                        <DividerComponent title={"آخرین شنوندگان"} colors={["#2D7281", "#58DEFB"]} />
                        {
                        
                        isLoading ? <LazyRadioViewer />:<RadioLastListeners radios={data.lastUpdatedRadioChannel} navigation={navigation} />
                        }

{
            
            isLoading?<>
              <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            flexDirection: "row-reverse",
          }}
        >
          <CustomText
            style={{ color: "white", fontFamily: "vazir", fontSize: 12 }}
          >
          جدید ترین ها
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyRadio />
            </>:             <RadioComponents navigation={navigation} title={"جدید ترین ها"} radios={newestRadio} sort="_id" />

}


{
            
            isLoading?<>
              <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            flexDirection: "row-reverse",
          }}
        >
          <CustomText
            style={{ color: "white", fontFamily: "vazir", fontSize: 12 }}
          >
          محبوب ترین کانال ها
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyPoularChanels />
            </>:             <RadioPopularChannels radios={newestRadioChannel} navigation={navigation} title={"محبوب ترین کانال ها"} />

}

{
            
            isLoading?<>
              <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            flexDirection: "row-reverse",
          }}
        >
          <CustomText
            style={{ color: "white", fontFamily: "vazir", fontSize: 12 }}
          >
         برترین‌ های لالایی
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyRadio /> 
            </>:              <RadioComponents navigation={navigation} title={"برترین‌ های لالایی"} radios={topRadioChildren} cid='645b510c5f4f96c2a1fa1c11'/>

}
                       
                       
                        <View style={{ marginTop: 20 }} />
                        <SlidersComponent
                             sliders={[
                                { image: require("../../../assets/slider/radio/sr1.webp") },
                                { image: require("../../../assets/slider/radio/sr2.webp") },
                            ]}
                        />
                        {
            
            isLoading?<>
              <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            flexDirection: "row-reverse",
          }}
        >
          <CustomText
            style={{ color: "white", fontFamily: "vazir", fontSize: 12 }}
          >
         پیشنهادی برای شما
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="left" color={"white"} size={12} />
          </View>
        </View>
        <LazyRadio />
            </>:               <RadioComponents navigation={navigation} title={"پیشنهادی برای شما"} radios={newestRadio} />

}
                       
                        {/* <RadioComponents navigation={navigation} title={"برترین‌های ..."} radios={data.lastUpdatedRadioChannel} /> */}
                        <RadioBannerComponent navigation={navigation}
                            radios={
                                topPlayRadio
                            }
                        />
                        {/* <RadioComments comments={data.lastUpdatedRadioChannel} /> */}
                        {
            gameCategory?<View style={{width:"100%",flexDirection:"row",marginBottom:20,alignItems:'center',justifyContent:"center",flexWrap:'wrap',marginTop: 20}}>

              {
                gameCategory.map(item=>{
                  return(
                    <TouchableOpacity onPress={() => navigation.navigate('Public Page', { mode: "Voice Post", title: item.title, cid: item._id })} style={{marginHorizontal:4,backgroundColor:'#1f1f1f',opacity:0.7,marginTop:3,justifyContent:'center',alignItems:'center',paddingHorizontal:6,paddingVertical:2.5,borderRadius:4}}>
                      <Text style={{color:"white",fontFamily:"vazir"}}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>:null
          }
                        {/* <RadioCategoryComponent navigation={navigation} title={"دسته بندی"} /> */}
                    </ScrollView>
                </SpaceStyle>
            </ScrollView >
        </>
    )
}

export default RadioPage
const styles = StyleSheet.create({
    itemContainer: {
        width: 65,
        heigh5: 80,
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",
        textAlign: "center",
    },
});
