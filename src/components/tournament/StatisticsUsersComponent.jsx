import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { border } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import { SpaceAround } from "../../style/uiUtil";
import CircleInformationComponnent from "./CircleInformationComponnent";
import CopyRightComponent from "./CopyRightComponent";

const StatisticsUsersComponent = () => {
  const { colors } = useTheme();
  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      padding: 10,
      borderRadius: border,
      marginHorizontal: 10,
    },
  });
  return (
    <View style={style.container}>
      <SpaceAround minus={40}>
        <CircleInformationComponnent
          title={"+2M"}
          description={"کاربران آنلاین"}
          color={"purple"}
        />
        <CircleInformationComponnent
          title={"+2M"}
          description={"کاربران آنلاین"}
          color={"green"}
        />
        <CircleInformationComponnent
          title={"+2M"}
          description={"کاربران آنلاین"}
          color={"yellow"}
          size={"large"}
        />
        <CircleInformationComponnent
          title={"+2M"}
          description={"کاربران آنلاین"}
          color={"green"}
        />
        <CircleInformationComponnent
          title={"+2M"}
          description={"کاربران آنلاین"}
          color={"purple"}
        />
      </SpaceAround>
      <SpaceStyle top={10}>
        <CopyRightComponent />
      </SpaceStyle>
    </View>
  );
};
export default StatisticsUsersComponent;
