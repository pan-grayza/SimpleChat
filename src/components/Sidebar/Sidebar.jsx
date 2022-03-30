import React, { useState } from "react"
import classes from "./Sidebar.module.css"

//Components
import ListItem from "./ListItem/ListItem"

//Images
import img from "../../images/Earth.webp"

const Sidebar = () => {
    return (
        <div id="sidebar" className={classes.sidebar}>
            <div className={classes.list_of_chats} id="list_of_chats">
                <ListItem src={img} h2={"Primary"} id={1} />

                <ListItem src={img} h2={"Secondary"} id={2} />

                <ListItem src={img} h2={"Third"} id={3} />
            </div>
        </div>
    )
}

export default Sidebar
