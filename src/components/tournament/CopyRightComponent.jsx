import { View } from "react-native";
import { Row } from "../../style/uiUtil";
import CustomText from "../text/CustomText";

const CopyRightComponent = () => {
  return (
    <View
      style={{
        alignItems: "flex-start",
      }}
    >
      <Row>
        <CustomText color={"#4e3a3e"}>Powered By </CustomText>
        <CustomText color={"#821f25"}>WGames </CustomText>
      </Row>
    </View>
  );
};
export default CopyRightComponent;
