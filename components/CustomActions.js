import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
	const actionSheet = useActionSheet();
	
	const onActionPress = () => {
		const options = ['Choose from library', 'Take picture', 'Send location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;

		actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      },
    );
	}

	const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  }

	return (
		<TouchableOpacity style={styles.container} onPress={onActionPress}>
			<View style={[styles.wrapper, wrapperStyle]}>
				<Text style={[styles.iconText, iconTextStyle]}>+</Text>
			</View>
    </TouchableOpacity>
	)
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;