import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import Start from './components/Start';
import Chat from './components/Chat';

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

const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen1"
      >
        <Stack.Screen
          name="Home"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
