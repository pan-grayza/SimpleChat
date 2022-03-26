import React, { useState, useEffect } from "react"
import classes from "./ListItem.module.css"

const ListItem = ({ src, checked = false, h2 = "", p = "", id = null }) => {
    const [currentChat, setCurrentChat] = useState()

    const HandleClick = (e) => {
        const li = document.querySelector(`#li_${id}`)
        const ul = document.querySelector("#list_of_chats")
        const span = document.querySelector(`#activate_tag_${id}`)
        const allLi = ul.getElementsByTagName("li")
        const allSpans = ul.getElementsByTagName("span")
        //
        Array.from(allLi).forEach((li) => {
            li.classList.remove("activated_li")
        })
        Array.from(allSpans).forEach((span) => {
            span.classList.remove("activated_tag")
        })
        const target = e.target
        if (target) {
            li.classList.add("activated_li")
            span.classList.add("activated_tag")

            setCurrentChat(id)
        }
    }

    return (
        <li className={classes.list_item} id={`li_${id}`}>
            <button className={classes.btn} onClick={HandleClick}></button>
            <span className={classes.span_tag} id={"activate_tag_" + id}></span>
            <img className={classes.circle} src={src} alt="" />
            <div>
                <h2>{h2}</h2>
                <p>{p}</p>
            </div>
        </li>
    )
}

export default ListItem
