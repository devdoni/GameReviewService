import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/common.css';
import '../css/detail.css';
import popularDB from '../db/popularDB.json'; //popularDB.json 파일을 불러옴;
import ReviewWrite from "../review/ReviewWrite";
import ReviewList from "../review/ReviewList";

const Detail = () => {

    const { no } = useParams(); 
    const gameDetail = popularDB.find(p => p.no === parseInt(no)); 
    const [writeFlag, setWriteFlag] = useState(false);
    const [gameName, setGameName] = useState('');

    useEffect(() => {
        console.log('[Detail] useEffect()');

        if (gameDetail) {   
            setGameName(gameDetail.Name);
        }
    }, [no, gameDetail]); 




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
        <ReviewWrite gameName={gameName} setWriteFlag={setWriteFlag}/>
        <ReviewList gameName={gameName} writeFlag={writeFlag}/>
    </>
    );
}

export default Detail;