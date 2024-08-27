# CHAT APP with React Native

To build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location. It works on both iOS and Android devices and utilizes Google Firestore/Firebase for storing messages and images. Guest authentication is handled via Google Firebase authentication.

## Features and Requirements:

- A page where users can enter their name and choose a background color for the chat screen
  before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
  and location data.
- Data gets stored online and offline

## Technologies Used:

- React Native
- Expo
- Gifted Chat
- Firebase (Firestore, Auth, Storage)
- Android Studio

## Installation

- Clone the repository, using: https://github.com/paolo-licata/chat-app.git
- Install the necessary dependecies found in package.json using: <strong>npm install</strong>
- Set up your Firebase account by Signing In, start a new project. Set up your database by cliccking on Build --> Firestore Database. Remember to change the rules from: <strong>"allow read, write: if false;"</strong> to: <strong>"allow read, write: if true;"</strong>
- To be able to send picture and storing them, you will have to set up a firebase Storage. Similar as before, click on Build --> Storage and "Get started'. Remember to change the rules from: <strong>"allow read, write: if false;"</strong> to: <strong>"allow read, write: if true;"</strong>

## Start expo project

- <strong>npx expo start</strong> or <strong>npm start</strong>

### Testing options:

- Download and connect the expo app ( found on PlayStore or AppStore ) on your mobile device
- Android Studio (android)
- Xcode (iOS)
