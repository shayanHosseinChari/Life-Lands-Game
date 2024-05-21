import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageWrapper from '../loading/PageWrapper'
import CustomText from '../text/CustomText'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import SpaceStyle from '../../style/SpaceStyle'
import { Icon } from '../../appsetting/icons'
import { Row } from '../../style/uiUtil'
import CustomImage from '../CustomImage/CustomImage'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getCategoriesService } from '../../service/PostService'
import { LOAD_FILE } from '../../service/APIs'
import HeaderCategoryComponent from './HeaderCategoryComponent'

export default function CategoryPage({ route }) {
    const navigation = useNavigation()
    const [isLoadingState, setIsLoadingState] = useState(true);
    const [allCategoryes, setAllCategoryes] = useState([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setIsLoadingState(true);
        const getCategoryes = await getCategoriesService({
            department: (route.params.department).toLocaleLowerCase(),
            searchValue: "",
        });
        setAllCategoryes(getCategoryes?.data?.data);
        setIsLoadingState(false);
    }
    return (
        <>
            <HeaderCategoryComponent title={route.params.department=="book"?"دسته بندی کتاب":route.params.department} />
            <PageWrapper isLoadingState={isLoadingState} onRefresh={getData} >
                <ScrollView>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{ alignSelf: "center", paddingVertical: 5 }}
                        keyExtractor={(item) => item._id}
                        numColumns={3}
                        data={allCategoryes}
                        inverted={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate("Public Page", { mode: `${route.params.department} Post`, title: item.title, cid: item._id })}>
                                <SpaceStyle styles={{ backgroundColor: "#282828", borderRadius: 10, padding: 20, paddingVertical: 15, height: 135 }} right={5} left={5} top={5} bottom={5}>
                                    <View style={{ backgroundColor: "#343434", padding: 15, borderRadius: 9999 }}>
                                        <Icon
                                            dark={{ uri: LOAD_FILE + item.icon }}
                                            light={{ uri: LOAD_FILE + item.icon }}
                                            style={{ width: 35, height: 35 }}
                                        />
                                    </View>
                                    <CustomText top={5} width={6} style={{ textAlign: "center" }} lines={2} fontSize={12} selfCenter >
                                        {item.title}
                                    </CustomText>
                                </SpaceStyle>
                            </TouchableOpacity>
                        )}
                    />
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