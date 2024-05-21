import { StyleSheet, View } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import { Row } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import CustomText from "../text/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { gameLinkMaker } from "../../utility/gameLinkMaker";
import { addRunCountService } from "../../service/PostService";

const MainSliderComponentItems = ({ item, navigation }) => {
  let count = 0;
  let isWorked = false;

  return (
    <View style={{ width: 150, marginLeft: 5, marginRight: 5 }}>
      <CustomImage
        isBackground={true}
        width={150}
        height={100}
        radius={8}
        image={item?.image}
      >
        <View style={{ width: 150, height: 100 }}>
          <View style={{ ...styles.tagInfo, ...{ left: 5 } }}>
            <Row>
              <CustomText selfCenter color={"#fff"}>
                {item?.score || 100}
              </CustomText>

              <Icon
                dark={require("../../../assets/icons/heart-icon.png")}
                light={require("../../../assets/icons/heart-icon.png")}
                style={{ width: 10, height: 10, marginTop: 3, marginLeft: 3 }}
              />
            </Row>
          </View>
        </View>

        <View style={{ ...styles.tagInfo, ...{ right: 5 } }}>
          <Row>
            <CustomText selfCenter color={"#fff"}>
              {item?.userScoreCount || 100}
            </CustomText>

            <Icon
              dark={require("../../../assets/icons/eye.png")}
              light={require("../../../assets/icons/eye.png")}
              style={{ width: 10, height: 10, marginTop: 3, marginLeft: 3 }}
            />
          </Row>
        </View>
      </CustomImage>
      <TouchableOpacity
        onPress={() => {
          count++;
          setTimeout(async () => {
            if (count > 1 && !isWorked) {
              await addRunCountService(item?._id);
              await gameLinkMaker(item, navigation);

              isWorked = true;
            } else if (count <= 1 && !isWorked) {
              navigation.navigate("Game Post", { id: item._id });
              isWorked = true;
            }
          }, 300);
          setTimeout(() => {
            isWorked = false;
            count = 0;
          }, 500);
          //
        }}
      >
        <LinearGradient
          colors={["#E7961B", "#FFDC22"]}
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
        </LinearGradient>
      </TouchableOpacity>
      <CustomText selfCenter fontSize={14} color={"#fefefe"} top={10}>
        {item?.title}
      </CustomText>

      <View style={styles.categoryContainer}>
        <CustomText style={{marginRight:5}} selfCenter>{item?.category?.categoryId?.title}</CustomText>
        <CustomImage
          aspect={1 / 1}
          width={25}
          height={25}
          radius={100}
          image={item?.image}
        />
      </View>
    </View>
  );
};
export default MainSliderComponentItems;

const styles = StyleSheet.create({
  tagUserContainer: {
    backgroundColor: "#BAF3FD",
    padding: 3,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    top: 5,
    paddingHorizontal: 4,
    height: 20,
    position: "absolute",
    left: 5,
  },
  tagInfo: {
    backgroundColor: "#3E4148E5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    opacity: 0.9,
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    alignSelf: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    borderRadius: 4,
    paddingHorizontal: 5,
    justifyContent: "flex-end",
    alignContent: "flex-end",
    minWidth: 50,
    borderRadius: 4,
    paddingVertical: 3,
    marginTop: 5,
    marginBottom: 10,
  },
});
