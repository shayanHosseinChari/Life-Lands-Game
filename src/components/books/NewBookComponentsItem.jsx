import { StyleSheet, View } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import { Row } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import CustomText from "../text/CustomText";
import { TouchableOpacity } from "react-native";

const NewBookComponentsItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Book Post", { id: item?._id })}>
      <View style={{ width: 250, height: 160, marginHorizontal: 8 }}>
        <View style={{ backgroundColor: "#0A433F", width: 250, height: 130, position: "absolute", bottom: 0, borderRadius: 10 }} />
        <CustomImage
          isBackground={true}
          styles={{ position: 'absolute', right: 10, top: 10 }}
          width={90}
          height={120}
          radius={5}
          image={item?.image}
        />
        <View style={{ width: 140, height: 130, position: "absolute", left: 0, bottom: 0, padding: 10 }}>
          <CustomText style={{ fontSize: 12 }}>{item?.title}</CustomText>
          <CustomText style={{ fontSize: 10 }}>{item?.creator?.fullName}</CustomText>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10 }}>
            <View style={{ flexDirection: "row", marginRight: 20 }}>
              <CustomText style={{ fontSize: 10 }}>{"0"}</CustomText>
              <Icon
                dark={require("../../../assets/icons/eye.png")}
                light={require("../../../assets/icons/eye.png")}
                style={{ width: 13, height: 13, marginTop: 3, marginHorizontal: 5 }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <CustomText style={{ fontSize: 10 }}>{item?.score}</CustomText>
              <Icon
                dark={require("../../../assets/icons/heart-icon.png")}
                light={require("../../../assets/icons/heart-icon.png")}
                style={{ width: 13, height: 13, marginTop: 3, marginHorizontal: 5 }}
              />
            </View>
          </View>
          <CustomText style={{ fontSize: 10, backgroundColor: "#166A65", padding: 2, paddingHorizontal: 5, borderRadius: 5, marginTop: 12 }}>{"بامزه ها"}</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default NewBookComponentsItem;

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
    borderRadius: 4,
    opacity: 0.7,
    bottom: 10,
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
