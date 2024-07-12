import React, { useEffect, useState } from "react";
import './css/menubar.css';
import './css/common.css';
import { Link, useNavigate } from "react-router-dom";
import { setLoginedSessionId } from "./utils/session";

const Menubar = ({isLogined, setIsLogined}) => {

    const navigate = useNavigate();

    const signOutBtnHandler = () => {
        console.log('[Menubar] signOutBtnHandler()');

        setLoginedSessionId();
        setIsLogined(false);
        navigate('/');
        alert('로그아웃 완료');
    }

    return(
        <div className="menubar">
            <ul>
                <li className="logo">
                    <Link to='/'><img src="./imgs/logo.png" /> </Link>
                </li>
                <li>
                    <Link href="#none">인기 게임</Link>
                </li>
                <li>
                    <Link href="#none">무료 게임</Link>
                </li>
                <li>
                    <Link href="#none">추천 게임</Link>
                </li>
                {
                    isLogined
                    ?
                    <>
                        <li>
                            <Link href="#none">내정보</Link>
                        </li>
                        <li>
                            <Link href="none" onClick={signOutBtnHandler}>로그아웃</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link to='/signin'>로그인</Link>
                        </li>
                        <li>
                            <Link to='/signup'>회원가입</Link>
                        </li>
                    </>
                }

                <li>
                    <select className="Lang">
                        <option>Language</option>
                        <option>한국어</option>
                        <option>ENGLISH</option>
                        <option>中國語</option>
                    </select>
                </li>
            </ul>
    </div>     
    );
}

export default Menubar; 