import React, { useEffect, useState, useRef } from "react"
import classes from "./Channel.module.css"
import PropTypes from "prop-types"
import firebase from "firebase/compat/app"
import { useFirestoreQuery } from "../../hooks/useFirestoreQuery"
// Components
import Navbar from "../Navbar/Navbar"
import Message from "../UI/Message/Message"

const Channel = ({ user = null }) => {
    const db = firebase.firestore()
    const messagesRef = db.collection("messages")
    const messages = useFirestoreQuery(
        messagesRef.orderBy("createdAt", "desc").limit(100)
    )

    const [newMessage, setNewMessage] = useState("")

    const inputRef = useRef()
    const bottomListRef = useRef()

    const { uid, displayName, photoURL } = user

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [inputRef])

    const handleOnChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const trimmedMessage = newMessage.trim()
        if (trimmedMessage) {
            // Add new message in Firestore
            messagesRef.add({
                text: trimmedMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL,
            })
            // Clear input field
            setNewMessage("")
            // Scroll down to the bottom of the list
            bottomListRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div>
            <ul>
                {messages
                    ?.sort((first, second) =>
                        first?.createdAt?.seconds <= second?.createdAt?.seconds
                            ? -1
                            : 1
                    )
                    ?.map((message) => (
                        <li key={message.id}>
                            <Message {...message} />
                        </li>
                    ))}
            </ul>
            <form onSubmit={handleOnSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={handleOnChange}
                    placeholder="Type message here"
                ></input>
                <button type="submit" disabled={!newMessage}>
                    Send
                </button>
            </form>
        </div>
    )
}

export default Channel
