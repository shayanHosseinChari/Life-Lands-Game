import { View, Text, Dimensions, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Hr, Row, SpaceBetween } from '../../style/uiUtil';
import CustomImage from '../CustomImage/CustomImage';
import { Icon } from '../../appsetting/icons';
import { useFonts } from 'expo-font';
import CustomText from '../text/CustomText';
import { LinearGradient } from 'expo-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function HomePagePost({ item, navigation }) {
    console.log(item)
  
    const width = Dimensions.get("window").width;
    return (
        <View style={{ width, marginTop: 10, marginBottom: 10 }}>
            <View style={{ width: width - 17, borderRadius: 15, marginHorizontal: 8, backgroundColor: "#282828" }}>
                <SpaceBetween styles={{ alignItems: "center", padding: 10 }}>
                    <View>
                        <Icon
                            dark={require("../../../assets/icons/arrow-left.png")}
                            light={require("../../../assets/icons/arrow-left.png")}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>
                    <View style={{ flexDirection: "row" ,alignItems:"center"}}>
                        <View style={{marginHorizontal:RFPercentage(1.9),marginVertical:'auto'}}>
                        <CustomText selfCenter fontSize={14} right={8}>{item?.channel?.title}</CustomText>
                        </View>
                        <CustomImage
                            image={item?.channel?.image}
                            width={35}
                            height={35}
                            radius={100}
                        />
                    </View>
                </SpaceBetween>
                <TouchableOpacity onPress={() => navigation.navigate("Video Post", { id: item._id })}>
                    <View>
                        <CustomImage
                            isBackground={true}
                            image={item?.image}
                            width={width - 17}
                            height={206}
                        >
                            <LinearGradient
                                colors={["#6F2E69", "#B3258D"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    borderRadius: 100,
                                    padding: 10,
                                    width: 80,
                                    height: 45,
                                    justifyContent: "center",
                                    alignContent: "center",
                                    alignItems: "center",
                                    left: "43%",
                                    top: "37%",
                                    marginLeft: -15,
                                }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/play-fill.png")}
                                    light={require("../../../assets/icons/play-fill.png")}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            </LinearGradient>
                          
                        </CustomImage>
                    </View>
                </TouchableOpacity>
                {/* <View style={{width:"100%",flexDirection:'row',alignItems:'center',padding:10}}>
                <LinearGradient
                                colors={["#6F2E69", "#B3258D"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    borderRadius: 300,
                                    padding: 10,
                                    width: 50,
                                    height: 50,
                                    justifyContent: "center",
                                    alignContent: "center",
                                    alignItems: "center",
                                   
                                }}
                            >
                                <Icon
                                    dark={require("../../../assets/icons/play-fill.png")}
                                    light={require("../../../assets/icons/play-fill.png")}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            
                </LinearGradient>
                <Image source={require('../../../assets/line-play.png')} style={{flex:1,height:20,objectFit:'contain',marginHorizontal:10}} />
                <Text style={{color:"white"}}>12:50</Text>
                </View> */}
                <Hr width={width - 17} color="#343434" padding={0} />
                <SpaceBetween styles={{ alignItems: "center", padding: RFPercentage(1.3), paddingVertical: RFPercentage(2) }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: 'row', marginRight: 15 }}>
                            <Icon
                                dark={require("../../../assets/icons/heart-icon.png")}
                                light={require("../../../assets/icons/heart-icon.png")}
                                style={{ width: 20, height: 20, marginRight: 5 }}
                            />
                            <CustomText fontSize={13}>{item?.score}</CustomText>
                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 15 }}>
                            <Icon
                                dark={require("../../../assets/icons/eye.png")}
                                light={require("../../../assets/icons/eye.png")}
                                style={{ width: 20, height: 20, marginRight: 5 }}
                            />
                            <CustomText fontSize={13}>{item?.playCount}</CustomText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                dark={require("../../../assets/icons/message.png")}
                                light={require("../../../assets/icons/message.png")}
                                style={{ width: 20, height: 20, marginRight: 5 }}
                            />
                            <CustomText fontSize={13}>{item.commentCount}</CustomText>
                        </View>
                    </View>
                    <View>
                        <Icon
                            dark={require("../../../assets/icons/archive-tick.png")}
                            light={require("../../../assets/icons/archive-tick.png")}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>
                </SpaceBetween>
                <View style={{ paddingHorizontal: 10 }}>
                    <CustomText fontSize={18}>{item?.title}</CustomText>
                    <CustomText fontSize={12} lines={2} top={5}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</CustomText>
                </View>
                <Row styles={{ paddingHorizontal: 10, marginTop: 25,marginBottom:18 }}>
                    <CustomText fontSize={10} right={5}>{item.createdAt}</CustomText>
                    <Icon
                        dark={require("../../../assets/icons/clock.png")}
                        light={require("../../../assets/icons/clock.png")}
                        style={{ width: 18, height: 18, marginTop: 3 }}
                    />
                </Row>
            </View>
        </View >
    )
}