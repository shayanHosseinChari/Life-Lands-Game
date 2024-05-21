import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View ,ActivityIndicator} from "react-native";
import CustomInput from "../CustomInput/CustomInput";
import CustomText from "../text/CustomText";
import { Row } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import PeronalBookPostCommentItem from "./PeronalBookPostCommentItem";
import { useNavigation } from "@react-navigation/native";
import { Axios } from "axios";
import { BASE_URL } from "../../service/APIs";
import { getValueFor } from "../../appsetting/storeConfig";
import { useState } from "react";
import { insertCommentService } from "../../service/PostService";
import { OpenToast } from "../share/OpenToast";

const PeronalBookPostComment = ({ comments, id ,department,postId}) => {
    console.log('shayan ',comments)
    const navigation = useNavigation();
    const [comment,setCommentString] = useState('')
    const [loading,setLoading] = useState(false)
    let commentData = {
        postId,
        department: department,
        comment,
        score:3
    }
    console.log('dataaaaaaaaaaaaa',commentData)
    const addComment = async()=>{
        setLoading(true)
        const { data } = await insertCommentService({
            postId,
            department: department,
            comment,
            score:3
           
          });
          setLoading(false)
          if(data){
            OpenToast('انجام شد','نظر شما با موفقیت ثبت شد','success')
          }
          console.log('comment gozashtammm ',data)
    }
   
    return (
        <View style={{ marginTop: 10 }}>
            <View style={{ marginBottom: 20 }}>
                <Row>
                    <CustomText fontSize={17} style={{ marginRight: 10 }}>
                        نظرات ({comments.comments.length})
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
                   <TouchableOpacity style={{justifyContent:"center", alignItems:"center"}} onPress={addComment}>
                   
                    {
                        loading? <ActivityIndicator color={'white'} size={20} />: <CustomText fontSize={12} selfCenter left={10}>
                        ارسال
                    </CustomText>
                    }
                  
                   </TouchableOpacity>
                    <CustomInput
                        border={100}
                        changeText={text=> setCommentString(text)}
                        inputBgColor={"#105E5C"}
                        
                        placeholder="نظر خودت رو برامون بنویس"
                        minWidth={"87%"}
                    />
                </Row>
            </View>
            {comments.comments.length > 0 ? (
                <View style={{ paddingTop: 5 }}>
                    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ height: 500 }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item._id}
                            data={comments.comments}
                            renderItem={({ item }) => <PeronalBookPostCommentItem comment={item} />}
                        />
                        <Row styles={{ justifyContent: "center" }}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Posts Comments", {
                                        id,
                                        department: "book",
                                    })
                                }
                            >
                                <CustomText fontSize={14} style={{ color: "#8878EF", marginVertical: 10 }}>
                                    مشاهده همه نظرات
                                </CustomText>
                            </TouchableOpacity>
                        </Row>
                    </ScrollView>
                </View>
            ) : (
                <View style={styles.commentContainer}>
                    <CustomText selfCenter fontSize={12}>نظری موجود نیست. اولین نظر رو بنویس!</CustomText>
                </View>
            )}
        </View>
    );
};
export default PeronalBookPostComment;
const styles = StyleSheet.create({
    writeContainer: {
        color: "white",
        backgroundColor: "#105E5C",
        borderRadius: 10,
    },
    commentContainer: {
        backgroundColor: "#105E5C",
        padding: 35,
        textAlign: "center",
        borderRadius: 10,
        marginVertical: 5,
    },
});

