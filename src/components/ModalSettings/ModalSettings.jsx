import React from "react"
import classes from "./ModalSettings.module.css"

import firebase from "firebase/compat/app"
import { useAuthState } from "../../hooks/useAuthState"
import { useDarkMode } from "../../hooks/useDarkMode"

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

const ModalSettings = () => {
    const { user, initializing } = useAuthState(firebase.auth())

    const [darkMode, setDarkMode] = useDarkMode()
    const ThemeIcon = darkMode ? SunIcon : MoonIcon

    const HandleClose = () => {
        const modal = document.querySelector("#setting_modal")
        modal.classList.remove("opened_modal")
    }

    const signOut = async () => {
        try {
            await firebase.auth().signOut()
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div id="setting_modal" className={classes.modal_container}>
            <div className={classes.modal_window}>
                <div className={classes.account_settings}>
                    <div className={classes.banner}></div>
                    <div className={classes.flex_row}>
                        <div>
                            <div className={classes.circle_user_img}>
                                <img
                                    src={user.photoURL}
                                    className={classes.user_img}
                                    alt=""
                                />
                            </div>
                            <span className={classes.online_circle}></span>
                        </div>

                        <div className={classes.username}>
                            <h2>{user.displayName}</h2>
                            <p className={classes.uid}>uid: {user.uid}</p>
                        </div>
                    </div>
                </div>
                <div className={classes.right_section}>
                    <button
                        onClick={HandleClose}
                        className={classes.btn_in_right_section}
                    >
                        <svg
                            className={classes.icon}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            viewBox="0 0 50 50"
                            width="50px"
                            height="50px"
                        >
                            <path d="M 40.783203 7.2714844 A 2.0002 2.0002 0 0 0 39.386719 7.8867188 L 25.050781 22.222656 L 10.714844 7.8867188 A 2.0002 2.0002 0 0 0 9.2792969 7.2792969 A 2.0002 2.0002 0 0 0 7.8867188 10.714844 L 22.222656 25.050781 L 7.8867188 39.386719 A 2.0002 2.0002 0 1 0 10.714844 42.214844 L 25.050781 27.878906 L 39.386719 42.214844 A 2.0002 2.0002 0 1 0 42.214844 39.386719 L 27.878906 25.050781 L 42.214844 10.714844 A 2.0002 2.0002 0 0 0 40.783203 7.2714844 z" />
                        </svg>
                    </button>

                    <button onClick={signOut} className={classes.signOut_btn}>
                        <p>Sign out</p>
                        <svg
                            className={classes.icon}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 491.213 491.213"
                        >
                            <g>
                                <path d="M318.713,73.106c-32.723,0-64.571,9.208-92.103,26.628c-26.772,16.94-48.365,40.868-62.445,69.196l26.865,13.353   c24.272-48.838,73.198-79.176,127.683-79.176c78.575,0,142.5,63.925,142.5,142.5s-63.925,142.5-142.5,142.5   c-54.484,0-103.41-30.338-127.683-79.176l-26.865,13.353c14.08,28.328,35.673,52.256,62.445,69.196   c27.531,17.42,59.38,26.628,92.103,26.628c95.117,0,172.5-77.383,172.5-172.5S413.83,73.106,318.713,73.106z" />
                                <polygon points="318.713,260.606 318.713,230.606 57.426,230.606 91.819,196.213 70.606,175 0,245.607 70.606,316.213 91.819,295    57.425,260.606  " />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalSettings
