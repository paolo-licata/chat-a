import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

const Screen1 = ({ navigation }) => {
	const [name, setName] = useState('');
  const [background, setBackground] = useState('');

 return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
   <View style={styles.container}>
    <ImageBackground source={require('../img/bgImage.png')} style={styles.imageBackground}>
     <Text style={styles.welcomeText}>Welcome to Chat-App</Text>
		 <TextInput
		 	style={styles.textInput}
			value={name}
			onChangeText={setName}
			placeholder='Type your username here'
		  />
     <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat', { name: name, background: background })}>
        <Text style={styles.textButton}>Go to Chat</Text>
      </TouchableOpacity>


      <View style={styles.selectColorBox}>
        <Text style={styles.colorText}>Choose your background color:</Text>
          <View style={styles.colorsBox}>
          <TouchableOpacity
              style={[
                styles.chooseColor,
                { backgroundColor: "#fff3d1" },
                background === "#fff3d1" && styles.selectedColor,
              ]}
              onPress={() => setBackground("#fff3d1")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chooseColor,
                { backgroundColor: "#f3ffe0" },
                background === "#f3ffe0" && styles.selectedColor,
              ]}
              onPress={() => setBackground("#f3ffe0")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chooseColor,
                { backgroundColor: "#d1f2ff" },
                background === "#d1f2ff" && styles.selectedColor,
              ]}
              onPress={() => setBackground("#d1f2ff")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chooseColor,
                { backgroundColor: "#ffd1db" },
                background === "#ffd1db" && styles.selectedColor,
              ]}
              onPress={() => setBackground("#ffd1db")}
            ></TouchableOpacity>
          </View>
      </View>
     </ImageBackground>
   </View>
  </TouchableWithoutFeedback>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 imageBackground: {
  flex: 1,  
  alignItems: 'center',
  justifyContent: 'center', 
  height: '100%',
  width: '100%',
 },
 welcomeText: {
  fontSize: 24,
 },
 textInput: {
	width: '88%',
  padding: 15,
  borderRadius: 20,
  borderWidth: 1,
  marginTop: 15,
  marginBottom: 15
 },
 button: {
  width: '40%',
  padding: 8,
  borderRadius: 20,
  alignItems: 'center',
  backgroundColor: '#363636'
 },
 textButton: {
  fontSize: 18,
  color: "#fff",
},
colorText: {
  fontSize: 20,
  textAlign: 'left',
  alignSelf: 'flex-start',
  marginTop: 100,
},
selectColorBox: {
  width: '80%',
  alignItems: 'center',
  justifyContent: 'space-between'
},
colorsBox: {
  marginTop: 20,
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
  borderColor: "#ffab3b",
  borderWidth: 1.5,
},
});

export default Screen1;