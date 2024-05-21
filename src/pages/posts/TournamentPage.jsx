import { FlatList, View } from "react-native";
import CustomCard from "../../components/CustomCard/CustomCard";
import CustomImage from "../../components/CustomImage/CustomImage";
import ScoreComponent from "../../components/text/ScoreComponent";
import CustomText from "../../components/text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import HeaderComponent from "../../components/layout/HeaderComponent";

const TournamentPage = (props) => {
  let tournament = props?.route?.params?.item;
  return (
    <View>
      <HeaderComponent
        hasBack={true}
        darkIcon={require("../../../assets/icons/IMPROVE2.png")}
        lightIcon={require("../../../assets/icons/Light/leaderboard2light2.png")}
        navigation={props.navigation}
        title={"تورنومنت"}
      />
      <SpaceStyle right={20} left={20} top={10}>
        <CustomCard>
          <SpaceStyle right={20} left={20}>
            <SpaceStyle bottom={5} top={5}>
              <SpaceBetween>
                <CustomText>
                  نوع : {tournament?.isPrivate ? "خصوصی" : "عمومی"}
                </CustomText>
                <CustomText>عنوان : {tournament?.title}</CustomText>
              </SpaceBetween>
            </SpaceStyle>
            <SpaceStyle bottom={5} top={5}>
              <SpaceBetween>
                <CustomText>کد : {tournament?.code}</CustomText>
                <CustomText>
                  ورودی :{" "}
                  {tournament?.price === 0 ? "رایگان" : tournament?.price}
                </CustomText>
              </SpaceBetween>
            </SpaceStyle>
            <SpaceStyle bottom={5} top={5}>
              <CustomText lines={1000}>
                توضیحات : {tournament?.description}
              </CustomText>
            </SpaceStyle>
          </SpaceStyle>
        </CustomCard>
        <FlatList
            showsHorizontalScrollIndicator={false}

          keyExtractor={(item) => item?._id}
          data={tournament?.users}
          renderItem={({ item }) => (
            <SpaceStyle top={10} bottom={5}>
              <CustomCard>
                <SpaceBetween>
                  <View>
                    <SpaceStyle top={17}>
                      <ScoreComponent>{item?.score}</ScoreComponent>
                    </SpaceStyle>
                  </View>
                  <Row>
                    <View>
                      <SpaceStyle right={10} top={7}>
                        <CustomText>{item?.userId?.userName}</CustomText>
                        <CustomText>امتیاز {item?.score}</CustomText>
                      </SpaceStyle>
                    </View>
                    <CustomImage
                      aspect={1 / 1}
                      width={8}
                      radius={80}
                      height={1}
                      image={item?.userId?.profileImage}
                      linkUserId={item?.userId?._id}
                    />
                  </Row>
                </SpaceBetween>
              </CustomCard>
            </SpaceStyle>
          )}
        />
      </SpaceStyle>
    </View>
  );
};
export default TournamentPage;
