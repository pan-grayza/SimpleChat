import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'


firebase.initializeApp({
    apiKey: "AIzaSyCne-GhR0yeOK4iVtDfVb0HDcBNb82g2Xg",
    authDomain: "chat-react-3e87b.firebaseapp.com",
    projectId: "chat-react-3e87b",
    storageBucket: "chat-react-3e87b.appspot.com",
    messagingSenderId: "478881601222",
    appId: "1:478881601222:web:bfceb8f2e93f5e413aa9c7",
    measurementId: "G-M82SD1TJ9B"
    }
);

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()


ReactDOM.render(
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

