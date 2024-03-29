import { Image, NativeBaseProvider, StatusBar, View } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import { authenticate } from "./src/app/mainSlice";
import { store } from "./src/app/store";
import { useAppDispatch, useAppSelector } from "./src/hooks/reduxHooks";

import AccountScreen from "./src/screens/AccountScreen";
import ActiveSessionScreen from "./src/screens/ActiveSessionScreen";
import LogInScreen from "./src/screens/auth/LogInScreen";
import SignUpScreen from "./src/screens/auth/SignUpScreen";
import BeginSessionScreen from "./src/screens/BeginSessionScreen";
import BoxesScreen from "./src/screens/BoxesScreen";
import DecksScreen from "./src/screens/DecksScreen";
import FlashcardsScreen from "./src/screens/FlashcardsScreen";
import ManageDataScreen from "./src/screens/ManageDataScreen";
import StatsScreen from "./src/screens/StatsScreen";

import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

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
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: "Poppins_400Regular",
        },
        tabBarActiveTintColor: "#14b8a6",
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: "Poppins_600SemiBold",
        },
        headerTintColor: "#0d9488",

        headerShadowVisible: false,
      }}
    >
      <BottomTabs.Screen
        name="BoxesScreen"
        component={BoxesScreen}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Image
              source={require("./assets/logo-small.png")}
              alt="Alternate Text"
              resizeMode="center"
            />
          ),
          tabBarLabel: "Boxes",
          tabBarIcon: ({ color }) => (
            <AntDesign name="inbox" size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="DecksScreen"
        component={DecksScreen}
        options={{
          headerTitle: "Your Decks",
          tabBarLabel: "Decks",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="card-multiple-outline"
              size={24}
              color={color}
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
            <Ionicons name="md-person-outline" size={24} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function MainNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="BottomTabsNav"
        component={BottomTabsNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FlashcardsScreen"
        component={FlashcardsScreen}
        options={{
          headerTitleStyle: {
            fontFamily: "Poppins_600SemiBold",
            color: "#000",
          },
          headerTintColor: "#14b8a6",
        }}
      />
      <Stack.Screen
        name="ManageDataScreen"
        component={ManageDataScreen}
        options={{
          headerTitleStyle: { fontFamily: "Poppins_600SemiBold" },
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen
        name="BeginSessionScreen"
        component={BeginSessionScreen}
        options={{
          headerTitleStyle: {
            fontFamily: "Poppins_600SemiBold",
            color: "#000",
          },
          headerTintColor: "#14b8a6",
        }}
      />
      <Stack.Screen
        name="ActiveSessionScreen"
        component={ActiveSessionScreen}
        options={{ headerTitle: "", headerBackVisible: false }}
      />
      <Stack.Screen
        name="StatsScreen"
        component={StatsScreen}
        options={{
          headerTitle: "Your Score",
          presentation: "fullScreenModal",
          headerTitleStyle: { fontFamily: "Poppins_600SemiBold" },
        }}
      />
    </Stack.Navigator>
  );
}

function AllNavs() {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userId);
  const isAuth = useAppSelector((state) => state.isAuth);

  const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

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

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Platform.OS === "android" ? "white" : ""}
      />
      <NavigationContainer>
        <View flex={1} onLayout={onLayoutRootView}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {!isAuth && <AuthNav />}
            {isAuth && <MainNav />}
          </GestureHandlerRootView>
        </View>
      </NavigationContainer>
    </>
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
