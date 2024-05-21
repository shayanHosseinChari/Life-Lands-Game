import {View,StyleSheet,Text} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const LazySliderTitle = ({RightTitle})=>{
    <View style={{width:'100%',alignItems:'center',justifyContent:'space-between',flexDirection:"row-reverse"}}>
        <Text style={{color:"white",fontFamily:"vazir",fontSize: 12}}>{RightTitle}</Text>
        <View style={{flexDirection:"row",alignItems:"center"}}>
            <AntDesign name='left' color={'white'} size={12} />
        </View>
    </View>

}


export default LazySliderTitle