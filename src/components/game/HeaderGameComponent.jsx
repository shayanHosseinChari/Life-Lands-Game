import { useEffect, useState } from "react";
import { View, Image, Dimensions, StyleSheet, StatusBar,Share } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { platform } from "../../utility/platform";
import CustomButton from "../CustomButton/CustomButton";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Icon } from "../../appsetting/icons";
import { addRunCountService, likePostService } from "../../service/PostService";
import { gameLinkMaker } from "../../utility/gameLinkMaker";
import { TouchableOpacity } from "react-native";
import { Animated } from "react-native";
import { LOAD_FILE } from "../../service/APIs";
import { ResizeMode, Video } from "expo-av";
import { RFPercentage } from "react-native-responsive-fontsize";
import AntDesign from 'react-native-vector-icons/AntDesign'
import {LinearGradient} from "expo-linear-gradient";
import { Rating } from "react-native-ratings";
import { yellowColor } from "../../appsetting/appsettingColor";


const HeaderGameComponent = ({ game, navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  var navigationS = useNavigation()
  
  useEffect(() => {
    Image.prefetch(LOAD_FILE + game?.image);
  }, []);

  const [isLikeState, setIsLikeState] = useState(game?.isLiked || false);
  const { colors } = useTheme(); 
  const onDownloadClickListener = async () => {
    await addRunCountService(game?._id);
    gameLinkMaker(game, navigation);
  };
  const createRatingList = (rate)=>{
    let l = []
    for(var i=0 ; 1<rate;i++){
      l.push(i)
    }
    return l
  }
  const onLikeAction = async () => {
    const {
      data: { state },
    } = await likePostService({ postId: game?._id, department: "game" });
    if (state) {
      setIsLikeState(!isLikeState);
    }
  };
  const [pulseAnimation, setPulseAnimation] = useState(new Animated.Value(0));
  const [muteVideo, setMuteVideo] = useState(true);
  
  useEffect(() => {
    const unsubscribe = navigationS.addListener('blur', () => {
      setMuteVideo(true);
    });

    return unsubscribe;
  }, [navigationS]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const borderColorAnimation = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#631695', '#00000000'],
  });

  return (
    <View styles={{ height: 200, width: '100%',backgroundColor:"red", position: "relative" }}>
      <View
                style={{
                  backgroundColor: "#00000057",
                  borderColor: "#000",
                  borderRadius: 10,
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 2,
                  marginLeft: 13,
                  marginTop: 5,
                  width:80,
                  position:"absolute",
                  bottom:'27%',
                  left:0,
                  zIndex:99,
                }}
              >
                <CustomText
                  fontSize={5}
                  style={{ alignSelf: "flex-start" }}
                >
                  Powered By
                </CustomText>
                <CustomText fontSize={7} color={colors.primary}>
                  LifeLands
                </CustomText>
              </View>
        <Rating
              
              
              readonly={true}
              style={{position:"absolute",zIndex:9999,bottom:-25,left:0,width:"40%"}}
              type="star"
              value={game?.scoreStatistic.totalScore}
              defaultRating={game?.scoreStatistic.totalScore}
              ratingColor={yellowColor}
              ratingBackgroundColor="#ffffff"
              tintColor={'black'}
              imageSize={25}
            />
      <LinearGradient colors={['transparent','black']} style={{position:"absolute",width:"100%",zIndex:99,bottom:0,left:0,height:40}}></LinearGradient>
    
       <View style={{position:"absolute",bottom:'28%',left:'23%',zIndex: 99, justifyContent: "center", marginLeft: 10, marginTop: 20 }}>
          <TouchableOpacity onPress={onLikeAction}>
            {isLikeState ? (
              <Image
                source={require("../../../assets/icons/like4.png")}
                style={{
                  width: 22,
                  height: 22,
                  alignSelf: "center",
                  opacity: 1,
                }}
              />
            ) : (
              <Image
                source={require("../../../assets/icons/Like2.png")}
                style={{
                  width: 22,
                  height: 22,
                  alignSelf: "center",
                  opacity: 1,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      {game.video && game.video.includes(".mp4") ? (
        <TouchableOpacity style={styles.tagUserContainer} onPress={() => setMuteVideo(!muteVideo)}>
        <View >
          {
            muteVideo ? (
              <Icon
                dark={require("../../../assets/icons/volume-mute-fill.png")}
                light={require("../../../assets/icons/volume-mute-fill.png")}
                style={{ width: 18, height: 18 }}
              />
            ) : (
              <Icon
                dark={require("../../../assets/icons/volume-high.png")}
                light={require("../../../assets/icons/volume-high.png")}
                style={{ width: 18, height: 18 }}
              />
            )
          }
        </View>
      </TouchableOpacity>
      ) : null}
      {game.video && game.video.includes(".mp4") ? (
        <Video
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, height: 240, width: Dimensions.get('window').width }}
          shouldPlay={true}
          isMuted={muteVideo}
          width={"100%"}
          
          resizeMode={ResizeMode.COVER}
          height={240}
          isLooping={true}
          source={{ uri: LOAD_FILE + game?.video }}
        />
      ) : (
        <CustomImage
          styles={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0, zIndex: 4 }}
          height={170}
          isBackground={true}
          width={1}
          image={game?.headerImage}
        />
      )}
      <View
        style={{ 
          backgroundColor: "#0000009b", 
          alignItems: "flex-end",
          justifyContent:"space-between",
          height: 240,
          paddingBottom:20,
          paddingHorizontal: RFPercentage(2),
          position: "relative", paddingTop: StatusBar.currentHeight, zIndex: 7
        }}
      >
          <View style={{width:"100%",justifyContent:"space-between",alignItems:"center",flexDirection:'row',marginBottom: 10,paddingTop: 5}}>
        <TouchableOpacity onPress={()=>{
          navigation.goBack()
        }}>
          <AntDesign name="arrowleft" color={'white'} size={RFPercentage(2.5)} />
          
        </TouchableOpacity>
        <View style={{flexDirection:"row",alignItems:"center"}}>
          <TouchableOpacity onPress={()=>{
            Share.share({
              message:`
              بازی منحصر به فرد لایف لندز به نام ${game.title} :
              https://lifelands.ir/post?department=game&id=${game._id}
              `
            })
          }}>
          <AntDesign name="sharealt" color={'white'} size={RFPercentage(2.5)}/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15}}   onPress={() =>{
            
                      navigation.navigate("Search Page", { searchDepartment:"game" })
                    }
                    }>
          <AntDesign name="search1" color={'white'} size={RFPercentage(2.5)}/>
          </TouchableOpacity>
        </View>
      </View>
        <View
          style={{
            flexDirection: "row",
            right: 0,
          }}
        >
          <View
            style={{
              // width: "65%",
              alignSelf: "flex-start",
              right: 10,
              top: 15,
            }}
          >
                          <CustomText selfCenter fontSize={17} style={{ fontWeight: "bold" }}>{game?.title}</CustomText>

            
            <CustomText fontSize={12}>{game?.category?.title}</CustomText>
           
          </View>
          
          <Animated.Image
            source={{
              uri: LOAD_FILE + game?.image,
            }}
            width={100}
            height={100}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              borderRadius: 10,
              borderWidth: 1,
              marginRight: 3,
              borderColor: borderColorAnimation,
            }}
          />
        </View>
        <View
        style={{ width: "100%",  flexDirection: "row" }}
      >
        <CustomButton
          width={"100%"}
          onClick={onDownloadClickListener}
          borderRadius={10}
          styles={{ position: "relative", top: 10, height: 40 }}
          textStyle={{ fontSize: 12 }}
          icon={
            <Icon
              style={{ width: 14, height: 14, marginTop: 2 }}
              dark={require("../../../assets/icons/Play.png")}
              light={require("../../../assets/icons/Play.png")}
            />
          }
        >
          Play
        </CustomButton>

       
      </View>
      </View>
     
    </View>
  );
};
export default HeaderGameComponent;

const styles = StyleSheet.create({
  tagUserContainer: {
    backgroundColor: "#BAF3FD",
    padding: 3,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    top: "40%",
    paddingHorizontal: 7,
    height: 20,
    position: "absolute",
    left: 17,
    zIndex: 10,
  },
})