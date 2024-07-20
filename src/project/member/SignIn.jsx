import React, { useState } from "react";
import '../css/common.css';
import '../css/index.css';
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { getMyInfo, getProdFlag, getUserDB, getUserReviewDB, getUserWishListDB, setUserDB, setUserReviewDB, setUserWishListDB } from "../utils/utils";
import { setLoginedSessionId } from "../utils/session";



const SignIn = ({setIsLogined, isLogined}) => {

    //hook
    const navigate = useNavigate();
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const navigete = useNavigate();

    if(isLogined) {
        alert('올바르지 않은 요청입니다');
        navigate('/');
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
        // 임시 관리자 로그인용
        if(uId === 'admin') {
            alert('관리자 로그인에 성공했습니다');
            setLoginedSessionId('admin');
            setIsLogined(true);
            navigete('/');
            let UserDB = getUserDB();
            if (UserDB === null) {
                    // DB에 회원정보 하나도 없는 경우
                let newUserObj = {
                    [uId] : {
                        'uId': uId,
                        'uPw': uPw,
                        'uNick' : 'admin'
                    }
                }
                setUserDB(newUserObj);
    
              } else {
                // DB에 회원정보가 하나라도 있는 경우
                let userObj = UserDB;
                userObj[uId] = {
                    'uId': uId,
                    'uPw': uPw,
                    'uNick' : 'admin'
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
             return;
            }
        // 임시 관리자 로그인용 끝
        

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
                        <input className="basic_input" name="UserId" type="text" value={uId} onChange={uIdChangeHandler} placeholder="아이디"/>
                        <input className="basic_input" name="UserPw" type="password" value={uPw} onChange={uPwChangeHandler} placeholder="비밀번호"/>
                    </div>
                        <input className="basic_btn" type="button" onClick={SignInBtnHandler} value="로그인"/> 
                </div>
            </div>
        </motion.div>
    );
};

export default SignIn;