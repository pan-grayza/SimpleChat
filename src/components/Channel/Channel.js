import React, { useEffect, useState, useRef } from "react"
import classes from "./Channel.module.css"
import firebase from "firebase/compat/app"
import { useFirestoreQuery } from "../../hooks/useFirestoreQuery"
// Components
import Message from "../UI/Message/Message"

const Channel = ({ user = null }) => {
    const db = firebase.firestore()

    let currentChat
    let messagesRef = db.collection("messages")
    const SidebarToApp = (ChatIDFromChild) => {
        currentChat = ChatIDFromChild
        console.log(currentChat)
        if (currentChat == 1) {
            messagesRef = db.collection("messages")
        } else if (currentChat == 2) {
            messagesRef = db.collection("secondary_chat")
        }
    }

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
        <div className={classes.channel}>
            <ul className={classes.list_of_messages}>
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
            <div className={classes.text_form_container}>
                <form onSubmit={handleOnSubmit} className={classes.text_form}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={handleOnChange}
                        placeholder="Type message here"
                        className={classes.text_input}
                    ></input>
                    <button
                        className={classes.send_button}
                        type="submit"
                        disabled={!newMessage}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Channel
