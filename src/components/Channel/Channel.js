import React, { useEffect, useState, useRef } from "react"
import classes from "./Channel.module.css"
import firebase from "firebase/compat/app"
import { useFirestoreQuery } from "../../hooks/useFirestoreQuery"
// Components
import Message from "../UI/Message/Message"

const Channel = ({ user = null }) => {
    const db = firebase.firestore()

    let messagesRef = db.collection("messages")

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
    if (newMessage) {
        const sendButton = document.querySelector("#send_button")
        const textForm = document.querySelector("#text_form")
        sendButton.classList.add(classes.send_button_activated)
        textForm.classList.add(classes.text_form_activated)
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
                <form
                    onSubmit={handleOnSubmit}
                    id="text_form"
                    className={classes.text_form}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={handleOnChange}
                        placeholder="Type message here"
                        className={classes.text_input}
                    ></input>
                </form>
                <button
                    className={classes.send_button}
                    id="send_button"
                    type="submit"
                    disabled={!newMessage}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0V0z" />
                        <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Channel
