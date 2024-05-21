import { StyleSheet, View ,TouchableOpacity} from "react-native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import CustomText from "../text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import { Rating } from "react-native-ratings";
// import { TouchableOpacity } from "@gorhom/bottom-sheet";
import {useNavigation} from '@react-navigation/native'

const PeronalBookPostCommentItem = ({ comment }) => {
    console.log(comment);
    const navigation = useNavigation()
  
    return (
        <View style={styles.commentContainer}>
            <SpaceBetween>
                <Rating
                    ratingCount={5}
                    ratingColor={"#D8BD14"}
                    ratingBackgroundColor="#ffffff"
                    readonly
                    startingValue={comment?.score}
                    tintColor={"#105E5C"}
                    imageSize={15}
                    style={{ paddingVertical: 2 }}
                />
                <Row>
                    <SpaceStyle right={10}>
                        <CustomText>@{comment?.creator?.userId?.userName || "تست"}</CustomText>
                        <CustomText>{comment?.createdAt}</CustomText>
                    </SpaceStyle>
                    <CustomImage
                        aspect={1 / 1}
                        image={comment?.creator?.userId?.profileImage}
                        width={32}
                        height={32}
                        radius={100}
                    />
                </Row>
            </SpaceBetween>
            <CustomText lines={2} fontSize={12} top={10}>{comment?.comment || "سلام این یک کامنت تستی برای تست نرم افزار است ممنون از توجه شما"}</CustomText>
            {/* <SpaceStyle top={10}>
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
                        <CustomText selfCenter>{comment?.score || 0}</CustomText>

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
                        <CustomText selfCenter>{0}</CustomText>
                    </Row>
                 
                </SpaceBetween>
            </SpaceStyle> */}
        </View>
    );
};
export default PeronalBookPostCommentItem

const styles = StyleSheet.create({
    writeContainer: {
        backgroundColor: "#57406F",
        borderRadius: 100,
        marginHorizontal: 10,
    },
    commentContainer: {
        backgroundColor: "#105E5C",
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
});