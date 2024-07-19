export const USER_DB_IN_LOCAL_STORAGE = 'UserDB';
export const USER_REVIEW_DB_IN_LOCAL_STORAGE = 'UserReviewDB';
export const USER_WISHLIST_DB_IN_LOCAL_STORAGE = 'UserWishListDB';
// API 

// 개발자모드 ON / OFF
let prodFlag = false;   // false: 개발모드, true: 상용모드

export const getProdFlag = () => {
    return prodFlag;
}

export const setProdFlag = (flag) => {
    prodFlag = flag;
}
// 

// Check API
// 아이디를 체크하는 함수
export const userIdCheck = (value) => {
    if(!getProdFlag()) console.log('[Utils] useridStrCheck()');

	let regId = /^[a-z]+[a-z0-9]{4,19}$/g;
 
	return regId.test(value);
}
// 비밀번호를 체크하는 함수
export const userPwCheck = (value) => {
    if(!getProdFlag()) console.log('[Utils] userpwCheck()');
    let regPw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{7,16}$/;
     
    return regPw.test(value); 

}
// 이름을 체크하는 함수
export const userNameCheck = (value) => {
    if(!getProdFlag()) console.log('[Utils] userNameCheck()');
    let regName = /[가-힣]{3,5}$/;
        
        return regName.test(value);
    
}
// 닉네임을 체크하는 함수
export const userNickNameCheck = (value) => {
    if(!getProdFlag()) console.log('[Utils] userNickNameCheck()')
    let regNickName = /^[a-zA-Zㄱ-힣0-9][a-zA-Zㄱ-힣0-9]{2,16}$/;
 
	return regNickName.test(value);

}



// 아이디의 중복체크
export const IdDuplicateCheck = (id) => {
    if(!getProdFlag()) console.log('[Utils] IdDuplicateCheck()');
    
    let UserObj = getUserDB();
    
    for (let key in UserObj) {
        if (UserObj[key].uId === id) {
            return true;
        }
    }
    
    return false; 
}

// 회원 가입시 닉네임의 중복을 체크하는 함수
export const nickNameDuplicateCheck = (nick) => {
    if(!getProdFlag()) console.log('[Utils] nickNameDuplicateCheck()');
    
    let UserObj = getUserDB();
    
    for (let key in UserObj) {
        if (UserObj[key].uNick === nick) {
            return true;
        }
    }
    
    return false; 
}
// 정보 수정시 내 닉네임을 제외하고 중복을 체크하는 함수

export const modNickDuplicateCheck = (nick, currentNick) => {
    if(!getProdFlag()) console.log('[Utils] modNickDuplicateCheck()');

    let UserObj = getUserDB();

    for (let key in UserObj) {
        if (UserObj[key].uNick === nick && UserObj[key].uNick !== currentNick) {
            return true;

            }

          return false;
        }
}

// USER DB START
export const getUserDB = () => {
    if(!getProdFlag()) console.log('[Utils] getUserDB()');

     return JSON.parse(localStorage.getItem(USER_DB_IN_LOCAL_STORAGE)); 
}

export const setUserDB = (userObj) => {
    if(!getProdFlag()) console.log('[Utils] setUserDB()');

    localStorage.setItem(USER_DB_IN_LOCAL_STORAGE, JSON.stringify(userObj));
}
// USER DB END

// MY USER DB START
export const getMyInfo = (uId) => {
    if(!getProdFlag()) console.log('[Utils] getMyInfo()');

    if (getUserDB() === null) {
        return undefined;
    }

    let userDB = (getUserDB());
    let MyInfo = userDB[uId];
    return MyInfo;

}

export const setMyInfo = (uId, myInfo) => {
    if(!getProdFlag()) console.log('[Utils] setMyUserInfo()');

    let UserInfos = getUserDB()
    UserInfos[uId] = myInfo;

    setUserDB(UserInfos);
}

// MY USER DB END

// USER REVIEW DB START

export const getUserReviewDB = () => {
    if(!getProdFlag()) console.log('[Utils] getUserReviewDB()');

    return JSON.parse(localStorage.getItem(USER_REVIEW_DB_IN_LOCAL_STORAGE));
}

export const setUserReviewDB = (reviewObj) => {
    if(!getProdFlag()) console.log('[Utils] setUserReviewDB()');

    localStorage.setItem(USER_REVIEW_DB_IN_LOCAL_STORAGE, JSON.stringify(reviewObj));
}

export const getMyReviewDB = (uId) => {
    if(!getProdFlag()) console.log('[Utils] getMyReviewDB()');

    if (getUserReviewDB() === null) {
        return undefined;
    }

    let userReviewDB = getUserReviewDB();
    let myReviewInfo = userReviewDB[uId];
    return myReviewInfo ;

}

export const setMyReviewDB = (uId, myReviewInfo) => {
    if(!getProdFlag()) console.log('[Utils] setMyReviewDB()');

    let UserRiviewInfos = getUserReviewDB();
    UserRiviewInfos[uId] = myReviewInfo
    setUserReviewDB(UserRiviewInfos);
}
// USER REVIEW DB END

// USER WISH LIST DB START
export const getUserWishListDB = () => {
    if(!getProdFlag()) console.log('[Utils] getWishListDB()');
    
    return JSON.parse(localStorage.getItem(USER_WISHLIST_DB_IN_LOCAL_STORAGE));
}

export const setUserWishListDB = (wishListObj) => {
    if(!getProdFlag()) console.log('[Utils] setWishListDB()');

    localStorage.setItem(USER_WISHLIST_DB_IN_LOCAL_STORAGE, JSON.stringify(wishListObj));

}

export const getMyWishList = (uId) => {
    let userWishDB = getUserWishListDB();
    if (!userWishDB) {
        return undefined;
    }

    let myWishList = userWishDB[uId];
    return myWishList;
}

export const setMyWishList = (uId, myWishGame) => {
    if (!getProdFlag()) console.log('[Utils] setMyWishList()');

    const userWishInfos = getUserWishListDB() || {}; 

    userWishInfos[uId] = userWishInfos[uId] || {};

    userWishInfos[uId] = myWishGame;
    
    setUserWishListDB(userWishInfos);
}
// USER WISH LIST DB END

// GET DATE TIME
export const getDateTime = () => {
    if(!getProdFlag()) console.log('[Utils] getDateTime()');

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

    return `${fullYear}/${month}/${date} ${hours}:${minutes}`;
}

