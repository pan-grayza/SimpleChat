import React from "react"
import PropTypes from "prop-types"
import Moment from "moment"
import classes from "./Message.module.css"

const formatDate = (date) => {
    return Moment(date).format("DD.MM.YYYY")
}

const Message = ({
    createdAt = null,
    text = "",
    displayName = "",
    photoURL = "",
}) => {
    if (!text) return null

    return (
        <div className={classes.message}>
            {photoURL ? (
                <img
                    src={photoURL}
                    alt=""
                    width={45}
                    height={45}
                    className={classes.avatar}
                />
            ) : (
                <div className={classes.circle}></div>
            )}
            <div className={classes.main}>
                <div className={classes.header}>
                    {displayName ? (
                        <p className={classes.name}>{displayName}</p>
                    ) : null}
                    {createdAt?.seconds ? (
                        <span className={classes.date}>
                            {formatDate(new Date(createdAt.seconds * 1000))}
                        </span>
                    ) : null}
                </div>
                <p className={classes.message_text}>{text}</p>
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
