import React from "react";


const CustomArrow = ({ className, style, onClick, icon }) => {
    return(
        <div
            className={`${className} custom-arrow`}
            style={{ 
                ...style, 
                // objectFit: "contain",
                // width: "50px",
                // height: "100%",  Adjust the height as needed
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                 cursor: "pointer",
                
            }} 
            onClick={onClick}
        >
             <img src={icon} 
                alt="arrow"
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    display: "flex"}} />
        </div>
    )
}

export default CustomArrow;