import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/common.css';
import '../css/detail.css';
<<<<<<< HEAD
import popularDB from './popularDB.json'; //popularDB.json 파일을 불러옴

=======
import { getLoginedSessionId } from "../utils/session";
import { getDateTime, getMyInfo, getMyReviewDB, getUserReviewDB, setMyReviewDB, setUserReviewDB } from "../utils/utils";
>>>>>>> ff28017294c785c72149d7dd83123c0b8bb833ee
const Detail = () => {

    const { no } = useParams();                                     // Popular가 나한테 전달한 no값

    const gameDetail = popularDB.find(p => p.no === parseInt(no));  // no값을 이용해서 DB에서 게임의 모든 정보를 가져옴

/*     console.log('[Detail] gameDetail.detail_img_01: ', gameDetail.detail_img_01);
 */

    const [reviewWrite, setReviewWrite] = useState('');
    const [writeFlag, setWriteFlag] = useState(false);
    const [star, setStar] = useState('');
    const [reviews, setReviews] = useState([]);
    const [currentNick, setCurrentNick] = useState('');

    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let myReview = await getMyReviewDB(getLoginedSessionId());
                let myReviewArr = Object.values(myReview);
                setReviews(myReviewArr.reverse());

                let myInfo = await getMyInfo(getLoginedSessionId());
                let currentNick = myInfo.uNick;
                setCurrentNick(currentNick);
                setWriteFlag(false);
            } catch (error) {
                console.error('Failed to fetch user review:', error);
            }
        };
    
        fetchData();
    }, [writeFlag]);

    const reviewWriteboxChangeHandler = (e) => {
        console.log('[Detail] reviewWriteboxChangeHandler()');
        setReviewWrite(e.target.value); 

    }

    const subBtnClickHandler = () => {
        console.log('[Detail] subBtnClickHandler()');
        console.log('star ==>', star);
        console.log('review ==>', reviewWrite);

        if (getLoginedSessionId() === '') {
            alert('로그인이 필요한 서비스입니다.');
            nav('/signin');
            return;
        }

        if (reviewWrite === '' || star === '') {
            alert('별점 또는 리뷰 내용을 입력해주세요.');
            return;
        }
        let reviewDB = getMyReviewDB(getLoginedSessionId());
        reviewDB[getDateTime()] = {
            "nick": currentNick,
            "star": star,
            "review": reviewWrite,
            "regDate": getDateTime(),
            "modDate": getDateTime()
        }    
        setMyReviewDB(getLoginedSessionId(),reviewDB);

        alert("작성이 완료되었습니다.");
        setWriteFlag(true);
        
        setReviewWrite('');
    }



    const reviewStarClickHandler_five = (e) => {

        setStar(e.target.value);
    }
    const reviewStarClickHandler_four = (e) => {

        setStar(e.target.value);
    }
    const reviewStarClickHandler_three = (e) => {

        setStar(e.target.value);
    }
    const reviewStarClickHandler_two = (e) => {

        setStar(e.target.value);
    }
    const reviewStarClickHandler_one = (e) => {

        setStar(e.target.value);
    }


    return(
    <>
        <div id="gamesinfo_wrap">
            <div className="detail_header">
                <h1>{gameDetail.Name}</h1>
            </div>


            <div className="per_game_info">

                <div className="game_pics">

                    <div><img src={'/imgs/data/' + gameDetail.detail_img_dir + '/' +gameDetail.detail_img_01} /></div>
                    <div><img src={'/imgs/data/' + gameDetail.detail_img_dir + '/' +gameDetail.detail_img_02} /></div>
                    <div><img src={'/imgs/data/' + gameDetail.detail_img_dir + '/' +gameDetail.detail_img_03} /></div>
                    <div><img src={'/imgs/data/' + gameDetail.detail_img_dir + '/' +gameDetail.detail_img_04} /></div>

        
                </div>

                <div className="game_info">
                    <div>이름:{gameDetail.Name}</div>
                    <div>출시시간:{gameDetail.date}</div>
                    <div>게임소개:{gameDetail.description}</div>
                </div>

                <div className="game_info_detail">               {/* 예시 게임정보 더 필요하면 popularDB.json 파일에 추가해주세요. */}
                    <div>플레이어수:{gameDetail.player_num}</div> 
                    <div>게임시간:{gameDetail.play_time}</div>
                    <div>게임종류:{gameDetail.genre}</div>
                </div>
            
            </div>
        </div>
<<<<<<< HEAD
        

        <div id="detail_wrap">
            <div class="container">
                <h2>리뷰를 작성해주세요</h2>
                <form id="ratingForm">
            <div class="rating">
                <input type="radio" id="star5" name="rating" value="5" />
                <label for="star5"></label>
                <input type="radio" id="star4" name="rating" value="4" />
                <label for="star4"></label>
                <input type="radio" id="star3" name="rating" value="3" />
                <label for="star3"></label>
                <input type="radio" id="star2" name="rating" value="2" />
                <label for="star2"></label>
                <input type="radio" id="star1" name="rating" value="1" />
                <label for="star1"></label>
            </div>
                <input type="text" id="review" class="review-box" placeholder="리뷰를 작성해주세요..." />
                    <input type="submit" class="submit-btn" value="제출하기" />
                    </form>
                <div class="result" id="result"></div>
            </div>
        </div>
        
=======

        <div id="detail_wrap">
        <div className="container">
            <h2>리뷰를 작성해주세요</h2>
            <form id="ratingForm">
        <div className="rating">
            <input type="radio" id="star5" name="rating" value="★★★★★" onClick={reviewStarClickHandler_five}/>
            <label for="star5"></label>
            <input type="radio" id="star4" name="rating" value="★★★★" onClick={reviewStarClickHandler_four}/>
            <label for="star4"></label>
            <input type="radio" id="star3" name="rating" value="★★★" onClick={reviewStarClickHandler_three}/>
            <label for="star3"></label>
            <input type="radio" id="star2" name="rating" value="★★" onClick={reviewStarClickHandler_two}/>
            <label for="star2"></label>
            <input type="radio" id="star1" name="rating" value="★" onClick={reviewStarClickHandler_one}/>
            <label for="star1"></label>
        </div>
            <input type="text" id="review" class="review-box" value={reviewWrite} onChange={reviewWriteboxChangeHandler} placeholder="리뷰를 작성해주세요..." />
                <input type="button" className="submit-btn" value="제출하기" onClick={subBtnClickHandler}/>
                </form>
        </div>
    </div>

    <div className="review_wrap">
    {reviews.map((review, idx) => (
        <ul>
        <li key={idx}>
            {review.star}
        </li>
        <li>
            {review.regDate}
        </li>
        <li>
            {review.nick} {review.review}
        </li>
        </ul>
    ))}
    </div>

    
>>>>>>> ff28017294c785c72149d7dd83123c0b8bb833ee
    </>
    );
}

export default Detail;