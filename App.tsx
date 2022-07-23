import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { NativeBaseProvider, StatusBar, View } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import { useAppDispatch, useAppSelector } from "./src/hooks/reduxHooks";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { authenticate } from "./src/app/mainSlice";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LogInScreen from "./src/screens/auth/LogInScreen";
import SignUpScreen from "./src/screens/auth/SignUpScreen";
import BoxesScreen from "./src/screens/BoxesScreen";
import AccountScreen from "./src/screens/AccountScreen";
import DecksScreen from "./src/screens/DecksScreen";
import FlashcardsScreen from "./src/screens/FlashcardsScreen";
import ManageDataScreen from "./src/screens/manageDataScreen";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
        name="BoxesScreen"
        component={BoxesScreen}
        options={{
          headerTitle: "Your boxes",
          tabBarLabel: "Boxes",
          tabBarIcon: ({ color }) => (
            <AntDesign name="inbox" size={24} color="black" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="DecksScreen"
        component={DecksScreen}
        options={{
          headerTitle: "Your decks",
          tabBarLabel: "Decks",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="card-multiple-outline"
              size={24}
              color="black"
            />
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
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="ManageDataScreen"
        component={ManageDataScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

function AllNavs() {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userId);
  const isAuth = useAppSelector((state) => state.isAuth);

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function fetchUserId() {
      try {
        await SplashScreen.preventAutoHideAsync();

        const userIdFromStorage = await AsyncStorage.getItem("userId");

        if (userIdFromStorage) {
          dispatch(authenticate(userIdFromStorage));
        }
      } catch {
        Alert.alert("Something went wrong", "Please reload app");
      } finally {
        setAppIsReady(true);
      }
    }

    if (!isAuth && !userId) {
      fetchUserId();
    }
  }, [appIsReady]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <View flex={1} onLayout={onLayoutRootView}>
        {!isAuth && <AuthNav />}
        {isAuth && <MainNav />}
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
