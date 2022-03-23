import React, { useState } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

export function useAuthState(auth) {
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState(() => auth.currentUser)

    React.useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            if (initializing) {
                setInitializing(false)
            }
        })

        return () => unsubscribe()
    }, [auth, initializing])

    return { user, initializing }
}
