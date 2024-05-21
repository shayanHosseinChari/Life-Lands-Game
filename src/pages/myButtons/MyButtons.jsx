import { View, ScrollView ,Text} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import PageWrapper from '../../../src/components/loading/PageWrapper'
import CustomText from '../../../src/components/text/CustomText'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import SpaceStyle from '../../style/SpaceStyle'
import CustomImage from '../../../src/components/CustomImage/CustomImage'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import HeaderCategoryComponent from '../../../src/components/share/HeaderCategoryComponent'
import { getUsersDownloadDepartmentService } from '../../service/UserService'

export default function MyButtons({ route }) {
    const navigation = useNavigation()
    const [isLoadingState, setIsLoadingState] = useState(true);
    const [allData, setAllData] = useState([]);
    const [fillters, setFillters] = useState({
        pageId: 1,
        eachPerPage: 30,
        sort: "_id",
    });

    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        getData()
    }, [fillters])

    const refreshPage = useCallback(() => {
        setAllData([])
        setFillters({
            pageId: 1,
            eachPerPage: 30,
        })
        getData()
    }, [])

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

    const getData = useCallback(async () => {
        setIsLoadingState(true);

        const { data: res } = await getUsersDownloadDepartmentService({
            department: route?.params?.department
        });
        setAllData(res.data);
        setTotalCount(res.data.total);
        setIsLoadingState(false);
    }, [])

    return (
        <>
            {/* <HeaderCategoryComponent title={route?.params?.title} /> */}
            <ScrollView>
                    {/* <Text style={{color:"red"}}>
                        hello world
                    </Text> */}
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{ alignSelf: "center" }}
                        keyExtractor={(item) => item._id}
                        numColumns={3}
                        data={allData}
                        renderItem={({ item }) => (
                            console.log(item),
                            <TouchableOpacity onPress={() => navigateToPost(item)}>
                                <SpaceStyle right={10} left={10}>
                                    <CustomImage
                                        top={15}
                                        aspect={1 / 1}
                                        width={3.6}
                                        image={item?.image || item?.post?.image || item?.channel?.image}
                                    />
                                    <CustomText top={5} selfCenter width={4}>
                                        {item.post?.title || item.title}
                                    </CustomText>
                                </SpaceStyle>
                            </TouchableOpacity>
                        )}
                    />
                    {allData.length < totalCount && (
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity onPress={() => setFillters(currentFillters => ({
                                ...currentFillters,
                                pageId: currentFillters.pageId + 1,
                            }))}>
                                <CustomText selfCenter fontSize={12} style={{ backgroundColor: "#282828", padding: 15, width: 150, borderRadius: 10, textAlign: "center", margin: 20, }}>بارگذاری بیشتر</CustomText>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
        </>
    )
}
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