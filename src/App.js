import React from "react"
import "./App.css"
//UI
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

function App() {
    const { user, initializing } = useAuthState(firebase.auth())
    const [darkMode, setDarkMode] = useDarkMode()

    const brandLogo = darkMode
        ? `${process.env.PUBLIC_URL}/logo_white.svg`
        : `${process.env.PUBLIC_URL}/logo.svg`

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
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            )}
            {renderContent()}
        </div>
    )
}

export default App
