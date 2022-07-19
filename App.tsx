import { StyleSheet, View } from "react-native";
import { NativeBaseProvider } from "native-base";

import { Provider } from "react-redux";

import HomeScreen from "./src/screens/HomeScreen";
import { store } from "./src/app/store";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <View style={styles.container}>
          <HomeScreen />
        </View>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
