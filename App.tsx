import { StyleSheet, View } from "react-native";

import { NativeBaseProvider } from "native-base";

import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
