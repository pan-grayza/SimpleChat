import React from "react"
import classes from "./Sidebar.module.css"

//Components
import UserInfo from "../UserInfo/UserInfo"
import ListItem from "./ListItem/ListItem"

//Images
import img from "../../images/Earth.webp"

const Sidebar = () => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.list_of_chats} id="list_of_chats">
                <ListItem src={img} h2={"Global"} id={1} />

                <ListItem src={img} h2={"Secondary"} id={2} />
            </div>
        </div>
    )
}

export default Sidebar
