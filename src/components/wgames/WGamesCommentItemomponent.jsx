import { StyleSheet, View } from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import CustomText from "../text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";

const WGamesCommentItemomponent = ({ comment }) => {
  return (
    <View style={styles.commentContainer}>
      <Row>
        <SpaceStyle right={10}>
          <CustomText>{comment?.creator?.userId?.userName}</CustomText>
          <CustomText>{comment?.confirmDate.substring(0, 10)}</CustomText>
        </SpaceStyle>
        <CustomImage
          aspect={1 / 1}
          image={comment?.creator?.userId?.profileImage}
          width={32}
          height={32}
          radius={100}
        />
      </Row>
      <CustomText lines={2} fontSize={12} top={10}>{comment?.comment}</CustomText>

      <SpaceStyle top={10}>
        <SpaceBetween>
          <Row>
            <Icon
              dark={require("../../../assets/icons/heart-icon.png")}
              light={require("../../../assets/icons/heart-icon.png")}
              style={{
                width: 16,
                height: 16,
                alignSelf: "center",
                marginRight: 5,
              }}
            />
            <CustomText selfCenter>{comment?.score}</CustomText>

            <Icon
              dark={require("../../../assets/icons/repeat.png")}
              light={require("../../../assets/icons/repeat.png")}
              style={{
                width: 20,
                height: 20,
                alignSelf: "center",
                marginLeft: 10,
                marginRight: 5
              }}
            />
            <CustomText selfCenter>{comment?.score}</CustomText>
          </Row>
          <Row styles={{backgroundColor:"#17181A40",width:"70%", padding:5,borderRadius:50}}>
            <View style={{ flexDirection: "row" }}>
              <CustomText style={{ marginRight: 5 }}>عنوان محتوای ریپلای شده</CustomText>
              <CustomImage
                aspect={1 / 1}
                image={comment?.creator?.userId?.profileImage}
                width={20}
                height={20}
                radius={100}
              />
            </View>
          </Row>
        </SpaceBetween>
      </SpaceStyle>
    </View>
  );
};
export default WGamesCommentItemomponent;
const styles = StyleSheet.create({
  writeContainer: {
    backgroundColor: "#57406F",
    borderRadius: 100,
    marginHorizontal: 10,
  },
  commentContainer: {
    backgroundColor: "#3A3652",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
