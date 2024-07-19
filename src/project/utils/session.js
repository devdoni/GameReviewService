import { getProdFlag } from "./utils";

const SESSION_STORAGE_KEY = 'LOGGED_IN_SESSION_ID';

// 로그인 세션을 가져오는 함수
export const getLoginedSessionId = () => {
    if (!getProdFlag()) console.log('[Session] getLoginedSessionId()');

    const sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY) || '';
    
    return sessionId;
}

// 로그인 세션을 설정하는 함수
export const setLoginedSessionId = (id = '') => {
    if (!getProdFlag()) console.log('[Session] setLoginedSessionId()');

    if (id) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    } else {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
}