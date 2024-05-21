import { useEffect, useState } from "react";
import PageWrapper from "../../components/loading/PageWrapper";
import {
  getFolloweresServer,
  getFollowingServer,
} from "../../service/FollowService";
import { FlatList, TouchableOpacity, View,Text } from "react-native";
import CustomImage from "../../components/CustomImage/CustomImage";
import { Row, SpaceBetween } from "../../style/uiUtil";
import SpaceStyle from "../../style/SpaceStyle";
import CustomText from "../../components/text/CustomText";
import { useTheme } from "@react-navigation/native";
import HeaderComponent from "../../components/layout/HeaderComponent";
import axios from 'axios'
import NavbarSh from "../../components/NavbarComponent";
import GoBack from "../../components/GoBack";


const ShowFollowUsersPage = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [users, setUsers] = useState([]);
  const [isF,setIsF] = useState(route?.params?.data?.isFollowers)
  useEffect(() => {
    getData();
  }, []);
  console.log(route.params.data)
  const getData = async () => {
    let userId = route?.params?.data?.userId;
    let isFollowers = route?.params?.data?.isFollowers;
    console.log(userId); 
    if (isFollowers) {
      const {
        data: { data: res },
      } = await axios.get(`https://lifelands.ir/api/v1/followers/${userId}`);
      console.log(res)
      setUsers(res);
    } else { 
      const {
        data: { data: res },
      } = await getFollowingServer(userId);
      console.log(res)
      setUsers(res);
    }
    setIsLoadingState(false);
  };
  return (
    <View isLoadingState={isLoadingState}>
      <NavbarSh rightChile={<View style={{flexDirection:"row",alignItems:"center"}}>
        <Text style={{color:"white",fontFamily:'vazir'}}> {
          isF? 'دنبال کنندگان':'دنبال شوندگان'
          } </Text>
          <GoBack />
      </View>} />
       <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(post, e) => e}
        data={users.reverse()}
        renderItem={({ item }) => (
          <SpaceStyle right={15}>
            <SpaceBetween>
              <View></View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Public Profile Page", {
                    userId: item?.userId?._id || item?.mainUser?._id,
                  });
                }}
              >
                <View style={{justifyContent:"flex-end",alignItems:'flex-end',flexDirection:"row"}}>
                  <View style={{ justifyContent: "flex-end",paddingBottom:8,width:"100%",alignItems:"flex-end",borderBottomColor: 'rgba(23, 23, 23, 0.8)',borderBottomWidth: 1,justifyContent:"flex-end",alignItems:"flex-end" }}>
                  <Text style={{color:"white",fontFamily:"vazir"}}>
                  {item.fullName}</Text>
                    
                   {
                    item.userId? <Text style={{color:"gray",fontFamily:"vazir",fontSize: 12}}>
                    @{item?.userId?.userName}
                    </Text>: <Text style={{color:"gray",fontFamily:"vazir",fontSize: 12}}>
                    @{item?.mainUser?.userName}
                    </Text>
                   }
                  </View>
                  <CustomImage
                    left={10}
                    image={item.profileImage}
                    width={8}
                    radius={100}
                    height={50}
                    top={10}
                    aspect={1 / 1}
                  />
                </View>
              </TouchableOpacity>
            </SpaceBetween>
          </SpaceStyle>
        )}
      />
     
    </View>
  );
};
export default ShowFollowUsersPage;
