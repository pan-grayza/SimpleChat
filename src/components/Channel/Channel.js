import React, { useState, useContext } from 'react'
import classes from './Channel.module.css'
import { Context } from '../../index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// Components
import Message from '../UI/Message/Message'
import Loader from '../UI/Loader/Loader'

const Channel = () => {
    const { auth, firestore } = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    if (value) {
        const sendButton = document.querySelector('#send_button')
        const textForm = document.querySelector('#text_form')
        sendButton.classList.add(classes.send_button_activated)
        textForm.classList.add(classes.text_form_activated)
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setValue('')
        setTimeout(() => scrollToBottom(), 100)
    }

    const scrollToBottom = () => {
        const listOfMessages = document.querySelector('#list_of_messages')
        listOfMessages.scrollTo({
            top: listOfMessages.scrollHeight,
            behavior: 'smooth',
        })
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className={classes.channel}>
            <ul
                id="list_of_messages"
                // onScroll={trackScrolling}
                className={classes.list_of_messages}
            >
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
            <button
                onClick={scrollToBottom}
                className={classes.scroll_down_btn}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M17 10c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l5 5c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z" />
                    <path d="M7 10c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-5 5c-.2.2-.4.3-.7.3z" />
                    <path d="M12 21c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1s1 .4 1 1v16c0 .6-.4 1-1 1z" />
                </svg>
                <h1 className="invisible_btn_text">Scroll down</h1>
            </button>
            <div className={classes.text_form_container}>
                <form
                    id="text_form"
                    className={classes.text_form}
                    onSubmit={sendMessage}
                >
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Type message here"
                        className={classes.text_input}
                    ></input>
                </form>
                <button
                    className={classes.send_button}
                    id="send_button"
                    type="submit"
                    disabled={!value}
                    onClick={sendMessage}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0V0z" />
                        <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                    </svg>
                    <h1 className="invisible_btn_text">Send</h1>
                </button>
            </div>
        </div>
    )
}

export default Channel
