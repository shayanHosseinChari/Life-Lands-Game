import {View,Text, FlatList, TouchableOpacity,Image} from 'react-native'
import NavbarSh from '../components/NavbarComponent'
import GoBack from '../components/GoBack'
import { LOAD_FILE } from '../service/APIs'
import { useNavigation } from '@react-navigation/core'

export default WhoLikePosts= ({route})=>{
    const navigation = useNavigation()
    console.log(route.params.users)
    return (
        <View>
            <NavbarSh rightChile={<View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{ color:'white',fontFamily:"vazir" ,marginHorizontal: 10 }}>
                    لایک ها
                </Text>
                <GoBack />
            </View>} />

            <FlatList 

           
            data={route.params.users}
            renderItem={({item})=>{
                return (
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Public Profile Page',{userId: item.userId._id})
                    }} activeOpacity={0.8} style={{padding: 10,flexDirection:'row-reverse',alignItems:"center",justifyContent:"flex-endj",borderBottomColor:"rgba(21, 21, 21, 0.8)",borderBottomWidth: 2}}>
                         <Image source={{
                            uri: `${LOAD_FILE}${item.userId.profileImage}`
                        }} style={{ width: 60,height:60 ,borderRadius: 100}}/>
                       <View style={{marginHorizontal: 9,justifyContent:"flex-end",alignItems:"flex-end"}}>
                       <Text style={{color:"white",fontFamily:'vazir'}}>
                            {item.userId.firstName} {item.userId.lastName}
                        </Text>
                        <Text style={{color:"gray",fontFamily:'vazir',fontSize: 12}}>
                           @{item.userId.userName}
                        </Text>
                       </View>
                       
                       
                    </TouchableOpacity>
                )
            }}



            
            />

        </View>
    )
}

