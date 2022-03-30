import React, { useState } from "react"
import classes from "./ListItem.module.css"

const ListItem = ({
    src,
    checked = false,
    h2 = "",
    p = "",
    id = null,
    childToParent,
}) => {
    const HandleClick = (e) => {
        const button = document.querySelector(`#button_${id}`)
        const ul = document.querySelector("#list_of_chats")
        const span = document.querySelector(`#activate_tag_${id}`)
        const allButtons = ul.getElementsByTagName("button")
        const allSpans = ul.getElementsByTagName("span")
        //
        Array.from(allButtons).forEach((button) => {
            button.classList.remove("activated_button")
        })
        Array.from(allSpans).forEach((span) => {
            span.classList.remove("activated_tag")
        })
        button.classList.add("activated_button")
        span.classList.add("activated_tag")
    }

    return (
        <button
            className={classes.list_item}
            id={`button_${id}`}
            onClick={HandleClick}
        >
            <span className={classes.span_tag} id={"activate_tag_" + id}></span>
            <img className={classes.circle} src={src} alt="" />
            <div>
                <h2>{h2}</h2>
                <p>{p}</p>
            </div>
        </button>
    )
}

export default ListItem
