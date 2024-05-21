import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"
import AntDesign from 'react-native-vector-icons/AntDesign'
const GoBack = ({design})=>{
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={design} onPress={()=>{
            navigation.goBack()
        }}>
            <AntDesign name="arrowright" color={'white'} size={RFPercentage(3)} />

        </TouchableOpacity>
    )
}

export default GoBack