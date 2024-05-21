import { Dimensions, StyleSheet, View } from "react-native";
import CustomText from "../components/text/CustomText";
const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    direction: "rtl",
    justifyContent: "flex-end",
    justifyContent: "flex-end",
    alignContent: "center",
  },
});
export const Row = ({ children, styles = {} }) => {
  return <View style={{ ...style.container, ...styles }}>{children}</View>;
};
export const CenterStyled = ({ children, width, minus = 0 }) => {
  const windowWidth = Dimensions.get("window").width - minus;
  const center = StyleSheet.create({
    justifyContent: "center",
    display: "flex",
    alignContent: "center",
    width: width ? width : windowWidth,
    flexDirection: "row",
    justifyItems: "center",
    alignItems: "center",
  });

  return <View style={center}>{children}</View>;
};
export const SpaceBetween = ({ children, styles = {} }) => {
  const style = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      direction: "rtl",
      ...styles,
    },
  });
  return <View style={style.container}>{children}</View>;
};
export const SpaceAround = ({ children, minus = 0, style = {} }) => {
  const windowWidth = Dimensions.get("window").width;
  const styles = StyleSheet.create({
    container: {
      width: windowWidth - minus,
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "row",
      direction: "rtl",
      ...style,
    },
  });
  return <View style={styles.container}>{children}</View>;
};
export const SpaceVerticalBetween = ({ children }) => {
  const style = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      direction: "rtl",
    },
  });
  return <View style={style.container}>{children}</View>;
};
export const Hr = ({ width, color, opacity = 1, padding = 15 }) => {
  const style = StyleSheet.create({
    container: {
      width: width ? width : Dimensions.get("window").width,
      height: 1,
      backgroundColor: color || "#252528",
      marginTop: padding,
      marginBottom: padding,
      opacity,
    },
  });
  return <View style={style.container}></View>;
};
