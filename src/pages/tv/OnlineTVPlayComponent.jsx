import { Image, View } from "react-native";
import { Icon } from "../../appsetting/icons";
import CustomCard from "../../components/CustomCard/CustomCard";
import CustomText from "../../components/text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import { SpaceBetween } from "../../style/uiUtil";

const OnlineTVPlayComponent = () => {
  return (
    <CustomCard>
      <SpaceStyle right={20} left={20}>
        <SpaceBetween>
          <View style={{ justifyContent: "center" }}>
            <CustomText style={{ fontSize: 15 }}>
              این خانه عزادار حسین (ع) است
            </CustomText>
            <CustomText color={"#686974"}>پخش زنده هیئت های مذهبی</CustomText>
          </View>

          <Icon
            style={{ width: "20%", height: 80 }}
            dark={require("../../../assets/comlogo.png")}
            light={require("../../../assets/lightlogo.png")}
          />
        </SpaceBetween>
      </SpaceStyle>
    </CustomCard>
  );
};
export default OnlineTVPlayComponent;
