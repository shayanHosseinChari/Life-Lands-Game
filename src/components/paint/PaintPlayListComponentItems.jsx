import { StyleSheet, View } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import { Row } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import CustomText from "../text/CustomText";

const PaintPlayListComponentItems = ({ item, navigation }) => {
  let count = 0;
  let isWorked = false;

  return (
    <View style={{ width: 150, marginLeft: 16 }}>
      <CustomImage
        isBackground={true}
        aspect={1 / 1}
        width={150}
        height={100}
        radius={8}
        image={item?.image}
      >
        <View style={styles.rightBar}>
          <Row>
            <CustomText selfCenter color={"#fff"}>
              {50}
            </CustomText>

            <Icon
              dark={require("../../../assets/icons/eye.png")}
              light={require("../../../assets/icons/eye.png")}
              style={{ width: 13, height: 13, marginTop: 1, marginLeft: 3 }}
            />
          </Row>
        </View>

        <View style={{ ...styles.tagGameInfo }}>
          <Row styles={{ flexDirection: "column" }}>
            <CustomText selfCenter color={"#fff"}>
              {5}
            </CustomText>

            <Icon
              dark={require("../../../assets/icons/music-library.png")}
              light={require("../../../assets/icons/music-library.png")}
              style={{ width: 18, height: 18, marginTop: 2 }}
            />
          </Row>
        </View>
      </CustomImage>
      <CustomText selfCenter fontSize={14} color={"#fefefe"} top={10}>
        {item?.title}
      </CustomText>

      <View style={styles.categoryContainer}>
        <CustomText style={{ marginRight: 5 }} selfCenter>{item?.category?.categoryId?.title}</CustomText>
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
export default PaintPlayListComponentItems;

const styles = StyleSheet.create({
  tagUserContainer: {
    backgroundColor: "#BAF3FD",
    padding: 3,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    top: 10,
    paddingHorizontal: 7,
    height: 20,
    position: "absolute",
    left: 10,
  },
  tagGameInfo: {
    backgroundColor: "#3E4148",
    paddingHorizontal: 8,
    paddingVertical: 4,
    opacity: 0.7,
    height: 100,
    width: 45,
    right: -50,
    borderTopRightRadius: 8,
    borderBottomRightRadius:8,
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
  rightBar:{
    position: "absolute", left: 5, bottom: 5, backgroundColor: "#3E4148", opacity: 0.7, padding: 5, borderRadius: 5
  }
});
