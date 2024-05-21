import { useTheme } from "@react-navigation/native";
import CustomText from "../text/CustomText";
import CustomButton from "../CustomButton/CustomButton";

const RoomStatusComponent = ({ status }) => {
  const { colors } = useTheme();
  const statusText =
    status == "waiting"
      ? "در حال عضو گیری"
      : status == "started"
      ? "رقابت شروع شد!"
      : status == "finished"
      ? "بازی تموم شد"
      : "سایر";
  const statusColor =
    status == "waiting"
      ? colors.primary
      : status == "started"
      ? colors.green
      : status == "finished"
      ? colors.red
      : colors.primary;
  return (
    <>
      <CustomButton
        borderRadius={15}
        styles={{ width: 150, alignSelf: "center", marginVertical: 10 }}
        borderColor={statusColor}
        borderWidth={1.5}
        color={colors.background}
      >
        {statusText}
      </CustomButton>
    </>
  );
};
export default RoomStatusComponent;
