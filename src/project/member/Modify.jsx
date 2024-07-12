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
                <input id="input_id" name="UserId" type="text" value={uId} readOnly onChange={uIdChangeHandler}/>
                <input class="basic_input" name="UserPw" type="password" value={uPw} onChange={uPwChaneHandler} placeholder="변경할 비밀번호를 입력해주세요"/>
                {
                    isPwCheck
                    ?
                    <p>하나 이상의 특수문자와 영 대소문자와 숫자 조합을 사용해주세요. (8~16자)</p>
                    :
                    <p style={{color: '#ff0000'}}>하나 이상의 특수문자와 영 대소문자와 숫자 조합을 사용해주세요. (8~16자)</p>
                }
                <input className="basic_input" name="UserName" type="text" value={uName} onChange={uNameChangeHandler} />
                <br />
                <input className="basic_input" name="UserNickname" type="text" value={uNick} onChange={uNickChangeHandler}/>
                {
                    isNickNameCheck
                    ?
                    null
                    :    
                    <p style={{color: '#ff0000'}}>변경할 닉네임을 입력해주세요. (한글, 영어, 숫자 조합 3~16자)</p>
                }
                <input className="basic_input" name="UserPhone" type="text" value={uPhone} onChange={uPhoneChangeHandler} placeholder="변경할 " />
                <br />
                <input className="basic_input" type="email" name="UserEmail" value={uMail} onChange={uMailChangeHandler} placeholder="[선택] 이메일 주소" />
                <br />
                <input className="basic_btn" type="button" onClick={modifyBtnHandler} value="수정" />
                <Link to={'/'}><input class="basic_btn" type="button" value="돌아가기" /></Link>
            </div>
        </div>
    );
}

export default Modify;