import { Dimensions, FlatList, View } from "react-native";
import {
  primaryColor,
  redColor,
  yellowColor,
} from "../../../appsetting/appsettingColor";
import { border } from "../../../appsetting/styleSetting";
import SpaceStyle from "../../../style/SpaceStyle";
import { CenterStyled, Row, SpaceBetween } from "../../../style/uiUtil";
import CustomCard from "../../CustomCard/CustomCard";
import CustomImage from "../../CustomImage/CustomImage";
import BadgeText from "../../text/BadgeText";
import CustomText from "../../text/CustomText";

const LeaderboardComponent = ({
  game,
  leaderboards,
  isShowTopThree = true,
}) => {
  if (game?.leaderboards) {
    leaderboards = leaderboards = game?.leaderboards;
  }
  const windowWidth = Dimensions.get("window").width;
  return (
    <View style={{ minHeight: 400 }}>
      {isShowTopThree && (
        <CenterStyled>
          <Row>
            <SpaceStyle left={10} right={10} top={20}>
              <View style={{ width: windowWidth / 4 }}>
                <CustomImage
                  image={leaderboards[0]?.userId?.profileImage}
                  width={4}
                  aspect={1 / 1}
                  linkUserId={leaderboards[0]?.userId?._id}
                  radius={80}
                />
                <SpaceStyle top={10}>
                  <CustomCard>
                    <CustomText width={6.7}>
                      {leaderboards[0]?.userId?.userName}
                    </CustomText>
                  </CustomCard>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      display: "flex",
                    }}
                  >
                    <CustomText>امتیاز {leaderboards[0]?.score}</CustomText>
                    <BadgeText color={redColor}>2</BadgeText>
                  </View>
                </SpaceStyle>
              </View>
            </SpaceStyle>
            <SpaceStyle left={10} right={10} top={20}>
              <View style={{ width: windowWidth / 4 }}>
                <CustomImage
                  image={leaderboards[0]?.userId?.profileImage}
                  width={4}
                  linkUserId={leaderboards[0]?.userId?._id}
                  aspect={1 / 1}
                  radius={80}
                />
                <SpaceStyle top={10}>
                  <CustomCard>
                    <CustomText width={6.7}>
                      {leaderboards[0]?.userId?.userName}
                    </CustomText>
                  </CustomCard>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      display: "flex",
                    }}
                  >
                    <CustomText>امتیاز {leaderboards[0]?.score}</CustomText>
                    <BadgeText color={yellowColor}>1</BadgeText>
                  </View>
                </SpaceStyle>
              </View>
            </SpaceStyle>
            <SpaceStyle left={10} right={10} top={20}>
              <View style={{ width: windowWidth / 4 }}>
                <CustomImage
                  image={leaderboards[0]?.userId?.profileImage}
                  width={4}
                  linkUserId={leaderboards[0]?.userId?._id}
                  aspect={1 / 1}
                  radius={80}
                />
                <SpaceStyle top={10}>
                  <CustomCard>
                    <CustomText width={6.7}>
                      {leaderboards[0]?.userId?.userName}
                    </CustomText>
                  </CustomCard>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      display: "flex",
                    }}
                  >
                    <CustomText>امتیاز {leaderboards[0]?.score}</CustomText>
                    <BadgeText color={primaryColor}>3</BadgeText>
                  </View>
                </SpaceStyle>
              </View>
            </SpaceStyle>
          </Row>
        </CenterStyled>
      )}
      {leaderboards?.length >= 1 && (
        <SpaceStyle top={20}>
          <CustomCard>
            <FlatList
                showsHorizontalScrollIndicator={false}

              keyExtractor={(item) => item._id}
              data={leaderboards}
              renderItem={({ item, index }) => (
                <SpaceStyle bottom={10}>
                  <CustomCard color={"#1c1c1d"} paddingHorizontal={40}>
                    <SpaceBetween>
                      <View
                        style={{
                          alignSelf: "center",
                        }}
                      >
                        <View
                          style={{
                            borderRadius: border,
                            borderWidth: 2,
                            borderColor: "#8f8f91",
                            width: 35,
                            height: 35,
                            alignSelf: "center",
                          }}
                        >
                          <CustomText
                            color={"#8f8f91"}
                            style={{ alignSelf: "center", marginTop: 5 }}
                          >
                            {index + 1}
                          </CustomText>
                        </View>
                      </View>
                      <View>
                        <Row>
                          <View style={{ alignSelf: "center" }}>
                            <SpaceStyle right={10} left={10}>
                              <CustomText>{item?.userId?.userName}</CustomText>
                              <CustomText
                                style={{ fontSize: 8 }}
                                color={"#a0a09e"}
                              >
                                امتیاز {item?.score}
                              </CustomText>
                            </SpaceStyle>
                          </View>
                          <CustomImage
                            aspect={1 / 1}
                            width={10}
                            radius={80}
                            height={10}
                            image={item?.userId?.profileImage}
                            linkUserId={item?.userId?._id}
                          />
                        </Row>
                      </View>
                    </SpaceBetween>
                  </CustomCard>
                </SpaceStyle>
              )}
            />
          </CustomCard>
        </SpaceStyle>
      )}
    </View>
  );
};
export default LeaderboardComponent;
