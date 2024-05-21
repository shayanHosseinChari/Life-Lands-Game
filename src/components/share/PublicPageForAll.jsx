import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import HeaderPublicComponent from './HeaderPublicComponent'
import PageWrapper from '../loading/PageWrapper'
import CustomText from '../text/CustomText'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import SpaceStyle from '../../style/SpaceStyle'
import { Icon } from '../../appsetting/icons'
import { Row } from '../../style/uiUtil'
import CustomImage from '../CustomImage/CustomImage'
import { StyleSheet } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import PublicPageHeader from './PublicPageHeader'
import { publicBooksService, publicGamesService, publicPaintsService, publicVideosService } from '../../service/PostService'
import { mobileRadioPageServer } from '../../service/MobileService'


export default function PublicPageForAll({ route }) {
    const navigation = useNavigation()
    const isFocused = useIsFocused();

    const [isLoadingState, setIsLoadingState] = useState(true);
    const [allData, setAllData] = useState([]);
    const [showData, setShowData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [fillters, setFillters] = useState({
        pageId: 1,
        eachPerPage: 20,
        categoryId: route.params.cid ? route.params.cid : "",
        sort: route.params.sort ? route.params.sort : "_id",
    });

    useEffect(() => {
        setFillters({
            pageId: 1,
            eachPerPage: 20,
            categoryId: route.params.cid ? route.params.cid : "",
            sort: route.params.sort ? route.params.sort : "_id",
        })
    }, [route.params.cid, route.params.sort])

    useEffect(() => {
        setShowData(allData)
    }, [allData])

    const filterData = useCallback((input) => {
        const filtered = allData.filter(item => item.title.includes(input));
        setShowData(filtered);
    }, [allData]);

    useEffect(() => {
        getData()
    }, [fillters])

    useEffect(() => {
        setAllData([])
    }, [isFocused])

    const refreshPage = useCallback(() => {
        setAllData([])
        setFillters({
            pageId: 1,
            eachPerPage: 20,
        })
        getData()
    }, [])
    
    const getData = useCallback(async () => {
        setIsLoadingState(true);

        if (route.params.mode.toLowerCase() === "game post") {
            const gameData = await publicGamesService(fillters);
            console.log(gameData.data)
            setAllData(gameData.data.data.games);
            setTotalCount(gameData?.data?.data?.total || 0);
        } else if (route.params.mode.toLowerCase() === "book post") {
            const newestBooksRes = await publicBooksService(fillters);
            setAllData([...allData, ...newestBooksRes?.data?.data?.books])
            setTotalCount(newestBooksRes?.data?.data?.total || 0);
        } else if (route.params.mode.toLowerCase() === "video post") {
            const newestVideoRes = await publicVideosService(fillters);
            setAllData([...allData, ...newestVideoRes?.data?.data?.videos]);
            setTotalCount(newestVideoRes?.data?.data?.total || 0);
        } else if (route.params.mode.toLowerCase() === "voice post") {
            const newestRadioRes = await mobileRadioPageServer(fillters);
            setAllData([...allData, ...newestRadioRes?.data?.data?.newestRadio]);
            setTotalCount(newestRadioRes?.data?.data?.total || 0);
        } else if (route.params.mode.toLowerCase() === "paint viewer") {
            const newestPaintRes = await publicPaintsService(fillters);
            setAllData([...allData, ...newestPaintRes?.data?.data?.paints]);
            setTotalCount(newestPaintRes?.data?.data?.total || 0);
        }

        setIsLoadingState(false);
    }, [fillters])

    return (
        <>
            <PublicPageHeader title={route?.params?.title} department={route?.params?.mode?.split(' ')[0]} filterData={filterData} />
            <PageWrapper isLoadingState={isLoadingState} onRefresh={refreshPage} >
                {/* <FlatList
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    data={tags.share}
                    renderItem={({ item }) => (
                        <>
                            <CustomText>item</CustomText>
                        </>
                    )}
                /> */}
                <ScrollView>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{ alignSelf: "center" }}
                        keyExtractor={(item) => item._id}
                        numColumns={3}
                        data={showData}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate(route?.params?.mode, { id: item._id })}>
                                <SpaceStyle right={10} left={10}>
                                    {
                                    
                                    /* <View style={styles.tagUserContainer}>
                                        <Row>
                                            <Icon
                                                dark={require("../../../assets/icons/tag-user.png")}
                                                light={require("../../../assets/icons/tag-user.png")}
                                                style={{ width: 12, height: 12, marginRight: 2 }}
                                            />

                                            <CustomText color={"#1E6775"}>{item?.downloadCount || 10}</CustomText>
                                        </Row>
                                    </View> */
                                    }
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
                                ... currentFillters,
                                pageId: currentFillters.pageId + 1,
                            }))}>
                            
                                <CustomText selfCenter fontSize={12} style={{ backgroundColor: "#282828", padding: 15, width: 150, borderRadius: 10, textAlign: "center", margin: 20, }}>بارگذاری بیشتر</CustomText>
                            
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </PageWrapper>
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