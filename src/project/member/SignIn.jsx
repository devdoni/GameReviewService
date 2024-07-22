import React, { useEffect, useState } from "react";
import '../css/common.css';
import '../css/index.css';
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { getMyInfo, getProdFlag } from "../utils/utils";
import { setLoginedSessionId } from "../utils/session";
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';


const SignIn = ({setIsLogined, isLogined,langFileName}) => {

    //hook
    const navigate = useNavigate();
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const navigete = useNavigate();
    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }

    useEffect(() => {
        if(!getProdFlag()) console.log('[SignIn] useEffect()')
        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);

        }
        if(isLogined) {
            alert(lang.invalidRequest);
            navigate('/');
        }

    },[isLogined,langFileName])

    // 로그인이 되어있다면 렌더링 하지 않음
    if(isLogined) {
        return null;
        
    }
    //handler
    const uIdChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[SignIn] uIdChangeHandler()');

        setUId(e.target.value);
    }

    const uPwChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[SignIn] uPwChaneHandler()');

        setUPw(e.target.value);
    }

    const SignInBtnHandler = () => {
        if(!getProdFlag()) console.log('[SignIn] SignInBtnHandler()');

        let myUserInfo = getMyInfo(uId);
        if (myUserInfo !== undefined && myUserInfo.uPw === uPw) {
            alert(lang.loginSuccessful);

            setLoginedSessionId(uId);
            setIsLogined(true);
            navigete('/');

        } else {
            alert(lang.unmatchedIdOrPassword);

            setLoginedSessionId('');

            setUPw('');
        }

    }


    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', 
                minHeight: '80vh', 
                backgroundColor: '#202531' 
            }}
        >
            <div id="signin_wrap">
                <div className="signin">
                    <div className="input_group">
                        <input className="basic_input" name="UserId" type="text" value={uId} onChange={uIdChangeHandler} placeholder={lang.id}/>
                        <input className="basic_input" name="UserPw" type="password" value={uPw} onChange={uPwChangeHandler} placeholder={lang.password}/>
                    </div>
                        <input className="basic_btn" type="button" onClick={SignInBtnHandler} value={lang.login}/> 
                </div>
            </div>
        </motion.div>
    );
};

export default SignIn;