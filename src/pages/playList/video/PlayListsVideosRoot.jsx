import { Fragment, useEffect } from "react";

const PlayListsVideosRoot = ({ route }) => {
  const playlistId = route.params.id;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {};
  return <Fragment></Fragment>;
};
export default PlayListsVideosRoot;
