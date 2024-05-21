import { FlatList, View } from "react-native";
import { Rating } from "react-native-ratings";
import SpaceStyle from "../../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../../style/uiUtil";
import CustomCard from "../../CustomCard/CustomCard";
import CustomImage from "../../CustomImage/CustomImage";
import CustomText from "../../text/CustomText";

const HorizontalCommentComponent = ({ id, commentsData, navigation }) => {
  return (
    <>
      <FlatList
          showsHorizontalScrollIndicator={false}

        keyExtractor={(item) => item._id}
        data={commentsData?.comments}
        inverted={true}
        renderItem={({ item }) => (
          <SpaceStyle top={10} bottom={10}>
            <CustomCard>
              <SpaceBetween>
                <CustomText>{item?.createdAt}</CustomText>
                <Row>
                  <View>
                    <CustomText>{item?.creator?.fullName}</CustomText>
                    <Rating
                      value={item?.score}
                      ratingColor={yellowColor}
                      ratingBackgroundColor="#ffffff"
                      readonly
                      tintColor="#0E0D0C"
                      defaultRating={item?.score}
                      imageSize={15}
                      style={{ paddingVertical: 10 }}
                    />
                  </View>
                  <CustomImage
                    aspect={1 / 1}
                    width={9}
                    radius={80}
                    image={item.creator.userId.profileImage}
                    linkUserId={item?.creator?.userId?._id}
                  />
                </Row>
              </SpaceBetween>
              <SpaceStyle top={10}>
                <CustomText width={1.2} lines={10}>
                  {item?.comment}
                </CustomText>
              </SpaceStyle>
            </CustomCard>
          </SpaceStyle>
        )}
      />
    </>
  );
};
export default HorizontalCommentComponent;
