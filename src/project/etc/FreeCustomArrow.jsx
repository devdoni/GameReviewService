import React from "react";


const FreeCustomArrow = ({ className, style, onClick, icon }) => {
    return(
        <div
            className={`${className} FreeCustomArrow`}
            style={{ 
                ...style, 
                // objectFit: "contain",
                // width: "50px",
                // height: "100%",  Adjust the height as needed
                display: "block",
                justifyContent: "center",
                alignItems: "center",
                 cursor: "pointer",
                 
                
            }} 
            onClick={onClick}
        >
             <img src={icon} 
                alt="arrow"
                style={{
                    // maxWidth: "100%",
                    // maxHeight: "100%",
                    width: "70px",
                    height: "70px",
                    display: "block"}} />
        </div>
    )
}

export default FreeCustomArrow;