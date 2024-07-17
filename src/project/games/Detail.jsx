import React, {} from "react";
import { useParams } from "react-router-dom";
import '../css/common.css';
import '../css/detail.css';
import popularDB from '../db/popularDB.json'; //popularDB.json 파일을 불러옴;
import ReviewWrite from "../review/ReviewWrite";
import Test from "../review/Test";

const Detail = () => {

    const { no } = useParams();                                     // Popular가 나한테 전달한 no값

    const gameDetail = popularDB.find(p => p.no === parseInt(no));  // no값을 이용해서 DB에서 게임의 모든 정보를 가져옴

/*     console.log('[Detail] gameDetail.detail_img_01: ', gameDetail.detail_img_01);
 */
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
                    <div>게임종류:{gameDetail.genre}</div>
                </div>
            
            </div>
        </div>       
        <ReviewWrite />
        <Test />
    </>
    );
}

export default Detail;