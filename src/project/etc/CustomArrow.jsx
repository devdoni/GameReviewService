import React from "react";


const CustomArrow = ({ className, style, onClick, icon }) => {
    return(
        <div
            className={className}
            style={{ 
                ...style, 
                
                
            }} 
            onClick={onClick}
        >
             <img src={icon} alt="arrow" />
        </div>
    )
}

export default CustomArrow;