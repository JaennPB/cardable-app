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

import { Ionicons } from "@expo/vector-icons";
import DecksScreen from "./src/screens/DecksScreen";
import FlashcardsScreen from "./src/screens/FlashcardsScreen";

const Stack = createNativeStackNavigator<NavParams>();
const BottomTabs = createBottomTabNavigator<NavParams>();

function AuthNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function BottomTabsNav() {
  return (
    <BottomTabs.Navigator
      screenOptions={{ tabBarLabelStyle: { fontSize: 13 } }}
    >
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home-outline" size={24} color="black" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerTitle: "Account",
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person-outline" size={24} color="black" />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function MainNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabsNav"
        component={BottomTabsNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DecksScreen"
        component={DecksScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="FlashcardsScreen"
        component={FlashcardsScreen}
        options={{ presentation: "fullScreenModal" }}
      />
    </Stack.Navigator>
  );
}

function AllNavs() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <View flex={1}>
        {true && <AuthNav />}
        {false && <MainNav />}
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
