import React, { useEffect } from "react";
// import '../css/recom.css';
import popularDB from '../db/popularDB.json'
import '../css/games.css';
import CategoryMotion from "../etc/CategoryMotion";


const Category = () => {

    useEffect(() => {
        console.log('[Category] useEffect()');

        let survivorGames = [];     // 여기에 '생존' 게임을 모아둘거에요.

        for (let i=0; i<popularDB.length; i++) {
            let gameObj = popularDB[i];    // 게임 1개 정보(Object)
            let genres = gameObj['genre']; // 장르들

            for (let j=0; j<genres.length; j++) {
                if (genres[j] === '생존') {
                    survivorGames.push(gameObj);
                    break;
                }
            }
        }

        console.log('survivorGames: ', survivorGames);
        
    }, []);

    return(
        <div id="#recom_wrap">
            <div className="recom_title">
                카테고리를 선택해주세요
            </div>
            <div className="recom_category">
                <ul className="category_ul">
                    <li className="category_li">
                        <span className="text">RPG</span>
                    </li>
                    <li className="category_li">
                        <span className="text">생존</span>
                    </li>
                    <li className="category_li">
                        <span className="text">오픈월드</span>
                    </li>
                    <li className="category_li">
                        <span className="text">스포츠</span>
                    </li>
                    <li className="category_li">
                        <span className="text">레이싱</span>
                    </li>
                    <li className="category_li">
                        <span className="text">퍼즐</span>
                    </li>
                    <li className="category_li">
                        <span className="text">액션</span>
                    </li>
                    <li className="category_li">
                        <span className="text">시뮬레이션</span>
                    </li>
                    <li className="category_li">
                        <span className="text">전략</span>
                    </li>
                    <li className="category_li">
                        <span className="text">공포</span>
                    </li>
                    <li className="category_li">
                        <span className="text">어드벤처</span>
                    </li>
                    <li className="category_li">
                        <span className="text">FPS</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export default Category;