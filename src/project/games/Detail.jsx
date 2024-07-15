import React from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
    

    const { no } = useParams();

    return(
        <>
            Detail
            <br />
            {no}
        </>
    );
}

export default Detail;