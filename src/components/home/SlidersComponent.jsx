import { Dimensions, FlatList, Image, View } from "react-native";
import { useEffect, useState } from "react";
import { border } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { CenterStyled } from "../../style/uiUtil";
import { LOAD_FILE } from "../../service/APIs";
import { Animated } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

const SlidersComponent = ({ sliders }) => {
  const [currectIndex, setCurrectIndex] = useState(0);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  let width = windowWidth / 1;
  sliders?.forEach((element, index) => {
    element.index = index;
  });
  
  const [pulseAnimation, setPulseAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const borderColorAnimation = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fcab0d', 'rgba(252, 171, 13, 0)'],
  });
  const sliderItem = (item) => {
    return (
      <SpaceStyle left={12} right={12} >
        <Animated.Image
          source={item.image}
          style={{
            width: windowWidth - 25,
            height: "100%",
            resizeMode: "cover",
            height: 160,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: borderColorAnimation,
          }}
          height={160}
        />
      </SpaceStyle>
    );
  };
  const onItemSwipe = ({ nativeEvent }) => {
    // below variable will give active index of the item that is visible
    const _activeSlide = Math.ceil(
      parseInt(nativeEvent.contentOffset.x) /
      parseInt(nativeEvent.layoutMeasurement.width)
    );
    setCurrectIndex(_activeSlide);
  };
  return (
    <>
      {sliders?.length !== 0 && (
        <View style={{ alignSelf: "center", height: 200 }}>
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <View style={{ height: 170 }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                getItemLayout={(data, index) => ({
                  length: width,
                  offset: width * index,
                  index,
                })}
                style={{marginTop:RFPercentage(1)}}
                onMomentumScrollEnd={onItemSwipe}
                snapToInterval={width}
                decelerationRate="fast"
                bounces={false}
                keyExtractor={(item) => item._id}
                horizontal={true}
                data={sliders}
                inverted={true}
                renderItem={({ item }) => (
                  <>
                    {item?.page ? (
                      <TouchableOpacity
                      style={{marginTop:10}}
                        onPress={() =>
                          navigation.navigate(item?.page, item.options)
                        }
                      >
                        {sliderItem(item)}
                      </TouchableOpacity>
                    ) : (
                      <>{sliderItem(item)}</>
                    )}
                  </>
                )}
              />
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={sliders}
              inverted={true}
              style={{ alignSelf: "center" }}
              renderItem={({ item, index }) => (
                <>
                  <CustomText
                    alignSelf
                    color={
                      index == currectIndex ? "#fff" : "#505050"
                    }
                    fontSize={30}
                  >
                    •
                  </CustomText>
                </>
              )}
            />
          </View>
        </View>
      )}
    </>
  );
};
export default SlidersComponent;
