import { getProdFlag } from "./utils";

//로그인 세션
let loginedSession = ''
let loginedNick = ''

// 로그인 세션을 가져오는 함수
export const getLoginedSessionId = () => {

    if(!getProdFlag()) console.log('[Session] getLoginedSessionId()');

    return loginedSession;
}

// 로그인 세션을 설정하는 함수
export const setLoginedSessionId = (id = '') => {

    if(!getProdFlag()) console.log('[Session] setLoginedSessionId()');

    loginedSession = id;

}
