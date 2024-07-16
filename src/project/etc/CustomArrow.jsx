import React from "react";


const CustomArrow = ({ className, style, onClick, icon }) => {
    return(
        <div
            className={className}
            style={{ 
                ...style, 
                display: 'inline-block', 
                background: 'black', 
                borderRadius: '50%', 
                width: '30px', 
                height: '30px', 
                padding: '10px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }} 
            onClick={onClick}
        >
            {icon}
        </div>
    )
}

export default CustomArrow;