import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { useNavigation } from "@react-navigation/native";
import { Row } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import { LinearGradient } from "expo-linear-gradient";

const UsersProfilePostsComponent = ({
  posts,
  isFinishPages,
  setFilter,
  filter,
  showMoreInfo
}) => {
  const navigation = useNavigation();
  const navigateToPost = async (item) => {
    switch (item.department) {
      case "video":
        navigation.navigate(item.playList ? "Video Play List" : "Video Post", {
          id: item.playList || item.postId,
        });
        break;
      case "voice":
        navigation.navigate("Voice Play List", {
          id: item?.playList,
          voiceId: item.postId,
        });
        break;
      case "book":
        navigation.navigate("Book Post", {
          id: item?.postId,
        });
        break;
      case "game":
        navigation.navigate("Game Post", {
          id: item?.postId,
        });
        break;
      case "paint":
        navigation.navigate("Paint Viewer", {
          id: item?.postId,
        });
        break;
    }
  };

  return (
    <View
      style={{
        alignSelf: "center",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {
        showMoreInfo?<View style={styles.switcherContainer}>
        <CustomText fontSize={13} style={{ padding: 15, paddingVertical: 10 }}>
          سوابق من (0)
        </CustomText>
        <CustomText fontSize={13} style={{ padding: 15, paddingVertical: 10 }}>
          ذخیره شده ها (0)
        </CustomText>
        <CustomText fontSize={13} style={{ padding: 15, paddingVertical: 10 }}>
          آپلودی من (0)
        </CustomText>
      </View>:null
      }
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ alignSelf: "center" }}
        keyExtractor={(item) => item._id}
        numColumns={3}
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToPost(item)}>
            <SpaceStyle left={4} right={4}>
              {/* <Icon
                dark={require("../../../assets/icons/edit-icon.png")}
                light={require("../../../assets/icons/edit-icon.png")}
                style={{
                  width: 30,
                  height: 30,
                  zIndex: 5,
                  position: "absolute",
                  top: 5,
                  right: -5
                }}
              /> */}
              {/* <View style={styles.tagUserContainer}>
                <Row>
                  <Icon
                    dark={require("../../../assets/icons/tag-user.png")}
                    light={require("../../../assets/icons/tag-user.png")}
                    style={{ width: 12, height: 12, marginRight: 2 }}
                  />

                  <CustomText color={"#1E6775"}>{item?.downloadCount || 10}</CustomText>
                </Row>
              </View> */}
              <CustomImage
                top={8}
                aspect={1 / 1}
                width={3.6}
                image={item?.image || item?.post?.image}
              />
              {/* <LinearGradient
                colors={["#B539E1", "#39BECD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  padding: 13,
                  borderRadius: 100,
                  marginTop: -15,
                  padding: 10,
                  width: 36,
                  height: 24,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  left: "50%",
                  marginLeft: -15,
                }}
              >
                <Icon
                  dark={require("../../../assets/icons/play-fill.png")}
                  light={require("../../../assets/icons/play-fill.png")}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
              </LinearGradient> */}
              <CustomText top={5} selfCenter width={4}>
                {item.post?.title}
              </CustomText>
            </SpaceStyle>
          </TouchableOpacity>
        )}
      />
      <>
        {setFilter && (
          <>
            {isFinishPages ? (
              <>
                <CustomText style={{ alignSelf: "center" }}>
                  تموم شد :(
                </CustomText>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setFilter({
                    ...filter,
                    ...{ pageId: filter.pageId + 1 },
                  });
                }}
              >
                <CustomText style={{ alignSelf: "center" }}>
                  بیشتر نشونم بده...
                </CustomText>
              </TouchableOpacity>
            )}
          </>
        )}
      </>
    </View>
  );
};
export default UsersProfilePostsComponent;

const styles = StyleSheet.create({
  switcherContainer: {
    borderRadius: 999, borderWidth: 1, borderColor: "#343434", overflow: "hidden", width: "100%", flexDirection: "row", marginTop: 15
  },
  tagUserContainer: {
    backgroundColor: "#BAF3FD",
    padding: 3,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    top: 20,
    paddingHorizontal: 4,
    height: 20,
    position: "absolute",
    left: 5,
    zIndex: 5
  },
})