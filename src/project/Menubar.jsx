import React, { useEffect, useState } from "react";
import './css/index.css';
import './css/common.css';
import { Link, useNavigate } from "react-router-dom";
import { getLoginedSessionId, setLoginedSessionId } from "./utils/session";
import { getProdFlag } from "./utils/utils";
import txt_kor from './db/txt_kor.json';
import txt_eng from './db/txt_eng.json';
import txt_chi from './db/txt_chi.json';


const Menubar = ({isLogined, setIsLogined, setLangFileName,langFileName}) => {

    // hook
    const navigate = useNavigate();
    const [lang, setLang] = useState(txt_kor);          // txt_kor ---> lang is undefined

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }
    useEffect(() => {
        if (!getProdFlag()) console.log('[Menubar] useEffect()');
        
        const sessionId = getLoginedSessionId();
        if (sessionId) {
            setIsLogined(true);
        };

        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);
        }

    }, [setIsLogined,langFileName]);

    const signOutBtnHandler = () => {
        if(!getProdFlag()) console.log('[Menubar] signOutBtnHandler()');

        setLoginedSessionId('');
        setIsLogined(false);
        navigate('/');

        alert(lang.logoutComplete);
    }

    const languageChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Menubar] languageChangeHandler()');

        let lang = e.target.value;
        
        if (lang === '') lang = 'kor';
        setLangFileName(lang);                  // kor || eng || chi

    }

    return(
        <div className="menubar">
            <ul>
                <li className="logo">
                    <Link to='/'><img src={`${process.env.PUBLIC_URL}/imgs/logo.png`} alt="logo"/> </Link>
                </li>
                <li>
                    <Link to='/popular'>{lang.popularGames}</Link>
                </li>
                <li>
                    <Link to='/free'>{lang.freeGames}</Link>
                </li>
                <li>
                    <Link to='/category'>{lang.category}</Link>
                </li>
                {
                    isLogined
                    ?
                    <>
                        <li>
                            <Link to='/myinfo'>{lang.myInformation}</Link>
                        </li>
                        <li>
                            <Link to='/' onClick={signOutBtnHandler}>{lang.logout}</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link to='/signin'>{lang.login}</Link>
                        </li>
                        <li>
                            <Link to='/signup'>{lang.signUp}</Link>
                        </li>
                    </>
                }

                <li>
                    <select className="Lang" onChange={languageChangeHandler}>
                        <option value=''>Language</option>
                        <option value="kor">한국어</option>
                        <option value="eng">ENGLISH</option>
                        <option value="chi">中國語</option>
                    </select>
                </li>
            </ul>
        </div>    
    );
}

export default Menubar; 