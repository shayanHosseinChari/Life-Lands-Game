import { Linking, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import CustomText from "../components/text/CustomText";

import * as React from "react";

const Test = () => {
  React.useEffect(() => {
    getFileData();
  }, []);
  const getFileData = async () => {
    // const downloadResumable = FileSystem.createDownloadResumable(
    //   "http://185.105.239.182:4400/upload/com.lifelands.puzzle.apk",
    //   FileSystem.documentDirectory + "com.lifelands.puzzle.apk",
    //   {},
    //   callback
    // );
    // const { uri } = await downloadResumable.downloadAsync();
    // console.log(uri);
    // saveFile(uri);
    Linking.openURL(
      "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540javad.jh%252Flifelandnewe/com.lifelands.puzzle.apk"
    );
  };
  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    console.log(progress);
  };
  const saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY_WRITE_ONLY
    );
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };
  return <CustomText>sdcsd</CustomText>;
};
export default Test;
const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: 1000,
    height: 800,
  },
});
