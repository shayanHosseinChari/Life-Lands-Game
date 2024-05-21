import { View, FlatList, Dimensions } from "react-native";
import { CenterStyled, Hr } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { useTheme } from "@react-navigation/native";
import CustomImage from "../CustomImage/CustomImage";

const HorizontalRoomUserShowComponent = ({ list, title }) => {
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;

  return (
    <>
      {list?.length > 0 && (
        <>
          <CenterStyled>
            <View>
              <CustomText
                selfCenter
                fontSize={15}
                top={5}
                color={colors.primary}
                bottom={10}
              >
                {title}
              </CustomText>
              <FlatList
                  showsHorizontalScrollIndicator={false}

                style={{ width, alignSelf: "center" }}
                keyExtractor={(item) => item._id}
                numColumns={6}
                data={list}
                renderItem={({ item }) => (
                  <View style={{ width: width / 6 }}>
                    <CustomImage
                      linkUserId={item?.userId}
                      image={item?.profile}
                      width={8}
                      aspect={1 / 1}
                      radius={100}
                      selfCenter
                      styles={{
                        borderColor: colors.primary,
                        borderWidth: 2,
                      }}
                      height={50}
                    />
                    <CustomText selfCenter>{item?.fullName}</CustomText>
                  </View>
                )}
              />
            </View>
          </CenterStyled>
          <Hr />
        </>
      )}
    </>
  );
};
export default HorizontalRoomUserShowComponent;
