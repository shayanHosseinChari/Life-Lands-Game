import { StatusBar } from "expo-status-bar";
import {View,Text,TouchableOpacity,Image, Dimensions, FlatList,ScrollView} from 'react-native'
import NavbarSh from "../components/NavbarComponent";
import GoBack from "../components/GoBack";
import { useNavigation } from "@react-navigation/native";
import CustomImage from "../components/CustomImage/CustomImage";
import CustomText from "../components/text/CustomText";
import DoubleSliderItems from "../components/tournament/DoubleSliderItems";
import { LinearGradient } from "expo-linear-gradient";
import SpaceStyle from "../style/SpaceStyle";
import { Row, SpaceBetween } from "../style/uiUtil";
import { Icon } from "../appsetting/icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Pressable } from "react-native";



const TournamentPublicPage = (props)=>{
    const {route} = props
    console.log('params.....',route.params)
    const navigation = useNavigation()

    return (
        <View style={{paddingTop: 30,width:Dimensions.get('window').width }}>
            <NavbarSh rightChile={<View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{color:'white',fontFamily:'vazir',marginHorizontal: 4}}>{route.params.data.title} </Text>
                <GoBack />
            </View>}/>
            {
                route.params.data.isGame?<FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                scrollEnabled
                contentContainerStyle={{ alignSelf: "stretch",paddingBottom:60 }}
                nestedScrollEnabled={true}
                numColumns={3}
                key={3}
                showsVerticalScrollIndicator={false}
                inverted={false}
                keyExtractor={(item) => item._id}
                data={route.params.data.data}
                style={{width:'100%',height: Dimensions.get('window').height}}
                renderItem={({ item }) =>  <TouchableOpacity
                onPress={() => {
               navigation.navigate("Make Room Page", { gameId: item?._id });
                    
                }}
                style={{width:'33.33333336%'}}
            >
                <View style={{ width: "100%", height: 150,  position: "relative" ,justifyContent:"center",alignItems:"center"}}>
                
                    <CustomImage
                        aspect={1 / 1}
                        width={120}
                        height={110}
                        radius={8}
                        image={item.image}
                        resizeMode={"cover"}
                       
                    />
                    <CustomText style={{marginTop: 10}}>
                        {item.title}
                        
                    </CustomText>
                    
                </View>
            </TouchableOpacity>}
            />: <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            scrollEnabled
            contentContainerStyle={{ alignSelf: "stretch",paddingBottom:60 }}
            nestedScrollEnabled={true}
            numColumns={1}
            key={1}
            showsVerticalScrollIndicator={false}
            inverted={false}
            keyExtractor={(item) => item._id}
            data={route.params.data.data}
            renderItem={({ item,index }) => 
             <SpaceStyle top={5} bottom={5} right={5} left={5}>
                
            <LinearGradient colors={index % 2 == 0?['transparent','#1f1f1f']:['#1f1f1f','transparent']} style={{ padding:10, borderRadius: 10, width: '100%' }}>
                <SpaceBetween styles={{ alignItems: "center" }}>
                    <View style={{ flexDirection: "row", backgroundColor: "#BAF3FD", height: 30, borderRadius: 5, padding: 5 }}>
                        <Icon
                            dark={require("../../assets/icons/tag-user.png")}
                            light={require("../../assets/icons/tag-user.png")}
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
        </SpaceStyle> }
        />
            }
        </View>
    )
}

export default TournamentPublicPage