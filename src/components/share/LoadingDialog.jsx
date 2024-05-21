import { View } from "react-native";
import Dialog from "react-native-dialog";
import { CenterStyled } from "../../style/uiUtil";
import CustomText from "../text/CustomText";

const LoadingDialog = ({ visibleValue }) => {
  return (
    <View>
      <Dialog.Container visible={visibleValue}>
        <Dialog.Title>
          <CustomText color={"black"}>در حال دریافت...</CustomText>
        </Dialog.Title>
      </Dialog.Container>
    </View>
  );
};
export default LoadingDialog;
