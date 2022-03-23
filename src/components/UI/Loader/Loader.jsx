import React from "react"
import PropTypes from "prop-types"
import classes from "./Loader.module.css"

const Loader = ({ variant = "primary", size = "default" }) => {
    return (
        <div className={classes.container}>
            <span className={classes.loader}></span>
        </div>
    )
}
Loader.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary", "white"]),
    size: PropTypes.oneOf(["sm", "default", "lg"]),
}

export default Loader
