import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
import { getStorage } from "firebase/storage";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
LogBox.ignoreLogs(["@firebase/auth: Auth"]);
LogBox.ignoreLogs(["Possible unhandled promise rejection"]);

import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

const App = () => {
//Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCEwgCveznxSbjFmZAfV6USFAazUYLihVg",
    authDomain: "chatapp-f330f.firebaseapp.com",
    projectId: "chatapp-f330f",
    storageBucket: "chatapp-f330f.appspot.com",
    messagingSenderId: "1034384520689",
    appId: "1:1034384520689:web:e8353fdb2f69bebbba4050"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Implementing offline app behaviour
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Home"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
          >
            {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
          </Stack.Screen>
          
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;