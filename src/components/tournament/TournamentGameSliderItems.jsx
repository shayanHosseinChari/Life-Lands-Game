import React from 'react';
import { View, TouchableOpacity } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";

const TournamentGameSliderItems = ({ item, navigation }) => {
    let count = 0;
    let isWorked = false;

    return (
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
            }}
        >
            <View style={{ width: 120, height: 150, marginLeft: 5, marginRight: 5, position: "relative" }}>
                <CustomImage
                    aspect={1 / 1}
                    width={120}
                    height={120}
                    radius={8}
                    image={item.image}
                    resizeMode={"cover"}
                    styles={{ position: "absolute", top: 0, zIndex: 20 }}
                />
                <CustomText selfCenter fontSize={13} color={"#fefefe"} top={125}>
                    {item?.title}
                    
                </CustomText>
            </View>
        </TouchableOpacity>
    );
};
export default TournamentGameSliderItems;