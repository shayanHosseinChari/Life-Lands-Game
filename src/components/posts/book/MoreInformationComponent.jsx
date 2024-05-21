import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { lightTextColor } from "../../../appsetting/appsettingColor";
import SpaceStyle from "../../../style/SpaceStyle";
import { Hr, Row, SpaceBetween } from "../../../style/uiUtil";
import CustomCard from "../../CustomCard/CustomCard";
import CustomText from "../../text/CustomText";

const MoreInformationComponent = ({ book }) => {
  const { colors } = useTheme();
  return (
    <View>
      {/* <SpaceStyle top={15}>
        <CustomCard>
          <CustomText style={{ fontSize: 17 }}>مقدمه</CustomText>
          <CustomText lines={1000}>{book?.book?.introduction}</CustomText>
        </CustomCard>
      </SpaceStyle>
      <SpaceStyle top={15}>
        <CustomCard>
          <CustomText style={{ fontSize: 17 }}>خلاصه</CustomText>
          <CustomText lines={1000}>{book?.book?.summary}</CustomText>
        </CustomCard>
      </SpaceStyle> */}

      <SpaceStyle>
        <CustomCard styles={{ backgroundColor: "#282828" }}>
          <SpaceStyle right={10} left={10} top={10} bottom={10}>
            <SpaceStyle>
              <SpaceBetween>
                <CustomText fontSize={12}>{book?.book?.publisher || "-"}</CustomText>
                <CustomText fontSize={12} color={colors.lightTextColor}>ناشر</CustomText>
              </SpaceBetween>
            </SpaceStyle>
            <Hr padding={10} color={"#535353"} width={"100%"} />
            <SpaceStyle>
              <SpaceBetween>
                <CustomText fontSize={12}>{book?.book?.translator || "-"}</CustomText>
                <CustomText fontSize={12} color={colors.lightTextColor}>مترجم</CustomText>
              </SpaceBetween>
            </SpaceStyle>
            <Hr padding={10} color={"#535353"} width={"100%"} />
            <SpaceStyle>
              <SpaceBetween>
                <CustomText fontSize={12}>{book?.book?.file?.fileSize || "-"}</CustomText>
                <CustomText fontSize={12} color={colors.lightTextColor}>حجم</CustomText>
              </SpaceBetween>
            </SpaceStyle>
            <Hr padding={10} color={"#535353"} width={"100%"} />
            <SpaceStyle>
              <SpaceBetween>
                <CustomText fontSize={12}>{book?.book?.pageCount || "-"}</CustomText>
                <CustomText fontSize={12} color={colors.lightTextColor}>صفحه</CustomText>
              </SpaceBetween>
            </SpaceStyle>
            <Hr padding={10} color={"#535353"} width={"100%"} />
            <SpaceStyle>
              <SpaceBetween>
                <CustomText fontSize={12}>{book?.book?.createdAt || "-"}</CustomText>
                <CustomText fontSize={12} color={colors.lightTextColor}>تاریخ</CustomText>
              </SpaceBetween>
            </SpaceStyle>
            <Hr padding={10} color={"#535353"} width={"100%"} />
            <SpaceStyle>
              <SpaceBetween>
                <CustomText fontSize={12}>{book?.book?.editor || "-"}</CustomText>
                <CustomText fontSize={12} color={colors.lightTextColor}>ویراستار</CustomText>
              </SpaceBetween>
            </SpaceStyle>
            <Hr padding={10} color={"#535353"} width={"100%"} />
            <SpaceStyle>
              <SpaceBetween>
                <CustomText fontSize={12}>{book?.book?.speker || "-"}</CustomText>
                <CustomText fontSize={12} color={colors.lightTextColor}>گوینده</CustomText>
              </SpaceBetween>
            </SpaceStyle>
            <Hr padding={10} color={"#535353"} width={"100%"} />
            <SpaceStyle>
              <SpaceBetween>
                <CustomText fontSize={12}>{book?.book?.imageEditor || "-"}</CustomText>
                <CustomText fontSize={12} color={colors.lightTextColor}>ویراستار تصویر</CustomText>
              </SpaceBetween>
            </SpaceStyle>
          </SpaceStyle>
        </CustomCard>
      </SpaceStyle>
    </View>
  );
};
export default MoreInformationComponent;
