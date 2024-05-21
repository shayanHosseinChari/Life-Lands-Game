import * as Expo from "expo";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import { getValueFor } from "../../appsetting/storeConfig";
import {
  getAllVideos,
  insertBook,
  insertCustomizeBooks,
  insertGame,
  insertVideo,
  insertVoice,
} from "../../database/openDatabase";
import { LOAD_FILE } from "../../service/APIs";
import { getFileService } from "../../service/FileService";
import { OpenToast } from "./OpenToast";

export const savePostV2 = async (post, department, force, onAction) => {
  let file;
  let image;
  let voice;

  if (!getValueFor()) return;
  onAction(false);
  try {
    const { data } = await getFileService(
      post._id,
      department,
      undefined,
      undefined
    );

    let imageName = post.image.includes("http")
      ? post.image.substring(post.image.lastIndexOf("/"))
      : post.image;
    let ex = post.image.substring(post.image.lastIndexOf(".") + 1);
    await downloadFile(
      post.image.includes("http") ? post.image : imageName,
      imageName,
      async (fl1) => {
        image = fl1;

        file = await downloadFile(
          data?.data?.url,
          data?.data.fileId + "." + data?.data.ex,
          async (fl2) => {
            file = fl2;
            if (department === "book") {
              if (data?.data?.voiceUrl) {
                voice = await downloadFile(
                  data?.data?.voiceUrl,
                  data?.data.voiceFileId + "." + data?.data.voiceEx,
                  async (fl3) => {
                    voice = fl3;
                    await insertBook(
                      post.title,
                      post.author,
                      imageName,
                      data?.data.fileId,
                      post._id,
                      data?.data.mimetype,
                      data?.data?.ex,
                      mimetypes[ex],
                      ex,
                      data?.data?.voiceFileId,
                      data?.data?.voiceEx,
                      post.customizePages?.length > 0 ? 1 : 0,
                      force
                    );
                    if (post.customizePages?.length > 0) {
                      await insertCustomizeBooks(
                        post.customizePages,
                        post._id,
                        force
                      );
                    }
                    OpenToast("ثبت شد", "پست مورد نظر با موفقیت ثبت شد");
                  }
                );
              } else {
                insertBook(
                  post.title,
                  post.author,
                  imageName,
                  data?.data.fileId,
                  post._id,
                  data?.data.mimetype,
                  data?.data?.ex,
                  mimetypes[ex],
                  ex,
                  null,
                  null,
                  0,
                  force
                );
                OpenToast("ثبت شد", "پست مورد نظر با موفقیت ثبت شد");
              }
            } else {
              switch (department) {
                case "video":
                  insertVideo(
                    post.title,
                    department,
                    imageName,
                    data?.data.fileId,
                    force,
                    post._id,
                    data?.data.mimetype,
                    data?.data?.ex,
                    mimetypes[ex],
                    ex
                  );
                  OpenToast("ثبت شد", "پست مورد نظر با موفقیت ثبت شد");
                  break;
                case "game":
                  insertGame(
                    post.title,
                    imageName,
                    data?.data.fileId,
                    force,
                    post._id,
                    data?.data.mimetype,
                    data?.data?.ex,
                    mimetypes[ex],
                    ex,
                    post.packageName
                  );
                  OpenToast("ثبت شد", "پست مورد نظر با موفقیت ثبت شد");
                  break;
                case "voice":
                  insertVoice(
                    post.title,
                    post.playlistTitle,
                    imageName,
                    data?.data.fileId,
                    post._id,
                    data?.data.mimetype,
                    data?.data?.ex,
                    mimetypes[ex],
                    ex,
                    force
                  );
                  OpenToast("ثبت شد", "پست مورد نظر با موفقیت ثبت شد");
                  break;
              }
            }

            onAction(true);
          }
        );
      }
    );
  } catch (error) {
    onAction(true);
    OpenToast("خطا رخ داد", "خطایی در ثبت اطلاعات رخ داد ، مجدد امتحان کنید");
  }
};
let mimetypes = {
  jpe: "image/jpe",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};
let exToMimetypes = {
  jpe: "image/jpe",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};
const downloadFile = async (url, fileName, onAction) => {
  const uri = url?.includes("http") ? url : LOAD_FILE + url;
  let fileUri = FileSystem.documentDirectory + `${fileName}`;
  FileSystem.downloadAsync(uri, fileUri)
    .then(async ({ uri }) => {
      await saveFile(uri);
      onAction(`${fileName}`);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const saveFile = async (fileUri) => {
  try {
    // const libraryP = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
    const libraryWriteP = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY_WRITE_ONLY
    );

    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (libraryWriteP.status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("LifeLands", asset, false);
    }
  } catch (error) {}
};
export const returnFileUri = async (fileName) => {
  let fileUri = FileSystem.documentDirectory + `${fileName}`;

  const file = await FileSystem.getInfoAsync(fileUri);
  return file.uri;
};
