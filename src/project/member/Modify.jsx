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
            </div>
        </div>
    );
}

export default Modify;