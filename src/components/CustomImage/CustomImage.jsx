import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LOAD_FILE } from "../../service/APIs";
import CustomText from "../text/CustomText";
import { useNavigation } from "@react-navigation/native";

const CustomImage = ({
  image,
  width,
  height,
  radius = 5,
  aspect,
  isBackground = false,
  isOPT = true,
  children,
  blur = 0,
  styles,
  isLocalAsset = false,
  right,
  left,
  top,
  resizeMode,
  bottom,
  selfCenter = false,
  isMobileOPT = true,
  linkUserId,
  onClick,
}) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  let style = {
    borderRadius: radius,
    width: width > 20 ? width : windowWidth / width,
    height,
    marginRight: right,
    marginLeft: left,
    marginTop: top,
    marginBottom: bottom,
  };
  if (aspect) {
    style = {
      ...style,
      ...{
        aspectRatio: aspect,
      },
    };
  }
  if (selfCenter) {
    style = {
      ...style,
      ...{ alignSelf: "center" },
    };
  }
  if (styles) {
    style = { ...style, ...styles };
  }

  const [urlData, setUrlData] = useState();
  useEffect(() => {
    if (image) {
      if (isLocalAsset) {
        setUrlData(image);
      } else {
        let name = image?.slice(image?.lastIndexOf("/") + 1, image?.length);
        let department = name?.slice(0, name?.indexOf("-"));

        urlOPT = `${department}/opt-${name}`;

        setUrlData(urlOPT);
      }
    }
  }, [image]);

  let imageJSX = (
    <>
      {urlData && (
        <>
          {isBackground ? (
            <ImageBackground
              blurRadius={blur}
              style={style}
              imageStyle={{ borderRadius: radius }}
              resizeMode={resizeMode || "contain"}
              source={
                isLocalAsset
                  ? image
                  : {
                      uri: `${
                        image?.includes("https") || image?.includes("file:")
                          ? ""
                          : LOAD_FILE
                      }${urlData}`,
                    }
              }
              onError={() => {
                if (
                  image &&
                  (urlData.includes("opt-mobile-") ||
                    urlData.includes("no-profile") ||
                    urlData.includes("placeholder") ||
                    image.includes("placeholder") ||
                    urlData.includes("mobile-"))
                ) {
                  setUrlData((isLocalAsset ? "" : isOPT ? "opt-" : "") + image);
                } else {
                  setUrlData(image);
                }
              }}
            >
              {children}
            </ImageBackground>
          ) : (
            <Image
              style={style}
              source={{
                uri: `${
                  image?.includes("https") || image?.includes("file:")
                    ? ""
                    : LOAD_FILE
                }${urlData}`,
              }}
              onError={() => {
                setUrlData(image);
              }}
            />
          )}
        </>
      )}
    </>
  );
  return (
    <>
      {linkUserId ? (
        <TouchableOpacity
          onPress={() => {
            if (onClick) onClick();
            navigation.navigate("Public Profile Page", {
              userId: linkUserId,
            });
          }}
        >
          {imageJSX}
        </TouchableOpacity>
      ) : (
        <>{imageJSX}</>
      )}
    </>
  );
};
export default CustomImage;
