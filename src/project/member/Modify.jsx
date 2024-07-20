import React, { useEffect, useState } from "react";
import { getDateTime, getMyInfo, getProdFlag, getUserDB, getUserReviewDB, modNickDuplicateCheck, nickNameDuplicateCheck, setMyInfo, setUserDB, setUserReviewDB, userIdCheck, usermailCheck, userNameCheck, userNickNameCheck, userPhoneCheck, userPwCheck } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { getLoginedSessionId, setLoginedSessionId } from "../utils/session";
import '../css/index.css';

const Modify = ({setIsLogined, isLogined }) => {

    //hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uNick, setUNick] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uMail, setUMail] = useState('');
    const navigate = useNavigate();

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
    }, [])
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
            alert('입력 정보를 확인해주세요');
            return;
        }

        if (uPhone !== '' || uMail !== '') {
            if(!isMailCheck || !isPhoneCheck) {
                alert('휴대폰 번호 또는 이메일을 확인해주세요');
                return;
            }
        }

        let myInfo = getMyInfo(getLoginedSessionId());
        myInfo.uPw = uPw;
        myInfo.uNick = uNick;
        myInfo.uPhone = uPhone;
        myInfo.uMail = uMail;
        myInfo.uModDate = getDateTime();
        
        setMyInfo(getLoginedSessionId(), myInfo);


        alert('정보 수정이 완료되었습니다.');
        navigate('/');

    }




    return (
        <div id="modify_wrap">
            <div className="modify">
                <label htmlFor="input_id">아이디&nbsp;(변경불가)</label>
                <input id="input_id" name="UserId" type="text" value={uId} readOnly />
    
                <label htmlFor="input_pw">비밀번호</label>
                <input className="basic_input" id="input_pw" name="UserPw" type="password" value={uPw} onChange={uPwChangeHandler} placeholder="변경할 비밀번호를 입력해주세요" />
                {
                    isPwTouched && !isPwCheck && <p>비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</p>
                }
                <label htmlFor="input_nick">닉네임</label>
                <input className="basic_input" id="input_nick" name="UserNickname" type="text" value={uNick} onChange={uNickChangeHandler} />
                {
                    isNickTouched && !isNickNameCheck && <p>닉네임을 입력해주세요. (한글, 영어, 숫자 조합 3~16자)</p>
                }
                {
                    !isNickDuplicateCheck && <p>이미 사용중인 닉네임입니다.</p>
                }
                <label htmlFor="input_phone">휴대폰 번호</label>
                <input className="basic_input" id="input_phone" name="UserPhone" type="text" value={uPhone} onChange={uPhoneChangeHandler} placeholder="[선택] 변경할 휴대폰번호" />
                {
                    isPhoneTouched && !isPhoneCheck && <p>전화번호 형식을 확인해주세요 <br/>ex) 010-0000-0000</p>
                }
                <label htmlFor="input_email">이메일</label>
                <input className="basic_input" id="input_email" type="email" name="UserEmail" value={uMail} onChange={uMailChangeHandler} placeholder="[선택] 변경할 이메일 주소" />
                {
                    isMailTouched && !isMailCheck && <p>이메일 형식을 확인해주세요.</p>
                }
                <input className="basic_btn" type="button" onClick={modifyBtnHandler} value="정보수정" />
            </div>
        </div>
    );
}

export default Modify;