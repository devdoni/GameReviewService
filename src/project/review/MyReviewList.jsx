import React, { useEffect } from "react";
import { getProdFlag } from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import { useNavigate } from "react-router-dom";

const  MyReviewList = () => {
    // Hook
    const navigate = useNavigate();

    useEffect(() => {
        if(!getProdFlag())console.log('[Myinfo] useEffect()'); 
        if(getLoginedSessionId() === '') {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/signin');
            return;
        }
    }, [])

    return(
        <>
        </>
    )
}

export default MyReviewList;