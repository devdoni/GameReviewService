import React, { useState } from "react";
import '../css/common.css';
import '../css/index.css';
import { useNavigate } from "react-router-dom";
import { getMyInfo, getProdFlag } from "../utils/utils";
import { setLoginedSessionId } from "../utils/session";



const SignIn = ({setIsLogined}) => {

    //hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const navigete = useNavigate();

    //handler
    const uIdChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[SignIn] uIdChangeHandler()');

        setUId(e.target.value);
    }

    const uPwChaneHandler = (e) => {
        if(!getProdFlag()) console.log('[SignIn] uPwChaneHandler()');

        setUPw(e.target.value);
    }

    const SignInBtnHandler = () => {
        if(!getProdFlag()) console.log('[SignIn] SignInBtnHandler()');

        let myUserInfo = getMyInfo(uId);
        if (myUserInfo !== undefined && myUserInfo.uPw === uPw) {
            alert('로그인에 성공했습니다');

            setLoginedSessionId(uId);
            setIsLogined(true);
            navigete('/');

        } else {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');

            setLoginedSessionId('');

            setUPw('');
        }

    }

    return(
             <div id="signin_wrap">
                <div className="signin">
                    <input className="basic_input" name="UserId" type="text" value={uId} onChange={uIdChangeHandler} placeholder="아이디" />
                    <input className="basic_input" name="UserPw" type="password" value={uPw} onChange={uPwChaneHandler} placeholder="비밀번호"/>
                    <input className="basic_btn" type="button" onClick={SignInBtnHandler} value="로그인" />
                </div>
            </div>
    );
}

export default SignIn;