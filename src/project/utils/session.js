// 세션
let loginedSession = ''


// 세션을 가져오는 함수
export const getLoginedSessionId = () => {

    return loginedSession();
}

// 세션을 설정하는 함수
export const setLoginedSessionId = (id = '') => {

    loginedSession = id;

}