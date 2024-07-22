import React from "react";


const MainCustomArrow = ({ className, style, onClick, icon }) => {
    return (
        <img
            src={icon}
            className={`${className} custom-arrow`}  // Adding custom-arrow class for styling
            style={{ ...style, display: "block" }}
            onClick={onClick}
            alt="arrow"
        />
    );
};

export default MainCustomArrow;