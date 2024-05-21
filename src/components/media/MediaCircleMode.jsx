import { View, Text, Dimensions, StyleSheet, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomImage from '../CustomImage/CustomImage'
import { Row, SpaceBetween } from '../../style/uiUtil'
import CustomText from '../text/CustomText'
import { Icon } from '../../appsetting/icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
// import { LazyList } from '../lazyLoading/LazyList'
// import { Marquee } from '@animatereactnative/marquee';
import MarqueeView from '@aitfakirali/react-native-marquee';

export default function MediaCircleMode({ title, icon, data, desc, navigate, colors,isLazy, categories }) {

    const width = Dimensions.get("window").width;
    const navigation = useNavigation();
    const [lazyLoading,setLazyLoading] = useState(isLazy);
    console.log(lazyLoading)
    const getDepartment = (url)=>{
        if(url){
            if(url.split('/')[0] == "youtube"){
                return "video"
            }else if(url.split('/')[0] == "playlist"){
                return "playlist"
            }else{
                url.split('/')[0]
            }
        }else{
            return 12
        }
        
      }
    return (
        <LinearGradient
            colors={colors}
            style={{ borderRadius: 15 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <View style={{ height: 200, width: '100%', position: 'relative' }}>
                <View>
                    <SpaceBetween>
                        <View style={{ marginTop: 15, marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate(navigate,{category:categories})}>
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
                    <Row styles={{ marginTop: 11, paddingHorizontal: 5 }}>
                    <MarqueeView    speed={0.2} style={{width:"100%",height:100,marginTop: 5}} onEnd={()=>{
                        console.log('ened')
                    }} >
                        <View style={{width:"100%",flexDirection:"row"}}>
                        {
                            data.map(item=>{
                                return(
                                    <Pressable onPress={()=>{
                                        console.log(item)
                                        if(getDepartment(item.coverImage) == 'video'){
                                            navigation.navigate('Video Post',{id: item._id})
                            
                            
                                          }else if (getDepartment(item.coverImage) == 'paint'){
                                            navigation.navigate("Paint Viewer", { id: item._id });
                            
                                          }else if(getDepartment(item.coverImage) == 'book'){
                                            navigation.navigate("Book Post", { id: item._id })
                            
                                          }else if(getDepartment(item.coverImage) == 'game'){
                                            navigation.navigate("Game Post", { id: item._id })
                            
                                          }else if(getDepartment(item?.coverImage) == "playlist"){
                                                navigation.navigate("Voice PlayList", { id: item._id });
        
                                          }
                                    }} style={[styles.circleImgContainer, { backgroundColor: "transparent" }]}>
                                        <CustomImage
                                            image={item?.image || item?.coverImage}
                                            width={50}
                                            height={50}
                                            radius={100}
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
                       
                    {/* <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        inverted={true}
                        keyExtractor={(item) => item._id}
                        data={data}
                        renderItem={({ item }) => (
                           
                        )}
                    /> */}
                    </Row>
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
                                 <Text style={{color:'white',fontFamily:"vazir"}}>{desc}</Text>

          
        </MarqueeView>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
                     
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
    circleImgContainer: {
        backgroundColor: "#3E4148",
        borderRadius: 8,
        height: 100,
        marginHorizontal: 20,
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
        flexDirection: "row", justifyContent: "flex-start", marginTop: 8, marginLeft: 10
    },
    badgeCard: {
        flexDirection: "row", backgroundColor: "#17181A40", borderRadius: 5, padding: 4, paddingHorizontal: 20
    }
})