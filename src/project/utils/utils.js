export const USER_DB_IN_LOCAL_STORAGE = 'UserDB';
export const USER_REVIEW_DB_IN_LOCAL_STORAGE = 'UserReviewDB';
export const USER_WISHLIST_DB_IN_LOCAL_STORAGE = 'UserWishListDB';
export const USER_DELETE_DB_IN_LOCAL_STORAGE = 'DeleteUserDB'
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
// 아이디를 검증하는 함수
export const userIdCheck = (value) => {
    if(!getProdFlag()) console.log('[Utils] useridStrCheck()');

	let regId = /^[a-z]+[a-z0-9]{4,19}$/g;
 
	return regId.test(value);
}
// 비밀번호를 검증하는 함수
export const userPwCheck = (value) => {
    if(!getProdFlag()) console.log('[Utils] userpwCheck()');
    let regPw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{7,16}$/;
     
    return regPw.test(value); 

}

// 닉네임을 검증하는 함수
export const userNickNameCheck = (value) => {
    if(!getProdFlag()) console.log('[Utils] userNickNameCheck()')
    let regNickName = /^[a-zA-Zㄱ-힣0-9][a-zA-Zㄱ-힣0-9]{2,16}$/;
 
	return regNickName.test(value);

}

// 휴대폰 번호를 검증하는 함수

export const userPhoneCheck = (value) => {
    if(!getProdFlag()) console.log('[Utils] userPhoneCheck()')
        let regPhone = /^(?:(010)|(01[1|6|7|8|9]))-\d{3,4}-(\d{4})$/;

    return regPhone.test(value);
}

// 이메일을 검증하는 함수
export const usermailCheck = (value) => {
    if(!getProdFlag()) console.log('[Utils] userPhoneCheck()')
        let regMail = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;

    return regMail.test(value);
}

