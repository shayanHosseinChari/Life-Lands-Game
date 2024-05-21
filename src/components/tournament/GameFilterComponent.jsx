import { FlatList, View,TouchableOpacity,Text } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import GameFilterItemComponent from "./GameFilterItemComponent";
import CustomInput from "../CustomInput/CustomInput";
import Theme from "../../Theme/Theme";
import { useNavigation } from "@react-navigation/native";

const GameFilterComponent = ({ games, setGameId, gameId, setTopDownloadGamesShow, topDownloadGamesShow }) => {
  const navigation = useNavigation()
  return (
    <SpaceStyle left={5} bottom={5}>
      <View style={{flexDirection:"row", paddingHorizontal: 10, marginVertical: 10 }}>
      <TouchableOpacity onPress={()=>{
          navigation.navigate('Game Selection Page')
        }} style={{width:60,height:30,backgroundColor: Theme.tabBarActiveIconColor,marginRight:8,justifyContent:'center',alignItems:"center",borderRadius: 6}}>
          <Text style={{fontFamily:"vazir",color:"white",fontSize:9}}>انتخاب بازی </Text>
        </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        horizontal={true}
        data={topDownloadGamesShow}
        inverted={false}
        renderItem={({ item }) => (
          <GameFilterItemComponent
            gameId={gameId}
            item={item}
            setGameId={setGameId}
          />
        )}
      />
      </View>
      
    </SpaceStyle>
  );
};
export default GameFilterComponent;
