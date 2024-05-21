import { StyleSheet, View } from "react-native";

const SpaceStyle = ({ children, right = 0, left = 0, top = 0, bottom = 0, styles = {} }) => {
  return (
    <View
      style={{
        marginRight: right ? right : 0,
        marginLeft: left ? left : 0,
        marginTop: top ? top : 0,
        marginBottom: bottom ? bottom : 0,
        ...styles,
      }}
    >
      {children}
    </View>
  );
};
export default SpaceStyle;
