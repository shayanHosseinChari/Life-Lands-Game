import react, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { AntDesign, Entypo } from "react-native-vector-icons";
import Theme from "../../Theme/Theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LOAD_FILE, LOAD_WEBGL } from "../../service/APIs";
import CustomText from "../text/CustomText";
import Ionicons from 'react-native-vector-icons/Ionicons'

const LastGame = (props) => {
    let mode = props.mode

    let checkIsWebp = (name)=>{
        if(name.split('.')[1] == 'webp'){
            return true
        }else{
            return false
        }}

  const [data, setData] = useState(props.books);

  let createArray = (count) => {
    let couner = Math.ceil(count);
    let arrayForReturn = [];
    for (var i = 0; i < couner; i++) {
      arrayForReturn.push(i);
    }
    
    return arrayForReturn;
  };
  
  return (
    <FlatList
      style={{
        // width:Dimensions.get('screen').width,
        paddingHorizontal: RFPercentage(0),
        marginHorizontal: "auto",
        marginTop: 10,
      }}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <View style={Styles.container}>
            <TouchableOpacity
            onPress={()=>{
                props.navigation.navigate("Game Post", { id: item._id });
            }}
              style={{
                width: "100%",
                height: RFPercentage(40),
                borderRadius: 9,
                position:"relative"
              }}
            >
    <View style={{position:"absolute",width:"100%",height:"100%",top:0,left:0,zIndex:99,justifyContent:"center",alignItems:"center"}}>
                        <View style={{width:50,height:50,borderRadius:100,backgroundColor:Theme.tabBarActiveIconColor,justifyContent:"center",alignItems:'center'}}>
                            <Ionicons name="game-controller" color={'white'} size={RFPercentage(3.7)} />
                        </View>
                    </View>
             
                    <Image
                    source={{ uri: `${LOAD_FILE}${item.image}` }}
                    style={{
                      width: "100%",
                      height: RFPercentage(40),
                      borderRadius: 9,
                      objectFit: "cover",
                    }}
                  />
             
            </TouchableOpacity>
            <View style={Styles.description}>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 3,
                    paddingHorizontal: 3,
                    alignItems: "center",
                    backgroundColor: Theme.tabBarActiveIconColor,
                    borderRadius: 20,
                    marginHorizontal: 8,
                    position:"relative"
                  }}
                >
                    {/* <ImageBackground  source={{
                      uri: `${LOAD_FILE}${item.category.categoryId.icon}`,
                    }}
                    style={{position:"relative", width: 30, height: 30, borderRadius: 100 }}
                  >
                    <View style={{position:"absolute",width:"100%",height:"100%",top:0,left:0,zIndex:9,justifyContent:"center",alignItems:"center"}}>

                    </View>
                  </ImageBackground> */}
                    
                  <Image
                    source={{
                      uri: `${LOAD_FILE}${item.category.categoryId.icon}`,
                    }}
                    style={{ width: 30, height: 30, borderRadius: 100 }}
                  />
                  <Text
                    style={{
                      marginHorizontal: 10,
                      color: "white",
                      fontFamily: "vazir",
                    }}
                  >
                    {item.category.categoryId.title}
                  </Text>
                </View>
                <CustomText
                  style={{
                    color: "white",
                    fontFamily: "vazir",
                    fontSize: RFPercentage(1.9),
                    marginVertical: 7,
                  }}
                >
                  {item.title}
                </CustomText>
              </View>
              <Text
                style={{
                  color: "#ffffff87",
                  fontFamily: "vazir",
                  fontSize: RFPercentage(1.6),
                  marginTop: 8,
                }}
              >
                {item.description}
              </Text>
            </View>
            <View style={{flexWrap:"wrap",flexDirection:'row',alignItems:"center"}}>
                  
            <FlatList
                      horizontal
                      inverted
                      data={item.tags}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => {
                        return (
                         <Text>
                            #{item}
                         </Text>
                        );
                      }}
                    />
            </View>
            <View style={Styles.footer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign
                  name="clockcircleo"
                  size={RFPercentage(1.8)}
                  color={"#b0abab"}
                />
                <Text
                  style={{
                    color: "#b0abab",
                    fontFamily: "vazir",
                    marginHorizontal: 8,
                    fontSize: RFPercentage(1.4),
                  }}
                >
                  {item.createdAt}
                </Text>
               
              </View>
              <View>
                {item.score > 0 ? (
                  <View style={{flexDirection:"row"}}>
                   
                    <FlatList
                      horizontal
                      data={createArray(item.score)}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => {
                        return (
                          <AntDesign
                            name="star"
                            color={"gold"}
                            size={RFPercentage(1.8)}
                            style={{ marginHorizontal: 2 }}
                            key={item}
                          />
                        );
                      }}
                    />
                    <FlatList
                      horizontal
                      data={createArray(5 - Math.ceil(item.score))}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => {
                        return (
                          <AntDesign
                            name="staro"
                            color={"#606060"}
                            size={RFPercentage(1.8)}
                            style={{ marginHorizontal: 2 }}
                            key={item}
                          />
                        );
                      }}
                    />
                  </View>
                ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FlatList
                      horizontal
                      data={[1, 2, 3, 4, 5]}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => {
                        return (
                          <AntDesign
                            name="staro"
                            color={"#606060"}
                            size={RFPercentage(1.8)}
                            style={{ marginHorizontal: 2 }}
                            key={item}
                          />
                        );
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

const Styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#2e2e2e",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,

    marginTop: 10,
  },
  description: {
    paddingHorizontal: RFPercentage(1),
    paddingVertical: 8,
  },
  footer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: "#5d5d5d",
    borderTopWidth:1,
    padding: 8,
  },
});
export default LastGame;
