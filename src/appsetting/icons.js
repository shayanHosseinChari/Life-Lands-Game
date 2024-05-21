import { useContext, useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import { useTheme } from "react-navigation";
import { RootContext } from "../context/RootContext";
import { getValueForTheme } from "./storeConfig";

export const Icon = ({ light, dark, style = {} }) => {
  const { wasChangedTheme } = useContext(RootContext);
  const { colors } = useTheme();
  const theme = getValueForTheme();
  useEffect(() => {}, [wasChangedTheme]);

  return <Image style={style} source={theme === "dark" ? dark : light} />;
};
