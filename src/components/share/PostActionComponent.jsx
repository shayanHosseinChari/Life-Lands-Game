import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View,Share } from "react-native";
import { RootContext } from "../../context/RootContext";
import useForceUpdate from "../../database/useForceUpdate";
import SpaceStyle from "../../style/SpaceStyle";
import { SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { likePostService } from "../../service/PostService";
import { getValueFor } from "../../appsetting/storeConfig";
import { deleteShelfService, insertShelfService } from "../../service/ShelfService";
import { OpenToast } from "./OpenToast";

const PostActionComponent = ({
  fileId,
  mimeType,
  fileUrl,
  imageUrl,
  department,
  onDownloadAction,
  post,
  isLike,
}) => {
  console.log(post)
  const [isLikeState, setIsLikeState] = useState(isLike || false);
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const { colors } = useTheme();
  const { onDownload } = useContext(RootContext);
  const navigation = useNavigation()
  const style = StyleSheet.create({
    iconStyle: {
      width: 20,
      height: 20,
      alignSelf: "center",
      opacity: 0.5,
    },
    bookmarkIconStyle: {
      width: 17,
      height: 20,
      alignSelf: "center",
      opacity: 0.5,
    },
    downloadIconStyle: {
      width: 22,
      height: 20,
      alignSelf: "center",
      opacity: 0.5,
    },
  });
  const onDownloadHandler = async () => {
    onDownload(post, department, (e) => {
      onDownloadAction(e);
    });
  };
  const addToShelf = async (bookId) => {
    if (!getValueFor()) {
      navigation.navigate("AlertScreen");
      return;
    }
    if (inShelf) {
      const { data } = await deleteShelfService(bookId);
      if (data.state) {
        setInShelf(false);
      }
    } else {
      const { data } = await insertShelfService({ bookId });
      if (data.state) {
        setInShelf(true);
      }
    }
  };
  const onLikeAction = async () => {
    const {
      data: { state },
    } = await likePostService({ postId: post?._id, department });
    if (state) {
      setIsLikeState(!isLikeState);
    }
  };
  return (
    <SpaceStyle top={10} bottom={10}>
      <SpaceBetween>
        <TouchableOpacity onPress={()=>OpenToast('اعلان','ظاهرا مشکلی در سمت سرور پیش آمده','success')}>
          <Image
            source={require("../../../assets/icons/Bookmark.png")}
            style={style.bookmarkIconStyle}
          />
          <SpaceStyle top={7}>
            <CustomText color={colors.lightTextColor}>نشانه گذاری</CustomText>
          </SpaceStyle>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>OpenToast('اعلان','به دلایل امنیتی این بخش فعلا در دسترس نیست','success')}>
          <Image
            source={require("../../../assets/icons/Information.png")}
            style={style.iconStyle}
          />
          <SpaceStyle top={7}>
            <CustomText color={colors.lightTextColor}>اطلاعات</CustomText>
          </SpaceStyle>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              Share.share({
                message:`

                ویدیو منحصر به فرد لایف لندز به نام ${post.title} :
                https://lifelands.ir/post?department=${post.department}?id=${post._id}
                

                `
              })
              
              // Sharing.shareAsync("sdc");
            }}
          >
            <Image
              source={require("../../../assets/icons/Navigation.png")}
              style={style.iconStyle}
            />
            <SpaceStyle top={7}>
              <CustomText color={colors.lightTextColor}>
                اشتراک گذاری
              </CustomText>
            </SpaceStyle>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onDownloadHandler}>
          <View>
            <Image
              source={require("../../../assets/icons/Download1.png")}
              style={style.downloadIconStyle}
            />
            <SpaceStyle top={7}>
              <CustomText color={colors.lightTextColor}>دانلود</CustomText>
            </SpaceStyle>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={onLikeAction}>
            {isLikeState ? (
              <Image
                source={require("../../../assets/icons/like4.png")}
                style={style.iconStyle}
              />
            ) : (
              <Image
                source={require("../../../assets/icons/Like.png")}
                style={style.iconStyle}
              />
            )}
            <SpaceStyle top={7}>
              <CustomText color={colors.lightTextColor}>پسندیدن</CustomText>
            </SpaceStyle>
          </TouchableOpacity>
        </View>
      </SpaceBetween>
    </SpaceStyle>
  );
};
export default PostActionComponent;
