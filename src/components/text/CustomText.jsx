import { useTheme } from "@react-navigation/native";
import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
export const CustomText = ({
  children,
  width,
  style = {},
  lines = 1,
  color,
  fontSize,
  selfCenter = false,
  right,
  left,
  top,
  bottom,
  onClick,
  textAlign,
}) => {
  const [fontsLoaded] = useFonts({
    vaszir: require("../../../assets/vazir.ttf"),
  });
  const windowWidth = Dimensions.get("window").width;
  const { colors } = useTheme();
  let styleFilter = {
    text: {
      ...{
        color: colors?.paragraph,
        direction: "rtl",
      
        fontFamily: "vaszir",
        fontSize: 10,
    
      },
      ...style,
    },
  };
  if (width) {
    styleFilter.text = {
      ...styleFilter.text,
      ...{ width: windowWidth / width },
    };
  }
  if (selfCenter) {
    styleFilter.text = {
      ...styleFilter.text,
      ...{ alignSelf: "center" },
    };
  }
  if (color) {
    styleFilter.text = {
      ...styleFilter.text,
      ...{ color },
    };
  }
  if (fontSize) {
    styleFilter.text = {
      ...styleFilter.text,
      ...{ fontSize },
    };
  }

  const styles = StyleSheet.create(styleFilter);
  return (
    <>
      {fontsLoaded && (
        <>
          {onClick ? (
            <TouchableOpacity onPress={onClick} style={{justifyContent:"center",alignItems:"center"}}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={lines}
                style={styles.text}
              >
                {children}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              ellipsizeMode="tail"
              numberOfLines={lines}
              style={styles.text}
            >
              {children}
            </Text>
          )}
        </>
      )}
    </>
  );
};
export default CustomText;
