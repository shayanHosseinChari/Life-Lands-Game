import react from "react";
import { View,TouchableOpacity,Text } from "react-native";

const WButton = (props)=>{
    return(
       <TouchableOpacity onPress={props.onClick}>
        <Text>
            {  
                props.title
            }
        </Text>
        <props.Icon />
       </TouchableOpacity>

    )
}

export default WButton