// 회원가입시 아이디의 중복체크
export const IdDuplicateCheck = (id) => {
    if(!getProdFlag()) console.log('[Utils] IdDuplicateCheck()');
    let allUserObj = getUserDB();

    for (let key in allUserObj) {
        if (allUserObj[key].uId === id) {
            return true;
        }
    }
    let deleteObj = getDeleteDB();
    for (let key in deleteObj) {
        if (deleteObj[key].deleteUid === id) {
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

export const modNickDuplicateCheck = (newNick, uId) => {
    if(!getProdFlag()) console.log('[Utils] modNickDuplicateCheck()');

    let UserObj = getUserDB();

    for (let key in UserObj) {
        if (UserObj[key].uNick === newNick && key !== uId) {
            return true;
        }
    }

    return false;
}
// USER DB START

// 모든 유저의 DB를 가져오는 함수
export const getUserDB = () => {
    if(!getProdFlag()) console.log('[Utils] getUserDB()');

     return JSON.parse(localStorage.getItem(USER_DB_IN_LOCAL_STORAGE)); 
}

// 받은 OBJ를 DB를 저장하는 함수
export const setUserDB = (userObj) => {
    if(!getProdFlag()) console.log('[Utils] setUserDB()');

    localStorage.setItem(USER_DB_IN_LOCAL_STORAGE, JSON.stringify(userObj));
}
// USER DB END

// MY USER DB START

// 나의 정보를 가져오는 함수
export const getMyInfo = (uId) => {
    if(!getProdFlag()) console.log('[Utils] getMyInfo()');

    if (getUserDB() === null) {
        return undefined;
    }

    let userDB = (getUserDB());
    let MyInfo = userDB[uId];
    return MyInfo;

}

// 나의 정보를 저장하는 함수
export const setMyInfo = (uId, myInfo) => {
    if(!getProdFlag()) console.log('[Utils] setMyUserInfo()');

    let UserInfos = getUserDB()
    UserInfos[uId] = myInfo;

    setUserDB(UserInfos);
}

// MY USER DB END

// USER REVIEW DB START

// 모든 유저의 리뷰 DB를 가져오는 함수
export const getUserReviewDB = () => {
    if(!getProdFlag()) console.log('[Utils] getUserReviewDB()');

    return JSON.parse(localStorage.getItem(USER_REVIEW_DB_IN_LOCAL_STORAGE));
}
// 받은 리뷰Obj를 DB에 저장하는 함수
export const setUserReviewDB = (reviewObj) => {
    if(!getProdFlag()) console.log('[Utils] setUserReviewDB()');

    localStorage.setItem(USER_REVIEW_DB_IN_LOCAL_STORAGE, JSON.stringify(reviewObj));
}

// 나의 리뷰 DB를 가져오는 함수
export const getMyReviewDB = (uId) => {
    if(!getProdFlag()) console.log('[Utils] getMyReviewDB()');

    if (getUserReviewDB() === null) {
        return undefined;
    }

    let userReviewDB = getUserReviewDB();
    let myReviewInfo = userReviewDB[uId];
    return myReviewInfo ;

}

// 나의 리뷰를 저장하는 함수
export const setMyReviewDB = (uId, myReviewInfo) => {
    if(!getProdFlag()) console.log('[Utils] setMyReviewDB()');

    let UserRiviewInfos = getUserReviewDB();
    UserRiviewInfos[uId] = myReviewInfo
    setUserReviewDB(UserRiviewInfos);
}
// USER REVIEW DB END

// 모든 유저의 WishList DB를 가져오는 함수
export const getUserWishListDB = () => {
    if(!getProdFlag()) console.log('[Utils] getWishListDB()');
    
    return JSON.parse(localStorage.getItem(USER_WISHLIST_DB_IN_LOCAL_STORAGE));
}

// 받은 WishListObj를 DB에 저장하는 함수
export const setUserWishListDB = (wishListObj) => {
    if(!getProdFlag()) console.log('[Utils] setWishListDB()');

    localStorage.setItem(USER_WISHLIST_DB_IN_LOCAL_STORAGE, JSON.stringify(wishListObj));

}

// 나의 WishList DB를 가져오는 함수
export const getMyWishList = (uId) => {
    let userWishDB = getUserWishListDB();
    if (!userWishDB) {
        return undefined;
    }

    let myWishList = userWishDB[uId];
    return myWishList;
}

// 나의 WishList Obj를 DB에 저장하는 함수
export const setMyWishList = (uId, myWishGame) => {
    if (!getProdFlag()) console.log('[Utils] setMyWishList()');

    const userWishInfos = getUserWishListDB() || {}; 

    userWishInfos[uId] = userWishInfos[uId] || {};

    userWishInfos[uId] = myWishGame;
    
    setUserWishListDB(userWishInfos);
}
// USER WISH LIST DB END

// DELETE USER DB FUN START

// 유저의 정보를 삭제하는 함수
export const deleteUserDB = (uId) => {
    if (!getProdFlag()) console.log('[Utils] deleteUserDB()');

    let allUserDB = getUserDB();
    let allUserReviewDB = getUserReviewDB();
    let allUserWishDB = getUserWishListDB();

    let deleteDB = getDeleteDB();
    if (deleteDB === null) {
        // deleteDB가 없을 경우
        deleteDB = {
            [uId]: {
                deleteUid: allUserDB[uId].uId,
                deleteTime: getDateTimeForDelete()
            }
        }
        setDeleteDB(deleteDB);
    } else {
        // deleteDB가 있을 경우
        deleteDB[uId] = {
            deleteUid: allUserDB[uId].uId,
            deleteTime: getDateTimeForDelete()
        }
        setDeleteDB(deleteDB);
    }
    
    delete allUserDB[uId];
    delete allUserReviewDB[uId];
    delete allUserWishDB[uId];

    setUserDB(allUserDB);
    setUserReviewDB(allUserReviewDB);
    setUserWishListDB(allUserWishDB); 

}

// Delete DB를 가져오는 함수
export const getDeleteDB = () => {
    if (!getProdFlag()) console.log('[Utils] getDeleteDB()');
    
    return JSON.parse(localStorage.getItem(USER_DELETE_DB_IN_LOCAL_STORAGE));
}
// 받은 deleteObj를 DB에 저장하는 함수 
export const setDeleteDB = (deleteObj) => {
    if (!getProdFlag()) console.log('[Utils] setDeleteDB()');
    
    localStorage.setItem(USER_DELETE_DB_IN_LOCAL_STORAGE,JSON.stringify(deleteObj));
}
// DELETE USER DB FUN END

// GET DATE TIME

// 년, 달, 월, 일, 분 까지 가져오는 함수
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

// 유저가 회원탈퇴 했을때 조금 더 정확한 시간을 체크하기 위한 함수
export const getDateTimeForDelete = () => {
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
    let seconds = now.getSeconds();
    if (seconds < 10 ) seconds = '0' + seconds;
    let Milliseconds = now.getMilliseconds()
    if (Milliseconds < 100 ) seconds = '0' + Milliseconds;

    return `${fullYear}/${month}/${date} ${hours}:${minutes}:${seconds}:${Milliseconds}`;
}

