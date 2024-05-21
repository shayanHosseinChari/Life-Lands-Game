import { useNavigation, useTheme } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { border } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import {
  CenterStyled,
  Row,
  SpaceAround,
  SpaceBetween,
} from "../../style/uiUtil";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { LOAD_FILE } from "../../service/APIs";

const CommentItem = ({ item, expandeComment, setExpandComment }) => {
  console.log(item)
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const { colors } = useTheme();
  let baseBtnStyle = {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 2,
  };

  const style = StyleSheet.create({
    commentCard: {
      backgroundColor: "#030303",
      borderRadius: border,
      padding: 30,
      marginVertical: 7,
      borderBottomColor:'#131313',
      borderBottomWidth: 0.8,
      width: width,
    },
    showMore: {
      backgroundColor: "#242639",
      borderColor: "#454894",
      color: "#7072a9",
      ...baseBtnStyle,
    },
    feedback: {
      backgroundColor: "#202125",
      borderColor: "#4a4b51",
      color: "#8e8f8f",
      ...baseBtnStyle,
    },
    like: {
      backgroundColor: "#251f23",
      opacity:0.3,
      borderColor: "#6b3538",
      ...baseBtnStyle,
    },
    gameContainer: {
      marginTop: 20,
    },
  });
  const navigateToPost = async (item, department) => {
    switch (department) {
      case "video":
        navigation.navigate(item.playList ? "Video Play List" : "Video Post", {
          id: item.playList || item._id,
        });
        break;
      case "voice":
        navigation.navigate("Voice Play List", {
          id: item?.playList,
          voiceId: item._id,
        });
        break;
      case "book":
        navigation.navigate("Book Post", {
          id: item?._id,
        });
        break;
      case "game":
        navigation.navigate("Game Post", {
          id: item?._id,
        });
        break;
      case "paint":
        navigation.navigate("Paint Viewer", {
          id: item?._id,
        });
        break;
    }
  };

  return (
    <SpaceStyle right={20} left={20}>
      <SpaceAround minus={30}>
        <View>
          <View style={style.commentCard}>
            <SpaceBetween>
              <CustomText
                color={"#61626c"}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                {item.createdAt}
              </CustomText>
              <SpaceStyle top={-10}>
                <Row>
                  <View style={{ margin: 7, justifyContent: "center" }}>
                    <CustomText>{item?.creator?.fullName}</CustomText>
                    <TouchableOpacity   onPress={() => {
                      navigation.navigate("Public Profile Page", {userId:item?.creator.userId._id});
                    }}>
                    <CustomText style={{ fontSize: 8 }} color={colors.primary}>
                      مشاهده پروفایل
                    </CustomText>
                    </TouchableOpacity>
                  </View>
 
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Public Profile Page", {userId:item?.creator.userId._id});
                    }}
                  >
                    <CustomImage
                      image={item?.creator?.userId?.profileImage}
                      width={30}
                      height={45}
                      aspect={1 / 1}
                      radius={50}
                    />
                    {/* <SpaceStyle top={5}>
                      <CustomText style={{ fontSize: 8 }} width={7}>
                        {item?.post?.title}
                      </CustomText>
                    </SpaceStyle> */}
                  </TouchableOpacity>
                </Row>
              </SpaceStyle>
            </SpaceBetween>

            <CustomText
              top={10}
              color={colors.lightTextColor}
              fontSize={12}
              lines={expandeComment === item._id ? 1000 : 3}
            >
              {item?.comment}
            </CustomText>
            <SpaceStyle top={10} bottom={10}>
              <SpaceBetween>
                <TouchableOpacity
                  onPress={() => {
                    if (expandeComment === item._id) {
                      setExpandComment(undefined);
                    } else {
                      setExpandComment(item._id);
                    }
                  }}
                >
                  <View>
                    <View style={style.showMore}>
                      <CustomText color={"#7072a9"}>
                        {expandeComment === item._id ? "کم تر" : "بیشتر"}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
                <SpaceStyle>
                  <Row>
                    <View style={[style.like,{alignItems:'center',justifyContent:'center'}]}>
                      <Row>
                        <SpaceStyle right={10}>
                          <CustomText color={"#8e8f8f"}>25</CustomText>
                        </SpaceStyle>
                        <Image
                          source={require("../../../assets/icons/like-icon.png")}
                          width={17}
                          height={17}
                          style={{ width: 17, height: 17 }}
                        />
                      </Row>
                    </View>
                    <View style={style.feedback}>
                      <TouchableOpacity   onPress={() => {
                      navigateToPost(item?.post, item?.department);
                    }} style={{flexDirection:'row',alignItems:"center"}}>
                        <SpaceStyle right={10}>
                          <CustomText color={"#8e8f8f"}>{item.post.title} </CustomText>
                        </SpaceStyle>
                        <Image
                          source={{uri:`${LOAD_FILE}${item.post.image}`}}
                          width={17}
                          height={17}

                          style={{ width: 27, height: 27,borderRadius:100 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </Row>
                </SpaceStyle>
              </SpaceBetween>
            </SpaceStyle>
          </View>
        </View>
      </SpaceAround>
    </SpaceStyle>
  );
};
export default CommentItem;
