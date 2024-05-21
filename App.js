import MergePage from "./src/merge";
import RootContextProvider from "./src/context/RootContextProvider";
import SocketContextProvider from "./src/context/SoketContextProvider";
import { useFonts } from "expo-font";
import { NotifcationStore } from "./src/Store/NotifcationSotre";
import { Provider } from "react-redux";
import { NavigationContainer,DefaultTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getTheme } from "./src/appsetting/storeConfig";

let darkMode = {
  ...DefaultTheme.colors,
  primary: "#6664f4",
  background: "#000000",

  text: "rgb(0, 0, 0)",
  paragraph: "#d4d5eb",
  border: "rgb(199, 199, 204)",
  notification: "#ae4a54",
  innerColor: "#000",

  //text
  titleColor: "#dbd7d8",
  lightTextColor: "#9c9798",
  hoverTextColor: "rgba(0,0,0,0.7)",
  darkOpacityColor: "rgba(0,0,0,0.4)",

  card: "#252538",
  darkCard: "#222121",
  white: "#fff",
  bottomTabBar: "#171414",
  //input
  inputBgColor: "#252528",
  inputBorderColor: "rgb(40,40,40)",
  placeholderTextColor: "#ffffff76",
  hr: "#ffffff1a",
  yellow: "#efc42e",
  orange: "#ff9800",
  green: "#2eef49",
  darkGreen: "#7c931f",
  red: "#960014",
  borderCard: "#292a2e",
};
let lightMode = {
  ...DefaultTheme.colors,
  primary: "#7371f3",
  background: "#e0e1eb",
  text: "rgb(0, 0, 0)",
  paragraph: "rgb(0, 0, 0)",
  border: "rgb(199, 199, 204)",
  notification: "#ae4a54",
  innerColor: "#fff",
  //text
  titleColor: "#121211",
  lightTextColor: "#262625",
  hoverTextColor: "#e0e1eb",

  card: "#bfc1d8",
  darkCard: "#abadc2",

  //input
  inputBgColor: "#cfc6ca",
  inputBorderColor: "#a19c9e",
  placeholderTextColor: "#7d7a7b",
  bottomTabBar: "#c8c8ce",
  white: "#fff",
  hr: "#0000001a",
  yellow: "#efc42e",
  orange: "#ff9800",
  green: "#2eef49",
  darkGreen: "#7c931f",
  red: "#960014",
  borderCard: "#292a2e",
};
// const MyTheme = ;

const style = StyleSheet.create({
  headerTitleStyle: { width: 30, height: 30, marginHorizontal: 20 },
  headerBackIconStyle: { width: 15, height: 15, marginHorizontal: 20 },
});
export default function App() {
  const [fontsLoaded] = useFonts({
    vazir: require("./assets/vazir.ttf"),
    candy: require("./assets/candy.ttf")
  });
  const [option,setOption] = useState({})
  
  const init = async () => {
    setOption({
      ...DefaultTheme,
      colors:  darkMode ,
    });
  };
  useEffect(()=>{
    init()
  },[])
  if(fontsLoaded){
    return (
      // <TournamentContextProvider>
      <Provider store={NotifcationStore}>
      <RootContextProvider>
        <MergePage />
      </RootContextProvider>
      </Provider>
      // </TournamentContextProvider>

    );
  }else{
    return null
  }
  
}
