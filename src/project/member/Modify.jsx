<<<<<<< HEAD
import React, { useState } from "react";
import { userIdCheck, userNameCheck, userNickNameCheck, userPwCheck } from "../utils/utils";
import { Link } from "react-router-dom";

const Modify = () => {

    //hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uName, setUName] = useState('');
    const [uNick, setUNick] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uMail, setUMail] = useState('');

    const [isIdCheck, setIsIdCheck] = useState(false);        // 아이디 검증을 체크하는 State
    const [isPwCheck, setIsPwCheck] = useState(false);        // 비밀번호 검증을 체크하는 State  
    const [isNameCheck, setIsNameCheck] = useState(false);    // 이름 검증을 체크하는 State  
    const [isNickNameCheck, setIsNickNameCheck] = useState(false);  // 닉네임 검증을 체크하는 State

    const uIdChangeHandler = (e) => {
        console.log('[Modify] uIdChangeHandler');

        setUId(e.target.value);

        let regIdCheck = userIdCheck(e.target.value);
        if (regIdCheck) {
            setIsIdCheck(true);        
        } else {
            setIsIdCheck(false);
        }

    }

    const uPwChaneHandler = (e) => {
        console.log('[Modify] uPwChaneHandler');

        setUPw(e.target.value);
        let regPwCheck = userPwCheck(e.target.value);
        if (regPwCheck) {
            setIsPwCheck(true);        
        } else {
            setIsPwCheck(false);
        }
    }


    const uNameChangeHandler = (e) => {
        console.log('[Modify] uNameChangeHandler');

        setUName(e.target.value);
        let regNameCheck = userNameCheck(e.target.value);
        if (regNameCheck) {
            setIsNameCheck(true);
        } else {
            setIsNameCheck(false);
        }

    }

    const uNickChangeHandler = (e) => {
        console.log('[Modify] uNickChangeHandler');

        setUNick(e.target.value);
        let regNickNameCheck = userNickNameCheck(e.target.value);
        if (regNickNameCheck) {
            setIsNickNameCheck(true);
        } else {
            setIsNickNameCheck(false);
        }
    }

    const uPhoneChangeHandler = (e) => {
        console.log('[Modify] uPhoneChangeHandler');

        setUPhone(e.target.value);
    }

    const uMailChangeHandler = (e) => {
        console.log('[Modify] uMailChangeHandler');

        setUMail(e.target.value);

    }

    const modifyBtnHandler = ()  => {
        console.log('[Modify] modifyBtnHandler()');
    }

    return(
        <div id="signup_wrap">
            <div className="signup">
                <input id="input_id" name="UserId" type="text" value={uId} readOnly onChange={uIdChangeHandler} placeholder="[필수] 아이디" />
                {
                    isIdCheck
                    ?
                    <p>5~20자의 영어 소문자와 숫자 조합만 사용 가능합니다.</p>
                    :
                    <p style={{color: '#ff0000'}}>5~20자의 영어 소문자와 숫자 조합만 사용가능합니다.</p>
                }
                <input class="basic_input" name="UserPw" type="password" value={uPw} onChange={uPwChaneHandler} placeholder="[필수] 비밀번호"/>
                {
                    isPwCheck
                    ?
                    <p>8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</p>
                    :
                    <p style={{color: '#ff0000'}}>8~16자의 영어 대/소문자+숫자+특수문자를 조합을 사용해 주세요.</p>
                }
                <input className="basic_input" name="UserName" type="text" value={uName} onChange={uNameChangeHandler} placeholder="[필수] 이름"/>
                {
                    isNameCheck
                    ?
                    <p>&nbsp</p>
                    :    
                    <p style={{color: '#ff0000'}}>이름을 입력해주세요.</p>
                }
                <input className="basic_input" name="UserNickname" type="text" value={uNick} onChange={uNickChangeHandler} placeholder="[필수] 닉네임" />
                {
                    isNickNameCheck
                    ?
                    <p> </p>
                    :    
                    <p style={{color: '#ff0000'}}>닉네임을 입력해주세요. (한글, 영어, 숫자 조합 3~16자)</p>
                }
                <input className="basic_input" name="UserPhone" type="text" value={uPhone} onChange={uPhoneChangeHandler} placeholder="[선택] 휴대전화 번호 010-0000-0000" />
                <br />
                <input className="basic_input" type="email" name="UserEmail" value={uMail} onChange={uMailChangeHandler} placeholder="[선택] 이메일 주소" />
                <br />
                <input className="basic_btn" type="button" onClick={modifyBtnHandler} value="회원가입" />
                <Link to={'/'}><input class="basic_btn" type="button" value="돌아가기" /></Link>
=======
import React, { useEffect, useState } from "react";
import { getDateTime, getMyInfo, getProdFlag, getUserDB, getUserReviewDB, modNickDuplicateCheck, nickNameDuplicateCheck, setMyInfo, setUserDB, setUserReviewDB, userIdCheck, userNameCheck, userNickNameCheck, userPwCheck } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { getLoginedSessionId, setLoginedSessionId } from "../utils/session";

const Modify = ({setIsLogined}) => {

    //hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uName, setUName] = useState('');
    const [uNick, setUNick] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uMail, setUMail] = useState('');
    const navigate = useNavigate();

    const [isPwCheck, setIsPwCheck] = useState(true);        // 비밀번호 검증을 체크하는 State  
    const [isNickNameCheck, setIsNickNameCheck] = useState(true);  // 닉네임 검증을 체크하는 State
    const [isNickDuplicateCheck, setIsNickDuplicateCheck] = useState(true);

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
        setUName(myInfo.uName);
        setUNick(myInfo.uNick);
        setUPhone(myInfo.uPhone);
        setUMail(myInfo.uMail);
    }, [])

    const uIdChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uIdChangeHandler()');

        setUId(e.target.value);

    }

    const uPwChaneHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uPwChaneHandler()');

        setUPw(e.target.value);

        let regPwCheck = userPwCheck(e.target.value);
        if (regPwCheck) {
            setIsPwCheck(true);        
        } else {
            setIsPwCheck(false);
        }

    }
    const uNameChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uNameChangeHandler()');

        setUName(e.target.value);
    }

    const uNickChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uNickChangeHandler()');

        setUNick(e.target.value);

        let regNickNameCheck = userNickNameCheck(e.target.value);
        if (regNickNameCheck) {
            setIsNickNameCheck(true);
        } else {
            setIsNickNameCheck(false);
        }

    }

    const uPhoneChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uPhoneChangeHandler()');

        setUPhone(e.target.value);
    }

    const uMailChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uMailChangeHandler()');

        setUMail(e.target.value);

    }

    const modifyBtnHandler = ()  => {
        if(!getProdFlag()) console.log('[Modify] modifyBtnHandler()');

        if (!isPwCheck || !isNickNameCheck) {
            alert('입력 정보를 확인해주세요');
            return;
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

    const deleteBtnHandler = () => {
        if(!getProdFlag()) console.log('[Modify] deleteBtnHandler()');

        if (window.confirm('정말로 회원탈퇴를 하시겠습니까?')) {
            
            //DELETE USER INFO
            let allUserInfo = getUserDB();

            delete allUserInfo[getLoginedSessionId()].uPw;
            delete allUserInfo[getLoginedSessionId()].uPhone;
            delete allUserInfo[getLoginedSessionId()].uMail;
            delete allUserInfo[getLoginedSessionId()].uName;
            delete allUserInfo[getLoginedSessionId()].uModDate;

            setUserDB(allUserInfo);

            let allUserRiview = getUserReviewDB();

            delete allUserRiview[getLoginedSessionId()]

            setUserReviewDB(allUserRiview);

            alert('회원탈퇴가 완료되었습니다.');

            setLoginedSessionId();
            setIsLogined(false);
            navigate('/');

            } else { 
                alert("회원 탈퇴 요청이 취소되었습니다.");
            }

        } 


    return(
        <div id="signup_wrap">
            <div className="signup">
                <input id="input_id" name="UserId" type="text" value={uId} readOnly onChange={uIdChangeHandler}/>
                <input class="basic_input" name="UserPw" type="password" value={uPw} onChange={uPwChaneHandler} placeholder="변경할 비밀번호를 입력해주세요"/>
                {
                    isPwCheck
                    ?
                    <p>하나 이상의 특수문자와 영 대소문자와 숫자 조합을 사용해주세요. (8~16자)</p>
                    :
                    <p style={{color: '#ff0000'}}>하나 이상의 특수문자와 영 대소문자와 숫자 조합을 사용해주세요. (8~16자)</p>
                }
                <input className="basic_input" name="UserName" type="text" readOnly value={uName} onChange={uNameChangeHandler} />
                <br />
                <input className="basic_input" name="UserNickname" type="text" value={uNick} onChange={uNickChangeHandler}/>
                {
                    isNickNameCheck
                    ?
                    null
                    :    
                    <p style={{color: '#ff0000'}}>변경할 닉네임을 입력해주세요. (한글, 영어, 숫자 조합 3~16자)</p>
                }
                {
                isNickDuplicateCheck
                ?
                null 
                :    
                <p style={{color: '#ff0000'}}>이미 사용중인 닉네임입니다.</p>                    
                }
                <input className="basic_input" name="UserPhone" type="text" value={uPhone} onChange={uPhoneChangeHandler} placeholder="변경할 휴대폰번호" />
                <br />
                <input className="basic_input" type="email" name="UserEmail" value={uMail} onChange={uMailChangeHandler} placeholder="변경할 이메일 주소" />
                <br />
                <input className="basic_btn" type="button" onClick={modifyBtnHandler} value="정보수정" />
                <input class="basic_btn" type="button" onClick={deleteBtnHandler} value="회원탈퇴" />
>>>>>>> 99bc146f35dba97bcc579d0833e98d44711295b0
            </div>
        </div>
    );
}

export default Modify;