import React, { useState, useEffect } from "react"
import "./App.css"
//UI
import Button from "./components/UI/Button/Button"
import Loader from "./components/UI/Loader/Loader"

//Components
import Channel from "./components/Channel/Channel"
import Sidebar from "./components/Sidebar/Sidebar"

//Hooks
import { useAuthState } from "./hooks/useAuthState"
import { useDarkMode } from "./hooks/useDarkMode"

//Firebase deps
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

firebase.initializeApp({
    apiKey: "AIzaSyCne-GhR0yeOK4iVtDfVb0HDcBNb82g2Xg",
    authDomain: "chat-react-3e87b.firebaseapp.com",
    projectId: "chat-react-3e87b",
    storageBucket: "chat-react-3e87b.appspot.com",
    messagingSenderId: "478881601222",
    appId: "1:478881601222:web:bfceb8f2e93f5e413aa9c7",
    measurementId: "G-M82SD1TJ9B",
})

const auth = firebase.auth
const db = firebase.firestore

const MoonIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
        />
    </svg>
)

const SunIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        {...props}
    >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
)

function App() {
    const { user, initializing } = useAuthState(firebase.auth())
    const [darkMode, setDarkMode] = useDarkMode()

    const brandLogo = darkMode
        ? `${process.env.PUBLIC_URL}/logo_white.svg`
        : `${process.env.PUBLIC_URL}/logo.svg`

    const ThemeIcon = darkMode ? SunIcon : MoonIcon

    const signInWithGoogle = async () => {
        // Retrieve Google provider object
        const provider = new firebase.auth.GoogleAuthProvider()
        // Set language to the default browser preference
        firebase.auth().useDeviceLanguage()
        // Start sign in process
        try {
            await firebase.auth().signInWithPopup(provider)
        } catch (error) {
            console.log(error.message)
        }
    }

    const signOut = async () => {
        try {
            await firebase.auth().signOut()
        } catch (error) {
            console.log(error.message)
        }
    }

    const renderContent = () => {
        if (initializing) {
            return (
                <div>
                    <Loader />
                </div>
            )
        }
    }

    //if (user) return <Channel user={user} />

    return (
        <div className="screen">
            {user ? (
                <div className="app">
                    <Sidebar />
                    {/* <Button onClick={signOut}>Sign out</Button> */}
                    <Channel user={user} db={db} />
                </div>
            ) : (
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            )}
            {renderContent()}
        </div>
    )
}

export default App
