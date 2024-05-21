import { View } from "react-native";
import PageWrapper from "../../components/loading/PageWrapper";
import { useEffect, useState } from "react";
import { getAllGamesService } from "../../service/PostService";
import GamesComponent from "../../components/home/GamesComponent";
import HeaderComponent from "../../components/layout/HeaderComponent";
import WGamesTopMenu from "../../components/wgames/WGamesTopMenu";
import SpaceStyle from "../../style/SpaceStyle";
import { mobileWGamesPageServer } from "../../service/MobileService";
import MiniGameComponent from "../../components/wgames/MiniGameComponent";
import MainGamesComponent from "../../components/wgames/MainGamesComponent";
import ConsoleGamesComponent from "../../components/wgames/ConsoleGamesComponent";
import LastGameYouPlayedComponent from "../../components/wgames/LastGameYouPlayedComponent";
import { Hr } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import UserGameListComponent from "../../components/userGame/UserGameListComponent";

const WGamesPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState();
  const [pageData, setPageData] = useState({
    mainGames: [],
    miniGames: [],
    consoleGames: [],
    lastGameYouPlayed: [],
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setIsLoading(true);
    const {
      data: { data: res },
    } = await mobileWGamesPageServer();
    setPageData(res);
    setIsLoading(false);
  };
  return (
    <>
      <HeaderComponent
        navigation={navigation}
        hasBack={route?.params?.hasBack}
        darkIcon={require("../../../assets/wgames.png")}
        lightIcon={require("../../../assets/wgames.png")}
        iconStyle={{ width: 70, height: 28.3 }}
        rightSide={
          <Icon
            dark={require("../../../assets/icons/shell2.png")}
            light={require("../../../assets/icons/shell2.png")}
            style={{ width: 25, height: 25 }}
          />
        }
      />
      <PageWrapper onRefresh={getData} isLoadingState={isLoading}>
        <SpaceStyle bottom={100}>
          <View>
            <WGamesTopMenu navigation={navigation} />
            <UserGameListComponent
              isShowGame={true}
              userGame={pageData?.userGames}
            />
            <Hr padding={0} />
            <View style={{ backgroundColor: "#17181a" }}>
              <LastGameYouPlayedComponent
                navigation={navigation}
                games={pageData?.lastGameYouPlayed}
              />
              <MainGamesComponent
                navigation={navigation}
                games={pageData?.mainGames}
              />
              <ConsoleGamesComponent
                navigation={navigation}
                games={pageData.consoleGames}
              />
              <MiniGameComponent
                navigation={navigation}
                games={pageData?.miniGames}
              />
            </View>
          </View>
        </SpaceStyle>
      </PageWrapper>
    </>
  );
};
export default WGamesPage;
