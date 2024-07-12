export const USER_DB_IN_LOCAL_STORAGE = 'UserDB';
export const USER_REVIEW_DB_IN_LOCAL_STORAGE = 'UserReviewDB';

// API 

// Check API
// 아이디를 체크하는 함수
export const userIdCheck = (value) => {
    console.log('[Utils] useridStrCheck');

	let regId = /^[a-z]+[a-z0-9]{4,19}$/g;
 
	return regId.test(value);
}
// 비밀번호를 체크하는 함수
export const userPwCheck = (value) => {
    console.log('[Utils] userpwCheck');
    let regPw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{7,16}$/;
     
    return regPw.test(value); 

}
// 이름을 체크하는 함수
export const userNameCheck = (value) => {
    console.log('[Utils] userpwCheck');
    let regName = /[가-힣]{3,5}$/;
        
        return regName.test(value);
    
}
// 닉네임을 체크하는 함수
export const userNickNameCheck = (value) => {
    let regNickName = /^[a-zA-Zㄱ-힣0-9][a-zA-Zㄱ-힣0-9]{2,16}$/;
 
	return regNickName.test(value);

}



// 아이디의 중복체크
export const IdDuplicateCheck = (id) => {
    console.log('[Utils] IdDuplicateCheck');
    
    let UserObj = getUserDB();
    
    for (let key in UserObj) {
        if (UserObj[key].uId === id) {
            return true;
        }
    }
    
    return false; 
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