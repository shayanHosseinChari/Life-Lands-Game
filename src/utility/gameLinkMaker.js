import { getValueFor } from "../appsetting/storeConfig";
import { LOAD_FILE, URL } from "../service/APIs";

export const gameLinkMaker = async (
  game,
  navigation,
  navigationMethodKey = "navigate"
) => {
  let expandeUrl = `token=${getValueFor()}&gameId=${game?._id}`;

  let href = "";

  if (game?.platform === "console") {
    href = `https://lifelands.ir/emulator/Emulatrix.htm?url=${LOAD_FILE}${game?.consoleUrl}&${expandeUrl}`;
  } else {
    let uri = game?.webGameUri + "?" + expandeUrl;
    href = `${URL}/upload/${uri}`;
  }
  console.log(href);

  navigation[navigationMethodKey]("Web File Viewer", {
    uri: href,
    title: game.title,
    isLandscape: game.isLandscape,
    gameId: game._id,
    token: await getValueFor(),
  });
};
