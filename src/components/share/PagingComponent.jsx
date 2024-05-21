import { TouchableOpacity } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { CenterStyled } from "../../style/uiUtil";
import CustomText from "../text/CustomText";

const PagingComponent = ({ setPageId, pageId }) => {
  return (
    <SpaceStyle bottom={10} top={10}>
      <CenterStyled>
        <TouchableOpacity
          onPress={() => {
            setPageId(pageId + 1);
          }}
        >
          <CustomText>بیشتر...</CustomText>
        </TouchableOpacity>
      </CenterStyled>
    </SpaceStyle>
  );
};
export default PagingComponent;
