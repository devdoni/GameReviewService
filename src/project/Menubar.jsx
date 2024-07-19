import React from "react";
import './css/index.css';
import './css/common.css';
import { Link, useNavigate } from "react-router-dom";
import { setLoginedSessionId } from "./utils/session";
import { getProdFlag } from "./utils/utils";


const Menubar = ({isLogined, setIsLogined}) => {

    const navigate = useNavigate();
    const signOutBtnHandler = () => {
        if(!getProdFlag()) console.log('[Menubar] signOutBtnHandler()');

        setLoginedSessionId();
        setIsLogined(false);
        navigate('/');

        alert('로그아웃 완료');
    }

    return(
        <div className="menubar">
            <ul>
                <li className="logo">
                    <Link to='/'><img src={`${process.env.PUBLIC_URL}/imgs/logo.png`}/> </Link>
                    <Link to='/'><img src={`${process.env.PUBLIC_URL}/imgs/logo.png`} alt="logo"/> </Link>
                </li>
                <li>
                    <Link to='/popular'>인기 게임</Link>
                </li>
                <li>
                    <Link to='/free'>무료 게임</Link>
                </li>
                <li>
                    <Link to='/category'>카테고리</Link>
                </li>
                {
                    isLogined
                    ?
                    <>
                        <li>
                            <Link to='/modify'>내정보</Link>
                        </li>
                        <li>
                            <Link to='/' onClick={signOutBtnHandler}>로그아웃</Link>
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