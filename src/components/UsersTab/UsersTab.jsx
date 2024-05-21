import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnlineUsersPage from "../../pages/onlineUsers/OnlineUsersPage";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = ()=>{
    return(
        <View>

        </View>
    )
}


const SettingsScreen = ()=>{
    return(
        <View>
            
        </View>
    )
}


const UsersTab = ()=>{
    return(
        <Tab.Navigator screenOptions={{
            tabBarScrollEnabled:true,
        }}>
        <Tab.Screen name="Home" component={OnlineUsersPage} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    )
}


export default UsersTab