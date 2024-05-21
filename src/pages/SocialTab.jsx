import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyButtons from "./myButtons/MyButtons";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import PaintPage from "./paint/PaintPage";
import UploadRadio from "./Social/UploadRadio";

const Tabs = createMaterialTopTabNavigator();
const RadioSocial = () => {
  return <View></View>;
};

const SocialTab = () => {
  return (
    <>
      <StatusBar hidden={false} default />
      <Tabs.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingTop: 30,
          },
          tabBarActiveTintColor: "white",
        }}
      >
        <Tabs.Screen
          name="Paint Page"
          options={{
            tabBarLabel: ({ color }) => (
              <Text
                style={{ color: color, fontFamily: "vazir" }}
                size={45}
                color={color}
              >
                آپلود نقاشی
              </Text>
            ),
            tabBarLabelStyle: {
              fontFamily: "vazir",
              color: "white",
            },
          }}
          component={PaintPage}
        />
        <Tabs.Screen
          name="Radio Page"
          options={{
            tabBarLabel: ({ color }) => (
              <Text
                style={{ color: color, fontFamily: "vazir" }}
                size={45}
                color={color}
              >
                آپلود صدا
              </Text>
            ),
            tabBarLabelStyle: {
              fontFamily: "vazir",
              color: "white",
            },
            tabBarIndicatorStyle:{
                backgroundColor:"#00ff88"
            },
        
          }}
          component={UploadRadio}
        />
      </Tabs.Navigator>
    </>
  );
};

export default SocialTab;
