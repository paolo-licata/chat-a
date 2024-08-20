import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';

const Start = ({ navigation }) => {
	const [name, setName] = useState('');
  const [background, setBackground] = useState('');

 return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <ImageBackground source={require('../img/bgImage.png')} style={styles.imageBackground}>

  <Text style={styles.appTitle}>App Title</Text>
  

    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Type your username here'
        />

<View style={styles.selectColorBox}>
          <Text style={styles.colorText}>Choose your background color:</Text>
            <View style={styles.colorsBox}>
            <TouchableOpacity
                style={[
                  styles.chooseColor,
                  { backgroundColor: "#090C08" },
                  background === "#090C08" && styles.selectedColor,
                ]}
                onPress={() => setBackground("#090C08")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.chooseColor,
                  { backgroundColor: "#474056" },
                  background === "#474056" && styles.selectedColor,
                ]}
                onPress={() => setBackground("#474056")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.chooseColor,
                  { backgroundColor: "#8A95A5" },
                  background === "#8A95A5" && styles.selectedColor,
                ]}
                onPress={() => setBackground("#8A95A5")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.chooseColor,
                  { backgroundColor: "#B9C6AE" },
                  background === "#B9C6AE" && styles.selectedColor,
                ]}
                onPress={() => setBackground("#B9C6AE")}
              ></TouchableOpacity>
            </View>
        </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat', { name: name, background: background })}>
          <Text style={styles.textButton}>Go to Chat</Text>
        </TouchableOpacity>
  </View>
  {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
  </ImageBackground>
  </TouchableWithoutFeedback>
 );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,  
    alignItems: 'center',
    justifyContent: 'center', 
    height: '100%',
    width: '100%',
   },
  appTitle: {
    flex: 1,
    fontSize: 45,
    fontWeight: "600",
    color: "#ffffff",
    justifyContent: "center",
    marginTop: 40,
  },
  container: {
   justifyContent: 'space-evenly',
   alignItems: 'center',
   width: "88%",
   height: "44%",
   backgroundColor: "white",
   padding: 10,
   marginBottom: 80,
   borderRadius: 8,
 },
 textInput: {
	width: '88%',
  padding: 10,
  borderWidth: 0.7,
  fontWeight: "300",
  margin: 10,
 },
 button: {
  width: '88%',
  padding: 16,
  alignItems: 'center',
  backgroundColor: '#757083',
  margin: 10,
 },
 textButton: {
  fontSize: 18,
  fontWeight: '400',
  color: "#fff",
},
colorText: {
  fontSize: 18,
  color: "#757083",
  marginBottom: 10,
  textAlign: 'left',
  alignSelf: 'flex-start',
},
selectColorBox: {
  width: '88%',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
},
colorsBox: {
  flexDirection: "row",
  alignSelf: "flex-start",
},
chooseColor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    border: 3,
    marginRight: 15,
    borderColor: "white",
},
selectedColor: {
  borderColor: "#FCD95B",
  borderWidth: 2,
},
});

export default Start;