import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import EvillIcons from 'react-native-vector-icons/EvilIcons'
import { View,Text,TouchableOpacity } from 'react-native'
import { Styles } from './SearchBoxStyles'
import { cardColor } from '../../appsetting/appsettingColor'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native-gesture-handler'


export const  SearchBox = (props)=>{
    return(
        <View style={Styles.SearchContainer}>
            <View style={{flexDirection:"row",alignItems:"center",width:"100%",backgroundColor:cardColor,paddingVertical:5,borderRadius:100}}>
                <TouchableOpacity style={{marginHorizontal:4,justifyContent:"center",alignItems:"center",width:RFPercentage(4),height:RFPercentage(4),borderRadius:100,backgroundColor:"#4B4AAF"}} onPress={props.searcHandler} activeOpacity={0.8}>
                    <AntDesign name='search1' color={'white'} size={RFPercentage(2)} />
                </TouchableOpacity>
                <TextInput placeholder='نام بازی یا عنوان مدال را وارد کنید' style={{fontFamily:"vazir",height:'100%',width:'90%',paddingHorizontal:RFPercentage(2)}} placeholderTextColor={'gray'}/>
            </View>

        </View>
    )
}