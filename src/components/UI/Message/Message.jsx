import React from "react"
import PropTypes from "prop-types"
import { formatRelative } from "date-fns"
import classes from "./Message.module.css"

const formatDate = (date) => {
    let formattedDate = ""
    if (date) {
        // Convert the date in words relative to the current date
        formattedDate = formatRelative(date, new Date())
        // Uppercase the first letter
        formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    }
    return formattedDate
}

const Message = ({
    createdAt = null,
    text = "",
    displayName = "",
    photoURL = "",
}) => {
    if (!text) return null

    return (
        <div>
            {photoURL ? (
                <img
                    src={photoURL}
                    alt=""
                    width={45}
                    height={45}
                    className={classes.circle}
                />
            ) : (
                <div className={classes.circle}></div>
            )}
            <div>
                <div>
                    {displayName ? (
                        <p className="mr-2 text-primary-500">{displayName}</p>
                    ) : null}
                    {createdAt?.seconds ? (
                        <span className="text-gray-500 text-xs">
                            {formatDate(new Date(createdAt.seconds * 1000))}
                        </span>
                    ) : null}
                </div>
                <p>{text}</p>
            </div>
        </div>
    )
}

Message.propTypes = {
    text: PropTypes.string,
    createdAt: PropTypes.shape({
        seconds: PropTypes.number,
    }),
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
}

export default Message
