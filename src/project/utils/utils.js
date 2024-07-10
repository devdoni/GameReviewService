export const USER_DB_IN_LOCAL_STORAGE = 'UserDB';
export const USER_REVIEW_DB_IN_LOCAL_STORAGE = 'UserReviewDB';

// API 

// 아이디 문자열 길이를 체크하는 함수 아직 사용안함
export const idLengthCheck = (value) => {
    return value.length >= 4 && value.length <= 12;
}

// USER DB START
export const getUserDB = () => {
    console.log('[Utils] getUserDB()');

     return JSON.parse(localStorage.getItem(USER_DB_IN_LOCAL_STORAGE)); 
}

export const setUserDB = (userObj) => {
    console.log('[Utils] setUserDB()');

    localStorage.setItem(USER_DB_IN_LOCAL_STORAGE, JSON.stringify(userObj));
}
// USER DB END

// MY USER DB START
export const getMyInfo = (uId) => {
    console.log('[Utils] getMyInfo()');

    if (getUserDB() === null) {
        return undefined;
    }

    let userDB = (getUserDB());
    let MyInfo = userDB[uId];
    return MyInfo;

}

export const setMyInfo = (uId, myInfo) => {
    console.log('[Utils] setMyUserInfo()');

    let UserInfos = getUserDB()
    UserInfos[uId] = myInfo;

    setMyInfo(UserInfos);
}
// MY USER DB END

// USER REVIEW DB START

export const getUserReviewDB = () => {
    console.log('[Utils] getUserReviewDB()');

    return JSON.parse(localStorage.getItem(USER_REVIEW_DB_IN_LOCAL_STORAGE));
}

export const setUserReviewDB = (reviewObj) => {
    console.log('[Utils] setUserReviewDB()');

    localStorage.setItem(USER_REVIEW_DB_IN_LOCAL_STORAGE, JSON.stringify(reviewObj));
}
// USER REVIEW DB END


// GET DATE TIME
export const getDateTime = () => {
    console.log('[Utils] getDateTime()');

    let now = new Date();
    let fullYear = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10 ) month = '0' + month;
    let date = now.getDate()
    if (date < 10 ) date = '0' + date;
    let hours = now.getHours();
    if (hours < 10 ) hours = '0' + hours;
    let minutes = now.getMinutes();
    if (minutes < 10 ) minutes = '0' + minutes;
    let seconds = now.getSeconds();
    if (minutes < 10 ) seconds = '0' + seconds;

    return `${fullYear}/${month}/${date} ${hours}:${minutes}:${seconds}`;
}