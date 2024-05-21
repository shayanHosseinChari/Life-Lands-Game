import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import { LOAD_FILE } from "../service/APIs";

export const returnFileBase64 = async (fileId, mimeType, url, onCallback) => {
  url = LOAD_FILE + url;

  //check is the file alredy downloaded or not
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    let fileUri = FileSystem.documentDirectory + fileId + ".txt";
    try {
      let fl = await FileSystem.readAsStringAsync(fileUri);
      if (fl) {
        fl = fl.substring(fl.indexOf(";"));
        fl = "data:" + mimeType + fl;
        onCallback(fl);
        return fl;
      }
    } catch (error) {
      blobToBase64(url).then(async (base64String) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
          await FileSystem.writeAsStringAsync(fileUri, base64String);
          const asset = await MediaLibrary.createAssetAsync(fileUri);
          await MediaLibrary.createAlbumAsync("Download", asset, false);
          let fl = await FileSystem.readAsStringAsync(fileUri);
          fl = fl.substring(fl.indexOf(";"));
          fl = "data:" + mimeType + fl;
          onCallback(fl);
          return fl;
        }
      });
    }
  }
};
const blobToBase64 = async (url) => {
  return new Promise(async (resolve, _) => {
    // do a request to the blob uri
    const response = await fetch(url);

    // response has a method called .blob() to get the blob file
    const blob = await response.blob();

    // instantiate a file reader
    const fileReader = new FileReader();

    // read the file
    fileReader.readAsDataURL(blob);

    fileReader.onloadend = function () {
      //console.log(fileReader.result);
      resolve(fileReader.result); // Here is the base64 string
    };
  });
};
