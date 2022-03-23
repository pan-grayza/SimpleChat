import React from "react"
import classes from "./Sidebar.module.css"
import UserInfo from "../UserInfo/UserInfo"

const Sidebar = () => {
    return (
        <div className={classes.sidebar}>
            <UserInfo />
        </div>
    )
}

export default Sidebar
