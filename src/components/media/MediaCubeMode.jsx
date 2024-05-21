import { View, Text, Dimensions, StyleSheet, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React from 'react'
import CustomImage from '../CustomImage/CustomImage'
import { Row, SpaceBetween } from '../../style/uiUtil'
import CustomText from '../text/CustomText'
import { Icon } from '../../appsetting/icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Clipboard from 'expo-clipboard'
import { RootContext } from "../../context/RootContext";
import { OpenToast } from "../../components/share/OpenToast";
import { getValueFor } from "../../appsetting/storeConfig";
import MarqueeView from '@aitfakirali/react-native-marquee';


export default function MediaCubeMode({ title, icon, data, desc, navigate, colors }) {
    const deleteMsgFunc = ()=>{
        console.log('tokennnnn ',getValueFor())
        console.log('current comment is : ',currentComment._id)
        setIsLoadingActions(true)
        axios.post(`https://lifelands.ir/api/v1/comment/delete`,{
        
          commentId: currentComment._id
        
        },{
          headers:{token:  getValueFor() }
        }).then(response=>{
          setIsLoadingActions(false)
          OpenToast("انجام شد","نظر شما با موفقیت حذف شد","success")
    
          console.log(response.data)
        }).catch(err=>{
        setIsLoadingActions(false)
        OpenToast('خطا','متاسفانه مشکلی پیش آمده لطفا مجددا تلاش کنید',"error")
    
          console.log(err)
        })
    
      }
    const width = Dimensions.get("window").width;
    const navigation = useNavigation();
    const getDepartment = (url)=>{
        return url.split('/')[0] == "youtube"?"video": url.split('/')[0]
      }

    return (
        <LinearGradient
            colors={colors}
            style={{ borderRadius: 15 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <View style={{ height: 200, width: "100%" }}>
                <View>
                    <SpaceBetween>
                        <View style={{ marginTop: 15, marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
                                <View style={styles.openContentBtn}>
                                    <Icon
                                        dark={require("../../../assets/icons/arrow-left.png")}
                                        light={require("../../../assets/icons/arrow-left.png")}
                                        style={{ width: 16, height: 16, marginTop: 5 }}
                                    />
                                    <CustomText fontSize={14}>ورود</CustomText>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 15, marginRight: 5 }}>
                            <View style={styles.title}>
                                <CustomText style={{ marginRight: 80, marginTop: 5 }} fontSize={15}>{title}</CustomText>
                                <Icon
                                    dark={icon}
                                    light={icon}
                                    style={{ width: 70, height: 70, position: "absolute", right: 5, top: -30 }}
                                />
                            </View>
                        </View>
                    </SpaceBetween>
                    <MarqueeView    speed={0.2} style={{width:"100%",height:110,marginTop: 5}} onEnd={()=>{
                        console.log('ened')
                    }} >
                        <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
                            {
                                data.map(item=>{
                                    return (
                                        <Pressable onPress={()=>{
                                            if(getDepartment(item.image) == 'video'){ 
                                                navigation.navigate('Video Post',{id: item._id})
                                
                                
                                              }else if (getDepartment(item.image) == 'paint'){
                                                navigation.navigate("Paint Viewer", { id: item._id });
                                
                                              }else if(getDepartment(item.image) == 'book'){
                                                navigation.navigate("Book Post", { id: item._id })
                                
                                              }else if(getDepartment(item.image) == 'game'){
                                                navigation.navigate("Game Post", { id: item._id })
                                
                                              }
        
                                        }}   style={[styles.cubeImgContainer, { backgroundColor: "transparent" }]}>
                                            <CustomImage
                                                image={item?.image}
                                                width={50}
                                                height={60}
                                                radius={3}
                                                selfCenter
                                            />
                                            <View>
                                                
                                                <CustomText selfCenter lines={2} style={{ fontSize: 9, marginTop: 0, width: 50, textAlign: "center" }}>{item?.title || "ggg"}</CustomText>
                                            </View>
                                        </Pressable >
                                    )
                                })
                            }
                        </View>
                    {/* <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            inverted={true}
                            automaticallyAdjustContentInsets
                            keyExtractor={(item) => item._id}
                            data={data}
                            renderItem={({ item }) => (
                               
                            )}
                        /> */}
        </MarqueeView>
                    <View style={styles.descriptionsCard}>
                    <MarqueeView
                    loop={-1}
                    isLTR={true}
                    speed={0.1}
                    
          style={{
            height: 20,
        
            width: '100%',
            color:"white",
            fontFamily:'vazir',
            
            
            
          }}
          

          onEnd={()=>{
            console.log('end')
          }}
        >
                                 <Text style={{color:'white',fontFamily:"vazir",fontSize:11}}>{desc}</Text>

          
        </MarqueeView>
                    </View>
                    {/* <View style={styles.badgeCardWrapper}>
                        <View style={[styles.badgeCard, { marginRight: 5 }]}>
                            <CustomText>0</CustomText>
                            <Icon
                                dark={require("../../../assets/icons/eye.png")}
                                light={require("../../../assets/icons/eye.png")}
                                style={{ width: 14, height: 14, marginTop: 1, marginLeft: 3 }}
                            />
                        </View>
                        <View style={styles.badgeCard}>
                            <CustomText>0</CustomText>
                            <Icon
                                dark={require("../../../assets/icons/eye.png")}
                                light={require("../../../assets/icons/eye.png")}
                                style={{ width: 14, height: 14, marginTop: 1, marginLeft: 3 }}
                            />
                        </View>
                    </View> */}
                </View>
            </View>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
    },
    titleContainer: {

    },
    openContentBtn: {
        flexDirection: "row", backgroundColor: "#FFFFFF40", paddingHorizontal: 20, paddingVertical: 5, borderRadius: 100
    },
    cubeImgContainer: {
        backgroundColor: "#3E4148",
        borderRadius: 8,
        height: 100,
        marginHorizontal: 18,
        width: 30,
        marginTop: 5,
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center",
    },
    descriptionsCard: {
        marginTop: 0, marginRight: 10, marginLeft: 10, backgroundColor: "#17181A40", padding: 5, paddingHorizontal: 10, borderRadius: 50
    },
    badgeCardWrapper: {
        flexDirection: "row", justifyContent: "flex-start", marginTop: 7, marginLeft: 10
    },
    badgeCard: {
        flexDirection: "row", backgroundColor: "#17181A40", borderRadius: 5, padding: 4, paddingHorizontal: 20
    }
})