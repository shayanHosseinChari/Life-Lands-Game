import { createStackNavigator } from "@react-navigation/stack";
import { Fragment } from "react";
const Stack = createStackNavigator();

const ScreenComponent = ({ title, name, component }) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      options={{
        title,
      }}
    />
  );
};
export default ScreenComponent;
