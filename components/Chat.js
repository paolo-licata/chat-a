import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
	const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const qry = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unSubMessages = onSnapshot(qry, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    //Clean-up code
    return () => {
      if (unSubMessages) unSubMessages();
    }
  }, []);

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

 return (
   <View style={[styles.container, {backgroundColor: background}]}>
     <GiftedChat
      messages={messages}
      renderBubble={customBubble}
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