import { useState, useEffect } from "react";
import { usersChannelsFollowService } from "../../service/ChannelFollowService";
import ChannelsComponent from "../../components/channel/ChannelsComponent";
import HeaderComponent from "../../components/layout/HeaderComponent";
import SpaceStyle from "../../style/SpaceStyle";
const UsersChannelFollowsPage = ({ route }) => {
  const [channels, setChannels] = useState([]);
  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 60,
    userId: route?.params?.userId,
  });
  useEffect(() => {
    getChannels();
  }, [filter]);
  const getChannels = async () => {
    const {
      data: { data: res },
    } = await usersChannelsFollowService(filter);
    setChannels(res);
  };
  return (
    <>
      <HeaderComponent hasBack={true} title={"کانال"} />
      <SpaceStyle top={10}>
        <ChannelsComponent channels={channels} setChannels={setChannels} />
      </SpaceStyle>
    </>
  );
};
export default UsersChannelFollowsPage;
