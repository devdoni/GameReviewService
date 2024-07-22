import React, { useEffect, useState } from "react";
import { getDateTime, getMyInfo, getProdFlag, modNickDuplicateCheck, setMyInfo, usermailCheck, userNickNameCheck, userPhoneCheck, userPwCheck } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { getLoginedSessionId} from "../utils/session";
import '../css/index.css';
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';
import { motion } from 'framer-motion';


const Modify = ({ isLogined,langFileName }) => {



    //hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uNick, setUNick] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uMail, setUMail] = useState('');
    const navigate = useNavigate();
    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }

    const [isPwTouched, setIsPwTouched] = useState(false);                      // 비밀번호 입력을 체크하는 State
    const [isNickTouched, setIsNickTouched] = useState(false);                  // 닉네임 입력을 체크하는 State
    const [isPhoneTouched, setIsPhoneTouched] = useState(false);                // 휴대폰 입력을 체크하는 State
    const [isMailTouched, setIsMailTouched] = useState(false);                  // 이메일 입력을 체크하는 State

    const [isPwCheck, setIsPwCheck] = useState(true);                           // 비밀번호 검증을 체크하는 State  
    const [isNickNameCheck, setIsNickNameCheck] = useState(true);               // 닉네임 검증을 체크하는 State
    const [isPhoneCheck, setIsPhoneCheck] = useState(true);                    // 휴대폰 번호 검증을 체크하는 State
    const [isMailCheck, setIsMailCheck] = useState(true);                      // 이메일 검증을 체크하는 State
    const [isNickDuplicateCheck, setIsNickDuplicateCheck] = useState(true);    // 닉네임 중복체크 State    

    useEffect(() => {
        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);

        }

        // MT DB GET
        if(!getProdFlag()) console.log('[Modify] useEffect()');

        let myInfo = getMyInfo(getLoginedSessionId());
        if (myInfo === undefined) {
            alert('로그인이 필요한 서비스입니다.')
            navigate('/signin');
            return;
        }

        setUId(myInfo.uId);
        setUPw(myInfo.uPw);
        setUNick(myInfo.uNick);
        setUPhone(myInfo.uPhone);
        setUMail(myInfo.uMail);
    }, [langFileName])
    // 로그인이 되어있지 않았을 경우 렌더링 하지 않음
    if (!isLogined) {
        return null;
    }

    const uPwChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uPwChaneHandler()');

        const newPw = e.target.value;

        setUPw(newPw);
        setIsPwTouched(newPw !== '');

        let regPwCheck = userPwCheck(newPw);
        if (regPwCheck) {
            setIsPwCheck(true);        
        } else {
            setIsPwCheck(false);
        }

    }

    const uNickChangeHandler = (e) => {
        if (!getProdFlag()) console.log('[Modify] uNickChangeHandler()');

        const newNick = e.target.value;

        setUNick(newNick);
        setIsNickTouched(newNick !== '');

        let regNickNameCheck = userNickNameCheck(newNick);
        setIsNickNameCheck(regNickNameCheck);

        if (newNick !== getMyInfo(getLoginedSessionId()).uNick) {           // 현재 입력된 닉네임이 DB에 내 닉네임과 일치하지 않으면 닉네임 중복체크 시작
            let ModNickCheck = modNickDuplicateCheck(newNick, uId);
            setIsNickDuplicateCheck(!ModNickCheck);
        } else {
            setIsNickDuplicateCheck(true); 
        }
    };
    const uPhoneChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[SignUp] uPhoneChangeHandler()');

        const newPhone = e.target.value ;

        setUPhone(newPhone);
        setIsPhoneTouched(newPhone !== '');

        let regPhoneCheck = userPhoneCheck(newPhone);

        if (regPhoneCheck) {
            setIsPhoneCheck(true);
        } else {
            setIsPhoneCheck(false);
        }
    }

    const uMailChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[SignUp] uMailChangeHandler()');

        const newMail = e.target.value;

        setUMail(newMail);
        setIsMailTouched(newMail !== '');

        let regEmailCheck = usermailCheck(newMail);

        if (regEmailCheck) {
            setIsMailCheck(true);
        } else {
            setIsMailCheck(false);
        }

    }

    const modifyBtnHandler = ()  => {
        if(!getProdFlag()) console.log('[Modify] modifyBtnHandler()');

        if (!isPwCheck || !isNickNameCheck) {
            alert(lang.plsCheckInfo);
            return;
        }

        if (uPhone !== '' || uMail !== '') {
            if(!isMailCheck || !isPhoneCheck) {
                alert(lang.plsCheckPhoneMail);
                return;
            }
        }

        if (!isNickDuplicateCheck) {
            alert(lang.plsAddNickname);
            return;
        } 


        let myInfo = getMyInfo(getLoginedSessionId());
        myInfo.uPw = uPw;
        myInfo.uNick = uNick;
        myInfo.uPhone = uPhone;
        myInfo.uMail = uMail;
        myInfo.uModDate = getDateTime();
        
        setMyInfo(getLoginedSessionId(), myInfo);


        alert(lang.infoModified);
        navigate('/');

    }




    return (
        <motion.div style={{height:"75vh"}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div id="modify_wrap">
            <div className="modify">
                <label htmlFor="input_id">{lang.id}&nbsp;({lang.cannotChange})</label>
                <input id="input_id" name="UserId" type="text" value={uId} readOnly />
    
                <label htmlFor="input_pw">{lang.password}</label>
                <input className="basic_input" id="input_pw" name="UserPw" type="password" value={uPw} onChange={uPwChangeHandler} placeholder={lang.willChangePassword} />
                {
                    isPwTouched && !isPwCheck && <p>{lang.pleaseUse8To16}</p>
                }
                <label htmlFor="input_nick">{lang.nickname}</label>
                <input className="basic_input" id="input_nick" name="UserNickname" type="text" value={uNick} onChange={uNickChangeHandler} />
                {
                    isNickTouched && !isNickNameCheck && <p>{lang.pleaseEnterNickname}</p>
                }
                {
                    !isNickDuplicateCheck && <p>{lang.usedNickname}</p>
                }
                <label htmlFor="input_phone">{lang.phoneNumber}</label>
                <input className="basic_input" id="input_phone" name="UserPhone" type="text" value={uPhone} onChange={uPhoneChangeHandler} placeholder={lang.willchangePhoneNumber} />
                {
                    isPhoneTouched && !isPhoneCheck && <p>{lang.plsCheckPhoneNumberFormat} <br/>ex) 010-0000-0000</p>
                }
                <label htmlFor="input_email">{lang.emailAddress}</label>
                <input className="basic_input" id="input_email" type="email" name="UserEmail" value={uMail} onChange={uMailChangeHandler} placeholder={lang.willchangeEmail} />
                {
                    isMailTouched && !isMailCheck && <p>{lang.plsCheckEmailFormat}</p>
                }
                <input className="basic_btn" type="button" onClick={modifyBtnHandler} value={lang.infoModifiy} />
            </div>
        </div>
        </motion.div>
    );
}

export default Modify;