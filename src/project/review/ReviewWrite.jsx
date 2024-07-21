import React, { useEffect, useState } from "react";
import '../css/review.css';
import { getDateTime, getMyInfo, getMyReviewDB, getProdFlag, setMyReviewDB } from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import StarRating from "./StarRating";


const ReviewWrite = ({ gameName, setWriteFlag, no, gameSrc, gameHref }) => {
    const [score, setScore] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [currentNick, setCurrentNick] = useState('');

    useEffect(() => {
        if (getLoginedSessionId() === '') {
            return;
        }
        console.log('useEffect called'); // useEffect 호출 확인
        const myInfo = getMyInfo(getLoginedSessionId());
        setCurrentNick(myInfo.uNick);
    }, []);

    const reviewCommentHandler = (e) => {
        setReviewComment(e.target.value);
    };

    const submitClickHandler = () => {
        if (getLoginedSessionId() === '') {
            alert('로그인이 필요한 서비스입니다.');
            setReviewComment('');
            setScore(0);
            return;
        }

        if (reviewComment === '' || score === 0) {
            alert('별점 또는 리뷰 내용을 입력해주세요.');
            return;
        }

        const reviewDB = getMyReviewDB(getLoginedSessionId());

        if (reviewDB.hasOwnProperty(no)) {
            alert('해당 게임에 이미 리뷰를 작성하셨습니다\n수정 하거나 삭제 후 진행해주세요.');
            return;
        }

        reviewDB[no] = {
            gameName: gameName,
            game_href: gameHref,
            img_src: gameSrc,
            nick: currentNick,
            star: score,
            review: reviewComment,
            regDate: getDateTime(),
        };

        setMyReviewDB(getLoginedSessionId(), reviewDB);

        alert("작성이 완료되었습니다.");
        setWriteFlag((prev) => !prev);
        setReviewComment('');
        setScore(0); // 초기값으로 되돌림
    };

    return (
        <div className="review-write-container">
            <div className="review-write">
                <h2>해당 게임에 대한 리뷰 작성</h2>
                <form id="ratingForm">
                    <div className="form-content">
                        <textarea
                            id="review"
                            className="review-box"
                            value={reviewComment}
                            onChange={reviewCommentHandler}
                            placeholder="리뷰를 작성해주세요."
                        ></textarea>
                    </div>
                    <div className="options">
                        <div className="recommendation">
                            <label style={{paddingBottom:"12px"}}>별점을 선택해주세요</label>
                            <StarRating rating={score} setRating={setScore} />
                        </div>
                    </div>
                    <input
                        type="button"
                        className="submit-btn"
                        value="리뷰 작성"
                        onClick={submitClickHandler}
                    />
                </form>
            </div>
        </div>
    );
};

export default ReviewWrite;