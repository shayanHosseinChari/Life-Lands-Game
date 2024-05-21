import { StyleSheet, Text, View } from "react-native";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { CenterStyled, Hr, Row } from "../../style/uiUtil";
import { LinearGradient } from "expo-linear-gradient";
import SpaceStyle from "../../style/SpaceStyle";
import { Icon } from "../../appsetting/icons";
import { yellowColor } from "../../appsetting/appsettingColor";

const WGamesStoreItemomponent = ({ store }) => {
  return (
    <View>
      <SpaceStyle right={10} left={10} top={10} bottom={10}>
        <CustomImage
          image={require("../../../assets/icons/Union.png")}
          width={110}
          height={178}
          isLocalAsset={true}
          isBackground={true}
          resizeMode={"cover"}
          styles={{
            alignContent: "center",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <View style={[style.awardTopIcon, { position: "absolute", top: -5, right: 0, flexDirection: 'row', zIndex: 10 }]}>
            <Icon
              dark={require("../../../assets/icons/shopping-cart.png")}
              light={require("../../../assets/icons/shopping-cart.png")}
              style={{
                width: 12,
                height: 12,

              }}
            />
            <Text style={{ fontSize: 10, color: '#fff', marginLeft: 2 }}>130</Text>
          </View>
          <CenterStyled width={178}>
            <LinearGradient
              colors={["#65AEBD", "#A6DEEA", "#AE90DE"]}
              style={{
                padding: 13,
                borderRadius: 8,
                width: 61,
                height: 61,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <CustomImage
                aspect={1 / 1}
                image={"game-file-1706000175519.png"}
                width={46}
                height={46}
              />
            </LinearGradient>
          </CenterStyled>
          <CustomText selfCenter fontSize={14} top={10}>
            عنوان محصول
          </CustomText>
          <SpaceStyle top={5}>
            <Row>
              <CustomText fontSize={9} selfCenter right={5}>
                Game Name
              </CustomText>
              <CustomImage
                aspect={1 / 1}
                image={"game-file-1705429306928.webp"}
                width={16}
                height={16}
                radius={100}
              />
            </Row>
          </SpaceStyle>
          <LinearGradient
            colors={["#B539E1", "#39BECD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 1.5 }}
            style={{
              borderRadius: 8,
              width: 91,
              height: 34,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Row>
              <CustomText color={yellowColor} selfCenter>
                خرید
              </CustomText>
              <View
                style={{
                  width: 1,
                  height: 20,
                  backgroundColor: "#FDC5574D",
                  alignSelf: "center",
                  marginHorizontal: 5,
                }}
              ></View>
              <CustomText selfCenter right={5} color={yellowColor}>
                200
              </CustomText>
              <Icon
                dark={require("../../../assets/icons/dollar.png")}
                light={require("../../../assets/icons/dollar.png")}
                style={{ width: 16, height: 16, alignSelf: "center" }}
              />
            </Row>
          </LinearGradient>
        </CustomImage>
      </SpaceStyle>
    </View>
  );
};
export default WGamesStoreItemomponent;


const style = StyleSheet.create({
  awardTopIcon: {
    color: "#fff",
    backgroundColor: "#83A3C8",
    padding: 1,
    paddingHorizontal: 3,
    borderRadius: 3
  }
})