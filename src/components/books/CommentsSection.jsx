import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import CustomInput from "../CustomInput/CustomInput";
import CustomText from "../text/CustomText";
import { Row } from "../../style/uiUtil";
import CommentsSectionItem from "./CommentsSectionItem";
import { Icon } from "../../appsetting/icons";

const CommentsSection = ({ comments }) => {
    return (
        <View style={{ marginTop: 30 }}>
            <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                <Row>
                    <CustomText fontSize={17} style={{ marginRight: 10 }}>
                        نظرات (22)
                    </CustomText>
                    <Icon
                        dark={require("../../../assets/icons/message.png")}
                        light={require("../../../assets/icons/message.png")}
                        style={{
                            width: 28,
                            height: 28,
                            alignSelf: "center",
                        }}
                    />
                </Row>
            </View>
            <View style={styles.writeContainer}>
                <Row>
                    <CustomText fontSize={12} selfCenter left={10}>
                        ارسال
                    </CustomText>
                    <CustomInput
                        border={100}
                        inputBgColor={"#105E5C"}
                        placeholder="نظر خودت رو برامون بنویس"
                        minWidth={"87%"}
                    />
                </Row>
            </View>
            <View style={{ paddingTop: 10 }}>
                <ScrollView nestedScrollEnabled style={{ height: 500 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}

                        keyExtractor={(item) => item._id}
                        data={comments}
                        renderItem={({ item }) => <CommentsSectionItem comment={item} />}
                    />
                    <Row styles={{ justifyContent: "center" }}>
                        <CustomText fontSize={14} style={{ color: "#8878EF", marginBottom:10 }}>
                            مشاهده همه نظرات
                        </CustomText>
                    </Row>
                </ScrollView>
            </View>
        </View>
    );
};
export default CommentsSection;
const styles = StyleSheet.create({
    writeContainer: {
        color:"white",

        backgroundColor: "#105E5C",
        borderRadius: 5,
        marginHorizontal: 10,
    },
});

