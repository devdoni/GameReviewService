import React, { useEffect, useState } from "react";
import '../css/index.css';
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { getDateTime, getProdFlag, getUserDB, getUserReviewDB, getUserWishListDB, IdDuplicateCheck, nickNameDuplicateCheck, setUserDB, setUserReviewDB, setUserWishListDB, userIdCheck, usermailCheck, userNickNameCheck, userPhoneCheck, userPwCheck } from "../utils/utils";
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';

const SignUp = ({isLogined,langFileName}) => {

    //hook Start
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uNick, setUNick] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uMail, setUMail] = useState('');

    const [isIdTouched, setIsIdTouched] = useState(false);                      // 아이디 입력을 체크하는 State
    const [isPwTouched, setIsPwTouched] = useState(false);                      // 비밀번호 입력을 체크하는 State
    const [isNickTouched, setIsNickTouched] = useState(false);                  // 닉네임 입력을 체크하는 State
    const [isPhoneTouched, setIsPhoneTouched] = useState(false);                // 휴대폰 입력을 체크하는 State
    const [isMailTouched, setIsMailTouched] = useState(false);                  // 이메일 입력을 체크하는 State

    const [isIdCheck, setIsIdCheck] = useState(false);                          // 아이디 검증을 체크하는 State
    const [isPwCheck, setIsPwCheck] = useState(false);                          // 비밀번호 검증을 체크하는 State
    const [isNickNameCheck, setIsNickNameCheck] = useState(false);              // 닉네임 검증을 체크하는 State
    const [isPhoneCheck, setIsPhoneCheck] = useState(false);                    // 휴대폰 번호 검증을 체크하는 State
    const [isMailCheck, setIsMailCheck] = useState(false);                      // 이메일 검증을 체크하는 State
    const [isIdDuplicateCheck, setIsIdDuplicateCheck] = useState(false);        // 아이디 중복체크 State
    const [isNickDuplicateCheck, setIsNickDuplicateCheck] = useState(false);    // 닉네임 중복체크 State    
   
    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }

    const navgigate = useNavigate();

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

        if(!getProdFlag()) console.log('[SIGNUP] useEffect()');
        if(isLogined) {
            alert(lang.afterLogout);
            navgigate('/');
        }
    }, [isLogined,langFileName]) 

    // hook End

    // 로그인이 되어있을 경우 렌더링 하지 않음
    if(isLogined) {
        return null;
    }

    // Handler start
    const uIdChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[SIGNUP] uIdChangeHandler()');
        const userId = e.target.value

        setUId(userId);
        setIsIdTouched(true);

        if (userId === '') {
            setIsIdTouched(false);
        }
        let regIdCheck = userIdCheck(userId);
        if (regIdCheck) {
            setIsIdCheck(true);        
        } else {
            setIsIdCheck(false);
        }

    }

    const uPwChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[SignUp] uPwChaneHandler()');

        const userPw = e.target.value

        setUPw(userPw);
        setIsPwTouched(true);

        if (userPw === '') {
            setIsPwTouched(false);
        }
        let regPwCheck = userPwCheck(userPw);
        if (regPwCheck) {
            setIsPwCheck(true);        
        } else {
            setIsPwCheck(false);
        }
    }

    const uNickChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[SignUp] uNickChangeHandler()');

        const userNick = e.target.value

        setUNick(userNick);
        setIsNickTouched(true);

        if (userNick === '') {
            setIsNickTouched(false);
        }
        let regNickNameCheck = userNickNameCheck(userNick);

        if (regNickNameCheck) {
            setIsNickNameCheck(true);
        } else {
            setIsNickNameCheck(false);
        }
        
        let nickCheck = nickNameDuplicateCheck(e.target.value);

        if (nickCheck) {
            setIsNickDuplicateCheck(true);
        } else {
            setIsNickDuplicateCheck(false);
        }

    }

    const uPhoneChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[SignUp] uPhoneChangeHandler()');
        
        const userPhone = e.target.value

        setUPhone(e.target.value);
        let regPhoneCheck = userPhoneCheck(userPhone);
        if (userPhone === '') {
            setIsPhoneTouched(false);
        }
        if (regPhoneCheck) {
            setIsPhoneCheck(true);
        } else {
            setIsPhoneCheck(false);
        }
    }

    const uMailChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[SignUp] uMailChangeHandler()');

        const userMail = e.target.value
        setUMail(userMail);
        setIsMailTouched(true);
        if (userMail === '') {
            setIsMailTouched(false);
        }
        let regEmailCheck = usermailCheck(userMail);

        if (regEmailCheck) {
            setIsMailCheck(true);
        } else {
            setIsMailCheck(false);
        }

    }

    const SignUpBtnHandler = () => {
        if(!getProdFlag()) console.log('[Signup] SignUpBtnHandler()');
        
        if (!isIdDuplicateCheck) {
            alert(lang.pleaseProceedWithIdDuplicationCheck);
            return;
        }

        if (uPw === '' || uNick === '') {
            alert(lang.required);
            return;
        }

        if (!isIdCheck || !isPwCheck || !isNickNameCheck || isNickDuplicateCheck) {
            alert(lang.plsCheckInfo);
            return;
        }

        if (uPhone !== '' || uMail !== '') {
            if(!isMailCheck || !isPhoneCheck) {
                alert(lang.plsCheckPhoneMail);
                return;
            }
        }

        // USER DB 
        let UserDB = getUserDB();
        if (UserDB === null) {
                // DB에 회원정보 하나도 없는 경우
            let newUserObj = {
                [uId] : {
                    'uId': uId,
                    'uPw': uPw,
                    'uNick': uNick,
                    'uPhone': uPhone,
                    'uMail': uMail,
                    'uRegDate': getDateTime(),
                    'uModDate': getDateTime(),
                }
            }
            setUserDB(newUserObj);

          } else {
            // DB에 회원정보가 하나라도 있는 경우
            let userObj = UserDB;
            userObj[uId] = {
                'uId': uId,
                'uPw': uPw,
                'uNick': uNick,
                'uPhone': uPhone,
                'uMail': uMail,
                'uRegDate': getDateTime(),
                'uModDate': getDateTime(),
            }
            setUserDB(userObj);

          }
        // REVIEW DB
          let userReviewSvcDB = getUserReviewDB();
          if (userReviewSvcDB === null) {
            let newUserReviews = {
                [uId]: {
                    
                }
            }
            setUserReviewDB(newUserReviews);
          } else {
            let userReviews = getUserReviewDB();
            userReviews[uId] = {}

            setUserReviewDB(userReviews);
          }
        // WISHLIST DB
          let userWishListDB = getUserWishListDB();
          if (userWishListDB === null) {
            let newUserWishLists = {
                [uId]: {}
            };
            setUserWishListDB(newUserWishLists);
          } else {
            
            userWishListDB[uId] = {}

            setUserWishListDB(userWishListDB);
        }

          alert(lang.signUpSuccessful);

          navgigate('/signin');

        }

        const idDuplicateCheckBtn = () => {
            if(!getProdFlag()) console.log('[Signup] idDuplicateCheckBtn()');
            let idCheck = IdDuplicateCheck(uId);

            if(isIdDuplicateCheck) {
                alert(lang.alreadyCompleted)
                return;
            }

            if(!isIdCheck) {
                alert(lang.pleaseUse5To20)
                return;
            }

            if(idCheck) {
                setIsIdDuplicateCheck(false);
                alert(lang.duplicateId);

            } else {
                let result = window.confirm(lang.theIdIsAvailable);
                if (result)
                {
                    alert('중복확인이 완료되었습니다.');
                    setIsIdDuplicateCheck(true);
                    document.getElementById('input_id').readOnly = true; 
                   
                } else {
                    alert('요청이 취소되었습니다.');
                    setIsIdDuplicateCheck(false);
                }

            }

        }
        //Handelr End

    

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div id="signup_wrap">
                    <div className="signup">
                        <div className="section">
                            <div className="section_header">{lang.required} </div>
                                <input id="input_id" name="UserId" type="text" onChange={uIdChangeHandler} placeholder={lang.mustId} />
                                {
                                   isIdTouched && !isIdCheck && <p>{lang.pleaseUse5To20}</p>
                                }
                                {
                                   isIdTouched && !isIdDuplicateCheck && <p>{lang.pleaseProceedWithIdDuplicationCheck}</p>
                                }
                                <input className="basic_btn" type="button" onClick={idDuplicateCheckBtn} value={lang.checkDuplication} />

                                <input className="basic_input" name="UserPw" type="password" onChange={uPwChangeHandler} placeholder={lang.mustPassword} />
                                {
                                   isPwTouched && !isPwCheck && <p>{lang.pleaseUse8To16}</p>
                                }
                                <input id="input_nick" name="UserNickname" type="text" onChange={uNickChangeHandler} placeholder={lang.mustNickname} />
                                {
                                    isNickTouched && !isNickNameCheck && <p>{lang.pleaseEnterNickname}</p>
                                }
                                {
                                    isNickDuplicateCheck ? <p>{lang.usedNickname}</p> : null
                                }
                        </div>
                        <div className="section">
                            <div className="section_header">{lang.choice}</div>
                            <div className="input_group">
                            <input className="basic_input" id="phone_input" name="UserPhone" type="text" onChange={uPhoneChangeHandler} placeholder={lang.phoneNumber} />
                            <input className="basic_input" id="email_input" type="email" name="UserEmail" onChange={uMailChangeHandler} placeholder={lang.emailAddress} />
                                {
                                    isPhoneTouched && !isPhoneCheck && <p> {lang.commirPhonenumber}<br/>ex) 010-0000-0000</p>
                                }
                                {
                                    isMailTouched && !isMailCheck && <p>{lang.commirEmail}</p>
                                }
                            </div>
                        </div>
                        <input className="basic_btn" type="button" onClick={SignUpBtnHandler} value={lang.signUp} />
                    </div>
                </div>
            </motion.div>
        );
    };


export default SignUp;