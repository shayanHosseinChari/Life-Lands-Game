import { LinearGradient } from "expo-linear-gradient";
import CustomImage from "../CustomImage/CustomImage";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import CustomButton from "../CustomButton/CustomButton";
import { useNavigation, useTheme } from "@react-navigation/native";
import CustomText from "../text/CustomText";

const ActiveMediaItemComponent = ({
  banner,
  loginText,
  title,
  description,
  icon,
  navigate,
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <CustomImage
      isLocalAsset={true}
      isBackground={true}
      bottom={4}
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
        colors={["transparent", "#141e29"]}
      >
        <SpaceBetween>
          <View>
            <SpaceStyle left={10}>
              <CustomButton
                color={"#25263a"}
                borderRadius={10}
                styles={{
                  borderWidth: 2,
                  borderColor: "#464893",
                }}
                width={100}
                onClick={() => navigation.navigate(navigate)}
              >
                {loginText}
              </CustomButton>
            </SpaceStyle>
          </View>
          <View>
            <Row>
              <View>
                <CustomText fontSize={14}>{title}</CustomText>
                <CustomText color={colors.lightTextColor}>
                  {description}
                </CustomText>
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
export default ActiveMediaItemComponent;
