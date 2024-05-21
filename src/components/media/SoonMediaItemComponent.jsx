import { LinearGradient } from "expo-linear-gradient";
import CustomImage from "../CustomImage/CustomImage";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import CustomButton from "../CustomButton/CustomButton";
import CustomText from "../text/CustomText";
const SoonMediaItemComponent = ({ banner, title, description, icon }) => {
  return (
    <CustomImage
      isLocalAsset={true}
      bottom={4}
      isBackground={true}
      style={{
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "red",
      }}
      width={1}
      height={90}
      image={banner}
    >
      <LinearGradient
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
        }}
        start={[0, 1]}
        end={[1, 0]}
        colors={["#0000005e", "#000000"]}
      >
        <SpaceBetween>
          <View>
            <SpaceStyle left={10}>
              <CustomButton
                color={"#301325"}
                borderRadius={10}
                styles={{
                  borderWidth: 2,
                  borderColor: "#880a54",
                }}
                width={100}
              >
                به زودی...
              </CustomButton>
            </SpaceStyle>
          </View>
          <View>
            <Row>
              <View>
                <CustomText color={"#747b85"} fontSize={14}>
                  {title}
                </CustomText>
                <CustomText color={"#747b85"}>{description}</CustomText>
              </View>
              <SpaceStyle right={20} left={10} top={5}>
                {icon}
              </SpaceStyle>
            </Row>
          </View>
        </SpaceBetween>
      </LinearGradient>
    </CustomImage>
  );
};
export default SoonMediaItemComponent;
