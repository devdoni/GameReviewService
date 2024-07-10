import React from "react";
import './css/menubar.css';
import './css/common.css';
import { Link } from "react-router-dom";

const Menubar = () => {
    return(
        <div class="menubar">
            <ul>
                <li class="logo">
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
                <li>
                    <Link href="#none">내정보</Link>
                </li>
                <li>
                    <Link to='/signin'>로그인</Link>
                </li>
                <li>
                    <Link to='/signup'>회원가입</Link>
                </li>
                <li>
                    <select class="Lang">
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