import React, { useState } from "react"
import classes from "./ListItem.module.css"

const ListItem = ({ src, checked = false, h2 = "", p = "", id = null }) => {
    const [currentChat, setCurrentChat] = useState()
    const li = document.querySelector(`#li_${id}`)
    const ul = document.querySelector("#list_of_chats")
    const input = document.querySelector(`#chat_checkbox_${id}`)
    const span = document.querySelector(`#activate_tag_${id}`)

    const handleChange = (e) => {
        input.addEventListener("click", (e) => {
            const allLi = ul.getElementsByTagName("li")
            //
            Array.from(allLi).forEach((li) => {
                li.classList.remove("activated_li")
            })
            const target = e.target
            if (target.checked) {
                li.classList.add("activated_li")
                span.classList.add("activated_tag")

                setCurrentChat(target.value)
            }
        })
    }

    return (
        <li className={classes.list_item} id={`li_${id}`}>
            <span id={"activate_tag_" + id}></span>
            <input
                type="radio"
                className={classes.list_checkbox}
                name="chat"
                checked={currentChat == id}
                id={"chat_checkbox_" + id}
                onChange={handleChange}
                value={id}
            ></input>
            <img className={classes.circle} src={src} alt="" />
            <div>
                <h2>{h2}</h2>
                <p>{p}</p>
            </div>
        </li>
    )
}

export default ListItem
