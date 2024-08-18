import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
	const { name, background } = route.params;
  const [messages, setMessages] = useState([]);


  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  useEffect(() => {
    setMessages([
      {
        _id: 2,
        text: 'You have entered a new chat.',
        createdAt: new Date(),
        system: true
      },
      {
        _id: 1,
        text: 'Hi! Welcome to the chat screen',
        createdAt: new Date(),
        user: {
          id: 2,
          name: 'John',
          avatar: 'https://placeimg.com/140/140/any',
        }
      }
    ]);
  }, []);

	useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

 return (
   <View style={[styles.container, {backgroundColor: background}]}>
     <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
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