import React, { useEffect, useState } from "react";
import '../css/review.css';
import { getDateTime, getMyInfo, getMyReviewDB, getProdFlag, setMyReviewDB } from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import StarRating from "./StarRating";
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';

const ReviewWrite = ({ gameName, setWriteFlag, no, gameSrc, gameHref,langFileName }) => {
    const [score, setScore] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [currentNick, setCurrentNick] = useState('');

    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }

    useEffect(() => {

        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);

        }

        if (getLoginedSessionId() === '') {
            return;
        }
        console.log('useEffect called'); // useEffect 호출 확인
        const myInfo = getMyInfo(getLoginedSessionId());
        setCurrentNick(myInfo.uNick);
    }, [langFileName]);

    const reviewCommentHandler = (e) => {
        setReviewComment(e.target.value);
    };

    const submitClickHandler = () => {
        if (getLoginedSessionId() === '') {
            alert(lang.thisServiceRequiresLogin);
            setReviewComment('');
            setScore(0);
            return;
        }

        if (reviewComment === '' || score === 0) {
            alert(lang.plsWriteReview);
            return;
        }

        const reviewDB = getMyReviewDB(getLoginedSessionId());

        if (reviewDB.hasOwnProperty(no)) {
            alert(lang.alreadyWriteReview + "\n"+lang.modifyOrDelete);
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

        alert(lang.writtenDone);
        setWriteFlag((prev) => !prev);
        setReviewComment('');
        setScore(0); // 초기값으로 되돌림
    };

    return (
        <div className="review-write-container">
            <div className="review-write">
                <h2>{lang.writeReviewForThisGame}</h2>
                <form id="ratingForm">
                    <div className="form-content">
                        <textarea
                            id="review"
                            className="review-box"
                            value={reviewComment}
                            onChange={reviewCommentHandler}
                            placeholder={lang.pleaseWriteAReview}
                        ></textarea>
                    </div>
                    <div className="options">
                        <div className="recommendation">
                            <label style={{paddingBottom:"12px"}}>{lang.pleaseSelectARating}</label>
                            <StarRating rating={score} setRating={setScore} />
                        </div>
                    </div>
                    <input
                        type="button"
                        className="submit-btn"
                        value={lang.writeReview}
                        onClick={submitClickHandler}
                    />
                </form>
            </div>
        </div>
    );
};

export default ReviewWrite;