import { View, Text, Pressable } from 'react-native'
import React from 'react'
import SpaceStyle from '../../style/SpaceStyle'
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomImage from '../CustomImage/CustomImage';
import CustomText from '../text/CustomText';
import { Icon } from '../../appsetting/icons';
import { ScrollView } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from "expo-linear-gradient";

export default function DoubleSliderItems({ item }) {
    const navigation = useNavigation()
    console.log(item);
    return (
        <SpaceStyle top={5} bottom={5} right={5} left={5}>
            <LinearGradient colors={['transparent','#1f1f1f']} style={{ padding:10, borderRadius: 10, width: 250 }}>
                <SpaceBetween styles={{ alignItems: "center" }}>
                    <View style={{ flexDirection: "row", backgroundColor: "#BAF3FD", height: 30, borderRadius: 5, padding: 5 }}>
                        <Icon
                            dark={require("../../../assets/icons/tag-user.png")}
                            light={require("../../../assets/icons/tag-user.png")}
                            style={{ width: 18, height: 18 }}
                        />
                        <CustomText selfCenter fontSize={14} left={3} style={{ color: '#1E6775' }}>{item.usersReceivers.length}</CustomText>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ marginRight: 10 }}>
                            <CustomText fontSize={13}>{item.gameId.title}</CustomText>

                        </View>
                        <CustomImage
                            aspect={1 / 1}
                            image={item.gameId.image}
                            width={60}
                            height={60}
                        />
                    </View>
                    {/* <CustomText top={5} fontSize={13}>{item.createdAt}</CustomText> */}

                </SpaceBetween>
                <CustomText fontSize={13}>{item.createdAt}</CustomText>

                <Row styles={{ marginTop: 10, overFlow: "hidden",width:"100%" }}>
                    <ScrollView horizontal style={{width:'100%',paddingRight: RFPercentage(2)}} scrollEnabled showsHorizontalScrollIndicator={false}>
                    {
                        item.usersReceivers.map(i=>{
                            return (
                                <Pressable onPress={()=>{
                                    console.log(i._id)
                                    navigation.navigate('Public Profile Page',{ userId : i.userId})
                                }} style={{width: 60,height:60}}>
<CustomImage
                        // aspect={1 / 1}
                        image={i.profile}
                        width={60}
                        key={item.userId}
                        height={60}
                        styles={{ borderRadius: 555, borderWidth: 2, borderColor: '#535353' ,marginRight:-17,zIndex: 99}}
                    /></Pressable>
                            )
                        })
                    }
                    </ScrollView>
                    
                </Row>
            </LinearGradient>
        </SpaceStyle>
    )
}