import { NativeBaseProvider, StatusBar, View } from "native-base";

import { Provider } from "react-redux";
import { store } from "./src/app/store";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LogInScreen from "./src/screens/auth/LogInScreen";
import SignUpScreen from "./src/screens/auth/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AccountScreen from "./src/screens/AccountScreen";

const Stack = createNativeStackNavigator<NavParams>();
const BottomTabs = createBottomTabNavigator<NavParams>();

function AuthNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function BottomTabsNav() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="HomeScreen" component={HomeScreen} />
      <BottomTabs.Screen name="AccountScreen" component={AccountScreen} />
    </BottomTabs.Navigator>
  );
}

function AllNavs() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <View flex={1}>
        {false && <AuthNav />}
        {true && <BottomTabsNav />}
      </View>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AllNavs />
      </NativeBaseProvider>
    </Provider>
  );
}
