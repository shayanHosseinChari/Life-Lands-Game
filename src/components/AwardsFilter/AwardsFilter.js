import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import EvillIcons from 'react-native-vector-icons/EvilIcons'
import { View,Text } from 'react-native'
import { Styles } from './AwardsFillterStyles'

export const  AwardsFilter = (props)=>{
    return(
        <View style={Styles.filterContainer}>
            {
                props.items.map((item,index)=>{
                    return(
                        <View style={Styles.filterItem} key={index}>
                            <Text style={{fontFamily:"vazir",color:"#c8c8c8"}}>{item}</Text>
                        </View>
                    )
                })
            }

        </View>
    )
}