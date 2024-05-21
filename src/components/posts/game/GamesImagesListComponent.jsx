import { FlatList, Image, TouchableOpacity, View,Text } from "react-native";
import SpaceStyle from "../../../style/SpaceStyle";
import CustomImage from "../../CustomImage/CustomImage";
import CustomCard from "../../CustomCard/CustomCard";
import CustomText from "../../text/CustomText";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LOAD_FILE } from "../../../service/APIs";
import { LinearGradient } from "expo-linear-gradient";
const GamesImagesListComponent = ({ images, setSingleImage, singleImage }) => {
  return (
    <SpaceStyle left={10} right={10} top={10}>
      <LinearGradient colors={['transparent','rgba(26, 26, 26, 1)']} style={{borderRadius:20,padding:10}}>
        <Text style={{fontFamily:"vazir",fontSize:RFPercentage(1.6),marginBottom:10,color:"white"}}>
          تصاویر بازی
        </Text>
        <FlatList
            showsHorizontalScrollIndicator={false}

          horizontal={true}
          inverted={true}
          keyExtractor={(item) => item._id}
          data={images}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSingleImage(item);
              }}
            >
              <View>
                <SpaceStyle left={10}>
                  <Image source={{uri: `${LOAD_FILE}${item}`}} style={{width:110,height:200,borderRadius:8}}/>
                  {/* <CustomImage
                    aspect={1 / 1}
                    image={item}
                    width={100}
                    height={150} */}
                  {/* /> */}
                </SpaceStyle>
              </View>
            </TouchableOpacity>
          )}
        />
      </LinearGradient>
    </SpaceStyle>
  );
};
export default GamesImagesListComponent;
