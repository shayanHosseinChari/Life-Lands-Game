import { FlatList, TouchableOpacity, View,Text } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import DoubleSliderItems from "./DoubleSliderItems";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const DoubleSlider = ({ items, title }) => {

    const navigation = useNavigation()
    return (
        <SpaceStyle top={20}>
            <SpaceBetween>
            <SpaceStyle left={10} bottom={10}>
              <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}} onPress={()=>{
                navigation.navigate('Tournament Public Page',{data:{title:"رقابت های انجام شده",isGame:false,data: items}})
                
              }}>
              <AntDesign name="arrowleft" color={'white'} size={RFPercentage(1.5)} />

                <Text style={{color:"white",fontFamily:"vazir",marginHorizontal:4}}>بیشتر</Text>
              </TouchableOpacity>
            </SpaceStyle>
            <SpaceStyle right={10} bottom={0}>
                <CustomText fontSize={14}>
                {title}
                </CustomText>
            </SpaceStyle>
        </SpaceBetween>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                inverted={true}
                keyExtractor={(item) => item._id}
                data={items}
                renderItem={({ item }) => <DoubleSliderItems item={item} />}
            />
            
        </SpaceStyle>
    );
};
export default DoubleSlider;
