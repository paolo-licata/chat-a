import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
	const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);
  
  let unSubMessages;

  useEffect(() => {
    if (isConnected === true) {

      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect is re-executed.
      if (unSubMessages) unSubMessages();
      unSubMessages = null;

      const qry = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unSubMessages = onSnapshot(qry, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cachedMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    //Clean-up code
    return () => {
      if (unSubMessages) unSubMessages();
    }
  }, [isConnected]);

  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadCachedMessages = async () => {
    const cachedMsg = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMsg));
  }


  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  }

	useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  const customBubble = (props) => {
    return <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#757083"
          },
          left: {
            backgroundColor: "#FFF"
          }
        }}
      />
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

 return (
   <View style={[styles.container, {backgroundColor: background}]}>
     <GiftedChat
      messages={messages}
      renderBubble={customBubble}
      renderInputToolbar={renderInputToolbar}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
        name: name
      }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;